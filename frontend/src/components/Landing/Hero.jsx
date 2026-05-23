import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, ShieldCheck, ChevronRight, Play, Pause, X, 
  Volume2, Maximize, RotateCcw, ShieldAlert, Cpu, Heart, CheckCircle2, Navigation
} from 'lucide-react';
import { fadeInUp, staggerContainer } from '../../animations/animations.config';

const Hero = ({ onEnter }) => {
  const [showDemoModal, setShowDemoModal] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [progress, setProgress] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState(1);
  const [volume, setVolume] = useState(80);
  const [isFullscreen, setIsFullscreen] = useState(false);
  
  // Simulated Simulation Data
  const [simState, setSimState] = useState({
    hr: 142,
    spo2: 89,
    status: 'IN_TRANSIT',
    phase: 'EN-ROUTE TO BMS TRAUMA',
    eta: 48,
    activeOverrides: 2,
    fScore: '14.2 (Optimal)'
  });

  // Timeline-based AI Logic logs
  const getLogMessage = (pct) => {
    if (pct < 15) return "📡 Incident Synced: V-Fib anomaly triggered on paramedic band.";
    if (pct < 35) return "🧠 AI Routing Core: Evaluating 5 regional trauma & cardiac centers...";
    if (pct < 55) return "⚡ Optimal Path Snapped: Narayana Cardiac Center selected (Score: 11.4)";
    if (pct < 75) return "🚦 Green Corridor: Preempting 3 traffic signals along Basavanagudi corridor.";
    if (pct < 95) return "🏥 Telemetry Streamed: ER preparation checklist triggered at NARAYANA.";
    return "✅ Handoff Initiated: Patient arrived securely. Beds updated (+1 occupied).";
  };

  useEffect(() => {
    let interval;
    if (isPlaying && showDemoModal) {
      interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) return 0;
          return prev + (0.35 * playbackSpeed);
        });
      }, 50);
    }
    return () => clearInterval(interval);
  }, [isPlaying, showDemoModal, playbackSpeed]);

  // Vitals variance jitter
  useEffect(() => {
    let vitalsInterval;
    if (isPlaying && showDemoModal) {
      vitalsInterval = setInterval(() => {
        setSimState(prev => {
          const baselineHr = progress < 75 ? 142 : 88;
          const baselineSpo2 = progress < 75 ? 89 : 98;
          return {
            ...prev,
            hr: Math.round(baselineHr + (Math.random() - 0.5) * 6),
            spo2: Math.min(100, Math.round(baselineSpo2 + (Math.random() - 0.2) * 1.5)),
            eta: Math.max(0, Math.round((1 - progress / 100) * 80))
          };
        });
      }, 1000);
    }
    return () => clearInterval(vitalsInterval);
  }, [isPlaying, showDemoModal, progress]);

  // Calculate coordinates for SVGs
  const getAmbulancePos = (pct) => {
    // Route shape: a slightly curved path across the canvas
    const x = 50 + (pct / 100) * 350;
    const y = 200 - Math.sin((pct / 100) * Math.PI * 2) * 60;
    return { x, y };
  };

  const ambPos = getAmbulancePos(progress);

  return (
    <section className="relative overflow-hidden min-h-screen flex items-center justify-center bg-gray-50">
      
      {/* Refined Background Animation Layers (Subtle approach) */}
      <div className="absolute inset-0 z-0">
        {/* Layer 1: Floating Subtle Orbs (Cyan) */}
        <motion.div 
          className="absolute rounded-full animate-float-subtle opacity-30"
          style={{
            width: '500px',
            height: '500px',
            top: '5%',
            left: '2%',
            background: 'radial-gradient(circle, rgba(14, 165, 233, 0.25), transparent)',
            filter: 'blur(100px)'
          }}
        />

        {/* Layer 2: Secondary Orb (Red/Pulse) */}
        <motion.div 
          className="absolute rounded-full animate-float-subtle opacity-20"
          style={{
            width: '450px',
            height: '450px',
            bottom: '10%',
            right: '5%',
            background: 'radial-gradient(circle, rgba(239, 68, 68, 0.15), transparent)',
            filter: 'blur(120px)',
            animationDelay: '2s'
          }}
        />
        
        {/* Layer 3: Flowing Gradient Overlay */}
        <div className="absolute inset-0 opacity-[0.08] animate-gradient-flow pointer-events-none" />

        {/* Layer 4: Animated Grid */}
        <div 
          className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20"
        />
      </div>

      <motion.div 
        className="max-w-7xl mx-auto px-4 z-10 text-center"
        variants={staggerContainer}
        initial="initial"
        animate="animate"
      >
        {/* Status Badge */}
        <motion.div
          variants={fadeInUp}
          className="inline-flex items-center gap-2 px-3 py-1 bg-cyan-50 border border-cyan-100 rounded-full text-cyan-600 text-xs font-bold mb-8 shadow-sm backdrop-blur-sm"
        >
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ShieldCheck className="h-3.5 w-3.5" />
          </motion.div>
          <span>v1.0.4 - Live Response Protocol Active</span>
        </motion.div>

        {/* Heading */}
        <motion.h1 
          variants={fadeInUp}
          className="text-5xl md:text-7xl font-black tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-gray-900 to-gray-500"
        >
          Real-Time AI-Powered <br />
          <motion.span 
            className="text-cyan-600 uppercase tracking-widest block font-black"
            animate={{ 
              textShadow: [
                '0 0 0px rgba(8, 145, 178, 0)', 
                '0 0 20px rgba(8, 145, 178, 0.2)', 
                '0 0 0px rgba(8, 145, 178, 0)'
              ]
            }}
            transition={{ duration: 4, repeat: Infinity }}
          >
            Emergency Response
          </motion.span>
        </motion.h1>
        
        {/* Description */}
        <motion.p 
          variants={fadeInUp}
          className="text-lg md:text-xl text-gray-500 max-w-2xl mx-auto mb-10 leading-relaxed font-medium"
        >
          AmbuAlert eliminates critical delays through AI-driven allocation, real-time vital tracking, and seamless hospital coordination.
        </motion.p>

        {/* Action Buttons */}
        <motion.div 
          variants={fadeInUp}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button 
            onClick={onEnter}
            whileHover={{ scale: 1.05, boxShadow: '0 20px 25px -5px rgba(6, 182, 212, 0.2)' }}
            whileTap={{ scale: 0.98 }}
            className="group relative inline-flex items-center gap-2 px-8 py-4 bg-cyan-600 text-white rounded-xl font-bold transition-all shadow-lg"
          >
            Launch Control Center
            <motion.div
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            >
              <ChevronRight className="h-5 w-5" />
            </motion.div>
          </motion.button>
          
          <motion.button 
            onClick={() => setShowDemoModal(true)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="inline-flex items-center gap-2 px-8 py-4 bg-white hover:bg-gray-50 text-gray-700 border border-gray-200 rounded-xl font-bold transition-all shadow-sm"
          >
            <Play className="h-4 w-4 text-red-500 fill-red-500 animate-pulse" />
            Watch Video Demo
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Futuristic AI Digital Twin Simulation Player Modal */}
      <AnimatePresence>
        {showDemoModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-lg">
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", duration: 0.5 }}
              className={`w-full max-w-5xl bg-slate-900 border border-slate-800 rounded-[2.5rem] overflow-hidden shadow-2xl relative flex flex-col ${
                isFullscreen ? 'fixed inset-0 max-w-full h-full rounded-none' : 'aspect-video'
              }`}
            >
              
              {/* Header Bar */}
              <div className="flex items-center justify-between px-6 py-4 bg-slate-950/60 border-b border-slate-800 shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-500 animate-pulse" />
                  <span className="text-[10px] font-black text-slate-400 tracking-[0.25em] uppercase">AI DIGITAL TWIN · MISSION SIMULATOR</span>
                </div>
                <button 
                  onClick={() => setShowDemoModal(false)}
                  className="p-2 text-slate-400 hover:text-white rounded-full bg-slate-800/40 hover:bg-slate-800 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Viewport Area */}
              <div className="flex-1 min-h-0 relative flex flex-col md:flex-row bg-slate-950">
                
                {/* 1. Interactive 2.5D Animated SVG Telemetry Grid */}
                <div className="flex-1 h-full min-h-0 relative bg-slate-950/90 overflow-hidden flex items-center justify-center p-6 border-b md:border-b-0 md:border-r border-slate-800">
                  <svg className="w-full h-full min-h-[220px]" viewBox="0 0 500 350" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                      <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                        <path d="M 30 0 L 0 0 0 30" fill="none" stroke="rgba(51, 65, 85, 0.15)" strokeWidth="1" />
                      </pattern>
                    </defs>
                    <rect width="100%" height="100%" fill="url(#grid)" />
                    
                    {/* Glowing radar sweep */}
                    <circle cx="250" cy="175" r="130" stroke="rgba(6, 182, 212, 0.08)" strokeWidth="2" strokeDasharray="6, 6" />
                    <circle cx="250" cy="175" r="70" stroke="rgba(6, 182, 212, 0.05)" strokeWidth="1" />
                    
                    {/* Simulated Map Streets */}
                    <path d="M 50 200 Q 150 140 250 200 T 450 200" stroke="rgba(51, 65, 85, 0.6)" strokeWidth="8" strokeLinecap="round" />
                    <path d="M 50 100 C 150 150 220 20 300 200 T 450 100" stroke="rgba(51, 65, 85, 0.4)" strokeWidth="4" strokeLinecap="round" strokeDasharray="8, 8" />
                    
                    {/* Glowing A* Optimized Active Path */}
                    <path d="M 50 200 Q 150 140 250 200 T 450 200" stroke="#00E676" strokeWidth="6" strokeLinecap="round" className="opacity-90" />
                    
                    {/* Start Node: Patient Location */}
                    <g transform="translate(50, 200)">
                      <circle cx="0" cy="0" r="16" fill="rgba(239, 68, 68, 0.2)" className="animate-ping" />
                      <circle cx="0" cy="0" r="7" fill="#ef4444" stroke="#fff" strokeWidth="1.5" />
                      <text x="12" y="4" fill="#ef4444" className="text-[8px] font-black uppercase tracking-wider">Patient (PAT-29)</text>
                    </g>

                    {/* End Node: narayana Cardiac Center */}
                    <g transform="translate(450, 200)">
                      <circle cx="0" cy="0" r="14" fill="rgba(37, 99, 235, 0.3)" />
                      <rect x="-8" y="-8" width="16" height="16" rx="4" fill="#2563eb" stroke="#fff" strokeWidth="1.5" />
                      <text x="-25" y="-14" fill="#60a5fa" className="text-[8px] font-black uppercase tracking-wider">Narayana Cardiac</text>
                    </g>

                    {/* Animated Moving Ambulance Snap */}
                    {isPlaying && (
                      <g transform={`translate(${ambPos.x}, ${ambPos.y})`}>
                        <circle cx="0" cy="0" r="18" fill="rgba(6, 182, 212, 0.3)" className="animate-pulse" />
                        <rect x="-10" y="-10" width="20" height="20" rx="5" fill="#0ea5e9" stroke="#fff" strokeWidth="2" />
                        <text x="-12" y="18" fill="#38bdf8" className="text-[8px] font-bold">🚑 AMB-01</text>
                      </g>
                    )}
                  </svg>

                  {/* Diagnostic Alert Overlay */}
                  {progress > 45 && progress < 60 && (
                    <div className="absolute top-6 left-6 right-6 bg-amber-500/10 border border-amber-500/30 p-3 rounded-xl flex items-center gap-3 backdrop-blur-md animate-in fade-in slide-in-from-top-4 duration-300">
                      <ShieldAlert className="w-5 h-5 text-amber-500 animate-pulse" />
                      <div>
                        <p className="text-[10px] font-black text-amber-400 uppercase tracking-widest leading-none">Traffic Saturation Override</p>
                        <p className="text-[9px] text-amber-500/90 font-bold uppercase mt-1">AI preempting Signal #3: Switching Green Corridor</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* 2. Interactive Telemetry Hub Controls Sidebar */}
                <div className="w-full md:w-80 p-6 flex flex-col gap-4 bg-slate-950/40 border-t md:border-t-0 border-slate-800 shrink-0 select-none">
                  <span className="text-[10px] font-black text-slate-400 tracking-[0.2em] uppercase mb-1">Live Bio-Telemetry</span>
                  
                  {/* Heart Rate Indicator */}
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Heart className="w-6 h-6 text-red-500 fill-red-500 animate-pulse" />
                      <div>
                        <span className="text-[9px] font-bold text-slate-500 uppercase">Heart Rate</span>
                        <p className="text-xl font-black text-white font-mono mt-0.5">{simState.hr} <span className="text-[10px] text-slate-400">BPM</span></p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold bg-red-500/10 text-red-500 border border-red-500/30 px-2 py-0.5 rounded uppercase tracking-wider">Atypical</span>
                  </div>

                  {/* SpO2 Indicator */}
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Activity className="w-6 h-6 text-cyan-500 animate-pulse" />
                      <div>
                        <span className="text-[9px] font-bold text-slate-500 uppercase">SpO2 Level</span>
                        <p className="text-xl font-black text-white font-mono mt-0.5">{simState.spo2} <span className="text-[10px] text-slate-400">%</span></p>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold bg-cyan-500/10 text-cyan-500 border border-cyan-500/30 px-2 py-0.5 rounded uppercase tracking-wider">Stable</span>
                  </div>

                  {/* Decision engine scoring stats */}
                  <div className="mt-2 bg-slate-900/60 rounded-2xl border border-slate-800/80 p-4 space-y-3">
                    <div className="flex justify-between items-center text-xs">
                      <span className="font-bold text-slate-500 uppercase text-[9px] tracking-wider">AI Optimizer F-Score</span>
                      <span className="font-bold text-emerald-400 uppercase tracking-widest text-[9px]">{simState.fScore}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs border-t border-slate-800/80 pt-2.5">
                      <span className="font-bold text-slate-500 uppercase text-[9px] tracking-wider">Active Corridor Preemptions</span>
                      <span className="font-bold text-cyan-400 uppercase tracking-widest text-[9px]">{progress < 45 ? 0 : progress < 75 ? 2 : 0} Signals</span>
                    </div>
                    <div className="flex justify-between items-center text-xs border-t border-slate-800/80 pt-2.5">
                      <span className="font-bold text-slate-500 uppercase text-[9px] tracking-wider">A* Heuristic Snapping</span>
                      <span className="font-bold text-white uppercase tracking-widest text-[9px]">{progress < 100 ? 'Active' : 'Handoff Ready'}</span>
                    </div>
                  </div>

                  {/* Live Simulation Action logs */}
                  <div className="mt-auto p-4 bg-slate-900 border border-slate-800/80 rounded-2xl flex flex-col justify-center min-h-[90px] border-l-4 border-l-cyan-600 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-2 opacity-5">
                      <Cpu className="w-16 h-16 text-cyan-500" />
                    </div>
                    <span className="text-[8px] font-black text-cyan-500 uppercase tracking-[0.2em] mb-1.5 flex items-center gap-1.5">
                       <CheckCircle2 className="w-3 h-3" /> System Event Log
                    </span>
                    <p className="text-xs font-semibold text-slate-300 leading-normal italic select-text">
                       "{getLogMessage(progress)}"
                    </p>
                  </div>

                </div>

              </div>

              {/* Playback & Scrubbing Controller Footer */}
              <div className="px-6 py-4 bg-slate-950/90 border-t border-slate-800 flex flex-col gap-3 shrink-0">
                
                {/* Timeline Slider / Progress */}
                <div className="flex items-center gap-3">
                  <span className="text-[10px] text-slate-400 font-mono font-bold">
                    00:{Math.floor(progress * 0.8).toString().padStart(2, '0')}
                  </span>
                  
                  {/* Interactive Slider */}
                  <div 
                    onClick={(e) => {
                      const rect = e.currentTarget.getBoundingClientRect();
                      const clickX = e.clientX - rect.left;
                      const width = rect.width;
                      setProgress((clickX / width) * 100);
                    }}
                    className="flex-1 h-1.5 bg-slate-800 rounded-full cursor-pointer relative group overflow-hidden"
                  >
                    <div 
                      className="h-full bg-cyan-600 rounded-full transition-all duration-75 relative"
                      style={{ width: `${progress}%` }}
                    >
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity border-2 border-cyan-700 shadow-md" />
                    </div>
                  </div>
                  
                  <span className="text-[10px] text-slate-400 font-mono font-bold">01:20</span>
                </div>

                {/* Bottom Control buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button 
                      onClick={() => setIsPlaying(!isPlaying)}
                      className="p-2 text-white hover:text-cyan-400 transition-colors bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl"
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white hover:fill-cyan-400" />}
                    </button>
                    
                    <button 
                      onClick={() => setProgress(0)}
                      className="p-2 text-slate-400 hover:text-white transition-colors bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-xl"
                      title="Restart Demo"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>

                    <div className="h-6 w-px bg-slate-800" />

                    {/* Speed Selector */}
                    <div className="flex gap-1.5 bg-slate-900 border border-slate-800 p-0.5 rounded-xl text-[10px] font-black uppercase tracking-wider">
                      {[1, 2, 4].map(speed => (
                        <button
                          key={speed}
                          onClick={() => setPlaybackSpeed(speed)}
                          className={`px-3 py-1 rounded-lg ${playbackSpeed === speed ? 'bg-cyan-600 text-white shadow-sm' : 'text-slate-500 hover:text-white'}`}
                        >
                          {speed}x
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest text-slate-400">
                    
                    {/* Volume simulation */}
                    <div className="flex items-center gap-2">
                      <Volume2 className="w-4 h-4 text-slate-400" />
                      <div className="w-16 h-1 bg-slate-800 rounded-full overflow-hidden">
                        <div className="h-full bg-cyan-600" style={{ width: '80%' }} />
                      </div>
                    </div>

                    <div className="px-2 py-0.5 bg-slate-900 border border-slate-800 text-[9px] font-black rounded uppercase text-cyan-400 tracking-tighter">
                      1080p HD
                    </div>

                    <button 
                      onClick={() => setIsFullscreen(!isFullscreen)}
                      className="p-1.5 text-slate-400 hover:text-white transition-colors"
                    >
                      <Maximize className="w-4 h-4" />
                    </button>
                  </div>
                </div>

              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </section>
  );
};

export default Hero;
