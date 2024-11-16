import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Header from './components/Header';
import Footer from './components/Footer';
import AdminDashboard from './pages/AdminDashboard';
import NotFound from './pages/NotFound';
import ProductDetails from "./pages/ProductDetailsPage";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route  path="*" element={<NotFound />}  />
        <Route path="/:slug" element={<ProductDetails />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
