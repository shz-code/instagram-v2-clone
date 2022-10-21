import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./assets/css/App.css";
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
            <Route path={FEED} element={<Layout />} />
            <Route path={AUTHENTICATION} element={<Authentication />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </AuthProvider>
    </Router>
  );
}

export default App;
