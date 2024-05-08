import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Auth from "./components/defaults/Auth";
import Home from "./pages/Home";
import { AnimatePresence } from "framer-motion";

function App() {
  const router = createBrowserRouter([
    { path: "/", element: <Auth /> },
    { path: "/home", element: <Home /> },
  ]);

  return (
    <AnimatePresence mode="wait">
      <RouterProvider router={router} />
    </AnimatePresence>
  );
}

export default App;
