import { Outlet } from "react-router";
import * as React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  type CarouselApi,
} from "~/common/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent } from "~/common/components/ui/card";

export default function AuthLayout() {
  const images = [
    "/images/what2buy_홈페이지-로그인가입자용.png",
    "/images/what2buy_주식추천요청페이지.png",
    "/images/what2buy_추천기록목록페이지.png",
    "/images/what2buy_추천내역상세페이지.png",
    "/images/what2buy_주식상세페이지.png",
    "/images/what2buy_보유추천권목록페이지.png",
  ];
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const [count, setCount] = React.useState(0);

  React.useEffect(() => {
    if (!api) {
      return;
    }
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 h-screen">
      <div className="hidden md:flex flex-col items-center justify-center h-full">
        <Carousel
          setApi={setApi}
          plugins={[
            Autoplay({
              delay: 4000,
              stopOnMouseEnter: true,
            }),
          ]}
          className="block"
        >
          <CarouselContent className="h-full">
            {images.map((src, idx) => (
              <CarouselItem key={idx}>
                <Card className="border-none">
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <img
                      src={src}
                      alt={`slide-${idx}`}
                      className="object-cover w-full border-2 border-grey-800"
                    />
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <div className="text-muted-foreground py-2 text-center text-sm">
          Slide {current} of {count}
        </div>
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
}
