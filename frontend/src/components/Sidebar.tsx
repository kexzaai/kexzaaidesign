'use client';

import { 
  LayoutDashboard, 
  Users, 
  Bot, 
  CreditCard, 
  FolderOpen, 
  Bell, 
  MessageSquare, 
  BarChart3, 
  Settings 
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';

const navItems = [
  { name: 'Workflow & Tasks', href: '/workflow', icon: LayoutDashboard },
  { name: 'Clients (CRM)', href: '/clients', icon: Users },
  { name: 'Digital Clerk (AI)', href: '/ai-clerk', icon: Bot },
  { name: 'Revenue & Billing', href: '/revenue', icon: CreditCard },
  { name: 'Document Vault', href: '/vault', icon: FolderOpen },
  { name: 'Reminders', href: '/reminders', icon: Bell },
  { name: 'Communication Hub', href: '/communication', icon: MessageSquare },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 h-screen fixed top-0 left-0 flex flex-col glass-panel border-r border-white/10 rounded-none z-20">
      <div className="p-6 flex items-center justify-center border-b border-white/10">
        <h1 className="text-2xl font-bold text-gradient tracking-wider">KEXZA AI</h1>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-6 flex flex-col gap-2 px-4">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname.startsWith(item.href);

          return (
            <Link
              key={item.name}
              href={item.href}
              className={clsx(
                "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300",
                isActive 
                  ? "bg-white/15 text-white shadow-[0_4px_16px_0_rgba(139,92,246,0.5)] border border-white/20" 
                  : "text-gray-300 hover:bg-white/5 hover:text-white"
              )}
            >
              <Icon className={clsx("w-5 h-5", isActive ? "text-amber-400" : "")} />
              <span className="font-medium">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10 mt-auto">
        <Link
          href="/settings"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-300 hover:bg-white/5 hover:text-white transition-all duration-300"
        >
          <Settings className="w-5 h-5" />
          <span className="font-medium">Settings</span>
        </Link>
      </div>
    </div>
  );
}
