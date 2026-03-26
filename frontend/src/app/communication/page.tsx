'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Search, Hash, Plus, Users, FileText, CheckCircle, MoreVertical, Paperclip, Send } from 'lucide-react';
import ChatBubble from '@/components/communication/ChatBubble';
import { MessageData, ChannelData } from '@/types';
import clsx from 'clsx';

import { useChannels } from '@/hooks/useChannels';
import { useMessages } from '@/hooks/useMessages';

export default function CommunicationHub() {
  const { channels, loading: channelsLoading, error: channelsError } = useChannels();
  const [activeChannelId, setActiveChannelId] = useState<string | null>(null);
  
  // Set default channel when loaded
  useEffect(() => {
    if (channels.length > 0 && !activeChannelId) {
      setActiveChannelId(channels[0].id);
    }
  }, [channels, activeChannelId]);

  const { messages, loading: messagesLoading, sendMessage } = useMessages(activeChannelId || '');
  const [inputText, setInputText] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  const activeChannel = channels.find(c => c.id === activeChannelId) || null;

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeChannelId) return;

    try {
      await sendMessage(inputText);
      setInputText('');
    } catch (err) {
      console.error('Failed to send message:', err);
    }
  };

  if (channelsLoading) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-violet-500/30 border-t-violet-500 rounded-full animate-spin" />
      </div>
    );
  }

  if (channelsError) {
    return (
      <div className="h-full flex items-center justify-center text-red-400 font-medium">
        Error loading hub: {channelsError}
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-8rem)] flex overflow-hidden rounded-2xl border border-white/10 glass-panel shadow-2xl relative">
      <div className="absolute inset-0 bg-gradient-to-br from-[#0f0c29]/95 via-[#302b63]/90 to-[#24243e]/95 backdrop-blur-3xl -z-10" />
      
      {/* Left Panel: Channels & Contacts */}
      <div className="w-72 border-r border-white/10 bg-black/20 flex flex-col">
        <div className="p-4 border-b border-white/10">
          <h2 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-400 mb-4">Communications</h2>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input 
              type="text" 
              placeholder="Search channels..." 
              className="w-full pl-9 pr-4 py-2 bg-white/5 border border-white/10 rounded-lg text-sm text-white focus:outline-none focus:border-violet-500 focus:ring-1 focus:ring-violet-500 transition-all"
            />
          </div>
        </div>
        
        <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-6 text-sm">
          <div>
            <div className="flex items-center justify-between text-gray-400 uppercase tracking-widest text-[10px] font-bold px-2 mb-2">
              <span>Client Channels</span> <Plus className="w-3.5 h-3.5 cursor-pointer hover:text-white" />
            </div>
            {channels.filter((c: ChannelData) => c.type === 'Client').map((channel: ChannelData) => (
              <button
                key={channel.id}
                onClick={() => setActiveChannelId(channel.id)}
                className={clsx(
                  "w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all group mb-1 border",
                  activeChannelId === channel.id 
                    ? "bg-gradient-to-r from-violet-600/30 to-purple-600/10 border-violet-500/50 text-white shadow-[0_0_15px_rgba(139,92,246,0.2)]" 
                    : "border-transparent text-gray-300 hover:bg-white/5 hover:text-white"
                )}
              >
                <div className="flex items-center gap-2">
                  <Hash className={clsx("w-4 h-4", activeChannelId === channel.id ? "text-violet-400" : "text-gray-500")} />
                  <span className="truncate max-w-[130px] font-medium">{channel.name}</span>
                </div>
                {channel.unread > 0 && (
                  <span className="bg-amber-500 text-black text-[10px] font-bold px-1.5 py-0.5 rounded-full shadow-[0_0_8px_rgba(245,158,11,0.5)]">
                    {channel.unread}
                  </span>
                )}
              </button>
            ))}
          </div>

          <div>
            <div className="flex items-center justify-between text-gray-400 uppercase tracking-widest text-[10px] font-bold px-2 mb-2">
              <span>Internal Team</span> <Plus className="w-3.5 h-3.5 cursor-pointer hover:text-white" />
            </div>
            {channels.filter((c: ChannelData) => c.type === 'Internal').map((channel: ChannelData) => (
              <button
                key={channel.id}
                onClick={() => setActiveChannelId(channel.id)}
                className={clsx(
                  "w-full flex items-center justify-between px-3 py-2 rounded-lg transition-all group mb-1 border",
                  activeChannelId === channel.id 
                    ? "bg-gradient-to-r from-emerald-600/30 to-teal-600/10 border-emerald-500/50 text-white shadow-[0_0_15px_rgba(16,185,129,0.2)]" 
                    : "border-transparent text-gray-300 hover:bg-white/5 hover:text-white"
                )}
              >
                <div className="flex items-center gap-2">
                  <Hash className={clsx("w-4 h-4", activeChannelId === channel.id ? "text-emerald-400" : "text-gray-500")} />
                  <span className="truncate max-w-[130px] font-medium">{channel.name}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Center Panel: Chat Window */}
      <div className="flex-1 flex flex-col bg-white/[0.02]">
        {/* Chat Header */}
        <div className="h-16 border-b border-white/10 px-6 flex items-center justify-between bg-black/20 backdrop-blur-md">
          <div className="flex items-center gap-3">
             <Hash className="w-6 h-6 text-violet-400" />
             <div>
               <h3 className="font-bold text-lg leading-tight text-white">{activeChannel?.name || 'Select a channel'}</h3>
               <div className="flex items-center gap-1.5 text-xs text-gray-400">
                 <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> 2 Online
               </div>
             </div>
          </div>
          <div className="flex items-center gap-3 text-gray-400">
            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors"><Search className="w-5 h-5" /></button>
            <button className="p-2 hover:bg-white/10 rounded-lg transition-colors"><MoreVertical className="w-5 h-5" /></button>
          </div>
        </div>

        {/* Messages Flow */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6">
           {messages.map(msg => (
             <ChatBubble key={msg.id} message={msg} />
           ))}
           <div ref={chatEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-white/10 bg-black/30 backdrop-blur-md">
           <form onSubmit={handleSendMessage} className="relative flex items-center">
             <button type="button" className="absolute left-3 text-gray-400 hover:text-white transition-colors">
               <Paperclip className="w-5 h-5" />
             </button>
             <input 
               type="text" 
               value={inputText}
               onChange={(e) => setInputText(e.target.value)}
               placeholder="Message #TechCorp Audit Q3..." 
               className="w-full pl-12 pr-14 py-3.5 bg-white/5 border border-white/10 rounded-xl text-sm text-white focus:outline-none focus:border-violet-500 focus:bg-white/10 transition-all shadow-inner"
             />
             <button 
               type="submit" 
               disabled={!inputText.trim()}
               className={clsx(
                 "absolute right-2 p-2 rounded-lg transition-all",
                 inputText.trim() ? "bg-violet-600 text-white shadow-[0_0_10px_rgba(139,92,246,0.5)]" : "bg-white/5 text-gray-500 pointer-events-none"
               )}
             >
               <Send className="w-4 h-4" />
             </button>
           </form>
           <p className="text-[10px] text-gray-500 text-center mt-2">Digital Clerk is active in this channel. <span className="text-amber-400/70">Press '/' for AI commands.</span></p>
        </div>
      </div>

      {/* Right Panel: Contextual Data */}
      <div className="w-80 border-l border-white/10 bg-black/20 flex flex-col p-6 overflow-y-auto custom-scrollbar">
         <h3 className="font-bold text-white mb-4 uppercase tracking-wider text-xs">Channel Context</h3>
         
         <div className="glass-panel p-4 rounded-xl border-white/10 mb-5 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-24 h-24 bg-violet-600/20 blur-2xl rounded-full" />
           <p className="text-xs text-gray-400 mb-1">Linked Client</p>
           <h4 className="font-semibold text-white mb-3">TechCorp India Pvt Ltd</h4>
           <div className="flex gap-2">
             <span className="text-xs bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2 py-1 rounded">Active</span>
             <span className="text-xs bg-white/10 text-gray-300 border border-white/10 px-2 py-1 rounded">Q3 Audit</span>
           </div>
         </div>

         <div className="mb-5">
           <h4 className="flex items-center justify-between text-sm font-semibold text-white mb-3 border-b border-white/10 pb-2">
             <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-violet-400" /> Pending Tasks</span>
           </h4>
           <div className="space-y-2">
             <div className="bg-white/5 border border-white/5 p-3 rounded-lg text-sm hover:border-violet-500/30 transition-colors cursor-pointer">
               <p className="text-gray-300 mb-1 leading-tight">Reconcile HDFC Bank Statements</p>
               <p className="text-[10px] text-amber-400 font-bold">Due Tomorrow</p>
             </div>
             <div className="bg-white/5 border border-white/5 p-3 rounded-lg text-sm hover:border-violet-500/30 transition-colors cursor-pointer">
               <p className="text-gray-300 mb-1 leading-tight">Prepare Draft Computation</p>
               <p className="text-[10px] text-gray-500">In Progress</p>
             </div>
           </div>
         </div>

         <div>
           <h4 className="flex items-center justify-between text-sm font-semibold text-white mb-3 border-b border-white/10 pb-2">
             <span className="flex items-center gap-2"><FileText className="w-4 h-4 text-amber-400" /> Recent Files</span>
           </h4>
           <div className="space-y-2">
             <div className="flex items-center gap-3 bg-white/5 p-2.5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer border border-transparent hover:border-white/10">
               <div className="p-1.5 bg-red-500/20 rounded text-red-400"><FileText className="w-4 h-4" /></div>
               <div className="truncate">
                 <p className="text-xs text-gray-200 truncate">Q3_Proforma_Inv.pdf</p>
                 <p className="text-[10px] text-gray-500">2.4 MB • Today</p>
               </div>
             </div>
           </div>
         </div>
      </div>
    </div>
  );
}
