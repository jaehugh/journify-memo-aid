import { useState } from "react";
import { BottomNav } from "@/components/BottomNav";
import { Input } from "@/components/ui/input";
import { JournalEntry } from "@/components/JournalEntry";
import { Search as SearchIcon } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/components/ui/use-toast";

const Search = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isAISearching, setIsAISearching] = useState(false);
  const { toast } = useToast();

  const { data: hasPremiumAccess } = useQuery({
    queryKey: ["premium-access"],
    queryFn: async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return false;
      
      const { data, error } = await supabase.rpc('has_premium_access', {
        user_id: user.id
      });
      
      if (error) throw error;
      return data;
    }
  });

  const { data: searchResults, isLoading } = useQuery({
    queryKey: ["search", searchQuery],
    queryFn: async () => {
      if (!searchQuery) return [];

      // First, try to find direct matches in tags and categories
      const { data: directMatches, error: directError } = await supabase
        .from("journal_entries")
        .select("*")
        .or(`tags.cs.{${searchQuery}},categories.cs.{${searchQuery}}`)
        .order("created_at", { ascending: false });

      if (directError) throw directError;

      // If the query is more than 3 words and user has premium access, use AI
      const words = searchQuery.trim().split(/\s+/);
      if (words.length > 2 && hasPremiumAccess) {
        setIsAISearching(true);
        try {
          const aiResponse = await fetch("/api/generate-with-ai", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              prompt: `Find journal entries that are semantically related to: ${searchQuery}`,
            }),
          });

          const aiData = await aiResponse.json();
          setIsAISearching(false);
          return [...directMatches, ...(aiData.results || [])];
        } catch (error) {
          console.error("AI search error:", error);
          setIsAISearching(false);
          toast({
            title: "AI Search Failed",
            description: "Please try again or use regular search",
            variant: "destructive",
          });
          return directMatches;
        }
      } else if (words.length > 2 && !hasPremiumAccess) {
        toast({
          title: "Premium Feature",
          description: "AI-powered search is only available for premium users",
          variant: "default",
        });
      }

      return directMatches;
    },
    enabled: searchQuery.length > 0,
  });

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container max-w-md py-8">
        <div className="flex items-center gap-2 mb-6">
          <SearchIcon className="w-5 h-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by tags, categories, or describe what you're looking for..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1"
          />
        </div>

        <div className="space-y-4">
          {isLoading || isAISearching ? (
            <div className="text-center text-muted-foreground">
              {isAISearching ? "AI is analyzing your search..." : "Searching..."}
            </div>
          ) : searchResults?.length === 0 ? (
            <div className="text-center text-muted-foreground">
              No entries found
            </div>
          ) : (
            searchResults?.map((entry) => (
              <JournalEntry
                key={entry.id}
                title={entry.title}
                content={entry.content}
                timestamp={new Date(entry.created_at)}
                tags={entry.tags || []}
              />
            ))
          )}
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default Search;