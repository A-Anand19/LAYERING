import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mail, ShieldCheck, Brain, ArrowUp, ChevronLeft, Moon, Activity, MessageCircle, Book, Wind, Plus, HeartPulse, Mic, Zap, Sparkles, BarChart2, CheckCircle2, Lock } from 'lucide-react';

// Custom Apple Logo SVG
const AppleIcon = () => (
  <svg viewBox="0 0 384 512" width="20" height="20" fill="currentColor">
    <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"/>
  </svg>
);

// Haptic feedback simulator
const haptic = (type: 'light' | 'medium' | 'heavy' | 'success' | 'rigid' | 'warning') => {
  if (typeof navigator !== 'undefined' && navigator.vibrate) {
    switch (type) {
      case 'light': navigator.vibrate(10); break;
      case 'medium': navigator.vibrate(20); break;
      case 'heavy': navigator.vibrate(30); break;
      case 'success': navigator.vibrate([15, 50, 15]); break;
      case 'rigid': navigator.vibrate(15); break;
      case 'warning': navigator.vibrate([30, 50, 30, 50, 30]); break;
    }
  }
};

// Liquid Glassmorphism 2.0 Design Tokens
const liquidGlass = "liquid-glass";
const liquidGlassActive = "liquid-glass-active";
const primaryGradient = "bg-gradient-to-br from-[#FF2D78] to-[#FF6B35] shadow-[0_8px_24px_rgba(255,45,120,0.35)]";

const springAnim = { type: "spring", response: 0.20, dampingFraction: 0.82 };
const snappySpring = { type: "spring", response: 0.15, dampingFraction: 0.85 };

// Glowing Orb (10% Liquid Glassmorphism with Wide Illumination)
const GlowingOrb = ({ className, colors, pulse = false }: { className: string, colors: string, pulse?: boolean }) => (
  <motion.div 
    animate={pulse ? { scale: [1, 1.06, 1], opacity: [0.65, 1, 0.65] } : {}}
    transition={pulse ? { duration: 4.5, repeat: Infinity, ease: "easeInOut" } : {}}
    className={`relative rounded-full ${className}`}
  >
    {/* Wide Spread Illuminating Glow */}
    <div className={`absolute inset-[-50%] rounded-full ${colors} blur-[100px] opacity-20`} />
    <div className={`absolute inset-[-20%] rounded-full ${colors} blur-[64px] opacity-40`} />
    <div className={`absolute inset-0 rounded-full ${colors} blur-[32px] opacity-60`} />
    <div className={`absolute inset-0 rounded-full ${colors} blur-[12px] opacity-80`} />
    <div className={`absolute inset-[15%] rounded-full ${colors} opacity-100`} />
    
    {/* 10% Liquid Glassmorphism Shell */}
    <div className="absolute inset-0 rounded-full bg-white/[0.01] backdrop-blur-[2px] border-[0.5px] border-white/[0.05]" />
  </motion.div>
);

export default function App() {
  const [currentView, setCurrentView] = useState<'launch' | 'onboarding' | 'fingerprint' | 'main'>('launch');
  const [userData, setUserData] = useState({ mind: '', hardDay: [] as string[], wish: '', mood: 50 });

  useEffect(() => {
    if (currentView === 'launch') {
      const timer = setTimeout(() => setCurrentView('onboarding'), 1540);
      return () => clearTimeout(timer);
    }
  }, [currentView]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-black selection:bg-[#FF2D78]/30">
      <div className="w-full h-[100dvh] md:max-w-[1024px] mx-auto bg-[#0D1114] relative overflow-hidden shadow-2xl text-white font-sans md:border-x md:border-[#1C1C22]">
        <AnimatePresence mode="wait">
          {currentView === 'launch' && <LaunchScreen key="launch" />}
          {currentView === 'onboarding' && (
            <OnboardingScreen 
              key="onboarding" 
              onContinue={() => {
                haptic('medium');
                setCurrentView('fingerprint');
              }} 
            />
          )}
          {currentView === 'fingerprint' && (
            <FingerprintScreen 
              key="fingerprint" 
              onComplete={(data) => {
                setUserData(data);
                haptic('success');
                setCurrentView('main');
              }} 
            />
          )}
          {currentView === 'main' && <MainTabView key="main" userData={userData} />}
        </AnimatePresence>
      </div>
    </div>
  );
}

function LaunchScreen() {
  return (
    <motion.div 
      className="absolute inset-0 bg-black flex flex-col items-center justify-center z-50"
      exit={{ opacity: 0, transition: { duration: 1.54, ease: "easeOut" } }}
    >
      <motion.div
        initial={{ scale: 0.3, opacity: 0 }}
        animate={{ scale: [0.3, 1.0, 1.15, 1.0], opacity: 1 }}
        transition={{ duration: 0.4, times: [0, 0.3, 0.5, 1], ease: "easeOut" }}
      >
        <GlowingOrb className="w-40 h-40" colors="bg-[radial-gradient(circle_at_center,#FFFFFF_0%,#FF2D78_40%,#818CF8_100%)]" pulse={true} />
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, ...springAnim }}
        className="mt-8 text-[42px] font-bold tracking-tight"
      >
        CluWell
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.4 }}
        className="mt-2 text-[17px] text-[#AFAFBF] font-medium"
      >
        Tell me, I'm here
      </motion.p>
    </motion.div>
  );
}

