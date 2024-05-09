import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Auth from "./components/defaults/Auth";
import Dashboard from "./pages/dashboard";
import { AnimatePresence } from "framer-motion";
import ProductsCatalogue from "./pages/products";
import Users from "./pages/users";
import Settings from "./pages/settings";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Auth /> },
    { path: "/dashboard", element: <Dashboard /> },
    { path: "/products-catalogue", element: <ProductsCatalogue /> },
    { path: "/users", element: <Users /> },
    { path: "/settings", element: <Settings /> },
  ]);

  return (
    <AnimatePresence mode="wait">
      <RouterProvider router={router} />
    </AnimatePresence>
  );
}

export default App;
