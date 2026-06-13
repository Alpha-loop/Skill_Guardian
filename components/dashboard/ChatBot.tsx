'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { MessageCircle, X, Send, Loader2, Bot, User, ChevronDown, Sparkles } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/lib/supabase';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const SUGGESTED_QUESTIONS = [
  'What should I do if a service user refuses medication?',
  'Explain the Mental Capacity Act 2005',
  'How do I report a safeguarding concern?',
  'What are the 16 Care Certificate standards?',
  'How do I handle a falls risk assessment?',
];

function TypingIndicator() {
  const { profile, organisation, loading, signOut } = useAuth();

  
  return (
    <div className="flex items-end gap-2">
      <div 
        className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0"
      >
        <Bot className="w-4 h-4 text-white" />
      </div>
      <div className="bg-white border border-slate-200 rounded-2xl rounded-bl-sm px-4 py-3 shadow-sm">
        <div className="flex gap-1 items-center h-4">
          <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
          <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
          <span className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
        </div>
      </div>
    </div>
  );
}

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.role === 'user';

  const formatContent = (text: string) => {
    const lines = text.split('\n');
    return lines.map((line, i) => {
      if (line.startsWith('- ') || line.startsWith('• ')) {
        return (
          <li key={i} className="ml-4 list-disc">
            {line.replace(/^[-•]\s/, '')}
          </li>
        );
      }
      if (line.match(/^\d+\.\s/)) {
        return (
          <li key={i} className="ml-4 list-decimal">
            {line.replace(/^\d+\.\s/, '')}
          </li>
        );
      }
      if (line.startsWith('**') && line.endsWith('**')) {
        return <p key={i} className="font-semibold mt-1">{line.replace(/\*\*/g, '')}</p>;
      }
      if (line === '') return <br key={i} />;
      return <p key={i}>{line}</p>;
    });
  };

  return (
    <div className={`flex items-end gap-2 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
      <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ${
        isUser ? 'bg-slate-200' : 'bg-[#005EB8]'
      }`}>
        {isUser
          ? <User className="w-4 h-4 text-slate-600" />
          : <Bot className="w-4 h-4 text-white" />
        }
      </div>
      <div className={`max-w-[80%] rounded-2xl px-4 py-3 text-sm leading-relaxed shadow-sm ${
        isUser
          ? 'bg-[#005EB8] text-white rounded-br-sm'
          : 'bg-white border border-slate-200 text-slate-800 rounded-bl-sm'
      }`}>
        <div className={`space-y-0.5 ${isUser ? '' : 'text-slate-700'}`}>
          {formatContent(message.content)}
        </div>
      </div>
    </div>
  );
}

