import { FlickeringGrid } from "~/common/components/magicui/flickering-grid";
import { cn } from "~/lib/utils";

interface HeroProps {
  title: string;
  subtitle?: string;
  className?: string;
}
//rounded-md bg-gradient-to-t from-background to-primary/10
export function Hero({ title, subtitle, className }: HeroProps) {
  return (
    <div>
      <div className=" w-full h-auto ">
        <FlickeringGrid
          squareSize={10}
          gridGap={10}
          color="#E92251"
          maxOpacity={0.5}
          flickerChance={0.2}
          height={100}
        />
      </div>
      <div className="flex flex-col py-5 justify-center items-center ">
        <h1 className="text-5xl font-bold py-2 ">{title}</h1>
        {subtitle && (
          <p className="text-2xl font-light text-foreground">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
