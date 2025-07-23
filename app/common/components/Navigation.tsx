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
    name: "Histories",
    to: "/histories",
    items: [
      {
        name: "All Recommendations",
        to: "/histories",
        description: "list of all recommendations",
      },
      {
        name: "Recommended Stocks",
        to: "/histories/stocks",
        description: "list of recommended stocks",
      },
      {
        name: "Search",
        to: "/histories/search",
        description: "search for a recommendation",
      },
    ],
  },
  {
    name: "Recommendation",
    to: "/recommendation",
    description: "recommendation for some stocks",
  },
  {
    name: "Tickets",
    to: "/tickets",
    items: [
      {
        name: "Tickets",
        to: "/tickets",
        description:
          "List of your tickets with the state whether it is used or not",
      },
      {
        name: "Buy Tickets",
        to: "/tickets/buy",
        description: "buy tickets",
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
                      <ul className="grid w-[500px] font-light gap-3 p-4 grid-cols-2">
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
                    Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to="/my/settings">
                    <SettingsIcon className="size-4 mr-2" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to="/my/support">
                    <MessageCircleQuestionIcon className="size-4 mr-2" />
                    Support
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="cursor-pointer">
                  <Link to="/auth/logout">
                    <LogOutIcon className="size-4 mr-2" />
                    Logout
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        ) : (
          <div className="flex items-center gap-4">
            <Button variant="secondary" asChild>
              <Link to="/auth/login">Login</Link>
            </Button>
            <Button asChild>
              <Link to="/auth/join">Join</Link>
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
}
