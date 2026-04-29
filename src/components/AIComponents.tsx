import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Camera, X, Upload, Sparkles, Send } from 'lucide-react';
import { aiService, Product } from '../services/aiService';
import { INITIAL_PRODUCTS } from '../constants/products';
import { useNavigate } from 'react-router-dom';

export function VisualSearchModal({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) {
      setFile(f);
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(f);
    }
  };

  const handleSearch = async () => {
    if (!preview) return;
    setAnalyzing(true);
    const searchResult = await aiService.visualSearch(preview, INITIAL_PRODUCTS as any);
    setResult(searchResult);
    setAnalyzing(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <motion.div 
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            className="bg-white rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl"
          >
            <div className="p-6 border-b border-stone-100 flex justify-between items-center">
              <h3 className="text-xl font-serif font-bold">Visual Product Search</h3>
              <button onClick={onClose} className="p-2 hover:bg-stone-100 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="p-8 space-y-8">
              {!preview ? (
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-stone-200 rounded-2xl p-12 flex flex-col items-center gap-4 cursor-pointer hover:border-brand-primary group transition-all"
                >
                  <div className="w-16 h-16 bg-brand-primary/10 rounded-full flex items-center justify-center text-brand-primary group-hover:scale-110 transition-transform">
                    <Camera size={24} />
                  </div>
                  <div className="text-center">
                    <p className="font-bold text-stone-900">Upload product photo</p>
                    <p className="text-sm text-stone-500">Take a picture or drag & drop</p>
                  </div>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="aspect-square rounded-2xl overflow-hidden relative group">
                    <img src={preview} alt="Upload" className="w-full h-full object-cover" />
                    <button 
                      onClick={() => { setPreview(null); setFile(null); setResult(null); }}
                      className="absolute top-4 right-4 bg-black/60 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  
                  {result ? (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-brand-primary/5 rounded-2xl border border-brand-primary/10 space-y-4">
                      {result.match ? (
                        <>
                          <div className="flex justify-between items-center">
                             <p className="text-xs font-bold text-brand-primary uppercase tracking-widest">Match Found ({Math.round(result.confidence * 100)}%)</p>
                             <Sparkles className="text-brand-primary" size={16} />
                          </div>
                          <p className="text-sm text-stone-700">{result.reason}</p>
                          <button 
                            onClick={() => {
                              onClose();
                              navigate(`/product/${result.match.id}`);
                            }}
                            className="w-full btn-primary text-sm"
                          >
                            View Product
                          </button>
                        </>
                      ) : (
                        <p className="text-sm text-stone-500 text-center italic">No direct match found. Try another photo!</p>
                      )}
                    </motion.div>
                  ) : (
                    <button 
                      onClick={handleSearch}
                      disabled={analyzing}
                      className="w-full btn-primary flex items-center justify-center gap-2 group"
                    >
                      {analyzing ? (
                        <div className="flex items-center gap-2">
                           <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                           Analyzing...
                        </div>
                      ) : (
                        <>
                          Identify Product <Sparkles size={18} className="group-hover:rotate-12 transition-transform" />
                        </>
                      )}
                    </button>
                  )}
                </div>
              )}
              <input type="file" hidden ref={fileInputRef} onChange={handleFileChange} accept="image/*" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function SmartAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'model', text: string }[]>([
    { role: 'model', text: "Hello! I'm your Maple Leaf Assistant. Need help choosing the right pot for your Egusi soup or wondering which kettle boils fastest? Ask me anything!" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input || loading) return;

    const userMessage = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMessage }]);
    setLoading(true);

    const history = messages.map(m => ({ role: m.role, parts: [{ text: m.text }] }));
    const response = await aiService.getChatResponse(userMessage, history);
    
    setMessages(prev => [...prev, { role: 'model', text: response }]);
    setLoading(false);
    
    setTimeout(() => {
      scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }, 100);
  };

  return (
    <>
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-24 right-6 z-50 bg-stone-900 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform active:scale-95 flex items-center justify-center"
      >
        <Sparkles size={24} />
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 100, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.9 }}
            className="fixed bottom-0 right-0 sm:bottom-28 sm:right-6 z-[100] w-full sm:w-[400px] h-[600px] max-h-[90vh] bg-white sm:rounded-3xl shadow-2xl border border-stone-100 flex flex-col overflow-hidden"
          >
            <div className="p-6 bg-stone-900 text-white flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-brand-primary flex items-center justify-center text-xs font-bold">M</div>
                <div>
                  <h4 className="font-serif font-bold text-sm">Maple Assistant</h4>
                  <div className="flex items-center gap-1.5">
                    <div className="w-2 h-2 rounded-full bg-brand-accent animate-pulse"></div>
                    <span className="text-[10px] text-stone-400">Powered by Gemini</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 space-y-4 no-scrollbar">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${m.role === 'user' ? 'bg-brand-primary text-white rounded-tr-none' : 'bg-stone-100 text-stone-800 rounded-tl-none'}`}>
                    {m.text}
                  </div>
                </div>
              ))}
              {loading && (
                <div className="flex justify-start">
                  <div className="bg-stone-100 p-4 rounded-2xl rounded-tl-none">
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                      <div className="w-1.5 h-1.5 bg-stone-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            <form onSubmit={handleSend} className="p-4 border-t border-stone-100 bg-stone-50">
              <div className="relative">
                <input 
                  type="text" 
                  placeholder="Ask for advice..."
                  className="w-full bg-white border border-stone-200 rounded-2xl py-3 pl-4 pr-12 focus:outline-none focus:border-brand-primary transition-all shadow-sm text-sm"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                <button 
                  type="submit" 
                  disabled={!input || loading}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-brand-primary disabled:text-stone-300 transition-colors"
                >
                  <Send size={20} />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
