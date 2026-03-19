import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";

function Tab({ to, label }: { to: string; label: string }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `rounded-2xl px-4 py-2 text-sm font-semibold transition ${
          isActive
            ? "bg-slate-900 text-white shadow-sm"
            : "text-slate-700 hover:bg-slate-100"
        }`
      }
    >
      {label}
    </NavLink>
  );
}

export default function Navbar() {
  const nav = useNavigate();
  const loc = useLocation();
  const showBack = loc.pathname.startsWith("/shop");
  const { user, logout, hydrate } = useAuthStore();
  useEffect(() => hydrate(), [hydrate]);

  return (
    <div className="sticky top-0 z-20 border-b border-slate-200/70 bg-white/70 backdrop-blur">
      <div className="container-app flex items-center justify-between py-3">
        <div className="flex items-center gap-3">
          {showBack && (
            <button
              onClick={() => nav(-1)}
              className="btn btn-soft !rounded-2xl !px-3"
              aria-label="Back"
              title="Back"
            >
              ←
            </button>
          )}

          <button onClick={() => nav("/")} className="group flex items-center gap-2">
            <div className="h-9 w-9 rounded-2xl bg-gradient-to-br from-indigo-500 via-fuchsia-500 to-amber-400 shadow-sm" />
            <div className="leading-tight text-left">
              <div className="text-sm font-extrabold tracking-tight">Grocery Finder</div>
              <div className="text-xs text-slate-500">Find stock • Save time</div>
            </div>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <Tab to="/" label="Home" />
          <Tab to="/favorites" label="Favorites" />
          <Tab to="/profile" label="Profile" />
        </div>
      </div>
    </div>
  );
}