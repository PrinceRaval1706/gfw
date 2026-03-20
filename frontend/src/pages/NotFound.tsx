import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function NotFound() {
  const nav = useNavigate();
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="mx-auto max-w-4xl px-4 py-10">
        <div className="rounded-2xl bg-white p-6 shadow">
          <div className="text-xl font-extrabold">404 - Page not found</div>
          <button
            onClick={() => nav("/")}
            className="mt-4 rounded-xl bg-black px-4 py-2 text-white font-semibold"
          >
            Go Home
          </button>
        </div>
      </div>
    </div>
  );
}