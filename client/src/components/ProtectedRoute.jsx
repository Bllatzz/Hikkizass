import { Navigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

function ProtectedRoute({ children, requiredRole }) {
  const [isAuthorized, setIsAuthorized] = useState(null);

  useEffect(() => {
    const verifyUserRole = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/users/profile", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.data.role === requiredRole) {
          setIsAuthorized(true);
        } else {
          setIsAuthorized(false);
        }
      } catch (error) {
        setIsAuthorized(false);
      }
    };

    verifyUserRole();
  }, [requiredRole]);

  if (isAuthorized === null) {
    return <div>Carregando...</div>; 
  }

  return isAuthorized ? children : <Navigate to="/not-found" />;
}

export default ProtectedRoute;
