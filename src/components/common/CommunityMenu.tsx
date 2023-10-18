"use client"

import React from "react";
import UserAvatar from "./UserAvatar";
import { Button } from "../ui/button";
import Link from "next/link";
import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
    navigationMenuTriggerStyle,
  } from "@/components/ui/navigation-menu"
import CommunitySearchBar from "../communities/CommunitySearchBar";
  

export default function CommunityMenu({ title }: { title: string }) {
  return (
    <div>
        <div className="flex items-center space-x-4 mt-5">
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem >
                    <Link  href="/communities" legacyBehavior passHref>
                    <NavigationMenuLink
                        className={`${navigationMenuTriggerStyle()} ${
                            title === "ForYou" ? "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-black hover:bg-primary/90 hover:text-black" : ""
                        }`}
                        >
                        For you
                        </NavigationMenuLink>
                    </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                    <Link href="/communities/discover" legacyBehavior passHref>
                        <NavigationMenuLink className={`${navigationMenuTriggerStyle()} ${
                            title === "Discover" ? "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-black hover:bg-primary/90 hover:text-black" : ""
                        }`}>
                        Discover
                        </NavigationMenuLink>
                    </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                    <Link href="/communities/profile" legacyBehavior passHref>
                        <NavigationMenuLink className={`${navigationMenuTriggerStyle()} ${
                            title === "Profile" ? "inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-black hover:bg-primary/90 hover:text-black" : ""
                        }`}>
                        Your Communities
                        </NavigationMenuLink>
                    </Link>
                    </NavigationMenuItem>
                </NavigationMenuList>
            </NavigationMenu>
        </div>   
    </div>
  );
}
