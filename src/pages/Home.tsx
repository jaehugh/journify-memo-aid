import { BottomNav } from "@/components/BottomNav";

const Home = () => {
  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="container max-w-md py-8">
        <h1 className="text-2xl font-bold mb-6 text-foreground">Dashboard</h1>
        <div className="space-y-4">
          {/* Placeholder for insights */}
          <div className="bg-card p-4 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-2">This Week's Mood</h2>
            <p className="text-muted-foreground">Coming soon...</p>
          </div>
        </div>
      </div>
      <BottomNav />
    </div>
  );
};

export default Home;