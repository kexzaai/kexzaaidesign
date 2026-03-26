'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Mail, Phone, ShieldCheck, AlertCircle, FileText } from 'lucide-react';
import { Client } from '@/types';
import clsx from 'clsx';

interface ClientCardProps {
  client: Client;
  onClick: (client: Client) => void;
}

const scoreColors = (score: number) => {
  if (score >= 90) return 'text-emerald-400';
  if (score >= 70) return 'text-amber-400';
  return 'text-red-400';
};

export default function ClientCard({ client, onClick }: ClientCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onClick(client)}
      className="glass-card p-5 cursor-pointer relative group overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-violet-500/0 to-purple-500/0 group-hover:from-violet-500/10 group-hover:to-purple-500/10 transition-all duration-300" />
      
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div>
          <h3 className="text-lg font-bold text-white group-hover:text-violet-300 transition-colors flex items-center gap-2">
            <Building2 className="w-5 h-5 text-amber-500" />
            {client.name}
          </h3>
          <p className="text-sm text-gray-400 mt-1">{client.serviceType}</p>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1">Health</span>
          <div className={clsx("flex items-center gap-1 font-bold text-lg", scoreColors(client.complianceScore))}>
            {client.complianceScore >= 90 ? <ShieldCheck className="w-4 h-4" /> : <AlertCircle className="w-4 h-4" />}
            {client.complianceScore}
          </div>
        </div>
      </div>

      <div className="space-y-2 mb-5 relative z-10 text-sm text-gray-300">
        <div className="flex items-center gap-2">
          <Mail className="w-4 h-4 text-gray-500" />
          <span className="truncate">{client.email}</span>
        </div>
        <div className="flex items-center gap-2">
          <Phone className="w-4 h-4 text-gray-500" />
          <span>{client.phone}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10 relative z-10">
        <div className="bg-white/5 rounded-lg p-2.5 flex flex-col items-center justify-center group-hover:bg-white/10 transition-colors">
          <span className="text-xs text-gray-400 mb-1 flex items-center gap-1">
            <AlertCircle className="w-3 h-3 text-amber-400" /> Open Tasks
          </span>
          <span className="text-lg font-bold text-white">{client.openTasks}</span>
        </div>
        <div className="bg-white/5 rounded-lg p-2.5 flex flex-col items-center justify-center group-hover:bg-white/10 transition-colors">
          <span className="text-xs text-gray-400 mb-1 flex items-center gap-1">
            <FileText className="w-3 h-3 text-blue-400" /> Pending Filings
          </span>
          <span className="text-lg font-bold text-white">{client.pendingFilings}</span>
        </div>
      </div>
    </motion.div>
  );
}
