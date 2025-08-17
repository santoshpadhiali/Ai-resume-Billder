import { Button } from "@/components/ui/button"
import { useUser } from "@clerk/clerk-react"
import { Navigate, Outlet } from "react-router-dom"
import Header from "./components/componete/Header.jsx";

function App() {
  const { user, isLoaded, isSignedIn } = useUser();

  if (!isSignedIn && isLoaded) {
    return <Navigate to="/auth/sign-in" replace />;
  }

  return (
    <div>
      <Header />
      <Outlet />
    </div>
  );
}

export default App;