export default function ChatBot() {
  const { user, profile, organisation,  } = useAuth();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [unread, setUnread] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const hasGreeted = useRef(false);

  

  const brandColor =
    organisation?.primary_color || '#005EB8';

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading, scrollToBottom]);

  useEffect(() => {
    if (open) {
      setUnread(false);
      setTimeout(() => inputRef.current?.focus(), 100);

      if (!hasGreeted.current && profile) {
        hasGreeted.current = true;
        const greeting: Message = {
          role: 'assistant',
          content: `Hi ${profile.first_name}! I'm SkillGuardian AI, your care practice assistant.\n\nI can help you with:\n- Questions about your training courses\n- Real-world care scenarios and best practice\n- UK legislation and CQC guidance\n- Medication, safeguarding, clinical procedures\n\nWhat would you like to know?`,
        };
        setMessages([greeting]);
      }
    }
  }, [open, profile]);

  const sendMessage = useCallback(async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const userMsg: Message = { role: 'user', content: trimmed };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput('');
    setLoading(true);
    setShowSuggestions(false);

    try {
      const { data: { session } } = await supabase.auth.getSession();
      const token = session?.access_token;

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/chat`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            'Apikey': process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
          },
          body: JSON.stringify({
            messages: newMessages.map(m => ({ role: m.role, content: m.content })),
          }),
        }
      );

      const data = await res.json();

      if (data.error) {
        setMessages(prev => [...prev, { role: 'assistant', content: `Sorry, I encountered an issue: ${data.error}` }]);
      } else {
        setMessages(prev => [...prev, { role: 'assistant', content: data.reply }]);
        if (!open) setUnread(true);
      }
    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Sorry, I could not connect right now. Please check your connection and try again.',
      }]);
    } finally {
      setLoading(false);
    }
  }, [messages, loading, open]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const handleSuggestion = (q: string) => {
    sendMessage(q);
  };

  if (!user) return null;

  

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setOpen(true)}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full text-white shadow-lg hover:bg-[#004a93] transition-all duration-200 flex items-center justify-center group ${open ? 'hidden' : 'flex'}`}
        aria-label="Open AI Assistant"
        style={{
          backgroundColor: brandColor,
        }}
      >
        <MessageCircle className="w-6 h-6" />
        {unread && (
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-white" />
        )}
        <span className="absolute right-16 bg-slate-800 text-white text-xs px-2.5 py-1.5 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Ask SkillGuardian AI
        </span>
      </button>

      {/* Chat panel */}
      {open && (
        <div className="fixed bottom-6 right-6 z-50 w-[380px] max-w-[calc(100vw-2rem)] h-[600px] max-h-[calc(100vh-5rem)] flex flex-col bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden">
          {/* Header */}
          <div 
          className=" px-4 py-3.5 flex items-center gap-3 flex-shrink-0"
          style={{
          backgroundColor: brandColor,
        }}
          >
            <div className="w-9 h-9 rounded-full bg-white/20 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-semibold text-sm leading-tight">SkillGuardian AI</p>
              <p className="text-blue-200 text-xs">Care Practice Assistant</p>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="w-8 h-8 rounded-full hover:bg-white/20 flex items-center justify-center transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.map((msg, i) => (
              <MessageBubble key={i} message={msg} />
            ))}

            {loading && <TypingIndicator />}

            {/* Suggested questions */}
            {showSuggestions && messages.length <= 1 && !loading && (
              <div className="space-y-2 pt-1">
                <p className="text-xs text-slate-400 font-medium px-1">Suggested questions</p>
                {SUGGESTED_QUESTIONS.map((q, i) => (
                  <button
                    key={i}
                    onClick={() => handleSuggestion(q)}
                    className="w-full text-left text-xs bg-white border border-slate-200 hover:border-[#005EB8] hover:bg-blue-50 text-slate-700 px-3 py-2.5 rounded-xl transition-all duration-150 flex items-center gap-2 group"
                  >
                    <ChevronDown className="w-3 h-3 text-slate-400 group-hover:text-[#005EB8] -rotate-90 flex-shrink-0" />
                    {q}
                  </button>
                ))}
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-slate-200 p-3 bg-white flex-shrink-0">
            <div 
            className="flex items-end gap-2 bg-slate-50 border border-slate-200 rounded-xl px-3 py-2 focus-within:border-[#005EB8] focus-within:ring-1 focus-within:ring-[#005EB8]/20 transition-all"
            // style={{
            //   backgroundColor: brandColor,
            // }}
            >
              <textarea
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Ask anything about care practice..."
                rows={1}
                className="flex-1 bg-transparent text-sm text-slate-800 placeholder:text-slate-400 resize-none outline-none max-h-32 leading-5 py-0.5"
                style={{ minHeight: '22px' }}
                disabled={loading}
              />
              <button
                onClick={() => sendMessage(input)}
                disabled={!input.trim() || loading}
                className="w-8 h-8 rounded-lg text-white flex items-center justify-center hover:bg-[#004a93] disabled:opacity-40 disabled:cursor-not-allowed transition-all flex-shrink-0 self-end mb-0.5"
                aria-label="Send"
                style={{
                  backgroundColor: brandColor,
                }}
              >
                {loading
                  ? <Loader2 className="w-4 h-4 animate-spin" />
                  : <Send className="w-4 h-4" />
                }
              </button>
            </div>
            <p className="text-center text-[10px] text-slate-400 mt-2">
              AI responses are for guidance only — always follow your organisation's policies.
            </p>
          </div>
        </div>
      )}
    </>
  );
}
