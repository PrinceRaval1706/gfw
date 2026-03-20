import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import ShopCard from "../components/ShopCard";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import { mockGetNearbyShops } from "../services/mock";
import type { Shop } from "../types";

const QUICK = ["Milk", "Maggi", "Bread", "Eggs", "Cold Drink"];

export default function Home() {
  const nav = useNavigate();
  const [loading, setLoading] = useState(true);
  const [shops, setShops] = useState<Shop[]>([]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const data = await mockGetNearbyShops({ lat: 23.0225, lng: 72.5714 });
      setShops(data);
      setLoading(false);
    })();
  }, []);

  const onSearch = (q: string) => nav(`/search?q=${encodeURIComponent(q.trim())}`);

  return (
    <div className="min-h-screen bg-slate-50">
      <Navbar />

      {/* Hero */}
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-24 left-1/2 h-72 w-[44rem] -translate-x-1/2 rounded-full bg-gradient-to-r from-indigo-500/20 via-fuchsia-500/15 to-amber-400/20 blur-3xl" />
          <div className="absolute -bottom-32 right-0 h-72 w-72 rounded-full bg-emerald-400/15 blur-3xl" />
        </div>

        <div className="container-app relative py-8 sm:py-10">
          <div className="grid gap-6 md:grid-cols-[1.2fr,0.8fr] md:items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-xs font-bold text-slate-700 ring-1 ring-black/5">
                ⚡ Faster shopping • No more guessing
              </div>

              <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl">
                Find which shop has your item <span className="text-slate-500">right now</span>
              </h1>

              <p className="mt-3 text-slate-600">
                Search a product, filter open shops, and go directly where it’s available.
              </p>

              <div className="mt-5">
                <SearchBar onSubmit={onSearch} />
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {QUICK.map((x) => (
                  <button
                    key={x}
                    onClick={() => onSearch(x)}
                    className="chip chip-off bg-white shadow-sm ring-1 ring-black/5"
                  >
                    {x}
                  </button>
                ))}
              </div>
            </div>

            <div className="card p-6">
              <div className="text-sm font-bold text-slate-900">How it works</div>
              <ol className="mt-3 space-y-2 text-sm text-slate-600">
                <li>1) Search “milk” / “maggi”</li>
                <li>2) See shops with stock & open status</li>
                <li>3) Tap shop → directions / call / WhatsApp</li>
              </ol>
              <div className="mt-4 rounded-2xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white">
                Built for local kirana stores
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Nearby shops */}
      <div className="container-app pb-10">
        <div className="mt-2 flex items-end justify-between">
          <div>
            <div className="text-lg font-extrabold text-slate-900">Nearby shops</div>
            <div className="text-sm text-slate-600">A quick view (mock data right now).</div>
          </div>
        </div>

        {loading ? (
          <Loader label="Loading nearby shops..." />
        ) : shops.length === 0 ? (
          <div className="mt-4">
            <EmptyState title="No shops found" subtitle="Try searching for an item instead." />
          </div>
        ) : (
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {shops.map((s) => (
              <ShopCard key={s.id} shop={s} onClick={() => nav(`/shop/${s.id}`)} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}