import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";
import ProductDetails from "./pages/ProductDetailsPage";
import Login from "./pages/Login";
import ProtectedRoute from "./components/ProtectedRoute"; 
import SearchResults from "./pages/SearchResults";
import Profile from "./pages/Profile";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminDashboard />
            </ProtectedRoute>
          }
        />
        <Route path="not-found" element={<NotFound />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/:slug" element={<ProductDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/search" element={<SearchResults />} />

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
