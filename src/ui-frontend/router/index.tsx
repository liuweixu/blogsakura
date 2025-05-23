import { Routes, Route } from "react-router-dom";
import { HomeTest } from "@/ui-frontend/pages/hometest";
import { Home } from "@/ui-frontend/pages/home";
import { Article } from "@/ui-frontend/pages/article";
import { Header } from "@/ui-frontend/pages/header";
import { Error } from "@/components/error";

export const RouterFrontend = () => {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/test" element={<HomeTest />} />
        <Route path="/" element={<Home />} />
        <Route path="/article/:id" element={<Article />} />
        <Route path="*" element={<Error />} />
      </Routes>
    </>
  );
};
