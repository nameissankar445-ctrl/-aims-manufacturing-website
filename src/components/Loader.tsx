import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import aimsLogo from '@/assets/aims-logo.png';

const easeSmooth = [0.4, 0, 0.2, 1] as const;
const DURATION_MS = 2000;

const STATUS_STEPS = [
  { at: 0, label: 'Initializing Systems' },
  { at: 28, label: 'Calibrating Sensors' },
  { at: 62, label: 'Loading Interface' },
  { at: 92, label: 'Ready' },
];

const titleContainer: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.03, delayChildren: 0.5 } },
};

const letterVariant: Variants = {
  hidden: { opacity: 0, y: 14 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: easeSmooth } },
};

const renderWord = (word: string, className: string) =>
  word.split('').map((ch, i) => (
    <motion.span key={i} variants={letterVariant} className={className} style={{ display: 'inline-block' }}>
      {ch === ' ' ? ' ' : ch}
    </motion.span>
  ));

const RETICLE_CORNERS = [
  'top-0 left-0 border-t-2 border-l-2 rounded-tl-md',
  'top-0 right-0 border-t-2 border-r-2 rounded-tr-md',
  'bottom-0 left-0 border-b-2 border-l-2 rounded-bl-md',
  'bottom-0 right-0 border-b-2 border-r-2 rounded-br-md',
];

const Loader = () => {
  const [visible, setVisible] = useState(true);
  const [percent, setPercent] = useState(0);
  const rafRef = useRef<number | undefined>(undefined);

  useEffect(() => {
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const pct = Math.min(100, Math.round((elapsed / DURATION_MS) * 100));
      setPercent(pct);
      if (elapsed < DURATION_MS) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    rafRef.current = requestAnimationFrame(tick);

    const timer = setTimeout(() => setVisible(false), DURATION_MS + 350);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      clearTimeout(timer);
    };
  }, []);

  const [status, setStatus] = useState(STATUS_STEPS[0].label);
  useEffect(() => {
    const next = [...STATUS_STEPS].reverse().find((s) => percent >= s.at)?.label ?? STATUS_STEPS[0].label;
    setStatus((prev) => (prev === next ? prev : next));
  }, [percent]);

  const ready = percent >= 100;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: easeSmooth }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#081b21] overflow-hidden"
        >
          <div className="absolute inset-0 opacity-[0.05] texture-grid" aria-hidden="true" />
          <motion.div
            className="absolute -top-32 -left-20 w-96 h-96 bg-primary/15 rounded-full blur-[110px]"
            aria-hidden="true"
            animate={{ opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute -bottom-32 -right-20 w-96 h-96 bg-accent/10 rounded-full blur-[110px]"
            aria-hidden="true"
            animate={{ opacity: [0.5, 0.9, 0.5] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
          />

          <span className="absolute top-8 left-8 w-10 h-10 border-t-2 border-l-2 border-primary/30 rounded-tl-lg" aria-hidden="true" />
          <span className="absolute top-8 right-8 w-10 h-10 border-t-2 border-r-2 border-primary/30 rounded-tr-lg" aria-hidden="true" />
          <span className="absolute bottom-8 left-8 w-10 h-10 border-b-2 border-l-2 border-accent/30 rounded-bl-lg" aria-hidden="true" />
          <span className="absolute bottom-8 right-8 w-10 h-10 border-b-2 border-r-2 border-accent/30 rounded-br-lg" aria-hidden="true" />

          <div className="relative z-10 flex flex-col items-center px-6 w-full max-w-sm sm:max-w-none">
            {/* Reticle — the logo itself fills with color bottom-up as progress advances */}
            <motion.div
              className="relative mb-6 w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32"
              animate={ready ? { scale: [1, 1.08, 1] } : { scale: 1 }}
              transition={{ duration: 0.45, ease: easeSmooth }}
            >
              {RETICLE_CORNERS.map((cls, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.35, ease: easeSmooth, delay: 0.1 + i * 0.06 }}
                  className={`absolute w-5 h-5 border-primary-light/70 ${cls}`}
                />
              ))}
              <motion.span
                className="absolute inset-4 rounded-full border border-dashed border-accent/25"
                animate={{ rotate: 360 }}
                transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                aria-hidden="true"
              />
              <motion.span
                className="absolute inset-7 rounded-full"
                animate={ready ? { boxShadow: ['0 0 0px rgba(51,188,214,0)', '0 0 28px rgba(51,188,214,0.55)', '0 0 10px rgba(51,188,214,0.25)'] } : { boxShadow: '0 0 0px rgba(51,188,214,0)' }}
                transition={{ duration: 0.5, ease: easeSmooth }}
                aria-hidden="true"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.6 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.45, ease: easeSmooth, delay: 0.35 }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="relative w-12 h-12">
                  <img src={aimsLogo} alt="" aria-hidden="true" className="absolute inset-0 w-full h-full object-contain opacity-[0.16] grayscale" />
                  <img
                    src={aimsLogo}
                    alt="AIMS"
                    className="absolute inset-0 w-full h-full object-contain"
                    style={{ clipPath: `inset(${100 - percent}% 0 0 0)` }}
                  />
                </div>
              </motion.div>

              <motion.span
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, ease: easeSmooth, delay: 0.5 }}
                className="absolute -bottom-1.5 -right-1.5 bg-[#0b1620] border border-primary/30 rounded-full px-2 py-0.5 text-[10px] font-bold text-primary-light tabular-nums shadow-[0_0_12px_rgba(0,0,0,0.4)]"
              >
                {percent}%
              </motion.span>
            </motion.div>

            <div className="relative overflow-hidden max-w-full">
              <motion.h1
                variants={titleContainer}
                initial="hidden"
                animate="visible"
                className="flex flex-wrap justify-center items-baseline gap-x-2.5 gap-y-0.5 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight"
              >
                <span className="inline-flex">{renderWord('AIMS', 'text-primary-light')}</span>
                <span className="inline-flex">{renderWord('MANUFACTURING', 'text-accent')}</span>
              </motion.h1>
              <motion.div
                className="absolute inset-y-0 w-16 bg-gradient-to-r from-transparent via-white/25 to-transparent -skew-x-[20deg]"
                initial={{ x: '-140%' }}
                animate={{ x: '240%' }}
                transition={{ duration: 0.9, delay: 1.35, ease: 'easeInOut' }}
                aria-hidden="true"
              />
            </div>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.0 }}
              className="text-white/40 text-[10px] sm:text-[11px] font-semibold tracking-[0.15em] sm:tracking-[0.25em] uppercase mt-2 text-center"
            >
              Precision Manufacturing in the GCC
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.1 }}
              className="mt-7"
            >
              <motion.span
                key={status}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="text-white/45 text-[10px] font-semibold tracking-[0.2em] uppercase"
              >
                {status}
              </motion.span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
