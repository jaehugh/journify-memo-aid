import { useEffect, useState } from "react";
import { BottomNav } from "@/components/BottomNav";
import { JournalEntry } from "@/components/JournalEntry";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/components/ui/use-toast";

interface Entry {
  id: string;
  title: string;
  content: string;
  tags: string[];
  created_at: string;
}

const Home = () => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchRecentEntries = async () => {
      try {
        const { data, error } = await supabase
          .from('journal_entries')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(5);

        if (error) throw error;
        setEntries(data || []);
      } catch (error) {
        console.error('Error fetching entries:', error);
        toast({
          title: "Error",
          description: "Failed to load recent entries",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecentEntries();
  }, [toast]);

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container max-w-md py-8">
        <h1 className="text-2xl font-bold mb-6 text-darkSlate">Dashboard</h1>
        
        {isLoading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="animate-pulse bg-card/50 h-32 rounded-lg" />
            ))}
          </div>
        ) : entries.length > 0 ? (
          <div className="space-y-4">
            {entries.map((entry) => (
              <JournalEntry
                key={entry.id}
                title={entry.title}
                content={entry.content}
                timestamp={new Date(entry.created_at)}
                tags={entry.tags || []}
              />
            ))}
          </div>
        ) : (
          <div className="text-center text-muted-foreground py-8">
            No entries yet. Start journaling!
          </div>
        )}
      </div>
      <BottomNav />
    </div>
  );
};

export default Home;