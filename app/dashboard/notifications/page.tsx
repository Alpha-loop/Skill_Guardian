'use client';

import { Bell, CheckCheck } from 'lucide-react';
import { useNotifications } from '@/contexts/NotificationContext';

export default function NotificationsPage() {
  const {
    notifications,
    unreadCount,
    markRead,
    markAllRead
  } = useNotifications();

  return (
    <div className="space-y-6 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Notifications
          </h1>

          <p className="text-slate-500 mt-1">
            Stay updated with training,
            certificates and account activity.
          </p>
        </div>

        {unreadCount > 0 && (
          <button
            onClick={markAllRead}
            className="flex items-center gap-2 bg-[#005EB8] text-white px-4 py-2 rounded-lg"
          >
            <CheckCheck className="w-4 h-4" />
            Mark All Read
          </button>
        )}
      </div>

      <div className="bg-white rounded-xl border overflow-hidden">
        {notifications.length === 0 ? (
          <div className="p-12 text-center">
            <Bell className="w-10 h-10 mx-auto text-slate-300 mb-3" />

            <h3 className="font-semibold">
              No notifications
            </h3>

            <p className="text-slate-500 text-sm">
              You're all caught up.
            </p>
          </div>
        ) : (
          <div>
            {notifications.map((notification) => (
              <button
                key={notification.id}
                onClick={() =>
                  !notification.is_read &&
                  markRead(notification.id)
                }
                className={`w-full text-left border-b p-4 hover:bg-slate-50 transition ${
                  !notification.is_read
                    ? 'bg-blue-50'
                    : ''
                }`}
              >
                <div className="flex justify-between">
                  <h3 className="font-semibold">
                    {notification.title}
                  </h3>

                  {!notification.is_read && (
                    <span className="w-2 h-2 rounded-full bg-blue-600 mt-2" />
                  )}
                </div>

                <p className="text-slate-600 text-sm mt-1">
                  {notification.message}
                </p>

                <p className="text-xs text-slate-400 mt-2">
                  {new Date(
                    notification.created_at
                  ).toLocaleString()}
                </p>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}