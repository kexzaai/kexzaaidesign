"use client";

import { usePathname } from 'next/navigation';
import { useAuth } from "@/contexts/AuthContext";
import Sidebar from "@/components/Sidebar";
import TopNav from "@/components/TopNav";
import DigitalClerkPanel from "@/components/DigitalClerkPanel";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { loading } = useAuth();
  
  const isAuthPage = pathname === '/login' || pathname === '/signup' || pathname === '/auth/callback';

  if (loading && !isAuthPage) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[#0f0c29]">
        <div className="w-12 h-12 border-4 border-violet-500/30 border-t-violet-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (isAuthPage) {
    return <main className="flex-1">{children}</main>;
  }

  return (
    <>
      <Sidebar />
      <div className="flex-1 flex flex-col ml-64 min-h-screen">
        <TopNav />
        <main className="flex-1 pt-24 p-8 overflow-y-auto">
          {children}
        </main>
      </div>
      <DigitalClerkPanel />
    </>
  );
}
