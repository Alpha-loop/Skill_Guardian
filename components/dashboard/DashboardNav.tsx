'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Home, BookOpen, Award, Users, BarChart3,
  LogOut, Menu, X, Building2, ChevronRight,
  Bell, FileCheck, AlertTriangle, Clock, CheckCircle, Info, ClipboardList, User, Settings,
} from 'lucide-react';
import { Logo } from '@/components/Logo';
import { useAuth } from '@/contexts/AuthContext';
import { useNotifications, Notification } from '@/contexts/NotificationContext';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { cn } from '@/lib/utils';
import { formatDistanceToNow } from 'date-fns';

const employeeNav = [
  { href: '/dashboard',              icon: Home,      label: 'Dashboard' },
  { href: '/dashboard/courses',      icon: BookOpen,  label: 'My Courses' },
  { href: '/dashboard/certificates', icon: Award,     label: 'My Certificates' },
  { href: '/dashboard/profile',      icon: User,      label: 'My Profile' },
  { href: '/dashboard/settings',     icon: Settings,  label: 'Settings' },
  { href: '/dashboard/notifications', icon: Bell,      label: 'Notifications' },
];

const adminNav = [
  { href: '/dashboard',              icon: Home,      label: 'Overview' },
  { href: '/dashboard/employees',    icon: Users,     label: 'Employees' },
  { href: '/dashboard/courses',      icon: BookOpen,  label: 'Courses' },
  { href: '/dashboard/certificates', icon: FileCheck, label: 'Certificates' },
  { href: '/dashboard/reports',      icon: BarChart3, label: 'Reports' },
  { href: '/dashboard/profile',      icon: User,      label: 'My Profile' },
  { href: '/dashboard/settings',     icon: Settings,  label: 'Settings' },
  { href: '/dashboard/notifications', icon: Bell,      label: 'Notifications' },
  { href: '/dashboard/billing', icon: Bell,      label: 'Billing' },
];

const superAdminNav = [
  { href: '/dashboard',               icon: Home,      label: 'Overview' },
  { href: '/dashboard/organisations', icon: Building2, label: 'Organisations' },
  { href: '/dashboard/courses',       icon: BookOpen,  label: 'Course Library' },
  { href: '/dashboard/analytics',     icon: BarChart3, label: 'Analytics' },
  { href: '/dashboard/reports',       icon: FileCheck, label: 'CQC Reports' },
  { href: '/dashboard/profile',      icon: User,      label: 'My Profile' },
  { href: '/dashboard/settings',     icon: Settings,  label: 'Settings' },
  { href: '/dashboard/notifications', icon: Bell,      label: 'Notifications' },
];

function notifIcon(type: Notification['type']) {
  switch (type) {
    case 'expiry_overdue':       return <AlertTriangle className="w-4 h-4 text-red-500 flex-shrink-0" />;
    case 'expiry_warning':       return <Clock className="w-4 h-4 text-amber-500 flex-shrink-0" />;
    case 'certificate_approved': return <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />;
    case 'admin_expiry_summary': return <ClipboardList className="w-4 h-4 text-red-600 flex-shrink-0" />;
    default:                     return <Info className="w-4 h-4 text-blue-500 flex-shrink-0" />;
  }
}

function notifAccentClass(type: Notification['type']): string {
  if (type === 'admin_expiry_summary') return 'bg-red-50/60';
  if (type === 'expiry_overdue') return 'bg-red-50/40';
  return 'bg-blue-50/50';
}

