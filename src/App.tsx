import React, { FC } from "react";
import { HomePage } from "./pages/Home";
import SingleCatPage from "./pages/SingleCatPage";
import { Routes, Route } from "react-router-dom";
import { Layout } from "./Layout";
import "bootstrap/dist/css/bootstrap.min.css";

export const App: FC = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/cat/:id" element={<SingleCatPage />} />
      </Route>
    </Routes>
  );
};
