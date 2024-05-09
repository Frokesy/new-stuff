import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Auth from "./components/defaults/Auth";
import Dashboard from "./pages/dashboard";
import { AnimatePresence } from "framer-motion";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Auth /> },
    { path: "/dashboard", element: <Dashboard /> },
  ]);

  return (
    <AnimatePresence mode="wait">
      <RouterProvider router={router} />
    </AnimatePresence>
  );
}

export default App;
