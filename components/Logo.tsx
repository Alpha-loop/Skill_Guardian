'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  href?: string;
  className?: string;
}

export function Logo({ size = 'md', href, className }: LogoProps) {
  const badgeSize = size === 'sm' ? 'w-7 h-7 text-xs' : size === 'lg' ? 'w-10 h-10 text-base' : 'w-8 h-8 text-sm';
  const textSize = size === 'sm' ? 'text-base' : size === 'lg' ? 'text-2xl' : 'text-xl';

  const inner = (
    <div className={cn('flex items-center gap-2.5', className)}>
      <div className={cn(
        badgeSize,
        'rounded-lg bg-[#005EB8] flex items-center justify-center flex-shrink-0',
      )}>
        <span className="font-black text-white tracking-tight leading-none" style={{ fontFamily: 'inherit', letterSpacing: '-0.03em' }}>
          SG
        </span>
      </div>
      <span className={cn('font-bold text-slate-900 tracking-tight', textSize)}>
        SkillGuardian
      </span>
    </div>
  );

  if (href) {
    return <Link href={href}>{inner}</Link>;
  }
  return inner;
}