function NotificationPanel({ onClose, anchorRef }: { onClose: () => void; anchorRef: React.RefObject<HTMLDivElement> }) {
  const { notifications, unreadCount, markRead, markAllRead } = useNotifications();

  const rect = anchorRef.current?.getBoundingClientRect();
  const top = rect ? rect.bottom + 8 : 60;
  const left = rect ? rect.left : 16;

  return (
    <div
      className="fixed w-96 bg-white rounded-xl shadow-2xl border border-slate-200 z-[200] overflow-hidden"
      style={{ top, left, maxHeight: 'calc(100vh - 80px)' }}
    >
      <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100 bg-white sticky top-0 z-10">
        <span className="font-semibold text-slate-900 text-sm">Notifications</span>
        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="text-xs hover:underline"
            style={{
              color: 'var(--brand-color)',
            }}
          >
            Mark all read
          </button>
        )}
      </div>

      <div className="overflow-y-auto" style={{ maxHeight: 'calc(100vh - 140px)' }}>
        {notifications.length === 0 ? (
          <div className="py-10 text-center text-slate-400">
            <Bell className="w-8 h-8 mx-auto mb-2 opacity-30" />
            <p className="text-sm">No notifications</p>
          </div>
        ) : (
          notifications.map(n => (
            <button
              key={n.id}
              onClick={() => markRead(n.id)}
              className={cn(
                'w-full text-left px-4 py-3 flex items-start gap-3 hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-0',
                !n.is_read && notifAccentClass(n.type)
              )}
            >
              <div className="mt-0.5 flex-shrink-0">{notifIcon(n.type)}</div>
              <div className="flex-1 min-w-0">
                {n.type === 'admin_expiry_summary' && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wide text-red-600 bg-red-100 px-1.5 py-0.5 rounded mb-1">
                    Staff Compliance Alert
                  </span>
                )}
                <p className={cn('text-sm leading-snug', !n.is_read ? 'font-semibold text-slate-900' : 'text-slate-700')}>
                  {n.title}
                </p>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed whitespace-pre-line font-mono">{n.message}</p>
                <p className="text-xs text-slate-400 mt-1.5">
                  {formatDistanceToNow(new Date(n.created_at), { addSuffix: true })}
                </p>
              </div>
              {!n.is_read && (
                <span 
                className="w-2 h-2 bg-[#005EB8] rounded-full flex-shrink-0 mt-1.5"
                style={{
                  backgroundColor: 'var(--brand-color)',
                }}
                />
              )}
            </button>
          ))
        )}
      </div>
    </div>
  );
}

