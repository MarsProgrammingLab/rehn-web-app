import { Routes, Route } from "react-router";
import Home from "./pages/Home";
import Contact from "./pages/Contact";
import About from "./pages/About";
import Shows from "./pages/Shows";
import NotFound from "./pages/NotFound";
import Layout from "./components/Layout";

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="contact" element={<Contact />} />
        <Route path="shows" element={<Shows />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
