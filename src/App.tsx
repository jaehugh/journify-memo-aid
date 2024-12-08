import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import Index from "./pages/Index";
import Home from "./pages/Home";
import Insights from "./pages/Insights";
import Search from "./pages/Search";
import Profile from "./pages/Profile";

const queryClient = new QueryClient();

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        console.log("Initial session check:", !!session);
        setIsAuthenticated(!!session);
      } catch (error) {
        console.error("Error checking auth:", error);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      console.log("Auth state changed:", _event, !!session);
      setIsAuthenticated(!!session);
    });

    checkAuth();
    return () => subscription.unsubscribe();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-pulse text-foreground">Loading...</div>
      </div>
    );
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route 
              path="/" 
              element={
                isAuthenticated ? (
                  <Navigate to="/home" replace />
                ) : (
                  <Index />
                )
              } 
            />
            <Route 
              path="/home" 
              element={
                !isAuthenticated ? (
                  <Navigate to="/" replace />
                ) : (
                  <Home />
                )
              } 
            />
            <Route 
              path="/insights" 
              element={
                !isAuthenticated ? (
                  <Navigate to="/" replace />
                ) : (
                  <Insights />
                )
              } 
            />
            <Route 
              path="/search" 
              element={
                !isAuthenticated ? (
                  <Navigate to="/" replace />
                ) : (
                  <Search />
                )
              } 
            />
            <Route 
              path="/new" 
              element={
                !isAuthenticated ? (
                  <Navigate to="/" replace />
                ) : (
                  <Home />
                )
              } 
            />
            <Route 
              path="/profile" 
              element={
                !isAuthenticated ? (
                  <Navigate to="/" replace />
                ) : (
                  <Profile />
                )
              } 
            />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;