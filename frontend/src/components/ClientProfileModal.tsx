'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Mail, Phone, Building2, ShieldCheck, AlertCircle, FileText, 
  MessageSquare, BarChart3, Clock, Plus, Upload, Send 
} from 'lucide-react';
import { Client } from '@/types';
import clsx from 'clsx';

interface ClientProfileModalProps {
  client: Client;
  isOpen: boolean;
  onClose: () => void;
}

const TABS = ['Details', 'Filings', 'Documents', 'Communication', 'Analytics'] as const;
type TabType = typeof TABS[number];

export default function ClientProfileModal({ client, isOpen, onClose }: ClientProfileModalProps) {
  const [activeTab, setActiveTab] = useState<TabType>('Details');

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center px-4 py-6">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/60 backdrop-blur-3xl"
        />

        {/* Modal Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", bounce: 0, duration: 0.4 }}
          className="relative w-full max-w-5xl h-[85vh] flex flex-col bg-[#120F2B]/90 border border-white/20 rounded-2xl shadow-[0_0_50px_rgba(139,92,246,0.2)] overflow-hidden"
        >
          {/* Header */}
          <div className="flex-shrink-0 p-6 border-b border-white/10 flex justify-between items-start bg-gradient-to-r from-violet-500/10 to-transparent">
            <div className="flex gap-4 items-center">
              <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-violet-600 to-amber-600 flex items-center justify-center shadow-lg">
                <Building2 className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white mb-1 flex items-center gap-3">
                  {client.name}
                  <span className={clsx(
                    "px-2.5 py-1 text-xs font-bold rounded-full uppercase tracking-wider",
                    client.status === 'Active' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-gray-500/20 text-gray-400'
                  )}>
                    {client.status}
                  </span>
                </h2>
                <div className="text-gray-400 flex items-center gap-4 text-sm font-medium">
                  <span className="flex items-center gap-1.5"><Mail className="w-4 h-4" /> {client.email}</span>
                  <span className="flex items-center gap-1.5"><Phone className="w-4 h-4" /> {client.phone}</span>
                </div>
              </div>
            </div>
            
            <button 
              onClick={onClose}
              className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Action Bar (Below Header) */}
          <div className="px-6 py-3 border-b border-white/5 bg-white/5 flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-violet-600 hover:bg-violet-500 text-white text-sm font-medium rounded-lg transition-colors shadow-lg shadow-violet-500/20">
              <Plus className="w-4 h-4" /> New Task
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-lg transition-colors">
              <Upload className="w-4 h-4" /> Upload Document
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-lg transition-colors">
              <Send className="w-4 h-4" /> Send Message
            </button>
          </div>

          {/* Body structure with Sidebar Tabs */}
          <div className="flex flex-1 overflow-hidden">
            {/* Nav Tabs */}
            <div className="w-64 border-r border-white/10 pt-4 flex flex-col gap-1 px-3 overflow-y-auto">
              {TABS.map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={clsx(
                    "flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all text-left",
                    activeTab === tab 
                      ? "bg-violet-500/20 text-violet-300 shadow-[inset_2px_0_0_rgb(139,92,246)]" 
                      : "text-gray-400 hover:bg-white/5 hover:text-white"
                  )}
                >
                  {tab === 'Details' && <Building2 className="w-4 h-4" />}
                  {tab === 'Filings' && <Clock className="w-4 h-4" />}
                  {tab === 'Documents' && <FileText className="w-4 h-4" />}
                  {tab === 'Communication' && <MessageSquare className="w-4 h-4" />}
                  {tab === 'Analytics' && <BarChart3 className="w-4 h-4" />}
                  {tab}
                </button>
              ))}
            </div>

            {/* Tab Content Area */}
            <div className="flex-1 p-8 overflow-y-auto relative bg-[#0a0818]/50">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {activeTab === 'Details' && (
                    <div className="space-y-6">
                      <h3 className="text-xl font-bold text-white mb-4 border-b border-white/10 pb-2">Client Overview</h3>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="glass-card p-4">
                          <p className="text-sm text-gray-400 mb-1">Service Type</p>
                          <p className="text-lg font-semibold text-white">{client.serviceType}</p>
                        </div>
                        <div className="glass-card p-4">
                          <p className="text-sm text-gray-400 mb-1">Compliance Score</p>
                          <div className="flex items-center gap-2">
                            <span className="text-2xl font-bold text-emerald-400">{client.complianceScore}</span>
                            <span className="text-xs text-emerald-400/70">/ 100</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="glass-card p-5 mt-6 border-amber-500/30 bg-amber-500/5">
                        <h4 className="flex items-center gap-2 font-semibold text-amber-400 mb-2">
                          <AlertCircle className="w-5 h-5" /> AI Priority Alert
                        </h4>
                        <p className="text-sm text-gray-300 leading-relaxed">
                          This client has {client.pendingFilings} pending filings that are approaching their deadline within the next 15 days. AI recommends scheduling an advisory call to expedite documentation.
                        </p>
                      </div>
                    </div>
                  )}

                  {activeTab !== 'Details' && (
                    <div className="flex flex-col items-center justify-center h-64 text-gray-500">
                      <p className="text-lg">{activeTab} module content will be loaded here.</p>
                      <p className="text-sm mt-2">Mock data currently limited to 'Details' tab for MVP structure.</p>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
