'use client';

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Download, Tag, FileText, Share2, Link } from 'lucide-react';
import { DocumentData } from './DocumentCard';
import clsx from 'clsx';

interface DocumentPreviewModalProps {
  isOpen: boolean;
  document: DocumentData | null;
  onClose: () => void;
}

export default function DocumentPreviewModal({ isOpen, document, onClose }: DocumentPreviewModalProps) {
  return (
    <AnimatePresence>
      {isOpen && document && (
        <React.Fragment>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-50 bg-[#0f0c29]/60 backdrop-blur-3xl transition-all"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none p-4">
            <motion.div
              layoutId={`doc-${document.id}`}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="pointer-events-auto w-full max-w-4xl max-h-[90vh] glass-panel border border-white/20 shadow-[0_0_50px_rgba(139,92,246,0.15)] bg-[#0f0c29]/95 flex flex-col md:flex-row overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Preview Area (Left) */}
              <div className="flex-1 bg-black/40 border-r border-white/10 flex items-center justify-center p-8 min-h-[300px] md:min-h-[500px]">
                {document.type === 'IMAGE' ? (
                  <div className="w-full h-full rounded-lg border border-white/10 bg-white/5 flex items-center justify-center text-gray-400 flex-col gap-3">
                     <FileText className="w-16 h-16 text-violet-400" />
                     <p>Image Preview Simulation</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="w-24 h-24 mx-auto mb-4 rounded-xl bg-violet-500/10 flex items-center justify-center border border-violet-500/30">
                      <FileText className="w-12 h-12 text-violet-400" />
                    </div>
                    <p className="text-gray-300 font-medium">No preview available for {document.type}</p>
                    <button className="mt-4 px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-medium rounded-lg border border-white/10 transition-colors flex items-center gap-2 mx-auto">
                      <Download className="w-4 h-4" /> Download File
                    </button>
                  </div>
                )}
              </div>

              {/* Details & Actions Area (Right) */}
              <div className="w-full md:w-80 p-6 flex flex-col bg-white/5">
                <div className="flex justify-between items-start mb-6">
                  <h2 className="text-xl font-bold text-white leading-tight pr-4">{document.filename}</h2>
                  <button onClick={onClose} className="p-1 rounded-md hover:bg-white/10 text-gray-400 hover:text-white transition-colors flex-shrink-0">
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-4 flex-1">
                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-1">Details</p>
                    <div className="bg-black/20 rounded-lg p-3 space-y-2 text-sm text-gray-300 border border-white/5">
                      <div className="flex justify-between"><span>Format:</span> <span className="text-white">{document.type}</span></div>
                      <div className="flex justify-between"><span>Size:</span> <span className="text-white">{Math.round(document.sizeKb / 1024 * 10) / 10} MB</span></div>
                      <div className="flex justify-between"><span>Uploaded:</span> <span className="text-white">{document.uploadDate}</span></div>
                      <div className="flex justify-between"><span>Priority:</span> 
                        <span className={clsx("font-semibold", document.priority === 'Urgent' ? 'text-red-400' : 'text-violet-400')}>
                          {document.priority}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Linked Entities</p>
                    <div className="flex gap-2">
                      <span className="text-xs px-2.5 py-1 rounded bg-violet-500/20 text-violet-300 border border-violet-500/30 flex items-center gap-1">
                        <Link className="w-3 h-3" /> TechCorp India
                      </span>
                      <span className="text-xs px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30 flex items-center gap-1">
                        <Link className="w-3 h-3" /> GST Audit Task
                      </span>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="pt-6 border-t border-white/10 space-y-2 mt-4">
                  <button className="w-full py-2.5 rounded-lg bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white font-medium text-sm transition-all shadow-[0_0_15px_rgba(139,92,246,0.3)] flex items-center justify-center gap-2">
                    <Download className="w-4 h-4" /> Download Document
                  </button>
                  <div className="flex gap-2">
                    <button className="flex-1 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-white font-medium text-sm transition-colors border border-white/10 flex items-center justify-center gap-2">
                      <Tag className="w-4 h-4" /> Tag
                    </button>
                    <button className="flex-1 py-2.5 rounded-lg bg-white/5 hover:bg-white/10 text-white font-medium text-sm transition-colors border border-white/10 flex items-center justify-center gap-2">
                      <Share2 className="w-4 h-4" /> Share
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </React.Fragment>
      )}
    </AnimatePresence>
  );
}
