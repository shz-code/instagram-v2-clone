import { lazy, Suspense } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./assets/css/App.css";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import AuthProvider from "./contexts/AuthProvider";
import "./index.css";
import NotFound from "./pages/NotFound";
import { AUTHENTICATION, HOME, PROFILE } from "./Routes.js";

const Authentication = lazy(() => import("./pages/Authentication"));
const Home = lazy(() => import("./pages/Home"));
const Profile = lazy(() => import("./pages/Profile"));

function App() {
  return (
    <Router>
      <AuthProvider>
        <Suspense fallback={<p>Loading...</p>}>
          <Routes>
            <Route path="/*" element={<PrivateRoute />}>
              <Route path={HOME} element={<Home />} />
              <Route path={PROFILE} element={<Profile />} />
              <Route path="*" element={<NotFound />} />
            </Route>
            <Route path="/*" element={<PublicRoute />}>
              <Route path={AUTHENTICATION} element={<Authentication />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </AuthProvider>
    </Router>
  );
}

export default App;
