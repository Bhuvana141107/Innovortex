import React from 'react';
import { X, Bell, CheckCircle2, AlertTriangle, Info } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface NotificationDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export const NotificationDrawer: React.FC<NotificationDrawerProps> = ({ isOpen, onClose }) => {
  const { notifications } = useApp();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-[#141412]/40 backdrop-blur-xs fade-in">
      <div className="w-full max-w-md bg-[#F9F7F4] border-l border-[#E0DBD3] h-full shadow-2xl flex flex-col">
        <div className="flex items-center justify-between p-4 border-b border-[#E0DBD3] bg-[#F2EFE9]">
          <div className="flex items-center gap-2">
            <Bell className="w-4 h-4 text-[#141412]" />
            <h3 className="font-display font-semibold text-sm text-[#141412]">Capability Notifications</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 text-[#8C8880] hover:text-[#141412] rounded transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto divide-y divide-[#E0DBD3] p-4 space-y-3">
          {notifications.length > 0 ? (
            notifications.map((notif) => (
              <div
                key={notif.id}
                className="p-3.5 border border-[#E0DBD3] rounded bg-[#F2EFE9] shadow-xs hover:border-[#8C8880] transition-colors"
              >
                <div className="flex items-start gap-3">
                  {notif.type === 'success' && <CheckCircle2 className="w-4 h-4 text-[#3A5C3A] shrink-0 mt-0.5" />}
                  {notif.type === 'alert' && <AlertTriangle className="w-4 h-4 text-[#8B3A3A] shrink-0 mt-0.5" />}
                  {notif.type === 'info' && <Info className="w-4 h-4 text-[#5C5954] shrink-0 mt-0.5" />}
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-semibold text-[#141412]">{notif.title}</h4>
                      <span className="text-[10px] font-mono text-[#8C8880]">{notif.timestamp}</span>
                    </div>
                    <p className="text-xs text-[#5C5954] mt-1 leading-relaxed">{notif.message}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 text-center text-[#8C8880] text-xs">
              No new notifications.
            </div>
          )}
        </div>

        <div className="p-3 border-t border-[#E0DBD3] bg-[#F2EFE9] text-center">
          <p className="text-[11px] font-mono text-[#8C8880]">SkillLoop Telemetry Feed · SIH 2026</p>
        </div>
      </div>
    </div>
  );
};
