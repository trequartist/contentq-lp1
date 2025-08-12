'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

export function FounderVisionCard() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <>
      <div className="relative max-w-4xl mx-auto mt-3 rounded-2xl border border-slate-200/70 bg-white/80 backdrop-blur-md p-2 z-10">
        <Badge className="absolute -top-3 right-4 bg-[#94D82D] text-white hover:bg-[#94D82D]/90 shadow-sm">
          Founder's Vision
        </Badge>
        
        <div className="space-y-1 text-slate-800">
          <p className="text-lg font-medium">💭 Why We Built This</p>
          <p className="text-base leading-relaxed">
            "We're building AI that actually knows you. Most people don't realize what's possible yet. AI can be so much more than a writing assistant. We're building systems with actual memory — that learn your voice, carry your context, and get smarter about your business every single day. Raunak led ML at Google Gemini. I've been obsessed with storytelling for years."
          </p>
          
          <button
            onClick={() => setIsExpanded(true)}
            className="group inline-flex items-center gap-2 text-[#94D82D] font-medium hover:text-[#85C326] transition-colors"
          >
            Continue reading
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </button>
          
          <p className="text-slate-500 text-base">— Anish, CEO (with Raunak, CTO)</p>
        </div>
      </div>

      {/* Full-screen modal */}
      {isExpanded && (
        <div className="fixed inset-0 z-[60] bg-black/50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full bg-white rounded-2xl p-6 max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setIsExpanded(false)}
              className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            
            <Badge className="mb-4 bg-[#94D82D] text-white">
              Founder's Vision
            </Badge>
            
            <div className="space-y-4 text-slate-800">
              <p className="text-xl font-medium">💭 Why We Built This</p>
              
              <p className="text-base leading-relaxed">
                "We're building AI that actually knows you. Most people don't realize what's possible yet. AI can be so much more than a writing assistant. We're building systems with actual memory — that learn your voice, carry your context, and get smarter about your business every single day. Raunak led ML at Google Gemini. I've been obsessed with storytelling for years."
              </p>
              
              <p className="text-base leading-relaxed">
                Here's what we realized: Telling your story effectively takes massive expertise and bandwidth. You need to understand every platform's language, every algorithm's preference, every audience's context. Few have the bandwidth to do this, and fewer still have the multi-platform expertise to do it right. That's where real AI intelligence changes everything — it becomes the bridge between what you know and what gets heard.
              </p>
              
              <p className="text-base leading-relaxed">
                ContentQ is teammate #1. It builds your knowledge graph and uses that intelligence to tell your story authentically across every channel that matters. But we're just getting started. We're building AI that doesn't just execute tasks — it thinks with you, sees patterns you miss, and helps you articulate things you couldn't quite put into words.
              </p>
              
              <p className="text-base leading-relaxed">
                The future belongs to companies that truly understand their customers and can tell stories that move them. We're building the AI to make that happen. Ready?
              </p>
              
              <p className="text-slate-500 text-base mt-6">— Anish, CEO (with Raunak, CTO)</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}