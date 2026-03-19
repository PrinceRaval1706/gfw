import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { loginUser, registerUser } from "../services/auth";
import { useAuthStore } from "../store/useAuthStore";

export default function Auth() {
  const nav = useNavigate();
  const { user, hydrate, setUser } = useAuthStore();

  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => hydrate(), [hydrate]);
  useEffect(() => {
    if (user) nav("/");
  }, [user, nav]);

  const submit = async () => {
    setErr(null);
    setLoading(true);
    try {
      if (mode === "register") {
        if (!name.trim()) throw new Error("Enter your name.");
        const session = await registerUser({ name: name.trim(), identifier: identifier.trim(), password });
        setUser(session);
      } else {
        const session = await loginUser({ identifier: identifier.trim(), password });
        setUser(session);
      }
      nav("/");
    } catch (e: any) {
      setErr(e?.message ?? "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />
      <div className="container-app py-10">
        <div className="mx-auto max-w-lg">
          <div className="card-solid p-6 sm:p-8">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-extrabold">Welcome</div>
                <div className="mt-1 text-slate-600">
                  Login or create an account to save favorites.
                </div>
              </div>
              <div className="rounded-2xl bg-gradient-to-br from-indigo-500 via-fuchsia-500 to-amber-400 h-12 w-12" />
            </div>

            <div className="mt-6 grid grid-cols-2 gap-2 rounded-2xl bg-slate-100 p-1">
              <button
                className={`btn ${mode === "login" ? "btn-primary" : "btn-soft"} w-full`}
                onClick={() => setMode("login")}
              >
                Login
              </button>
              <button
                className={`btn ${mode === "register" ? "btn-primary" : "btn-soft"} w-full`}
                onClick={() => setMode("register")}
              >
                Register
              </button>
            </div>

            {mode === "register" && (
              <div className="mt-4">
                <label className="text-sm font-semibold text-slate-700">Name</label>
                <input
                  className="input mt-2"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Your name"
                />
              </div>
            )}

            <div className="mt-4">
              <label className="text-sm font-semibold text-slate-700">Email or Phone</label>
              <input
                className="input mt-2"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="example@gmail.com or 9999999999"
              />
              <div className="mt-2 text-xs text-slate-500">
                Use email or phone — both supported.
              </div>
            </div>

            <div className="mt-4">
              <label className="text-sm font-semibold text-slate-700">Password</label>
              <input
                className="input mt-2"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />
            </div>

            {err && (
              <div className="mt-4 rounded-2xl bg-rose-50 p-3 text-sm font-semibold text-rose-700 ring-1 ring-rose-200">
                {err}
              </div>
            )}

            <button
              onClick={submit}
              disabled={loading}
              className={`btn btn-primary mt-5 w-full ${loading ? "opacity-70" : ""}`}
            >
              {loading ? "Please wait..." : mode === "login" ? "Login" : "Create account"}
            </button>

            <div className="mt-5 text-center text-xs text-slate-500">
              Backend will replace this localStorage demo later.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}