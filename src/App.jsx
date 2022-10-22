import { lazy, Suspense } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./assets/css/App.css";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import AuthProvider from "./contexts/AuthProvider";
import "./index.css";
import NotFound from "./pages/NotFound";
import { AUTHENTICATION, FEED } from "./Routes.js";

const Authentication = lazy(() => import("./pages/Authentication"));
const Layout = lazy(() => import("./pages/Layout"));

function App() {
  return (
    <Router>
      <AuthProvider>
        <Suspense fallback={<p>Loading...</p>}>
          <Routes>
            <Route path="/*" element={<PrivateRoute />}>
              <Route path={FEED} element={<Layout />} />
            </Route>
            <Route path="/*" element={<PublicRoute />}>
              <Route path={AUTHENTICATION} element={<Authentication />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </AuthProvider>
    </Router>
  );
}

export default App;
