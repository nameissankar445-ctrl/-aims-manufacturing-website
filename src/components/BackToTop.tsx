import { useEffect, useState } from 'react';
import { ArrowUp } from 'lucide-react';

const BackToTop = () => {
  const [visible, setVisible] = useState(false);
  const [bottomOffset, setBottomOffset] = useState(24);

  useEffect(() => {
    const update = () => {
      setVisible(window.scrollY > 500);

      // Lift the button clear of the footer's legal bar instead of overlapping
      // its text once that bar scrolls into view.
      const legalBar = document.getElementById('footer-legal-bar');
      const overlap = legalBar ? window.innerHeight - legalBar.getBoundingClientRect().top : 0;
      setBottomOffset(overlap > 0 ? overlap + 24 : 24);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      style={{ bottom: bottomOffset }}
      className="fixed right-5 sm:right-6 z-40 w-10 h-10 sm:w-11 sm:h-11 rounded-full bg-accent/85 backdrop-blur-md ring-1 ring-white/30 hover:bg-accent text-white shadow-hero flex items-center justify-center transition-[opacity,transform,background-color] duration-300 hover:-translate-y-0.5 animate-fade-in"
    >
      <ArrowUp size={18} />
    </button>
  );
};

export default BackToTop;