function OnboardingScreen({ onContinue }: { onContinue: () => void, key?: string }) {
  return (
    <motion.div 
      className="absolute inset-0 bg-[#0D1114] flex flex-col z-40"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 1.54, ease: "easeOut" } }}
      exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
    >
      <motion.div 
        animate={{ x: [ -80, 80, -80 ], y: [ -200, -120, -200 ] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[400px] h-[400px] rounded-full bg-[radial-gradient(circle,rgba(255,45,120,0.25)_0%,transparent_70%)] blur-[60px] top-0 left-0"
      />
      <motion.div 
        animate={{ x: [ 120, -100, 120 ], y: [ 150, 220, 150 ] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute w-[360px] h-[360px] rounded-full bg-[radial-gradient(circle,rgba(129,140,248,0.2)_0%,transparent_70%)] blur-[50px] top-1/4 right-0"
      />

      <div className="relative z-10 flex flex-col items-center justify-center flex-1 mt-20">
        <GlowingOrb className="w-[156px] h-[156px] mb-8" colors="bg-[radial-gradient(circle_at_center,#FFFFFF_0%,#FF2D78_40%,#818CF8_100%)]" pulse={true} />
        <h1 className="text-[44px] font-bold tracking-tight text-white">CluWell</h1>
        <p className="text-[17px] text-[#AFAFBF] mt-2 font-medium">Tell me, I'm here</p>
      </div>

      <div className="relative z-10 px-7 pb-12 flex flex-col gap-4">
        <div className={`flex items-center justify-center gap-2 mt-1 mb-4 text-[#AFAFBF] text-[12px] py-2.5 px-5 rounded-full self-center ${liquidGlass}`}>
          <ShieldCheck size={16} className="text-[#22C55E]" />
          <span className="font-medium tracking-wide">Your conversations stay on your device.</span>
        </div>

        <button 
          onClick={onContinue}
          className="w-full h-[56px] bg-white text-black rounded-full flex items-center justify-center gap-2.5 font-semibold text-[17px] transition-all duration-300 ease-out active:scale-[0.96] active:bg-[#E5E5E5] shadow-[0_4px_14px_rgba(255,255,255,0.25)]"
        >
          <AppleIcon />
          Sign in with Apple
        </button>
        <button 
          onClick={onContinue}
          className={`w-full h-[56px] rounded-full flex items-center justify-center gap-2.5 font-semibold text-[17px] transition-all duration-300 ease-out active:scale-[0.96] ${liquidGlass}`}
        >
          <Mail size={20} />
          Continue with Email
        </button>
        <p className="text-[11px] text-[#6E6E7E] text-center mt-5 leading-relaxed px-4">
          By continuing, you agree to our Terms of Service and Privacy Policy. CluWell is a wellness companion, not a medical device.
        </p>
        <p className="text-[11px] text-[#AFAFBF] text-center mt-2 mb-2 font-medium tracking-wide">
          © 2026 Aditya Anand. All Rights Reserved.
        </p>
      </div>
    </motion.div>
  );
}

function FingerprintScreen({ onComplete }: { onComplete: (data: any) => void, key?: string }) {
  const [step, setStep] = useState(1);
  const [mindText, setMindText] = useState('');
  const [wishText, setWishText] = useState('');
  const [selectedHardDay, setSelectedHardDay] = useState<string[]>([]);
  const [mood, setMood] = useState(50);

  const hardDayOptions = [
    "I go quiet and isolate",
    "I overthink everything",
    "I can't sleep",
    "I lose motivation completely"
  ];

  const handleNext = () => {
    if (step === 5) {
      onComplete({ mind: mindText, hardDay: selectedHardDay, wish: wishText, mood });
    } else {
      haptic('medium');
      setStep(s => s + 1);
    }
  };

  const toggleOption = (opt: string) => {
    haptic('light');
    setSelectedHardDay(prev => 
      prev.includes(opt) ? prev.filter(o => o !== opt) : [...prev, opt]
    );
  };

  const getMoodColor = () => {
    if (mood < 20) return 'rgba(239,68,68,0.2)'; 
    if (mood < 40) return 'rgba(245,158,11,0.2)'; 
    if (mood < 60) return 'rgba(129,140,248,0.2)'; 
    if (mood < 80) return 'rgba(34,197,94,0.2)'; 
    return 'rgba(0,229,204,0.2)'; 
  };

  const getDynamicResponse = () => {
    if (!selectedHardDay.length) return "I'm here to listen, whenever you're ready.";
    const hard = selectedHardDay[0].toLowerCase();
    const wishSnippet = wishText.length > 20 ? wishText.substring(0, 20) + "..." : wishText;
    return `I heard that hard days make you ${hard}. When things get heavy, I'll remember to ask you "${wishSnippet}". You're not alone in this.`;
  };

  return (
    <motion.div 
      className="absolute inset-0 bg-[#0D1114] flex flex-col z-40 overflow-hidden"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={springAnim}
    >
      <div className="absolute top-[-10%] right-[-10%] w-[300px] h-[300px] bg-[#FF2D78]/10 blur-[80px] rounded-full pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[300px] h-[300px] bg-[#818CF8]/10 blur-[80px] rounded-full pointer-events-none" />

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div key="step1" className="flex flex-col h-full relative z-10" exit={{ opacity: 0, x: -20 }} transition={springAnim}>
            <div className="px-6 pt-14 pb-4">
              <h2 className="text-[32px] font-bold leading-tight tracking-tight">What's been on your mind lately?</h2>
              <p className="text-[17px] text-[#AFAFBF] mt-2 font-medium">Just talk. I'm listening.</p>
            </div>
            <div className="flex-1 px-6 py-2">
              <div className={`w-full h-full rounded-[24px] p-5 ${liquidGlass}`}>
                <textarea 
                  value={mindText}
                  onChange={(e) => setMindText(e.target.value)}
                  placeholder="I've been feeling..."
                  className="w-full h-full bg-transparent text-[20px] text-white placeholder:text-[#5E5E6E] resize-none focus:outline-none leading-relaxed"
                  autoFocus
                />
              </div>
            </div>
            <div className="p-6 pb-10">
              <button 
                onClick={handleNext}
                disabled={mindText.length === 0}
                className={`w-full h-[56px] rounded-full flex items-center justify-center font-semibold text-[17px] transition-all duration-300 ease-out ${
                  mindText.length > 0 ? `${primaryGradient} text-white active:scale-[0.96]` : `${liquidGlass} text-[#6E6E7E]`
                }`}
              >
                Continue
              </button>
            </div>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div key="step2" className="flex flex-col h-full relative z-10" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={springAnim}>
            <div className="px-6 pt-14 pb-4">
              <h2 className="text-[32px] font-bold leading-tight tracking-tight">What does a hard day look like for you?</h2>
              <p className="text-[17px] text-[#AFAFBF] mt-2 font-medium">Select all that apply. This helps me know when to step in.</p>
            </div>
            <div className="flex-1 px-6 flex flex-col gap-4 mt-4">
              {hardDayOptions.map(opt => {
                const isSelected = selectedHardDay.includes(opt);
                return (
                  <button
                    key={opt}
                    onClick={() => toggleOption(opt)}
                    className={`w-full text-left px-6 py-5 rounded-[24px] transition-all duration-300 ease-out active:scale-[0.96] ${
                      isSelected ? `${liquidGlassActive} text-white` : `${liquidGlass} text-[#AFAFBF]`
                    }`}
                  >
                    <span className="text-[17px] font-medium">{opt}</span>
                  </button>
                );
              })}
            </div>
            <div className="p-6 pb-10">
              <button 
                onClick={handleNext}
                disabled={selectedHardDay.length === 0}
                className={`w-full h-[56px] rounded-full flex items-center justify-center font-semibold text-[17px] transition-all duration-300 ease-out ${
                  selectedHardDay.length > 0 ? `${primaryGradient} text-white active:scale-[0.96]` : `${liquidGlass} text-[#6E6E7E]`
                }`}
              >
                Continue
              </button>
            </div>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div key="step3" className="flex flex-col h-full relative z-10" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={springAnim}>
            <div className="px-6 pt-14 pb-4">
              <h2 className="text-[32px] font-bold leading-tight tracking-tight">What do you wish someone would ask you more often?</h2>
              <p className="text-[17px] text-[#AFAFBF] mt-2 font-medium">I will use this to check in on you.</p>
            </div>
            <div className="flex-1 px-6 py-2">
              <div className={`w-full h-full rounded-[24px] p-5 ${liquidGlass}`}>
                <textarea 
                  value={wishText}
                  onChange={(e) => setWishText(e.target.value)}
                  placeholder="I wish someone asked..."
                  className="w-full h-full bg-transparent text-[20px] text-white placeholder:text-[#5E5E6E] resize-none focus:outline-none leading-relaxed"
                  autoFocus
                />
              </div>
            </div>
            <div className="p-6 pb-10">
              <button 
                onClick={handleNext}
                disabled={wishText.length === 0}
                className={`w-full h-[56px] rounded-full flex items-center justify-center font-semibold text-[17px] transition-all duration-300 ease-out ${
                  wishText.length > 0 ? `${primaryGradient} text-white active:scale-[0.96]` : `${liquidGlass} text-[#6E6E7E]`
                }`}
              >
                Continue
              </button>
            </div>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div key="step4" className="flex flex-col h-full relative z-10" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={springAnim}>
            <motion.div 
              className="absolute inset-0 transition-colors duration-700 ease-in-out"
              style={{ background: `radial-gradient(circle at center, ${getMoodColor()} 0%, transparent 70%)` }}
            />
            <div className="px-6 pt-14 pb-4 relative z-10">
              <h2 className="text-[32px] font-bold leading-tight text-center tracking-tight">How do you feel right now, honestly?</h2>
            </div>
            <div className="flex-1 flex flex-col items-center justify-center px-8 relative z-10">
              <div className={`w-full max-w-[300px] p-8 rounded-[32px] ${liquidGlass} flex flex-col items-center gap-8`}>
                <div className="text-[48px] font-bold tracking-tighter">
                  {mood}%
                </div>
                <div className="w-full relative">
                  <input 
                    type="range" 
                    min="0" max="100" 
                    value={mood}
                    onChange={(e) => {
                      setMood(parseInt(e.target.value));
                      haptic('rigid');
                    }}
                    className="w-full h-3 bg-black/40 rounded-full appearance-none outline-none
                               [&::-webkit-slider-thumb]:appearance-none
                               [&::-webkit-slider-thumb]:w-7
                               [&::-webkit-slider-thumb]:h-7
                               [&::-webkit-slider-thumb]:bg-white
                               [&::-webkit-slider-thumb]:rounded-full
                               [&::-webkit-slider-thumb]:shadow-[0_2px_10px_rgba(0,0,0,0.5)]
                               [&::-webkit-slider-thumb]:border
                               [&::-webkit-slider-thumb]:border-black/10
                               cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, #EF4444, #818CF8, #00E5CC) no-repeat`,
                      backgroundSize: `${mood}% 100%`,
                      backgroundColor: 'rgba(0,0,0,0.4)'
                    }}
                  />
                </div>
                <div className="w-full flex justify-between text-[#AFAFBF] text-[13px] font-semibold uppercase tracking-widest">
                  <span>Rough</span>
                  <span>Great</span>
                </div>
              </div>
            </div>
            <div className="p-6 pb-10 relative z-10">
              <button 
                onClick={handleNext}
                className={`w-full h-[56px] rounded-full flex items-center justify-center font-semibold text-[17px] transition-all duration-300 ease-out ${primaryGradient} text-white active:scale-[0.96]`}
              >
                Save Baseline
              </button>
            </div>
          </motion.div>
        )}

        {step === 5 && (
          <motion.div key="step5" className="flex flex-col h-full items-center justify-center px-8 relative z-10 text-center" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, ease: "easeOut" }}>
            
            <GlowingOrb 
              className="w-[150px] h-[150px] mb-12" 
              colors="bg-[radial-gradient(circle_at_center,#FFFFFF_0%,#FF2D78_40%,#818CF8_100%)]" 
              pulse={true} 
            />

            <motion.h2 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.8, ease: "easeOut" }}
              className="text-[40px] font-bold mb-5 tracking-tight"
            >
              I'm Aria. I'm here.
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.6, duration: 0.8, ease: "easeOut" }}
              className="text-[18px] text-[#EBEBF5] leading-[1.6] max-w-[300px] mx-auto font-medium"
            >
              {getDynamicResponse()}
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 3.5, duration: 0.6, ease: "easeOut" }}
              className="absolute bottom-10 left-6 right-6"
            >
              <button 
                onClick={handleNext}
                className={`w-full h-[56px] rounded-full flex items-center justify-center font-semibold text-[17px] transition-all duration-300 ease-out ${primaryGradient} text-white active:scale-[0.96]`}
              >
                Enter CluWell
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

