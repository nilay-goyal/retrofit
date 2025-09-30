import { useState } from "react";
import { 
  Home, 
  FileText, 
  MapPin, 
  FileImage, 
  Settings, 
  LogOut,
  User
} from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
  useSidebar,
  SidebarFooter,
} from "@/components/ui/sidebar";

const discoverItems = [
  { title: "My Home", url: "/dashboard", icon: Home },
  { title: "Project Documents", url: "/quotes", icon: FileText },
  { title: "Rebate Finder", url: "/rebates", icon: MapPin },
  { title: "Document Templates", url: "/templates", icon: FileImage },
];

const helpItems = [
  { title: "Settings", url: "/settings", icon: Settings },
];

export function AppSidebar() {
  const { state } = useSidebar();
  const { user, signOut } = useAuth();
  const location = useLocation();
  const currentPath = location.pathname;

  const isActive = (path: string) => currentPath === path;
  const getNavCls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "bg-construction/10 text-construction font-medium" : "hover:bg-muted/50";

  const getUserInitials = () => {
    if (!user) return "U";
    const email = user.email || "";
    return email.substring(0, 2).toUpperCase();
  };

  return (
    <Sidebar
      className={state === "collapsed" ? "w-14" : "w-64"}
      collapsible="icon"
    >
      <SidebarContent className="bg-background border-r">
        {/* User Profile */}
        <div className="p-4 border-b">
          <div className="flex items-center gap-3">
            <Avatar className="w-8 h-8">
              <AvatarImage src={user?.user_metadata?.avatar_url} />
              <AvatarFallback>{getUserInitials()}</AvatarFallback>
            </Avatar>
            {state !== "collapsed" && (
              <div>
                <p className="font-semibold text-foreground">
                  {user?.user_metadata?.full_name || user?.email?.split('@')[0] || "User"}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Discover Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Discover
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {discoverItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className={getNavCls}>
                      <item.icon className="mr-2 h-4 w-4" />
                      {state !== "collapsed" && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Help Section */}
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Help
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {helpItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <NavLink to={item.url} end className={getNavCls}>
                      <item.icon className="mr-2 h-4 w-4" />
                      {state !== "collapsed" && <span>{item.title}</span>}
                    </NavLink>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* Footer with Logout */}
      <SidebarFooter className="p-4 border-t">
        <SidebarMenuButton onClick={signOut} className="bg-muted/50 hover:bg-muted text-foreground">
          <LogOut className="mr-2 h-4 w-4" />
          {state !== "collapsed" && <span>Log Out</span>}
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
}