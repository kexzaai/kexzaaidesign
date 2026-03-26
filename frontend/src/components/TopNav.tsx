'use client';

import { Bell, Search, User } from 'lucide-react';

import { useAuth } from '@/contexts/AuthContext';
import { useAppNotifications } from '@/hooks/useAppNotifications';
import { useRouter } from 'next/navigation';

export default function TopNav() {
  const { user, signOut } = useAuth();
  const { notifications } = useAppNotifications();
  const router = useRouter();
  const unreadCount = notifications.filter(n => !n.read).length;

  const handleLogout = async () => {
    await signOut();
    router.push('/login');
  };
  return (
    <header className="h-20 w-full flex items-center justify-between px-8 glass-panel rounded-none border-b border-white/10 fixed top-0 left-64 right-0 z-10" style={{ width: 'calc(100% - 16rem)' }}>
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-semibold text-white/90">Dashboard</h2>
      </div>

      <div className="flex items-center gap-6">
        <div className="relative group">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-violet-400 transition-colors" />
          <input 
            type="text" 
            placeholder="Search tasks, clients..." 
            className="bg-white/5 border border-white/10 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:bg-white/10 transition-all w-64 placeholder-gray-400 text-white"
          />
        </div>

        <button className="relative p-2 rounded-full hover:bg-white/5 transition-colors group">
          <Bell className="w-5 h-5 text-gray-400 group-hover:text-violet-400" />
          {unreadCount > 0 && (
            <span className="absolute top-2 right-2 w-2 h-2 bg-amber-500 rounded-full border border-[#0f0c29] animate-pulse" />
          )}
        </button>

        <div className="flex items-center gap-3 pl-4 border-l border-white/10 group cursor-pointer">
          <div className="text-right">
            <p className="text-sm font-bold text-white group-hover:text-violet-300 transition-colors">
              {user?.user_metadata?.full_name || 'User'}
            </p>
            <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">CA Firm Partner</p>
          </div>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-600 to-purple-600 p-[1px]">
            <div className="w-full h-full rounded-[10px] bg-[#0f0c29] flex items-center justify-center overflow-hidden">
              <img 
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email || 'Kexza'}`} 
                alt="Avatar" 
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <button 
            onClick={handleLogout}
            className="ml-2 p-2 text-gray-500 hover:text-red-400 transition-colors"
            title="Logout"
          >
            <User className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
}
