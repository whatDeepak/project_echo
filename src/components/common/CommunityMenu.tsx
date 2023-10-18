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
  

export default function CommunityMenu() {
  return (
    <div>
        <div className="flex items-center space-x-4 mt-5">
            <NavigationMenu>
                <NavigationMenuList>
                    <NavigationMenuItem>
                    <Link href="/communities" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        For you
                        </NavigationMenuLink>
                    </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                    <Link href="/communities/discover" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                        Discover
                        </NavigationMenuLink>
                    </Link>
                    </NavigationMenuItem>
                    <NavigationMenuItem>
                    <Link href="/communities/profile" legacyBehavior passHref>
                        <NavigationMenuLink className={navigationMenuTriggerStyle()}>
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
