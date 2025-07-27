import { Link } from "react-router";
import { Separator } from "./ui/separator";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import {
  BellIcon,
  LogOutIcon,
  MessageCircleIcon,
  MessageCircleQuestionIcon,
  SettingsIcon,
  UserIcon,
} from "lucide-react";
import { cn } from "~/lib/utils";

const menus = [
  {
    name: "추천 기록",
    to: "/histories",
    items: [
      {
        name: "전체 추천 기록",
        to: "/histories",
        description: "지금까지의 추천 기록을 확인해보세요",
      },
      {
        name: "추천 주식 리스트",
        to: "/histories/stocks",
        description: "지금까지 추천된 주식을 살펴보세요",
      },
      {
        name: "추천 기록 검색",
        to: "/histories/search",
        description: "키워드로 추천 기록을 검색해보세요",
      },
    ],
  },
  {
    name: "주식 추천 받기",
    to: "/recommendation",
    description: "추천권을 선택해서 추천을 받아보세요",
  },
  {
    name: "추천권",
    to: "/tickets",
    items: [
      {
        name: "보유 추천권 목록",
        to: "/tickets",
        description: "보유 추천권 목록을 확인해보세요",
      },
      {
        name: "추천권 구매",
        to: "/tickets/buy",
        description: "추천권을 구매해서 주식 추천을 받아보세요",
      },
    ],
  },
];

export default function Navigation({
  isLoggedIn,
  hasNotifications,
  hasMessages,
  username,
  name,
  avatar,
}: {
  isLoggedIn: boolean;
  hasNotifications: boolean;
  hasMessages: boolean;
  username: string;
  name: string;
  avatar: string | null;
}) {
  return (
    <nav className="flex px-10 sm:px-20 h-16 items-center justify-between backdrop-blur fixed top-0 left-0 right-0 z-50 bg-background/50">
      <div className="flex items-center">
        <Link to="/" className="font-bold tracking-tight text-lg  ">
          what2buy
        </Link>
        <div className="hidden sm:block">
          <Separator orientation="vertical" className="h-6 mx-4" />
        </div>
        <span className="block sm:hidden">&nbsp;&nbsp;&nbsp;</span>
        <NavigationMenu>
          <NavigationMenuList>
            {menus.map((menu) => (
              <NavigationMenuItem key={menu.name}>
                {menu.items ? (
                  <>
                    <NavigationMenuTrigger>{menu.name}</NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[500px] font-light gap-3 p-4 grid-cols-1 sm:grid-cols-2">
                        {menu.items?.map((item) => (
                          <NavigationMenuItem key={item.name}>
                            <NavigationMenuLink asChild>
                              <Link
                                className="p-3 space-y-1 block leading-none no-underline outline-none"
                                to={item.to}
                              >
                                <span className="text-sm font-medium leading-none">
                                  {item.name}
                                </span>
                                <p className="text-sm text-muted-foreground">
                                  {item.description}
                                </p>
                              </Link>
                            </NavigationMenuLink>
                          </NavigationMenuItem>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </>
                ) : (
                  <Link className={navigationMenuTriggerStyle()} to={menu.to}>
                    {menu.name}
                  </Link>
                )}
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <div className="flex items-center gap-2">
        {isLoggedIn ? (
          <div className="flex items-center gap-2">
            <Button size="icon" variant="ghost" asChild className="relative">
              <Link to="/my/notifications">
                <BellIcon className="size-4" />
                {hasNotifications && (
                  <span className="absolute top-1.5 right-1.5 size-2 bg-red-500 rounded-full" />
                )}
              </Link>
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar>
                  {avatar ? (
                    <AvatarImage src={avatar} />
                  ) : (
                    <AvatarFallback className="text-2xl">
                      {username[0]}
                    </AvatarFallback>
                  )}
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel className="flex flex-col space-y-1">
                  <span className="font-medium">{name}</span>
                  <span className="text-xs text-muted-foreground">
                    @{username}
                  </span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to="/my/profile">
                    <UserIcon className="size-4 mr-2" />
                    프로필 보기
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to="/my/settings">
                    <SettingsIcon className="size-4 mr-2" />
                    프로필 변경
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to="/my/support">
                    <MessageCircleQuestionIcon className="size-4 mr-2" />
                    FAQ
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to="/auth/logout">
                    <LogOutIcon className="size-4 mr-2" />
                    로그아웃
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Button variant="secondary" asChild>
              <Link to="/auth/login">로그인</Link>
            </Button>
            <Button asChild>
              <Link to="/auth/join">가입하기</Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
