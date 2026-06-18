'use client';

import Link from 'next/link';
import { cn } from '@/lib/utils';

import Image from "next/image";

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
      <Image
        src="/logo.png"
        alt="SkillGuardian"
        width={180}
        height={50}
        className="h-auto w-auto"
      />
    </div>
  );

  if (href) {
    return <Link href={href}>{inner}</Link>;
  }
  return inner;
}
