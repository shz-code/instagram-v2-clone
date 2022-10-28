import { lazy, Suspense, useState } from "react";
import "react-loading-skeleton/dist/skeleton.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./assets/css/App.css";
import Nav from "./components/Nav";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import AuthProvider from "./contexts/AuthProvider";
import "./index.css";
import NotFound from "./pages/NotFound";
import { AUTHENTICATION, HOME, PROFILE, UPLOAD } from "./Routes.js";

const Authentication = lazy(() => import("./pages/Authentication"));
const Home = lazy(() => import("./pages/Home"));
const Profile = lazy(() => import("./pages/Profile"));
const Upload = lazy(() => import("./pages/Upload"));

function App() {
  const [currentPage, setCurrentPage] = useState("auth");
  return (
    <Router>
      <AuthProvider>
        {currentPage !== "auth" && <Nav currentPage={currentPage} />}
        <Suspense fallback={<p>Loading...</p>}>
          <Routes>
            <Route path="/*" element={<PrivateRoute />}>
              <Route
                path={HOME}
                element={<Home setCurrentPage={setCurrentPage} />}
              />
              <Route
                path={PROFILE}
                element={<Profile setCurrentPage={setCurrentPage} />}
              />
              <Route
                path={UPLOAD}
                element={<Upload setCurrentPage={setCurrentPage} />}
              />
              <Route path="*" element={<NotFound />} />
            </Route>
            <Route path="/*" element={<PublicRoute />}>
              <Route
                path={AUTHENTICATION}
                element={<Authentication setCurrentPage={setCurrentPage} />}
              />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </Suspense>
      </AuthProvider>
    </Router>
  );
}

export default App;
