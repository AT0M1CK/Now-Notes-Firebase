import "./App.css";
import LoginLayout from "./components/Layout/LoginLayout";
import MainLayout from "./components/Layout/MainLayout";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const router = createBrowserRouter([
  { path: "/", element: <LoginLayout /> },
  { path: "/Dashboard", element: <MainLayout /> },
]);

function App() {
  return (
    // <>
    //   <div className="">
    //     {/* <LoginLayout /> */}
    //     <MainLayout />
    //   </div>
    // </>
    <RouterProvider router={router} />
  );
}

export default App;
