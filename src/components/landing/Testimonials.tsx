'use client';

import { motion } from 'framer-motion';
import { Star, BadgeCheck } from 'lucide-react';

const testimonialsRow1 = [
  {
    name: 'Sneha Reddy',
    role: 'VP of E-commerce',
    company: 'ThreadCraft India',
    content:
      'Diwali sales used to be pure chaos — constant stockouts and endless spreadsheets. With CommerceCast, our stockouts dropped 80% during peak season. The predictive engine is genuinely that good.',
    stars: 5,
    avatar: 'https://api.dicebear.com/9.x/notionists/svg?seed=SnehaR&backgroundColor=dbeafe',
    highlight: 'Stockouts dropped 80%',
  },
  {
    name: 'Rohan Sharma',
    role: 'Founder',
    company: 'GadgetMandi',
    content:
      'The Promotion Simulator saved us from a Big Billion Days deal that would have obliterated our margins. Seeing the outcome before running the promo on Flipkart is like having a superpower.',
    stars: 5,
    avatar: 'https://api.dicebear.com/9.x/notionists/svg?seed=RohanS&backgroundColor=ede9fe',
    highlight: 'Margin-safe promotions',
  },
  {
    name: 'Anjali Desai',
    role: 'Director of Ops',
    company: 'NovaBrands D2C',
    content:
      'I had it integrated with our Shopify India store in an afternoon. The UI feels like a consumer app, not clunky enterprise software. My team actually logs in every day.',
    stars: 5,
    avatar: 'https://api.dicebear.com/9.x/notionists/svg?seed=AnjaliD&backgroundColor=fef3c7',
    highlight: 'Set up in one afternoon',
  },
];

const testimonialsRow2 = [
  {
    name: 'Vikram Singh',
    role: 'Head of Growth',
    company: 'PeakScale',
    content:
      "It's the first analytics tool my ops team logs into without being asked. The data storytelling is exceptional — everything is visual, clear, and immediately actionable for the Indian market.",
    stars: 5,
    avatar: 'https://api.dicebear.com/9.x/notionists/svg?seed=VikramS&backgroundColor=dcfce7',
    highlight: 'Team adoption overnight',
  },
  {
    name: 'Priya Patel',
    role: 'Supply Chain Manager',
    company: 'Lumiere Beauty',
    content:
      'We slashed our warehouse carrying costs by 30% in three months. The dynamic safety stock feature alone paid for the entire year of CommerceCast. Incredible ROI for our cosmetic lines.',
    stars: 5,
    avatar: 'https://api.dicebear.com/9.x/notionists/svg?seed=PriyaP&backgroundColor=fce7f3',
    highlight: '30% carrying cost reduction',
  },
  {
    name: 'Amit Agarwal',
    role: 'CEO',
    company: 'UrbanKala',
    content:
      'Multi-channel used to be a nightmare in India. Now I have a single pane of glass for Amazon India, Flipkart, and Shopify. CommerceCast instantly aggregated our demand signals.',
    stars: 5,
    avatar: 'https://api.dicebear.com/9.x/notionists/svg?seed=AmitA&backgroundColor=e0e7ff',
    highlight: 'Unified demand signals',
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
      ))}
    </div>
  );
}

function TestimonialCard({ t }: { t: typeof testimonialsRow1[0] }) {
  return (
    <div className="w-[380px] shrink-0 group flex flex-col gap-5 p-6 rounded-2xl bg-background border border-border/50 hover:border-primary/40 hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 mx-3 cursor-default">
      {/* Stars + Highlight */}
      <div className="flex flex-col gap-3">
        <Stars count={t.stars} />
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/20 text-primary w-fit shadow-sm backdrop-blur-sm transition-all group-hover:border-primary/40 group-hover:shadow-[0_0_12px_rgba(59,130,246,0.15)]">
          <BadgeCheck className="w-3.5 h-3.5 text-primary drop-shadow-md" />
          <span className="text-[10px] font-bold uppercase tracking-wider">{t.highlight}</span>
        </div>
      </div>

      {/* Quote */}
      <p className="text-[15px] text-foreground/80 leading-relaxed flex-1 font-medium">
        "{t.content}"
      </p>

      {/* Author */}
      <div className="flex items-center justify-between pt-4 border-t border-border/40">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full overflow-hidden border border-border/60 bg-muted shrink-0">
            <img
              src={t.avatar}
              alt={t.name}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
          <div>
            <div className="text-sm font-bold flex items-center gap-1.5">
              {t.name}
              <BadgeCheck className="w-3.5 h-3.5 text-blue-500" />
            </div>
            <div className="text-[11px] text-muted-foreground uppercase tracking-wide font-medium mt-0.5">
              {t.role} · {t.company}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Testimonials() {
  return (
    <section className="relative w-full py-24 bg-muted/20 overflow-hidden border-y border-border/20">
      <div className="container px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <p className="text-[11px] uppercase tracking-[0.3em] text-primary font-semibold mb-4">
            Customer stories
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tighter font-headline leading-[1.06]">
            Loved by operators who move fast
          </h2>
        </motion.div>
      </div>

      {/* Marquee Section */}
      <div className="relative flex flex-col gap-6">
        {/* Left/Right Fade Masks */}
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[hsl(var(--muted)/0.2)] dark:from-background to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[hsl(var(--muted)/0.2)] dark:from-background to-transparent z-10 pointer-events-none" />

        {/* Row 1 (Left to Right) */}
        <div className="flex overflow-hidden w-full" style={{ '--duration': '55s' } as React.CSSProperties}>
          <div className="flex animate-marquee w-max hover:[animation-play-state:paused]">
            {[...testimonialsRow1, ...testimonialsRow1].map((t, i) => (
              <TestimonialCard key={`r1-${i}`} t={t} />
            ))}
          </div>
        </div>

        {/* Row 2 (Right to Left) */}
        <div className="flex overflow-hidden w-full" style={{ '--duration': '60s' } as React.CSSProperties}>
          <div className="flex animate-marquee-reverse w-max hover:[animation-play-state:paused]">
            {[...testimonialsRow2, ...testimonialsRow2].map((t, i) => (
              <TestimonialCard key={`r2-${i}`} t={t} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
