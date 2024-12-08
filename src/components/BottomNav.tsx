import { Home, LineChart, Plus, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export const BottomNav = () => {
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card/80 backdrop-blur-lg border-t p-2 animate-fade-in">
      <div className="max-w-md mx-auto flex justify-around items-center">
        <Link
          to="/home"
          className={`p-2 rounded-lg transition-colors ${
            isActive("/home") ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <Home className="w-6 h-6" />
        </Link>
        <Link
          to="/insights"
          className={`p-2 rounded-lg transition-colors ${
            isActive("/insights") ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <LineChart className="w-6 h-6" />
        </Link>
        <Link
          to="/new"
          className="p-2 bg-primary text-primary-foreground rounded-full shadow-lg hover:bg-primary/90 transition-colors"
        >
          <Plus className="w-6 h-6" />
        </Link>
        <Link
          to="/profile"
          className={`p-2 rounded-lg transition-colors ${
            isActive("/profile") ? "text-primary" : "text-muted-foreground"
          }`}
        >
          <User className="w-6 h-6" />
        </Link>
      </div>
    </nav>
  );
};