import { createBrowserRouter, RouteObject } from "react-router";

import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/index";
import AnimeDetail from "../pages/AnimeDetail";
import NotFoundPage from "../pages/NotFoundPage";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: "detail/:id", element: <AnimeDetail /> },
      { path: "*", element: <NotFoundPage /> },
    ],
  },
];

export const appRouter = createBrowserRouter(routes);