// FULL V2 ARCHITECTURE: Main Tab View (3 Tabs, Starts with Chat)
function MainTabView({ userData }: { userData: any, key?: string }) {
  const [activeTab, setActiveTab] = useState<'chat' | 'journal' | 'rituals'>('chat');
  const [isPremium, setIsPremium] = useState(false);
  const [showPaywall, setShowPaywall] = useState(false);

  return (
    <div className="absolute inset-0 bg-[#0D1114] flex flex-col z-40 overflow-hidden">
      
      {/* Tab Content */}
      <div className="flex-1 relative">
        <AnimatePresence mode="wait">
          {activeTab === 'chat' && <ChatScreen key="chat" userData={userData} isPremium={isPremium} onRequirePremium={() => setShowPaywall(true)} />}
          {activeTab === 'journal' && <JournalView key="journal" isPremium={isPremium} onRequirePremium={() => setShowPaywall(true)} />}
          {activeTab === 'rituals' && <RitualsView key="rituals" isPremium={isPremium} onRequirePremium={() => setShowPaywall(true)} />}
        </AnimatePresence>
      </div>

      {/* Liquid Glassmorphism Tab Bar (3 Tabs Only) */}
      <div className="absolute bottom-6 left-8 right-8 h-[68px] rounded-full flex items-center justify-between px-3 z-50 bg-white/[0.06] backdrop-blur-[20px] border-[0.5px] border-white/[0.15] shadow-[0_16px_40px_rgba(0,0,0,0.5)]">
        <TabButton icon={<MessageCircle size={24} />} label="Aria" isActive={activeTab === 'chat'} onClick={() => { haptic('light'); setActiveTab('chat'); }} />
        <TabButton icon={<Book size={24} />} label="Journal" isActive={activeTab === 'journal'} onClick={() => { haptic('light'); setActiveTab('journal'); }} />
        <TabButton icon={<Wind size={24} />} label="Rituals" isActive={activeTab === 'rituals'} onClick={() => { haptic('light'); setActiveTab('rituals'); }} />
      </div>

      <AnimatePresence>
        {showPaywall && (
          <PaywallView 
            onClose={() => setShowPaywall(false)} 
            onSubscribe={() => { setIsPremium(true); setShowPaywall(false); haptic('success'); }} 
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function TabButton({ icon, label, isActive, onClick }: { icon: React.ReactNode, label: string, isActive: boolean, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`relative flex-1 h-full flex flex-col items-center justify-center gap-1 transition-all duration-300 ease-out active:scale-95 ${isActive ? 'text-[#FF2D78]' : 'text-[#6E6E7E]'}`}
    >
      {isActive && (
        <motion.div layoutId="activeTab" className="absolute inset-1 bg-[#FF2D78]/15 rounded-full" transition={snappySpring} />
      )}
      <div className="relative z-10">{icon}</div>
      <span className="text-[10px] font-semibold tracking-wide relative z-10">{label}</span>
    </button>
  );
}

// V2 Journal View with Insights
function JournalView({ isPremium, onRequirePremium }: { isPremium: boolean, onRequirePremium: () => void, key?: string }) {
  const [showInsights, setShowInsights] = useState(false);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 overflow-y-auto pb-32 pt-12 px-6">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-[34px] font-bold tracking-tight">Journal</h1>
        <button 
          onClick={() => { 
            haptic('light'); 
            if(!isPremium) onRequirePremium(); 
            else setShowInsights(true); 
          }} 
          className={`p-2.5 rounded-full ${liquidGlass} active:scale-95 transition-all flex items-center justify-center`}
        >
          <BarChart2 size={22} className={isPremium ? "text-[#00E5CC]" : "text-[#AFAFBF]"} />
          {!isPremium && <Lock size={12} className="absolute bottom-1 right-1 text-[#FF2D78]" />}
        </button>
      </div>
      
      <div className="flex flex-col gap-4">
        <div className={`w-full p-5 rounded-[24px] ${liquidGlass}`}>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-3 h-3 rounded-full bg-[#00E5CC]" />
            <span className="text-[14px] font-semibold">Today, 9:41 AM</span>
          </div>
          <h3 className="text-[18px] font-bold mb-2">Feeling overwhelmed but okay</h3>
          <p className="text-[15px] text-[#AFAFBF] line-clamp-2">I woke up feeling like there was a weight on my chest, but I managed to get out of bed and make coffee...</p>
        </div>
      </div>

      {/* FAB */}
      <button className={`absolute bottom-28 right-6 w-14 h-14 rounded-full ${primaryGradient} flex items-center justify-center shadow-lg active:scale-90 transition-all`}>
        <Plus size={28} className="text-white" />
      </button>

      <AnimatePresence>
        {showInsights && <InsightsView onClose={() => setShowInsights(false)} />}
      </AnimatePresence>
    </motion.div>
  );
}

// V2 Rituals View
function RitualsView({ isPremium, onRequirePremium }: { isPremium: boolean, onRequirePremium: () => void, key?: string }) {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="absolute inset-0 overflow-y-auto pb-32 pt-12 px-6">
      <h1 className="text-[34px] font-bold tracking-tight mb-8">Rituals</h1>
      
      <div className="grid grid-cols-2 gap-4">
        <div className={`p-5 rounded-[24px] bg-gradient-to-br from-[#00E5CC]/20 to-[#0090FF]/20 border border-[#00E5CC]/30 aspect-square flex flex-col justify-between`}>
          <HeartPulse size={28} className="text-[#00E5CC]" />
          <div>
            <h3 className="text-[16px] font-bold">Deep Focus</h3>
            <p className="text-[12px] text-[#AFAFBF] mt-1">10 min</p>
          </div>
        </div>
        <div className={`p-5 rounded-[24px] bg-gradient-to-br from-[#FB7185]/20 to-[#FF99C8]/20 border border-[#FB7185]/30 aspect-square flex flex-col justify-between`}>
          <Moon size={28} className="text-[#FB7185]" />
          <div>
            <h3 className="text-[16px] font-bold">Wind-down</h3>
            <p className="text-[12px] text-[#AFAFBF] mt-1">8 min</p>
          </div>
        </div>
        
        {/* Premium Locked Ritual */}
        <div 
          onClick={() => { if(!isPremium) onRequirePremium(); }}
          className={`p-5 rounded-[24px] ${liquidGlass} aspect-square flex flex-col justify-between opacity-70 ${!isPremium ? 'cursor-pointer active:scale-95 transition-all' : ''}`}
        >
          <div className="flex justify-between">
            <Activity size={28} className="text-[#AFAFBF]" />
            {!isPremium && <Lock size={16} className="text-[#FF2D78]" />}
          </div>
          <div>
            <h3 className="text-[16px] font-bold">Anxiety Reset</h3>
            <p className="text-[12px] text-[#AFAFBF] mt-1">15 min</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// V2 Chat Screen with Voice Mode & Paywall Triggers
function ChatScreen({ userData, isPremium, onRequirePremium }: { userData: any, isPremium: boolean, onRequirePremium: () => void, key?: string }) {
  const [messages, setMessages] = useState<{id: number, role: string, text: string}[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [showMemory, setShowMemory] = useState(false);
  const [showCrisis, setShowCrisis] = useState(false);
  const [showVoiceMode, setShowVoiceMode] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const hasStartedChat = messages.length > 0;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSend = (textOverride?: string) => {
    const textToSend = textOverride || input;
    if (!textToSend.trim()) return;
    
    haptic('light');
    const newUserMsg = { id: Date.now(), role: 'user', text: textToSend };
    const updatedMessages = [...messages, newUserMsg];
    setMessages(updatedMessages);
    setInput('');

    // Crisis Protocol Detection
    const lowerText = textToSend.toLowerCase();
    if (lowerText.includes('suicide') || lowerText.includes('kill myself') || lowerText.includes('end it all')) {
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        haptic('warning');
        setShowCrisis(true);
      }, 1000);
      return;
    }

    setIsTyping(true);
    
    setTimeout(() => {
      setIsTyping(false);
      haptic('medium');
      setMessages(prev => [...prev, { 
        id: Date.now() + 1, 
        role: 'ai', 
        text: "I hear you. Let's talk through it. What's sitting heaviest right now?" 
      }]);
    }, 1000);
  };

  return (
    <div className="absolute inset-0 bg-[#0D1114] flex flex-col z-40 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(13,23,23,0.6)_0%,rgba(13,17,20,1)_70%)] pointer-events-none" />

      {/* Chat Header */}
      <div className="absolute top-0 left-0 right-0 h-[100px] pt-10 pb-2 px-5 flex items-center justify-end z-50 pointer-events-none">
        <button 
          onClick={() => { haptic('medium'); setShowMemory(true); }}
          className={`p-2.5 mr-2 rounded-full ${liquidGlass} transition-all duration-300 ease-out active:scale-[0.96] shrink-0 pointer-events-auto`}
        >
          <Brain size={22} className="text-[#A5B4FC]" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto relative z-10 flex flex-col pb-24">
        {!hasStartedChat ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex-1 flex flex-col items-center justify-center px-6 pb-20"
          >
            <GlowingOrb 
              className="w-[134px] h-[134px] mb-10" 
              colors="bg-[radial-gradient(circle_at_center,#38BDF8_0%,#818CF8_40%,#2DD4BF_100%)]" 
              pulse={true} 
            />
            <h2 className="text-[36px] font-bold mb-2 tracking-tight">Hi.</h2>
            <h3 className="text-[24px] text-[#AFAFBF] mb-10 tracking-tight font-medium">Where should we start?</h3>
            
            <div className={`w-full p-1.5 pl-4 pr-1.5 rounded-[28px] ${liquidGlass} flex items-center gap-1.5 mb-8 shadow-[0_12px_40px_rgba(0,0,0,0.4)]`}>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Message Aria..."
                className="flex-1 min-w-0 bg-transparent text-[17px] text-white placeholder:text-[#6E6E7E] px-2 py-3 focus:outline-none"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSend();
                }}
              />
              <button 
                onClick={() => {
                  haptic('medium');
                  if (!isPremium) onRequirePremium();
                  else setShowVoiceMode(true);
                }}
                className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ease-out bg-white/5 text-[#AFAFBF] active:scale-[0.90] relative`}
              >
                <Mic size={20} />
                {!isPremium && <Lock size={10} className="absolute bottom-2 right-2 text-[#FF2D78]" />}
              </button>
              <button 
                onClick={() => handleSend()}
                disabled={!input.trim()}
                className={`w-11 h-11 rounded-full flex items-center justify-center shrink-0 transition-all duration-300 ease-out ${
                  input.trim() ? `${primaryGradient} text-white active:scale-[0.90]` : 'bg-white/5 text-[#6E6E7E]'
                }`}
              >
                <ArrowUp size={20} />
              </button>
            </div>

            <div className="flex flex-wrap justify-center gap-3">
              <button onClick={() => handleSend("I need to vent.")} className={`px-4 py-2.5 rounded-full flex items-center gap-2 text-[14px] font-medium transition-all duration-300 active:scale-[0.96] ${liquidGlass}`}>
                <MessageCircle size={16} className="text-[#FF2D78]" /> I need to vent
              </button>
              <button onClick={() => handleSend("Help me sleep.")} className={`px-4 py-2.5 rounded-full flex items-center gap-2 text-[14px] font-medium transition-all duration-300 active:scale-[0.96] ${liquidGlass}`}>
                <Moon size={16} className="text-[#818CF8]" /> Help me sleep
              </button>
            </div>
          </motion.div>
        ) : (
          <div className="flex-1 px-4 py-6 pt-[100px] flex flex-col gap-4">
            {messages.map((msg) => (
              <motion.div 
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={springAnim}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] px-5 py-3.5 rounded-[24px] text-[16px] leading-relaxed ${
                  msg.role === 'user' 
                    ? `${primaryGradient} rounded-br-[6px]` 
                    : `${liquidGlass} rounded-bl-[6px]`
                }`}>
                  {msg.text}
                </div>
              </motion.div>
            ))}
            {isTyping && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                <div className={`px-5 py-4 rounded-[24px] rounded-bl-[6px] ${liquidGlass} flex gap-1.5`}>
                  <motion.div animate={{ scale: [0.8, 1.3, 0.8] }} transition={{ repeat: Infinity, duration: 1, delay: 0 }} className="w-1.5 h-1.5 bg-[#AFAFBF] rounded-full" />
                  <motion.div animate={{ scale: [0.8, 1.3, 0.8] }} transition={{ repeat: Infinity, duration: 1, delay: 0.2 }} className="w-1.5 h-1.5 bg-[#AFAFBF] rounded-full" />
                  <motion.div animate={{ scale: [0.8, 1.3, 0.8] }} transition={{ repeat: Infinity, duration: 1, delay: 0.4 }} className="w-1.5 h-1.5 bg-[#AFAFBF] rounded-full" />
                </div>
              </motion.div>
            )}
            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      <AnimatePresence>
        {hasStartedChat && (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-[80px] left-0 right-0 px-4 pb-4 pt-2 bg-gradient-to-t from-[#0D1114] via-[#0D1114] to-transparent z-20"
          >
            <div className={`flex items-end gap-1.5 p-1.5 pl-4 pr-1.5 rounded-[28px] ${liquidGlass}`}>
              <textarea
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Message Aria..."
                className="flex-1 min-w-0 max-h-[120px] min-h-[44px] bg-transparent text-white placeholder:text-[#6E6E7E] py-3 focus:outline-none resize-none text-[16px]"
                rows={1}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
              />
              <div className="flex items-center gap-1.5 shrink-0 pb-0.5">
                <button 
                  onClick={() => {
                    haptic('medium');
                    if (!isPremium) onRequirePremium();
                    else setShowVoiceMode(true);
                  }}
                  className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center transition-all duration-300 ease-out bg-white/5 text-[#AFAFBF] active:scale-[0.90] relative`}
                >
                  <Mic size={18} />
                  {!isPremium && <Lock size={10} className="absolute bottom-2 right-2 text-[#FF2D78]" />}
                </button>
                <button 
                  onClick={() => handleSend()}
                  disabled={!input.trim()}
                  className={`w-10 h-10 shrink-0 rounded-full flex items-center justify-center transition-all duration-300 ease-out ${
                    input.trim() ? `${primaryGradient} text-white active:scale-[0.90]` : 'bg-white/5 text-[#6E6E7E]'
                  }`}
                >
                  <ArrowUp size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Voice Mode View */}
      <AnimatePresence>
        {showVoiceMode && <VoiceModeView onClose={() => setShowVoiceMode(false)} onSend={handleSend} />}
      </AnimatePresence>

      {/* Crisis Protocol Modal */}
      <AnimatePresence>
        {showCrisis && (
          <motion.div 
            initial={{ opacity: 0, y: '100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '100%' }}
            transition={springAnim}
            className="absolute inset-0 z-[60] bg-[#0D1114] flex flex-col items-center justify-center px-6 text-center"
          >
            <div className="w-20 h-20 rounded-full bg-[#EF4444]/20 flex items-center justify-center mb-8">
              <ShieldCheck size={40} className="text-[#EF4444]" />
            </div>
            <h2 className="text-[32px] font-bold mb-4">We're here for you.</h2>
            <p className="text-[17px] text-[#AFAFBF] mb-10 leading-relaxed">
              I care about you too much to only be an app right now. Here are real humans who want to help.
            </p>
            
            <div className="w-full flex flex-col gap-4">
              <button className="w-full py-4 rounded-[24px] bg-[#EF4444] text-white font-bold text-[17px] active:scale-95 transition-all">
                Call 988 (Crisis Lifeline)
              </button>
              <button className={`w-full py-4 rounded-[24px] ${liquidGlass} font-bold text-[17px] active:scale-95 transition-all`}>
                Text HOME to 741741
              </button>
              <button 
                onClick={() => setShowCrisis(false)}
                className="mt-4 text-[#6E6E7E] font-medium text-[15px]"
              >
                Continue talking to Aria
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Memory View */}
      <AnimatePresence>
        {showMemory && (
          <motion.div 
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="absolute inset-0 z-50 bg-[#121214] flex flex-col"
          >
            <div className="h-[88px] pt-12 px-4 flex items-center justify-between border-b border-white/[0.05]">
              <button onClick={() => { haptic('light'); setShowMemory(false); }} className="p-2 transition-all duration-300 ease-out active:scale-[0.96]">
                <ChevronLeft size={28} className="text-white" />
              </button>
              <h2 className="text-[18px] font-bold tracking-wide">What I Know About You</h2>
              <div className="w-11" />
            </div>
            
            <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-4">
              <p className="text-[15px] text-[#AFAFBF] mb-2 leading-relaxed">
                Aria uses these memories to personalize your experience. <span className="text-[#38BDF8]">You can delete them at any time.</span>
              </p>
              
              <div className="p-5 rounded-[24px] bg-[#1C1C1E] flex flex-col gap-3">
                <div className="text-[12px] text-[#FF2D78] uppercase tracking-[0.15em] font-bold">Core Pattern</div>
                <p className="text-[18px] font-medium leading-snug text-white">
                  {userData.hardDay.length > 0 ? `You tend to ${userData.hardDay[0].toLowerCase()} on hard days.` : "You tend to go quiet and isolate on hard days."}
                </p>
              </div>

              <div className="p-5 rounded-[24px] bg-[#1C1C1E] flex flex-col gap-3">
                <div className="text-[12px] text-[#00E5CC] uppercase tracking-[0.15em] font-bold">Current Focus</div>
                <p className="text-[18px] font-medium leading-snug text-white">
                  {userData.mind ? `You've been feeling: "${userData.mind}"` : "You've been feeling overwhelmed by work expectations recently."}
                </p>
              </div>

              <button 
                onClick={() => {
                  haptic('heavy');
                  setShowMemory(false);
                }}
                className="mt-6 w-full py-4 rounded-[20px] bg-[#EF4444]/10 border border-[#EF4444]/20 text-[#EF4444] text-[16px] font-semibold transition-all duration-300 ease-out active:scale-[0.96] active:bg-[#EF4444]/20"
              >
                Delete All Memory
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// V2 Voice Mode View
function VoiceModeView({ onClose, onSend }: { onClose: () => void, onSend: (text: string) => void }) {
  const [isRecording, setIsRecording] = useState(true);
  const [transcript, setTranscript] = useState("I've been feeling a bit overwhelmed today...");

  return (
    <motion.div 
      initial={{ opacity: 0, y: '100%' }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: '100%' }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="absolute inset-0 z-[70] bg-[#050505] flex flex-col items-center justify-between py-16 px-6"
    >
      <div className="w-full flex justify-end">
        <button onClick={onClose} className="text-[#AFAFBF] font-semibold text-[17px]">Cancel</button>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center w-full relative">
        <motion.div animate={{ scale: [1, 2], opacity: [0.5, 0] }} transition={{ repeat: Infinity, duration: 2 }} className="absolute w-32 h-32 rounded-full bg-[#FF2D78]/30" />
        <motion.div animate={{ scale: [1, 2.5], opacity: [0.3, 0] }} transition={{ repeat: Infinity, duration: 2, delay: 0.5 }} className="absolute w-32 h-32 rounded-full bg-[#818CF8]/30" />
        
        <GlowingOrb className="w-32 h-32 relative z-10" colors="bg-[radial-gradient(circle_at_center,#FFFFFF_0%,#FF2D78_40%,#818CF8_100%)]" pulse />
        
        <div className="mt-16 h-24 flex items-center justify-center gap-1.5">
           {[...Array(15)].map((_, i) => (
             <motion.div 
               key={i}
               animate={{ height: isRecording ? [10, Math.random() * 60 + 20, 10] : 4 }}
               transition={{ repeat: Infinity, duration: 0.5 + Math.random() * 0.5 }}
               className="w-1.5 bg-[#FF2D78] rounded-full opacity-80"
             />
           ))}
        </div>

        <p className="text-[22px] font-medium text-white mt-12 text-center max-w-[80%]">
          {transcript}
        </p>
      </div>

      <button 
        onClick={() => {
          haptic('success');
          onSend(transcript);
          onClose();
        }}
        className={`w-20 h-20 rounded-full flex items-center justify-center ${primaryGradient} shadow-[0_8px_32px_rgba(255,45,120,0.5)] active:scale-90 transition-all`}
      >
        <ArrowUp size={32} className="text-white" />
      </button>
    </motion.div>
  );
}

// V2 Insights View
function InsightsView({ onClose }: { onClose: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: '100%' }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: '100%' }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="absolute inset-0 z-[60] bg-[#0D1114] flex flex-col"
    >
      <div className="h-[88px] pt-12 px-4 flex items-center justify-between border-b border-white/[0.05]">
        <button onClick={() => { haptic('light'); onClose(); }} className="p-2 transition-all duration-300 ease-out active:scale-[0.96]">
          <ChevronLeft size={28} className="text-white" />
        </button>
        <h2 className="text-[18px] font-bold tracking-wide">Insights</h2>
        <div className="w-11" />
      </div>
      
      <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-6 pb-24">
        <div>
          <h3 className="text-[18px] font-bold mb-4">7-Day Mood Trend</h3>
          <div className={`w-full h-[160px] rounded-[24px] ${liquidGlass} p-4 flex items-end justify-between relative`}>
             <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                <path d="M 20 120 Q 80 80 140 100 T 260 60 T 340 40" fill="none" stroke="#00E5CC" strokeWidth="3" strokeLinecap="round" />
             </svg>
             <div className="absolute w-3 h-3 bg-[#00E5CC] rounded-full border-2 border-[#0F0F12]" style={{ left: '20px', top: '115px' }} />
             <div className="absolute w-3 h-3 bg-[#00E5CC] rounded-full border-2 border-[#0F0F12]" style={{ left: '140px', top: '95px' }} />
             <div className="absolute w-3 h-3 bg-[#00E5CC] rounded-full border-2 border-[#0F0F12]" style={{ left: '260px', top: '55px' }} />
             <div className="absolute w-3 h-3 bg-[#00E5CC] rounded-full border-2 border-[#0F0F12]" style={{ left: '340px', top: '35px' }} />
          </div>
        </div>

        <div>
          <h3 className="text-[18px] font-bold mb-4">Aria's Observation</h3>
          <div className={`w-full p-5 rounded-[24px] bg-gradient-to-br from-[#818CF8]/20 to-[#C084FC]/20 border border-[#818CF8]/30`}>
            <div className="flex items-center gap-3 mb-3">
              <Sparkles size={20} className="text-[#818CF8]" />
              <span className="text-[15px] font-semibold text-[#818CF8]">Pattern Detected</span>
            </div>
            <p className="text-[16px] leading-relaxed text-white">
              "Your mood peaks on days you log before 9am. You also tend to feel better after completing the Morning Breath ritual."
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// V2 Paywall View
function PaywallView({ onClose, onSubscribe }: { onClose: () => void, onSubscribe: () => void }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: '100%' }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: '100%' }}
      transition={{ type: "spring", damping: 25, stiffness: 200 }}
      className="absolute inset-0 z-[100] bg-[#0D1114] flex flex-col"
    >
      <div className="absolute top-[-10%] left-[-10%] w-[400px] h-[400px] bg-[#FF2D78]/20 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="flex justify-end p-6 relative z-10">
        <button onClick={() => { haptic('light'); onClose(); }} className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white/70">
          ✕
        </button>
      </div>

      <div className="flex-1 overflow-y-auto px-6 pb-20 relative z-10 flex flex-col items-center">
        <GlowingOrb className="w-32 h-32 mb-6" colors="bg-[radial-gradient(circle_at_center,#FFFFFF_0%,#FF2D78_40%,#818CF8_100%)]" pulse />
        
        <h2 className="text-[32px] font-bold text-center leading-tight mb-2">Unlock your full<br/>potential.</h2>
        <p className="text-[16px] text-[#AFAFBF] text-center mb-8">Join CluWell Premium to access advanced emotional intelligence.</p>

        <div className="w-full flex flex-col gap-4 mb-10">
          <FeatureRow icon={<Mic size={20} className="text-[#FF2D78]" />} title="Voice Mode" desc="Talk to Aria hands-free with real-time voice." />
          <FeatureRow icon={<BarChart2 size={20} className="text-[#00E5CC]" />} title="Advanced Insights" desc="Deep pattern recognition and weekly reports." />
          <FeatureRow icon={<Zap size={20} className="text-[#FBBF24]" />} title="Unlimited AI" desc="No daily message limits or restrictions." />
          <FeatureRow icon={<Wind size={20} className="text-[#818CF8]" />} title="All 20+ Rituals" desc="Full access to the behavioral activation library." />
        </div>

        <div className={`w-full p-5 rounded-[24px] ${liquidGlassActive} border-[#FF2D78]/50 relative overflow-hidden mb-4 shrink-0`}>
          <div className="absolute top-0 right-0 bg-[#FF2D78] text-white text-[10px] font-bold px-3 py-1 rounded-bl-[12px]">POPULAR</div>
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-[18px] font-bold">Annual</h3>
              <p className="text-[13px] text-[#FF2D78] mt-1">7 days free, then $59.99/yr</p>
            </div>
            <div className="text-right">
              <span className="text-[24px] font-bold">$4.99</span>
              <span className="text-[13px] text-[#AFAFBF]">/mo</span>
            </div>
          </div>
        </div>

        <div className={`w-full p-5 rounded-[24px] ${liquidGlass} mb-8 shrink-0`}>
          <div className="flex justify-between items-center">
            <div>
              <h3 className="text-[18px] font-bold">Monthly</h3>
            </div>
            <div className="text-right">
              <span className="text-[24px] font-bold">$8.99</span>
              <span className="text-[13px] text-[#AFAFBF]">/mo</span>
            </div>
          </div>
        </div>

        <button 
          onClick={onSubscribe}
          className={`w-full h-[56px] shrink-0 rounded-full flex items-center justify-center font-semibold text-[17px] transition-all duration-300 ease-out ${primaryGradient} text-white active:scale-[0.96] shadow-[0_8px_24px_rgba(255,45,120,0.4)]`}
        >
          Start 7-Day Free Trial
        </button>
        <p className="text-[11px] text-[#6E6E7E] text-center mt-4">Cancel anytime. Auto-renews after trial.</p>
      </div>
    </motion.div>
  );
}

function FeatureRow({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="flex items-start gap-4">
      <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center shrink-0">
        {icon}
      </div>
      <div>
        <h4 className="text-[16px] font-semibold text-white">{title}</h4>
        <p className="text-[14px] text-[#AFAFBF] leading-snug mt-0.5">{desc}</p>
      </div>
    </div>
  );
}
