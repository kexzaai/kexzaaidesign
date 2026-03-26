'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { FileText, Image as ImageIcon, FileSpreadsheet, Download, Tag, X } from 'lucide-react';
import clsx from 'clsx';
import { DocumentData } from '@/types';

interface DocumentCardProps {
  document: DocumentData;
  onClick: (doc: DocumentData) => void;
}

export default function DocumentCard({ document, onClick }: DocumentCardProps) {
  // Determine gradient border based on priority
  const borderGradient = 
    document.priority === 'Urgent' ? 'from-red-500/50 to-orange-500/50' :
    document.priority === 'Normal' ? 'from-violet-500/40 to-purple-500/40' :
    'from-gray-500/30 to-gray-600/30';

  // Determine icon
  const Icon = document.type === 'PDF' ? FileText :
               document.type === 'IMAGE' ? ImageIcon :
               document.type === 'SHEET' ? FileSpreadsheet : FileText;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      whileHover={{ y: -4 }}
      onClick={() => onClick(document)}
      className="relative p-[1px] rounded-xl cursor-pointer group bg-gradient-to-br bg-white/5 transition-all w-full"
    >
      <div className={clsx("absolute inset-0 rounded-xl bg-gradient-to-br opacity-50 group-hover:opacity-100 transition-opacity", borderGradient)} />
      
      <div className="relative h-full glass-panel !bg-[#0f0c29]/95 backdrop-blur-3xl p-4 rounded-xl flex flex-col items-center text-center justify-between z-10">
        <div className="w-full flex justify-end mb-2">
          {document.priority === 'Urgent' && (
            <span className="text-[10px] uppercase tracking-wider font-bold text-red-400 bg-red-400/10 px-2 py-0.5 rounded-full border border-red-500/20 shadow-[0_0_10px_rgba(239,68,68,0.2)]">
              Urgent
            </span>
          )}
        </div>
        
        <div className="w-14 h-14 mb-3 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:bg-violet-500/10 transition-colors group-hover:border-violet-500/30">
          <Icon className="w-6 h-6 text-gray-300 group-hover:text-violet-300 transition-colors" />
        </div>
        
        <h4 className="text-white font-medium text-sm truncate w-full mb-1">{document.filename}</h4>
        
        <div className="flex items-center gap-2 text-xs text-gray-400">
          <span>{document.type}</span>
          <span>•</span>
          <span>{Math.round(document.sizeKb / 1024)} MB</span>
        </div>
        
        {/* Hidden Hover Actions */}
        <div className="absolute inset-x-0 bottom-0 top-0 bg-[#0f0c29]/80 backdrop-blur-sm rounded-xl opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
          <button className="p-2 rounded-full bg-white/10 hover:bg-violet-500/40 border border-white/20 text-white transition-colors" onClick={(e) => { e.stopPropagation(); /* handle download */ }}>
            <Download className="w-4 h-4" />
          </button>
          <button className="p-2 rounded-full bg-white/10 hover:bg-violet-500/40 border border-white/20 text-white transition-colors" onClick={(e) => { e.stopPropagation(); /* handle tag */ }}>
            <Tag className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
