import Navbar from "../components/Navbar";

export default function Profile() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="mx-auto max-w-4xl px-4 py-6">
        <div className="text-2xl font-extrabold text-gray-900">Profile</div>
        <div className="mt-1 text-gray-600">Frontend-only settings page.</div>

        <div className="mt-4 rounded-2xl bg-white p-6 shadow">
          <div className="text-lg font-bold text-gray-900">Add later</div>
          <div className="mt-2 text-gray-600">
            Login, address, notification preferences, and shop-owner panel.
          </div>
        </div>
      </div>
    </div>
  );
}