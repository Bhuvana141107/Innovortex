import React, { useState } from 'react';
import {
  RotateCcw,
  Search,
  Bell,
  User,
  Building2,
  GraduationCap,
  Briefcase,
  Sliders,
  LogOut,
  Database,
  Globe
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { UserRole } from '../../types';
import { SearchModal } from '../common/SearchModal';
import { NotificationDrawer } from '../common/NotificationDrawer';

export const Header: React.FC = () => {
  const {
    role,
    setRole,
    activeStudentId,
    setActiveStudentId,
    students,
    notifications,
    resetDemoData,
    logout,
    setActiveTab,
    setViewMode
  } = useApp();

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);

  const unreadCount = notifications.filter(n => !n.read).length;

  const roleIcons: Record<UserRole, React.ReactNode> = {
    STUDENT: <User className="w-3.5 h-3.5 text-[#141412]" />,
    FACULTY: <GraduationCap className="w-3.5 h-3.5 text-[#141412]" />,
    INSTITUTION: <Building2 className="w-3.5 h-3.5 text-[#141412]" />,
    INDUSTRY: <Briefcase className="w-3.5 h-3.5 text-[#141412]" />,
    ADMIN: <Sliders className="w-3.5 h-3.5 text-[#141412]" />
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#EAE2D3]">
        {/* Top announcement bar */}
        <div className="bg-[#2B060E] text-[#FAF7F2] text-xs py-1.5 px-4 flex flex-wrap justify-between items-center border-b border-[#420B17]">
          <div className="flex items-center gap-2 font-mono">
            <span className="bg-[#5A1222] text-[#F4D9DF] px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider">
              SIH 2026 PS26044
            </span>
            <span className="font-bold text-[#FAF7F2]">SkillLoop</span>
            <span className="text-[#DDD2BF] font-sans hidden sm:inline">— Capability Intelligence Platform</span>
          </div>
          <div className="text-[11px] text-[#DDD2BF] font-mono italic hidden md:block">
            "Measuring what humans understand, build, defend and adapt."
          </div>
        </div>

        {/* Main Header navigation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-15 flex items-center justify-between gap-4 py-2">
          {/* Left brand logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setActiveTab('dashboard')}>
            <div className="w-9 h-9 bg-[#72192D] text-[#FAF7F2] rounded-lg flex items-center justify-center font-display font-bold text-lg shadow-sm">
              SL
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-base font-display font-semibold text-[#1C1413] tracking-tight leading-none">SkillLoop</h1>
                <span className="text-[10px] font-mono uppercase bg-[#FBF0F2] text-[#72192D] px-1.5 py-0.5 rounded border border-[#F4D9DF] font-semibold">
                  Editorial Edition
                </span>
              </div>
              <p className="text-[11px] text-[#7A6B62] font-medium mt-0.5">Capability Intelligence Platform</p>
            </div>
          </div>

          {/* Controls / Role & Context Switcher */}
          <div className="flex items-center gap-2.5">
            {/* Landing Page button */}
            <button
              onClick={() => setViewMode('landing')}
              className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold text-[#5C4E46] hover:text-[#1C1413] bg-[#F4EFE6] hover:bg-[#EAE2D3] border border-[#EAE2D3] rounded-lg transition-all"
              title="Return to Landing Page"
            >
              <Globe className="w-3.5 h-3.5 text-[#72192D]" />
              <span className="hidden sm:inline">Landing</span>
            </button>

            {/* Data Collector Link */}
            <button
              onClick={() => setActiveTab('data-collector')}
              className="hidden md:flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold text-[#1C1413] bg-[#F4EFE6] hover:bg-[#EAE2D3] border border-[#EAE2D3] rounded-lg transition-all"
              title="Data Collector & Ingestion Engine"
            >
              <Database className="w-3.5 h-3.5 text-[#72192D]" />
              <span>Ingestion</span>
            </button>

            {/* Quick Search */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="flex items-center gap-2 px-2.5 py-1.5 text-xs font-medium text-[#5C4E46] bg-[#F4EFE6] hover:bg-[#EAE2D3] border border-[#EAE2D3] rounded-lg transition-colors"
              title="Search Capability Resources"
            >
              <Search className="w-3.5 h-3.5 text-[#7A6B62]" />
              <span className="hidden md:inline">Search...</span>
            </button>

            {/* Notifications */}
            <button
              onClick={() => setIsNotifOpen(true)}
              className="relative p-2 text-[#5C4E46] hover:text-[#1C1413] bg-[#F4EFE6] hover:bg-[#EAE2D3] border border-[#EAE2D3] rounded-lg transition-colors"
              title="View Notifications"
            >
              <Bell className="w-3.5 h-3.5" />
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#72192D] text-[#FAF7F2] text-[9px] font-bold rounded-full flex items-center justify-center shadow-xs">
                  {unreadCount}
                </span>
              )}
            </button>

            {/* Student Context Selector */}
            {role === 'STUDENT' && (
              <div className="flex items-center gap-1.5 bg-[#F4EFE6] border border-[#EAE2D3] rounded-lg px-2 py-1">
                <span className="text-[11px] text-[#7A6B62] font-mono hidden md:inline">Student:</span>
                <select
                  value={activeStudentId}
                  onChange={(e) => setActiveStudentId(e.target.value)}
                  className="bg-transparent text-xs font-semibold text-[#1C1413] focus:outline-none cursor-pointer"
                >
                  {students.map(s => (
                    <option key={s.id} value={s.id} className="bg-[#FAF7F2] text-[#1C1413]">
                      {s.name} ({s.targetRole})
                    </option>
                  ))}
                </select>
              </div>
            )}

            {/* Role Switcher */}
            <div className="flex items-center gap-1.5 bg-[#F4EFE6] text-[#1C1413] border border-[#EAE2D3] rounded-lg px-2.5 py-1">
              <span>{roleIcons[role]}</span>
              <span className="text-[11px] text-[#7A6B62] font-mono hidden sm:inline">Role:</span>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as UserRole)}
                className="bg-transparent text-xs font-semibold text-[#1C1413] focus:outline-none cursor-pointer border-none"
              >
                <option value="STUDENT" className="bg-[#FAF7F2]">Student</option>
                <option value="INDUSTRY" className="bg-[#FAF7F2]">Industry / Employer</option>
                <option value="FACULTY" className="bg-[#FAF7F2]">Faculty / Mentor</option>
                <option value="INSTITUTION" className="bg-[#FAF7F2]">Institution / ERP</option>
                <option value="ADMIN" className="bg-[#FAF7F2]">Platform Admin</option>
              </select>
            </div>

            {/* Reset Demo Data Button */}
            <button
              onClick={resetDemoData}
              className="flex items-center gap-1 px-2 py-1.5 text-xs font-medium text-[#5C4E46] hover:text-[#1C1413] bg-[#F4EFE6] hover:bg-[#EAE2D3] border border-[#EAE2D3] rounded-lg transition-colors"
              title="Reset Demo Data"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">Reset</span>
            </button>

            {/* Logout Button */}
            <button
              onClick={logout}
              className="flex items-center gap-1 px-2 py-1.5 text-xs font-medium text-[#72192D] hover:bg-[#FBF0F2] border border-[#F4D9DF] rounded-lg transition-colors"
              title="Logout"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden lg:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
      <NotificationDrawer isOpen={isNotifOpen} onClose={() => setIsNotifOpen(false)} />
    </>
  );
};
