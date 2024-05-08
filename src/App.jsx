import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import useUserStore from "./store/useUserStore";
import { lazy, Suspense } from "react";

const Home = lazy(() => import("./pages/Home"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));

export default function App() {
  const { currentUser } = useUserStore();
  const router = createBrowserRouter([
    {
      path: "/",
      element: !currentUser ? (
        <Navigate to={"/login"} />
      ) : (
        <Suspense
          fallback={
            <div className="flex h-screen w-screen items-center justify-center">
              <span className="loading loading-bars loading-lg"></span>
            </div>
          }
        >
          <Home />
        </Suspense>
      ),
    },
    {
      path: "/login",
      element: (
        <Suspense
          fallback={
            <div className="flex h-screen w-screen items-center justify-center">
              <span className="loading loading-bars loading-lg"></span>
            </div>
          }
        >
          <Login />
        </Suspense>
      ),
    },
    {
      path: "/register",
      element: (
        <Suspense
          fallback={
            <div className="flex h-screen w-screen items-center justify-center">
              <span className="loading loading-bars loading-lg"></span>
            </div>
          }
        >
          <Register />
        </Suspense>
      ),
    },
  ]);
  return <RouterProvider router={router} />;
}
