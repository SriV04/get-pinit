'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import type { LucideIcon } from 'lucide-react';

export interface FocusCard {
  title: string;
  description: string;
  icon: LucideIcon;
}

function Card({
  card,
  index,
  hovered,
  setHovered,
}: {
  card: FocusCard;
  index: number;
  hovered: number | null;
  setHovered: (i: number | null) => void;
}) {
  const Icon = card.icon;
  const isHovered = hovered === index;
  const isDimmed = hovered !== null && hovered !== index;

  return (
    <div
      onMouseEnter={() => setHovered(index)}
      onMouseLeave={() => setHovered(null)}
      className={cn(
        'focus-card group relative rounded-2xl p-5 cursor-default select-none',
        'transition-all duration-300 ease-out',
        isDimmed && 'scale-[0.97] opacity-50',
        isHovered && 'scale-[1.02]',
      )}
    >
      {/* Background: noise texture on hover, glass on rest */}
      <div
        className={cn(
          'absolute inset-0 rounded-2xl transition-opacity duration-300',
          isHovered ? 'opacity-100' : 'opacity-0',
        )}
        style={{
          background: 'linear-gradient(135deg, rgba(107,35,96,0.7), rgba(66,20,61,0.85))',
        }}
      />
      <div
        className={cn(
          'absolute inset-0 rounded-2xl transition-opacity duration-300',
          isHovered ? 'opacity-0' : 'opacity-100',
        )}
        style={{
          background: 'rgba(255,255,255,0.72)',
          border: '1px solid rgba(107,35,96,0.12)',
          boxShadow: '0 2px 8px rgba(66,20,61,0.06), 0 6px 20px rgba(66,20,61,0.07)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 flex flex-col gap-3">
        <div
          className={cn(
            'w-10 h-10 rounded-xl flex items-center justify-center transition-colors duration-300',
            isHovered
              ? 'bg-[rgba(255,155,214,0.2)] border border-[rgba(255,155,214,0.25)]'
              : 'bg-[rgba(107,35,96,0.09)] border border-[rgba(107,35,96,0.12)]',
          )}
        >
          <Icon
            className={cn(
              'w-5 h-5 transition-colors duration-300',
              isHovered ? 'text-[#ff9bd6]' : 'text-[#6b2360]',
            )}
          />
        </div>

        <div>
          <h3
            className={cn(
              'text-base font-bold mb-1 transition-colors duration-300',
              isHovered ? 'text-[#f7e9ff]' : 'text-[#1a0524]',
            )}
          >
            {card.title}
          </h3>
          <p
            className={cn(
              'text-sm leading-relaxed transition-colors duration-300',
              isHovered ? 'text-[rgba(247,233,255,0.72)]' : 'text-[rgba(26,5,36,0.58)]',
            )}
          >
            {card.description}
          </p>
        </div>
      </div>
    </div>
  );
}

export function FocusCards({ cards, className }: { cards: FocusCard[]; className?: string }) {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div
      className={cn(
        'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-4 w-full',
        className,
      )}
    >
      {cards.map((card, i) => (
        <Card
          key={card.title}
          card={card}
          index={i}
          hovered={hovered}
          setHovered={setHovered}
        />
      ))}
    </div>
  );
}
