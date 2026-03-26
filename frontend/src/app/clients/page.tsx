'use client';

import React, { useState, useMemo } from 'react';
import { Search, Filter, Plus } from 'lucide-react';
import { Client } from '@/types';
import ClientCard from '@/components/ClientCard';
import ClientProfileModal from '@/components/ClientProfileModal';
import { useClients } from '@/hooks/useClients';

export default function ClientsPage() {
  const { clients, loading, error } = useClients();
  const [searchQuery, setSearchQuery] = useState('');
  const [filterPriority, setFilterPriority] = useState<string>('All');
  
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);

  const filteredClients = useMemo(() => {
    return (clients || []).filter(client => {
      const matchesSearch = client.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                            client.serviceType?.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesPriority = filterPriority === 'All' || client.priority === filterPriority;

      return matchesSearch && matchesPriority;
    });
  }, [clients, searchQuery, filterPriority]);

  if (loading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-violet-500/30 border-t-violet-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-full flex items-center justify-center text-red-400 font-medium">
        Error loading clients: {error}
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="mb-8 flex flex-col md:flex-row md:justify-between md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">Client Management</h1>
          <p className="text-gray-400 mt-1">Manage client profiles, monitor compliance health, and access related documents.</p>
        </div>
        <button className="flex items-center gap-2 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white px-5 py-2.5 rounded-lg font-medium shadow-[0_0_15px_rgba(139,92,246,0.4)] transition-all">
          <Plus className="w-5 h-5" /> New Client
        </button>
      </div>

      {/* Control Bar: Search & Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <div className="relative flex-1 max-w-md">
          <Search className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search by client name or service..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:bg-white/10 transition-all text-white placeholder-gray-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Filter className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="appearance-none bg-white/5 border border-white/10 rounded-xl py-2.5 pl-10 pr-10 focus:outline-none focus:ring-2 focus:ring-violet-500/50 hover:bg-white/10 transition-all text-white cursor-pointer"
            >
              <option value="All" className="bg-[#120F2B]">All Priorities</option>
              <option value="High" className="bg-[#120F2B]">High Priority</option>
              <option value="Medium" className="bg-[#120F2B]">Medium Priority</option>
              <option value="Low" className="bg-[#120F2B]">Low Priority</option>
            </select>
            {/* Custom chevron to replace default OS styling */}
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 border-l-transparent border-r-transparent border-t-gray-400 border-l-[4px] border-r-[4px] border-t-[5px]" />
          </div>
        </div>
      </div>

      {/* Clients Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredClients.map((client) => (
          <ClientCard 
            key={client.id} 
            client={client} 
            onClick={setSelectedClient}
          />
        ))}
        {filteredClients.length === 0 && (
          <div className="col-span-full py-12 text-center text-gray-400 border border-dashed border-white/10 rounded-2xl bg-white/5">
            No clients found matching your search and filter criteria.
          </div>
        )}
      </div>

      {/* Expanded Profile Modal Wrapper */}
      {selectedClient && (
        <ClientProfileModal 
          client={selectedClient} 
          isOpen={true} 
          onClose={() => setSelectedClient(null)} 
        />
      )}
    </div>
  );
}
