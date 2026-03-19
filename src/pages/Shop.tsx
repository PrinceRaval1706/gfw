import { useParams, useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { SHOPS } from "../services/mock";
import { callNumber, openDirections, openWhatsApp } from "../utils/linking";

export default function Shop() {
  const nav = useNavigate();
  const { shopId } = useParams();
  const shop = SHOPS.find((s) => s.id === shopId);

  if (!shop) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <div className="mx-auto max-w-4xl px-4 py-10">
          <div className="rounded-2xl bg-white p-6 shadow">
            <div className="text-lg font-bold">Shop not found</div>
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="mx-auto max-w-4xl px-4 py-6">
        <div className="rounded-2xl bg-white p-6 shadow">
          <div className="text-2xl font-extrabold text-gray-900">{shop.name}</div>
          <div className="mt-2 text-gray-600">{shop.address}</div>

          <div className="mt-3 flex flex-wrap items-center gap-2 text-sm">
            <span className={`font-semibold ${shop.isOpen ? "text-green-600" : "text-red-600"}`}>
              {shop.isOpen ? "Open" : "Closed"}
            </span>
            {typeof shop.rating === "number" && (
              <span className="text-gray-700">• ⭐ {shop.rating.toFixed(1)}</span>
            )}
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-3">
            <button
              onClick={() => openDirections(shop.location.lat, shop.location.lng)}
              className="rounded-xl bg-black px-4 py-3 font-semibold text-white"
            >
              Get Directions
            </button>

            {shop.phone ? (
              <button
                onClick={() => callNumber(shop.phone!)}
                className="rounded-xl bg-gray-200 px-4 py-3 font-semibold text-gray-900"
              >
                Call
              </button>
            ) : (
              <div className="rounded-xl bg-gray-100 px-4 py-3 text-center text-gray-500">No phone</div>
            )}

            {shop.whatsapp ? (
              <button
                onClick={() => openWhatsApp(shop.whatsapp!, "Hello, is this item available today?")}
                className="rounded-xl bg-green-600 px-4 py-3 font-semibold text-white"
              >
                WhatsApp
              </button>
            ) : (
              <div className="rounded-xl bg-gray-100 px-4 py-3 text-center text-gray-500">No WhatsApp</div>
            )}
          </div>
        </div>

        <div className="mt-4 rounded-2xl bg-white p-6 shadow">
          <div className="text-lg font-bold text-gray-900">Next upgrade</div>
          <div className="mt-2 text-gray-600">
            Add “Confirm stock” and “Report stock” with timestamps when backend is ready.
          </div>
        </div>
      </div>
    </div>
  );
}