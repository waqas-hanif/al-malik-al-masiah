import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Quote from "./pages/Quote";

import AdminLogin from "./pages/Admin/AdminLogin";
import Dashboard from "./pages/Admin/Dashboard";
import ProtectedRoute from "./pages/Admin/ProtectedRoute";
import Quotes from "./pages/Admin/Quotes";
import Messages from "./pages/Admin/Messages";
import Settings from "./pages/Admin/Settings";

function App() {
  return (
    <Routes>
      {/* =========================
          PUBLIC PAGES
      ========================== */}

      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/services"
        element={<Services />}
      />

      <Route
        path="/projects"
        element={<Projects />}
      />

      <Route
        path="/contact"
        element={<Contact />}
      />

      <Route
        path="/quote"
        element={<Quote />}
      />

      {/* =========================
          ADMIN LOGIN
      ========================== */}

      <Route
        path="/admin/login"
        element={<AdminLogin />}
      />

      {/* =========================
          PROTECTED ADMIN AREA
      ========================== */}

      <Route element={<ProtectedRoute />}>
        <Route
          path="/admin"
          element={<Dashboard />}
        />

        <Route
          path="/admin/quotes"
          element={<Quotes />}
        />

        <Route
          path="/admin/messages"
          element={<Messages />}
        />

        <Route
          path="/admin/settings"
          element={<Settings />}
        />
      </Route>

      {/* =========================
          FALLBACK
      ========================== */}

      <Route
        path="*"
        element={
          <Navigate
            to="/"
            replace
          />
        }
      />
    </Routes>
  );
}

export default App;