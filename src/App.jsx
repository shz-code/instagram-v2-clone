import { lazy, Suspense } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./assets/css/App.css";
import AuthProvider from "./contexts/AuthProvider";
import "./index.css";

const Login = lazy(() => import("./pages/Login"));
const Feed = lazy(() => import("./pages/Feed"));

function App() {
  return (
    <Router>
      <AuthProvider>
        <Suspense fallback={<p>Loading...</p>}>
          <Routes>
            <Route path="/" element={<Feed />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </Suspense>
      </AuthProvider>
    </Router>
  );
}

export default App;
