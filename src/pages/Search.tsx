import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import SearchBar from "../components/SearchBar";
import Loader from "../components/Loader";
import EmptyState from "../components/EmptyState";
import FilterChips from "../components/FilterChips";
import ShopCard from "../components/ShopCard";
import { mockGetAvailability, mockGetNearbyShops, mockSearchProducts } from "../services/mock";
import type { Availability, Product, Shop } from "../types";

export default function Search() {
  const nav = useNavigate();
  const [params] = useSearchParams();
  const query = (params.get("q") ?? "").trim();

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [selected, setSelected] = useState<Product | null>(null);

  const [shops, setShops] = useState<Shop[]>([]);
  const [avail, setAvail] = useState<Availability[]>([]);

  const [openNow, setOpenNow] = useState(false);
  const [inStockOnly, setInStockOnly] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const [shopData, matches] = await Promise.all([
        mockGetNearbyShops({ lat: 23.0225, lng: 72.5714 }),
        mockSearchProducts(query),
      ]);

      setShops(shopData);
      setProducts(matches);
      const first = matches[0] ?? null;
      setSelected(first);

      if (first) setAvail(await mockGetAvailability(first.id));
      else setAvail([]);

      setLoading(false);
    })();
  }, [query]);

  useEffect(() => {
    (async () => {
      if (!selected) return;
      setLoading(true);
      setAvail(await mockGetAvailability(selected.id));
      setLoading(false);
    })();
  }, [selected?.id]);

  const rows = useMemo(() => {
    const map = new Map(avail.map((a) => [a.shopId, a]));
    let r = shops.map((s) => ({ shop: s, a: map.get(s.id) }));

    if (openNow) r = r.filter((x) => x.shop.isOpen);
    if (inStockOnly) r = r.filter((x) => x.a?.inStock);

    return r;
  }, [shops, avail, openNow, inStockOnly]);

  const goSearch = (q: string) => nav(`/search?q=${encodeURIComponent(q.trim())}`);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="mx-auto max-w-4xl px-4 py-6">
        <div className="text-xl font-extrabold text-gray-900">
          Search results {query ? `for “${query}”` : ""}
        </div>

        <div className="mt-4">
          <SearchBar onSubmit={goSearch} defaultValue={query} />
        </div>

        <div className="mt-6 text-sm font-semibold text-gray-700">Matched products</div>

        {products.length === 0 ? (
          <div className="mt-3">
            <EmptyState title="No products found" subtitle="Try: milk, maggi, bread..." />
          </div>
        ) : (
          <div className="mt-3 flex flex-wrap gap-2">
            {products.map((p) => {
              const active = selected?.id === p.id;
              return (
                <button
                  key={p.id}
                  onClick={() => setSelected(p)}
                  className={`rounded-full px-4 py-2 text-sm font-semibold shadow ${
                    active ? "bg-black text-white" : "bg-white text-gray-900"
                  }`}
                >
                  {p.name}
                </button>
              );
            })}
          </div>
        )}

        <div className="mt-4">
          <FilterChips
            openNow={openNow}
            inStockOnly={inStockOnly}
            setOpenNow={setOpenNow}
            setInStockOnly={setInStockOnly}
          />
        </div>

        <div className="mt-6 text-sm font-semibold text-gray-700">Shops</div>

        {loading ? (
          <Loader label="Loading shops..." />
        ) : selected && rows.length === 0 ? (
          <div className="mt-3">
            <EmptyState title="No shops match your filters" subtitle="Try turning off filters." />
          </div>
        ) : (
          <div className="mt-3 grid gap-3">
            {rows.map(({ shop, a }) => {
              const right = a ? (a.inStock ? `In stock • ₹${a.price ?? "-"}` : "Out of stock") : "No data";
              return (
                <ShopCard
                  key={shop.id}
                  shop={shop}
                  subtitleRight={right}
                  onClick={() => nav(`/shop/${shop.id}`)}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}