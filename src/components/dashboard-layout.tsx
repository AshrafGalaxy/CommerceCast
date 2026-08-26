'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  AreaChart,
  Badge,
  Bot,
  FileText,
  Gift,
  LayoutDashboard,
  Settings,
  Database,
  Wand2,
  Scale,
  Package,
} from 'lucide-react';
import { Logo } from '@/components/ui/Logo';

import {
  SidebarProvider,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar';
import { UserNav } from '@/components/user-nav';

const navItems = [
  { href: '/dashboard/data-sources', icon: Database, label: 'Data Sources' },
  { href: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { href: '/dashboard/forecasting', icon: AreaChart, label: 'Forecasting' },
  { href: '/dashboard/promotions', icon: Gift, label: 'Promotions' },
  { href: '/dashboard/inventory', icon: Package, label: 'Inventory' },
  { href: '/dashboard/comparison', icon: Scale, label: 'Comparison' },
  { href: '/dashboard/reports', icon: FileText, label: 'Reports' },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader className="p-4 border-b border-sidebar-border">
          <Link
            href="/dashboard"
            className="flex items-center gap-2.5 text-sidebar-foreground hover:opacity-90 transition-opacity"
          >
            <div className="p-1.5 rounded-xl border border-border/60 bg-card shadow-sm shrink-0">
              <Logo className="h-5 w-5 text-primary" />
            </div>
            <div className="flex flex-col min-w-0">
              <h2 className="text-sm font-bold font-headline leading-tight tracking-tight truncate">CommerceCast</h2>
              <span className="text-[10px] text-muted-foreground font-sans font-medium">Enterprise Intelligence</span>
            </div>
          </Link>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            {navItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname === item.href}
                  tooltip={{ children: item.label }}
                >
                  <Link href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton
                asChild
                tooltip={{ children: 'Settings' }}
                isActive={pathname === '/dashboard/profile'}
              >
                <Link href="/dashboard/settings">
                  <Settings />
                  <span>Settings</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      </Sidebar>
      <SidebarInset className="bg-gray-100/50 dark:bg-background">
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background/80 backdrop-blur-sm px-4 lg:h-[60px] lg:px-6">
          <SidebarTrigger className="md:hidden" />
          <div className="w-full flex-1">
            {/* Can add breadcrumbs or page title here */}
          </div>
          <UserNav />
        </header>
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
