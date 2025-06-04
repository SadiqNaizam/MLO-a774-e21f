import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner"; // Renamed to avoid conflict
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Homepage from "./pages/Homepage";
import SearchResultsPage from "./pages/SearchResultsPage";
import PropertyDetailPage from "./pages/PropertyDetailPage";
import UserProfilePage from "./pages/UserProfilePage";
import BecomeAHostPage from "./pages/BecomeAHostPage";
import NotFound from "./pages/NotFound"; // Assuming NotFound.tsx exists

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner /> {/* Ensure this is the shadcn/ui Sonner if used */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/search-results" element={<SearchResultsPage />} />
          {/* For a real app, property detail page would use an ID: /property/:id 
              But for this generation, we'll use a generic path as ID handling is not specified.
          */}
          <Route path="/property-detail-page" element={<PropertyDetailPage />} />
          <Route path="/user-profile" element={<UserProfilePage />} />
          <Route path="/become-a-host" element={<BecomeAHostPage />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} /> {/* Always Include This Line As It Is. */}
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;