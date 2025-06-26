import { Outlet } from "react-router";

export default function AuthLayout() {
  return (
    <div className="grid grid-cols-2 h-screen">
      <div className="bg-gradient-to-br from-green-600 to-yellow-700 flex items-center justify-center">
        <img
          src="/images/tech_daily.jpg"
          alt="What2Buy"
          className="max-w-full max-h-full object-cover"
        />
      </div>
      <Outlet />
    </div>
  );
}
