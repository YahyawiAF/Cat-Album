import React, { FC } from "react";
// import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { HomePage } from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import { Layout } from "./Layout";
// import { SingleCatPage } from "./pages/SingleCatPage";

export const App: FC = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<HomePage />} />
      </Route>
    </Routes>
  );
};