export default function DashboardNav() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null!!);

  const { profile, organisation, loading, signOut } = useAuth();
  const { unreadCount } = useNotifications();
  const pathname = usePathname();
  const router = useRouter();

  const brandColor =
  organisation?.primary_color || '#005EB8';

  // Close notification panel when clicking outside
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const navItems = profile?.role === 'super_admin'
    ? superAdminNav
    : profile?.role === 'org_admin'
    ? adminNav
    : employeeNav;

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  const initials = profile
    ? `${profile.first_name?.[0] ?? ''}${profile.last_name?.[0] ?? ''}`.toUpperCase() || profile.email[0].toUpperCase()
    : '?';

  const roleBadge = profile?.role === 'super_admin' ? 'Super Admin'
    : profile?.role === 'org_admin' ? 'Admin'
    : 'Employee';

  const NavContent = () => (
    <>
      {/* Logo + bell row */}
      <div className={cn(
        'flex items-center gap-3 px-4 py-5 border-b border-slate-100',
        collapsed && !mobileOpen && 'justify-center px-3'
      )}>
        {organisation?.logo_url ? (
          <img
            src={organisation.logo_url}
            alt={organisation.name}
            className="w-8 h-8 rounded-lg object-cover border flex-shrink-0"
          />
        ) : (
          <div
            className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
            style={{
              backgroundColor: brandColor,
            }}
          >
            <span
              className="font-black text-white text-sm tracking-tight leading-none"
              style={{ letterSpacing: '-0.03em' }}
            >
              SG
            </span>
          </div>
        )}
        {(!collapsed || mobileOpen) && (
          <>
            <span className="font-bold text-slate-900 text-base flex-1">SkillGuardian</span>
            {/* Bell button */}
            <div ref={notifRef} className="relative">
              <button
                onClick={() => setNotifOpen(v => !v)}
                className="relative w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 transition-colors"
                aria-label="Notifications"
              >
                <Bell className="w-4 h-4 text-slate-500" />
                {unreadCount > 0 && (
                  <span className="absolute -top-0.5 -right-0.5 min-w-[16px] h-4 bg-red-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center px-0.5 leading-none">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>
              {notifOpen && <NotificationPanel onClose={() => setNotifOpen(false)} anchorRef={notifRef} />}
            </div>
          </>
        )}
      </div>

      {/* Organisation info */}
      {organisation && (!collapsed || mobileOpen) && (
        <div
          className="mx-3 mt-3 px-3 py-2.5 rounded-lg border"
          style={{
            backgroundColor: 'color-mix(in srgb, var(--brand-color) 8%, white)',
            borderColor: 'color-mix(in srgb, var(--brand-color) 20%, white)',
          }}
        >
          <p
            className="text-xs font-medium truncate"
            style={{
              color: 'var(--brand-color)',
            }}
          >
            {organisation.name}
          </p>
          <p
            className="text-xs capitalize"
            style={{
              color: 'var(--brand-color)',
              opacity: 0.7,
            }}
          >
            {organisation.subscription_tier} plan
          </p>
        </div>
      )}

      {/* Nav items */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map((item) => {
          const active = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setMobileOpen(false)}
              style={
                active
                  ? {
                      backgroundColor: 'var(--brand-color)',
                    }
                  : undefined
              }
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all',
                active
                  ? 'text-white shadow-sm'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900',
                collapsed && !mobileOpen && 'justify-center px-2'
              )}
            >
              <item.icon className="w-4 h-4 flex-shrink-0" />
              {(!collapsed || mobileOpen) && <span>{item.label}</span>}
            </Link>
          );
        })}
      </nav>

      {/* User section */}
      <div className="border-t border-slate-100 p-3">
        <div className={cn('flex items-center gap-3 px-2 py-2 rounded-lg', collapsed && !mobileOpen && 'justify-center')}>
          <Avatar className="w-8 h-8 flex-shrink-0">
            <AvatarFallback 
              className="bg-[#005EB8] text-white text-xs"
              style={{
                backgroundColor: 'var(--brand-color)',
              }}
            >
              {initials}
            </AvatarFallback>
          </Avatar>
          {(!collapsed || mobileOpen) && (
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-slate-900 truncate">
                {profile?.first_name} {profile?.last_name}
              </p>
              <p className="text-xs text-slate-500 truncate">{roleBadge}</p>
            </div>
          )}
        </div>
        <button
          onClick={handleSignOut}
          className={cn(
            'flex items-center gap-2 w-full px-3 py-2 mt-1 text-sm text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors',
            collapsed && !mobileOpen && 'justify-center'
          )}
        >
          <LogOut className="w-4 h-4" />
          {(!collapsed || mobileOpen) && <span>Sign Out</span>}
        </button>
      </div>
    </>
  );

  return (
    <>
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={() => setMobileOpen(false)} />
      )}

      <button
        className="fixed top-4 left-4 z-50 lg:hidden bg-white border border-slate-200 rounded-lg p-2 shadow-sm"
        onClick={() => setMobileOpen(!mobileOpen)}
      >
        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Mobile sidebar */}
      <aside className={cn(
        'fixed left-0 top-0 bottom-0 z-50 lg:hidden bg-white border-r border-slate-200 flex flex-col transition-transform w-64',
        mobileOpen ? 'translate-x-0' : '-translate-x-full'
      )}>
        <NavContent />
      </aside>

      {/* Desktop sidebar */}
      <aside className={cn(
        'hidden lg:flex flex-col bg-white border-r border-slate-200 transition-all duration-300',
        collapsed ? 'w-16' : 'w-64'
      )}>
        <NavContent />
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="hidden lg:flex fixed -translate-x-1/2 top-20 z-10 bg-white border border-slate-200 rounded-full p-1 shadow-sm hover:bg-slate-50 transition-colors"
          style={{ left: collapsed ? '64px' : '256px' }}
        >
          <ChevronRight className={cn('w-3.5 h-3.5 text-slate-400 transition-transform', collapsed && 'rotate-180')} />
        </button>
      </aside>
    </>
  );
}
