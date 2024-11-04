"use client";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuList,
} from "@components/ui/navigation-menu";
import { Input } from "@components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@components/ui/dropdown-menu";
import { Search } from "lucide-react";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@components/ui/button";

const routes: { href: string; title: string }[] = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Sports",
    href: "/sports",
  },
  {
    title: "News",
    href: "/news",
  },
];

const Navbar = () => {
  const pathname = usePathname();

  return (
    <div className="border-b p-4 mb-10 flex flex-wrap max-w-full">
      <NavigationMenu className="">
        <NavigationMenuList className="space-x-5">
          <Link href={"/"} className="text-2xl font-bold mr-5">
            BlogApp
          </Link>
          {routes.map((route) => (
            <NavigationMenuItem
              key={route.title}
              className={`${route.href == pathname && "font-bold"}`}
            >
              <Link href={`${route.href}`}>{route.title}</Link>
            </NavigationMenuItem>
          ))}
        </NavigationMenuList>
      </NavigationMenu>

      <div className="flex ml-auto space-x-4">
        <div className="relative ">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="text" placeholder="search blogs" className="pl-8 " />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant={"ghost"} size={"icon"}>
              <Avatar>
                <AvatarImage
                  src="https://github.com/shadcn.png"
                  alt="@shadcn"
                />
                <AvatarFallback>Avatar</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="center">
            <DropdownMenuLabel>My account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={"/dashboard"}>Dashboard</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={"/dashboard/blogs"}>My Blogs</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href={"/dashboard/profile"}>Profile</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href={"/signout"}>Signout</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Navbar;
