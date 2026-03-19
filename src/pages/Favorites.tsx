import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import EmptyState from "../components/EmptyState";
import ShopCard from "../components/ShopCard";
import { SHOPS } from "../services/mock";
import { useAppStore } from "../store/useAppStore";

export default function Favorites() {
  const nav = useNavigate();
  const favoriteShopIds = useAppStore((s) => s.favoriteShopIds);
  const favSet = new Set(favoriteShopIds);
  const favShops = SHOPS.filter((s) => favSet.has(s.id));

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="mx-auto max-w-4xl px-4 py-6">
        <div className="text-2xl font-extrabold text-gray-900">Favorites</div>
        <div className="mt-1 text-gray-600">Your saved shops.</div>

        {favShops.length === 0 ? (
          <div className="mt-4">
            <EmptyState title="No favorites yet" subtitle="Click ☆ on any shop to save it here." />
          </div>
        ) : (
          <div className="mt-4 grid gap-3">
            {favShops.map((s) => (
              <ShopCard key={s.id} shop={s} onClick={() => nav(`/shop/${s.id}`)} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}