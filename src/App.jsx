import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage"; 
import Questions from "./pages/Questions"; 
import Result from "./pages/Result"; 

const App = () => {
  const appRouter = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/questions",
      element: <Questions />,
    },
    {
      path: "/result",
      element: <Result />,
    },
  ]);
  return (
    <div>
      <RouterProvider router={appRouter} />
    </div>
  );
};

export default App;
