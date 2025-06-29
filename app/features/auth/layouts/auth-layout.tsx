import { Outlet } from "react-router";
import { FlickeringGrid } from "~/common/components/magicui/flickering-grid";

export default function AuthLayout() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 h-screen">
      <div>
        <FlickeringGrid
          squareSize={10}
          gridGap={10}
          color="#E92251"
          maxOpacity={0.5}
          flickerChance={0.2}
        />
      </div>
      <Outlet />
    </div>
  );
}
