import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { userContext } from "../../Context/User.context";

export default function GuestProdectedRoute({ children }) {
  const { token } = useContext(userContext);
  if (!token) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
}
