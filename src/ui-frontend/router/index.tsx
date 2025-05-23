import { Routes, Route } from "react-router-dom";
import { HomeTest } from "@/ui-frontend/pages/hometest";
import { Home } from "@/ui-frontend/pages/home";
import { Article } from "@/ui-frontend/pages/article";

export const RouterFrontend = () => {
  return (
    <Routes>
      <Route path="/test" element={<HomeTest />} />
      <Route path="/" element={<Home />} />
      <Route path="/article/:id" element={<Article />} />
    </Routes>
  );
};
