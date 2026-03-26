'use client';

import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, UploadCloud, FileType, Filter } from 'lucide-react';
import DocumentCard from '@/components/DocumentCard';
import DocumentPreviewModal from '@/components/DocumentPreviewModal';
import { DocumentData } from '@/types';

import { useDocuments } from '@/hooks/useDocuments';

export default function DocumentVault() {
  const { documents, loading, error, uploadDocument } = useDocuments();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDoc, setSelectedDoc] = useState<DocumentData | null>(null);

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    for (const file of acceptedFiles) {
      try {
        await uploadDocument(file);
      } catch (err) {
        console.error('Failed to upload document:', err);
      }
    }
  }, [uploadDocument]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  const filteredDocs = (documents || []).filter(doc => 
    doc.filename.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        Error loading document vault: {error}
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      <div className="mb-6 flex flex-col md:flex-row md:justify-between md:items-end gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400">Document Vault</h1>
          <p className="text-gray-400 mt-1">Securely store, organize, and retrieve client files and compliance records.</p>
        </div>
        
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search documents..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all w-64"
            />
          </div>
          <button className="p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors text-gray-300">
            <Filter className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Upload Dropzone */}
      <div 
        {...getRootProps()} 
        className={`mb-8 w-full rounded-xl border-2 border-dashed transition-all duration-300 flex flex-col items-center justify-center p-8 cursor-pointer
          ${isDragActive 
            ? 'border-violet-400 bg-violet-500/10 shadow-[0_0_30px_rgba(139,92,246,0.2)]' 
            : 'border-white/10 bg-white/5 hover:bg-white/10 hover:border-violet-500/50'
          }`}
      >
        <input {...getInputProps()} />
        <div className={`w-16 h-16 rounded-full mb-4 flex items-center justify-center transition-colors
          ${isDragActive ? 'bg-violet-500/20 text-violet-300' : 'bg-black/20 text-gray-400'}`}>
          <UploadCloud className={`w-8 h-8 ${isDragActive ? 'animate-bounce' : ''}`} />
        </div>
        <h3 className="text-lg font-semibold text-white mb-1">
          {isDragActive ? 'Drop files here...' : 'Drag & drop files to upload'}
        </h3>
        <p className="text-sm text-gray-400">or click to browse from your computer (PDF, Word, Excel, Images)</p>
      </div>

      {/* Document Grid */}
      <div className="flex-1 overflow-y-auto min-h-0 custom-scrollbar pr-2">
        <h3 className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4 flex items-center gap-2">
          <FileType className="w-4 h-4" /> All Documents ({filteredDocs.length})
        </h3>
        
        {filteredDocs.length === 0 ? (
          <div className="w-full py-12 flex flex-col items-center justify-center text-gray-500">
            <Search className="w-12 h-12 mb-3 opacity-20" />
            <p>No documents found matching "{searchQuery}"</p>
          </div>
        ) : (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 pb-12">
            <AnimatePresence>
              {filteredDocs.map(doc => (
                <DocumentCard 
                  key={doc.id} 
                  document={doc} 
                  onClick={setSelectedDoc}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </div>

      {/* Preview Modal */}
      <DocumentPreviewModal 
        isOpen={selectedDoc !== null}
        document={selectedDoc}
        onClose={() => setSelectedDoc(null)}
      />
    </div>
  );
}
