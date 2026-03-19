import type { Shop } from "../types";
import { useAppStore } from "../store/useAppStore";

export default function ShopCard({
  shop,
  subtitleRight,
  onClick,
}: {
  shop: Shop;
  subtitleRight?: string;
  onClick: () => void;
}) {
  const favoriteShopIds = useAppStore((s) => s.favoriteShopIds);
  const toggleFavoriteShop = useAppStore((s) => s.toggleFavoriteShop);
  const fav = favoriteShopIds.includes(shop.id);

  return (
    <div className="card-solid p-5">
      <div className="flex items-start justify-between gap-4">
        <button onClick={onClick} className="flex-1 text-left">
          <div className="flex flex-wrap items-center gap-2">
            <div className="text-lg font-extrabold tracking-tight text-slate-900">
              {shop.name}
            </div>

            <span
              className={`rounded-full px-2.5 py-1 text-xs font-bold ${
                shop.isOpen
                  ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                  : "bg-rose-50 text-rose-700 ring-1 ring-rose-200"
              }`}
            >
              {shop.isOpen ? "OPEN" : "CLOSED"}
            </span>

            {typeof shop.rating === "number" && (
              <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-700">
                ⭐ {shop.rating.toFixed(1)}
              </span>
            )}
          </div>

          <div className="mt-2 text-sm text-slate-600">{shop.address}</div>

          {subtitleRight && (
            <div className="mt-3 flex items-center gap-2">
              <span className="rounded-xl bg-slate-50 px-3 py-2 text-sm font-semibold text-slate-900 ring-1 ring-slate-200">
                {subtitleRight}
              </span>
              <span className="text-xs text-slate-500">updated recently</span>
            </div>
          )}
        </button>

        <button
          onClick={() => toggleFavoriteShop(shop.id)}
          className={`h-10 w-10 rounded-2xl text-lg font-black transition active:scale-[0.98] ${
            fav ? "bg-amber-200 text-amber-900" : "bg-slate-100 text-slate-700 hover:bg-slate-200"
          }`}
          title={fav ? "Remove favorite" : "Add favorite"}
          aria-label="Favorite"
        >
          {fav ? "★" : "☆"}
        </button>
      </div>
    </div>
  );
}