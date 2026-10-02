import type { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, type LucideIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CTAAction {
  label: string;
  to?: string;
  href?: string;
  icon?: LucideIcon;
}

interface CTABannerProps {
  icon: LucideIcon;
  heading: string;
  description: string;
  primary: CTAAction;
  secondary: CTAAction;
  image: string;
  large?: boolean;
  badge?: ReactNode;
  children?: ReactNode;
}

const easeSmooth = [0.4, 0, 0.2, 1] as const;

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { duration: 0.4, delay },
});

const ActionLink = ({ action, variant }: { action: CTAAction; variant: 'primary' | 'secondary' }) => {
  const Icon = action.icon;
  const button = (
    <Button
      size="lg"
      variant={variant === 'secondary' ? 'outline' : undefined}
      className={
        variant === 'primary'
          ? 'bg-gradient-to-r from-primary to-accent border-0 text-white shadow-glow hover:shadow-hero font-semibold px-8 h-12 rounded-full transition-all duration-300 hover:scale-[1.03] w-full sm:w-auto'
          : 'font-semibold px-8 h-12 rounded-full w-full sm:w-auto'
      }
    >
      {Icon && <Icon size={18} className="mr-2" />}
      {action.label}
      {variant === 'primary' && !Icon && <ArrowRight size={18} className="ml-2" />}
    </Button>
  );
  return action.to ? <Link to={action.to}>{button}</Link> : <a href={action.href}>{button}</a>;
};

/** Shared, light split-layout CTA banner — used at the base of several pages. */
const CTABanner = ({ icon: Icon, heading, description, primary, secondary, image, large = false, badge, children }: CTABannerProps) => (
  <section className="relative overflow-hidden bg-white">
    <div className="grid lg:grid-cols-2">
      <div className={`relative px-6 sm:px-10 flex flex-col justify-center ${large ? 'py-16' : 'py-14'}`}>
        <div className="absolute -top-16 -left-16 w-72 h-72 bg-primary/5 rounded-full blur-[100px] pointer-events-none" aria-hidden="true" />

        <motion.div {...fadeUp()} className="relative z-10">
          <div className="relative inline-flex mb-5">
            {[0, 0.6].map((delay) => (
              <motion.span
                key={delay}
                className="absolute inset-0 rounded-2xl bg-primary/50"
                animate={{ scale: [1, 1.7, 1.7], opacity: [0.5, 0, 0] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut', delay }}
                aria-hidden="true"
              />
            ))}
            <div
              className={`relative inline-flex items-center justify-center rounded-2xl bg-gradient-to-br from-primary to-accent shadow-glow ${
                large ? 'w-16 h-16' : 'w-14 h-14'
              }`}
            >
              <Icon size={large ? 28 : 24} className="text-white" />
            </div>
          </div>

          {badge && <div className="mb-3">{badge}</div>}
          <h2 className={`font-bold text-foreground mb-3 ${large ? 'text-3xl md:text-4xl' : 'text-2xl md:text-3xl'}`}>{heading}</h2>
          <p className={`text-muted-foreground leading-relaxed mb-7 max-w-md ${large ? 'text-lg' : ''}`}>{description}</p>
          <div className="flex flex-col sm:flex-row gap-3">
            <ActionLink action={primary} variant="primary" />
            <ActionLink action={secondary} variant="secondary" />
          </div>
        </motion.div>
      </div>

      <div className="relative min-h-[240px] lg:min-h-0 overflow-hidden">
        <motion.img
          src={image}
          alt=""
          aria-hidden="true"
          initial={{ scale: 1.1, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: easeSmooth }}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 mix-blend-overlay" aria-hidden="true" />
      </div>
    </div>

    {children && (
      <div className="relative border-t border-border bg-muted/30 py-10">
        <div className="container mx-auto px-4">{children}</div>
      </div>
    )}
  </section>
);

export default CTABanner;
