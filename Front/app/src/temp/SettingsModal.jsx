import React, { useState, useEffect, useRef } from 'react';

/* ─────────────────────────────────────────────────────────────────────────────
   [아이콘 시스템] SVG 직접 내장 (Zero Dependency)
   ───────────────────────────────────────────────────────────────────────────── */
const Icons = {
  X: props => (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  ),
  User: props => (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  ),
  Settings: props => (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.47a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.35a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  ),
  Bell: props => (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
      <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
    </svg>
  ),
  Link: props => (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  ),
  Shield: props => (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
    </svg>
  ),
  CreditCard: props => (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <rect width="20" height="14" x="2" y="5" rx="2" />
      <line x1="2" x2="22" y1="10" y2="10" />
    </svg>
  ),
  Users: props => (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  ),
  Building: props => (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
      <path d="M9 22v-4h6v4" />
      <path d="M8 6h.01" />
      <path d="M16 6h.01" />
      <path d="M12 6h.01" />
      <path d="M12 10h.01" />
      <path d="M12 14h.01" />
      <path d="M16 10h.01" />
      <path d="M16 14h.01" />
      <path d="M8 10h.01" />
      <path d="M8 14h.01" />
    </svg>
  ),
  Moon: props => (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
    </svg>
  ),
  LogOut: props => (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
      <polyline points="16 17 21 12 16 7" />
      <line x1="21" x2="9" y1="12" y2="12" />
    </svg>
  ),
  Mail: props => (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  ),
  ChevronRight: props => (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="m9 18 6-6-6-6" />
    </svg>
  ),
  Search: props => (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.3-4.3" />
    </svg>
  ),
  Camera: props => (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z" />
      <circle cx="12" cy="13" r="3" />
    </svg>
  ),
  Check: props => (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M20 6 9 17l-5-5" />
    </svg>
  ),
  Lock: props => (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  ),
  FileText: props => (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" x2="8" y1="13" y2="13" />
      <line x1="16" x2="8" y1="17" y2="17" />
      <line x1="10" x2="8" y1="9" y2="9" />
    </svg>
  ),
  Download: props => (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
      <polyline points="7 10 12 15 17 10" />
      <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
  ),
  Trash: props => (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M3 6h18" />
      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
      <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  ),
  Copy: props => (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  ),
  Key: props => (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="m21 2-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0 3 3L22 7l-3-3m-3.5 3.5L19 4" />
    </svg>
  ),
  Calendar: props => (
    <svg
      {...props}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <path d="M16 2v4" />
      <path d="M8 2v4" />
      <path d="M3 10h18" />
    </svg>
  )
};

/* ─────────────────────────────────────────────────────────────────────────────
   [탭 메타 데이터]
   ───────────────────────────────────────────────────────────────────────────── */
const TABMeta = {
  profile: {
    label: '프로필',
    icon: Icons.User,
    title: '프로필',
    desc: '계정 정보와 프로필을 관리합니다.',
    section: 'Account'
  },
  basic: {
    label: '기본 설정',
    icon: Icons.Settings,
    title: '기본 설정',
    desc: '언어, 테마 및 지역 설정을 변경합니다.',
    section: 'Account'
  },
  notifications: {
    label: '알림',
    icon: Icons.Bell,
    title: '알림',
    desc: '이메일 및 푸시 알림 수신 여부를 설정합니다.',
    section: 'Account'
  },
  connections: {
    label: '연결',
    icon: Icons.Link,
    title: '연결된 계정',
    desc: '외부 서비스와의 연동 상태를 관리합니다.',
    section: 'Account'
  },
  'ws-general': {
    label: '일반',
    icon: Icons.Building,
    title: '워크스페이스',
    desc: '워크스페이스 기본 정보 및 식별자를 관리합니다.',
    section: 'Workspace'
  },
  'ws-members': {
    label: '멤버',
    icon: Icons.Users,
    title: '멤버',
    desc: '팀원을 초대하고 권한을 부여합니다.',
    section: 'Workspace'
  },
  'ws-schedule': {
    label: '작업 일정',
    icon: Icons.Calendar,
    title: '작업 일정',
    desc: '팀의 근무 요일과 근무 시간을 설정합니다.',
    section: 'Workspace'
  },
  'ws-billing': {
    label: '결제',
    icon: Icons.CreditCard,
    title: '결제 및 청구',
    desc: '요금제와 결제 내역을 관리합니다.',
    section: 'Workspace'
  },
  'ws-security': {
    label: '보안',
    icon: Icons.Shield,
    title: '계정 및 보안',
    desc: '로그인, 인증 및 보안 관련 설정을 관리합니다.',
    section: 'Workspace'
  },
  'ws-trash': {
    label: '휴지통',
    icon: Icons.Trash,
    title: '휴지통',
    desc: '삭제된 페이지와 작업을 관리합니다.',
    section: 'Workspace'
  }
};

const getTabTitle = id => TABMeta[id]?.title || '설정';
const getTabDesc = id => TABMeta[id]?.desc || '계정 및 워크스페이스 설정을 관리합니다.';

/* ─────────────────────────────────────────────────────────────────────────────
   [메인 컴포넌트] SettingsModal
   ───────────────────────────────────────────────────────────────────────────── */
export default function SettingsModal({ open, onClose, user }) {
  const [activeTab, setActiveTab] = useState('profile');
  const [isVisible, setIsVisible] = useState(false);
  const [toast, setToast] = useState(null);
  const toastTimerRef = useRef(null);
  const headerId = 'settings-modal-title';

  const showToast = message => {
    setToast(message);
    if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    toastTimerRef.current = setTimeout(() => {
      setToast(null);
      toastTimerRef.current = null;
    }, 3000);
  };

  useEffect(() => {
    if (open) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [open]);

  useEffect(() => {
    const handleEsc = e => e.key === 'Escape' && onClose();
    if (open) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [open, onClose]);

  useEffect(() => {
    if (!open) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = original;
    };
  }, [open]);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) clearTimeout(toastTimerRef.current);
    };
  }, []);

  if (!open && !isVisible) return null;

  const accountTabs = Object.entries(TABMeta).filter(([, meta]) => meta.section === 'Account');
  const workspaceTabs = Object.entries(TABMeta).filter(([, meta]) => meta.section === 'Workspace');

  return (
    <div
      className={`fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6 transition-opacity duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        open ? 'opacity-100' : 'opacity-0'
      }`}
      role="dialog"
      aria-modal="true"
      aria-labelledby={headerId}
      style={{ overflowY: 'auto' }}>
      <div
        className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div
        className={`relative w-full max-w-5xl h-[800px] max-h-[90vh] bg-white rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] flex overflow-hidden ring-1 ring-white/10 transform transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          open ? 'scale-100 translate-y-0' : 'scale-95 translate-y-4'
        }`}>
        {/* Sidebar */}
        <aside className="w-64 bg-zinc-900 text-zinc-400 flex flex-col flex-shrink-0 border-r border-zinc-800 select-none min-h-0">
          <div className="p-5 pb-2">
            <div className="flex items-center gap-3 p-2 rounded-xl hover:bg-white/5 transition-colors cursor-pointer group">
              <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-500 to-purple-500 flex items-center justify-center text-white text-xs font-bold ring-2 ring-zinc-900 group-hover:ring-zinc-700 transition-all shadow-inner">
                {user?.initial || 'U'}
              </div>
              <div className="flex flex-col overflow-hidden min-w-0">
                <span className="text-sm font-medium text-zinc-200 truncate group-hover:text-white transition-colors">
                  {user?.name || '사용자'}
                </span>
                <span className="text-[11px] text-zinc-500 truncate">Pro Plan</span>
              </div>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto px-3 py-2 space-y-6 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-zinc-800 hover:[&::-webkit-scrollbar-thumb]:bg-zinc-700">
            <nav className="space-y-0.5">
              <div className="px-3 pb-2 text-[10px] font-bold text-zinc-600 uppercase tracking-wider">
                Account
              </div>
              {accountTabs.map(([id, meta]) => (
                <SidebarItem
                  key={id}
                  id={id}
                  label={meta.label}
                  icon={meta.icon}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                />
              ))}
            </nav>
            <nav className="space-y-0.5">
              <div className="px-3 pb-2 text-[10px] font-bold text-zinc-600 uppercase tracking-wider">
                Workspace
              </div>
              {workspaceTabs.map(([id, meta]) => (
                <SidebarItem
                  key={id}
                  id={id}
                  label={meta.label}
                  icon={meta.icon}
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                />
              ))}
            </nav>
          </div>

          <div className="p-4 border-t border-zinc-800">
            <button className="flex items-center gap-2 w-full px-2 py-2 text-xs font-medium text-zinc-500 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all group">
              <Icons.LogOut className="w-3.5 h-3.5 group-hover:stroke-red-400 transition-colors" />
              <span>로그아웃</span>
            </button>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 bg-white flex flex-col min-w-0 min-h-0 relative">
          {/* 닫기 버튼 */}
          <button
            onClick={onClose}
            className="absolute top-7 right-6 text-zinc-400 hover:text-zinc-900 bg-transparent hover:bg-zinc-100 p-2 rounded-full transition-all z-10 focus:outline-none focus:ring-2 focus:ring-zinc-200"
            aria-label="닫기">
            <Icons.X className="w-5 h-5" />
          </button>

          <div className="flex-1 flex flex-col min-h-0">
            <div className="h-4 sm:h-4 shrink-0" />
            <div className="flex-1 overflow-y-auto pb-16 [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-zinc-200 hover:[&::-webkit-scrollbar-thumb]:bg-zinc-300">
              <div className="px-6 sm:px-10">
                <div className="max-w-3xl mx-auto pt-2 pb-24">
                  <header className="mb-10">
                    <h2
                      id={headerId}
                      className="text-xl font-semibold text-zinc-900 mb-1 tracking-tight">
                      {getTabTitle(activeTab)}
                    </h2>
                    <p className="text-xs text-zinc-500">{getTabDesc(activeTab)}</p>
                  </header>

                  <div className="space-y-12">
                    {activeTab === 'profile' && <ProfileTab user={user} showToast={showToast} />}
                    {activeTab === 'basic' && <BasicTab showToast={showToast} />}
                    {activeTab === 'notifications' && <NotificationsTab />}
                    {activeTab === 'connections' && <ConnectionsTab />}
                    {activeTab === 'ws-general' && <GeneralTab showToast={showToast} />}
                    {activeTab === 'ws-members' && <MembersTab />}
                    {activeTab === 'ws-schedule' && <ScheduleTab showToast={showToast} />}
                    {activeTab === 'ws-billing' && <BillingTab showToast={showToast} />}
                    {activeTab === 'ws-security' && <SecurityTab showToast={showToast} />}
                    {activeTab === 'ws-trash' && <TrashTab showToast={showToast} />}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Toast */}
          <div
            className={`absolute bottom-6 left-1/2 transform -translate-x-1/2 flex items-center gap-2 px-4 py-2.5 bg-zinc-900 text-white text-sm font-medium rounded-full shadow-lg transition-all duration-300 pointer-events-none ${
              toast ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
            }`}>
            <Icons.Check className="w-4 h-4 text-green-400" />
            {toast}
          </div>
        </main>
      </div>

      <style>{`@keyframes fadeIn { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }`}</style>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   [Sub Components] Tab Contents
   ───────────────────────────────────────────────────────────────────────────── */

function ProfileTab({ user, showToast }) {
  return (
    <div className="space-y-12">
      {/* 프로필 사진 섹션 */}
      <section className="flex items-center gap-6 pb-10 border-b border-zinc-100">
        <div className="relative group cursor-pointer">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-4xl font-bold text-white shadow-lg ring-4 ring-white group-hover:ring-indigo-50 transition-all">
            {user?.initial || 'U'}
          </div>
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity backdrop-blur-[2px]">
            <Icons.Camera className="text-white w-6 h-6" />
          </div>
        </div>
        <div>
          <h3 className="font-semibold text-zinc-900 text-lg">프로필 사진</h3>
          <p className="text-sm text-zinc-500 mb-4">
            다른 사용자에게 표시될 사진을 업로드해주세요.
          </p>
          <div className="flex gap-2">
            <Button variant="secondary" size="sm">
              이미지 변경
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="text-red-500 hover:bg-red-50 hover:text-red-600 hover:border-red-100">
              제거
            </Button>
          </div>
        </div>
      </section>

      {/* 텍스트 필드 섹션 */}
      <section className="pt-2">
        <div className="grid grid-cols-2 gap-x-6 gap-y-8">
          <Input label="이름" defaultValue={user?.name} />
          <Input label="닉네임" placeholder="표시될 닉네임" />

          <div className="col-span-2 mb-2">
            <Input
              label="이메일"
              defaultValue={user?.email || 'user@example.com'}
              icon={<Icons.Mail className="w-4 h-4" />}
              description="이메일 변경 시 인증 메일이 발송됩니다."
            />
          </div>

          <div className="col-span-2 mt-1">
            <label className="block text-sm font-medium text-zinc-700 mb-2">자기소개</label>
            <textarea
              className="w-full h-24 px-3 py-2 text-sm border border-zinc-200 rounded-lg focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 outline-none resize-none transition-all placeholder:text-zinc-400 hover:border-zinc-300"
              placeholder="팀원들에게 나를 소개해주세요."
            />
          </div>
        </div>

        <div className="flex justify-end pt-10 mt-8 border-t border-zinc-100">
          <Button onClick={() => showToast('프로필이 저장되었습니다.')}>변경 사항 저장</Button>
        </div>
      </section>
    </div>
  );
}

function BasicTab({ showToast }) {
  const [theme, setTheme] = useState('System');

  return (
    <div className="space-y-12">
      {/* 테마 섹션 */}
      <section className="pb-10 border-b border-zinc-100">
        <h3 className="text-lg font-semibold text-zinc-900 mb-1">테마</h3>
        <p className="text-sm text-zinc-500 mb-6">내 기기에서 앱의 모습을 마음껏 바꿔보세요.</p>

        <div className="grid grid-cols-3 gap-4">
          {['Light', 'Dark', 'System'].map(t => (
            <button
              key={t}
              type="button"
              onClick={() => setTheme(t)}
              className={`flex flex-col items-center justify-center p-4 rounded-xl border transition-all gap-2 relative group ${
                theme === t
                  ? 'border-indigo-600 bg-indigo-50/50 text-indigo-700 ring-1 ring-indigo-600 shadow-sm'
                  : 'border-zinc-200 bg-white text-zinc-500 hover:border-zinc-300 hover:bg-zinc-50'
              }`}>
              {t === 'Dark' ? (
                <Icons.Moon className="w-5 h-5" />
              ) : t === 'Light' ? (
                <div className="w-5 h-5 rounded-full border-2 border-current bg-white" />
              ) : (
                <Icons.Settings className="w-5 h-5" />
              )}
              <span className="text-xs font-semibold">{t}</span>
              {theme === t && (
                <div className="absolute top-2 right-2 text-indigo-600">
                  <Icons.Check className="w-3.5 h-3.5" />
                </div>
              )}
            </button>
          ))}
        </div>
      </section>

      {/* 언어 / 지역 섹션 */}
      <section className="pb-4 space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-zinc-900 mb-1">언어 및 지역</h3>
          <p className="text-sm text-zinc-500 mb-6">언어와 시간대를 변경합니다.</p>

          <div className="space-y-5">
            <Select
              label="언어 (Language)"
              options={['한국어', 'English (US)', 'English (UK)', '日本語']}
            />
            <Select
              label="시간대 (Timezone)"
              options={['(GMT+09:00) Seoul', '(GMT-07:00) Pacific Time', '(GMT+00:00) UTC']}
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <Select label="날짜 형식" options={['YYYY.MM.DD', 'YYYY-MM-DD', 'DD/MM/YYYY']} />
          <Select label="주 시작 요일" options={['월요일', '일요일']} />
        </div>

        <div className="flex justify-end pt-10 mt-8 border-t border-zinc-100">
          <Button onClick={() => showToast('설정이 업데이트되었습니다.')}>저장</Button>
        </div>
      </section>
    </div>
  );
}

function NotificationsTab() {
  return (
    <div className="space-y-10">
      {/* 이메일 알림 그룹 */}
      <SettingsGroup title="이메일 알림">
        <SettingsRow
          label="주간 리포트"
          description={'지난주 활동 요약과 주요 통계를 주 1회 이메일로 받아봅니다.'}>
          <ToggleItem checked />
        </SettingsRow>

        <SettingsRow
          label="제품 업데이트"
          description={'새로운 기능 출시, 개선 사항, 주요 공지사항을 이메일로 받아봅니다.'}>
          <ToggleItem />
        </SettingsRow>

        <SettingsRow
          label="일일 다이제스트"
          description="오늘 할 일과 마감이 임박한 작업을 아침에 한 번에 모아 보내줍니다.">
          <ToggleItem />
        </SettingsRow>
      </SettingsGroup>

      {/* 작업 및 프로젝트 알림 */}
      <SettingsGroup title="작업 및 프로젝트 알림">
        <SettingsRow
          label="나에게 배정된 작업"
          description="새 작업이 나에게 할당될 때 알림을 받습니다.">
          <ToggleItem checked />
        </SettingsRow>
        <SettingsRow
          label="마감일 변경"
          description="내가 담당자이거나 팔로우 중인 작업의 마감일이 변경될 때 알림을 받습니다.">
          <ToggleItem checked />
        </SettingsRow>
        <SettingsRow
          label="댓글 및 멘션"
          description="@멘션되거나 내가 작성한 댓글에 답글이 달리면 알림을 받습니다.">
          <ToggleItem checked />
        </SettingsRow>
      </SettingsGroup>

      {/* 푸시 알림 그룹 */}
      <SettingsGroup title="푸시 알림">
        <SettingsRow label="데스크톱 푸시" description="브라우저에서 실시간 알림을 받습니다.">
          <ToggleItem checked />
        </SettingsRow>

        <SettingsRow label="모바일 푸시" description="모바일 앱에서 푸시 알림을 받습니다.">
          <ToggleItem checked />
        </SettingsRow>

        <SettingsRow
          label="집중 모드일 때 알림 줄이기"
          description="집중 모드에서는 멘션 및 긴급 알림만 수신합니다.">
          <ToggleItem />
        </SettingsRow>
      </SettingsGroup>
    </div>
  );
}

function ConnectionsTab() {
  return (
    <div className="space-y-4">
      <ConnectionItem
        name="Google Drive"
        icon="https://upload.wikimedia.org/wikipedia/commons/1/12/Google_Drive_icon_%282020%29.svg"
        desc="문서 미리보기 및 첨부 파일 연동"
        connected
      />
      <ConnectionItem
        name="Slack"
        icon="https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg"
        desc="채널 알림 및 빠른 명령 사용"
      />
      <ConnectionItem
        name="GitHub"
        icon="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
        desc="이슈 트래킹 및 PR 상태 동기화"
      />
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   [Workspace Tabs]
   ───────────────────────────────────────────────────────────────────────────── */

function GeneralTab({ showToast }) {
  return (
    <div className="space-y-8">
      <Section title="워크스페이스 정보">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-indigo-600 rounded-lg flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-indigo-200">
              A
            </div>
            <div>
              <Button variant="secondary" size="sm">
                로고 변경
              </Button>
            </div>
          </div>
          <Input label="워크스페이스 이름" defaultValue="Acme Corp" />
          <Input label="워크스페이스 URL" defaultValue="acme-corp.myapp.com" prefix="https://" />
        </div>
      </Section>

      <Section title="워크스페이스 ID">
        <p className="text-sm text-zinc-500 mb-2">API 연동이나 지원 요청 시 필요한 ID입니다.</p>
        <CopyInput
          value="ws_82j9d09a0f9j290"
          label="Workspace ID"
          onCopy={() => showToast('ID가 복사되었습니다.')}
        />
      </Section>

      <div className="p-4 border border-red-100 rounded-xl bg-red-50/30">
        <h3 className="text-red-600 font-semibold text-sm mb-1">Danger Zone</h3>
        <p className="text-red-500 text-xs mb-4">
          워크스페이스를 삭제하면 모든 데이터가 영구적으로 제거됩니다.
        </p>
        <div className="flex items-center justify-between">
          <div className="text-xs text-zinc-500">이 작업은 되돌릴 수 없습니다.</div>
          <Button
            variant="ghost"
            size="sm"
            className="text-red-600 hover:bg-red-100 hover:text-red-700 hover:border-red-200 border border-transparent">
            <Icons.Trash className="w-3.5 h-3.5 mr-1.5" />
            워크스페이스 삭제
          </Button>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <Button onClick={() => showToast('설정이 저장되었습니다.')}>저장</Button>
      </div>
    </div>
  );
}

/* 작업 일정 탭 */
function ScheduleTab({ showToast }) {
  const [workDays, setWorkDays] = useState(['월', '화', '수', '목', '금']);
  const [startTime, setStartTime] = useState('10:00');
  const [endTime, setEndTime] = useState('19:00');

  const allDays = ['월', '화', '수', '목', '금', '토', '일'];

  const toggleDay = day => {
    setWorkDays(prev => (prev.includes(day) ? prev.filter(d => d !== day) : [...prev, day]));
  };

  return (
    <div className="space-y-8">
      <Section title="근무 요일">
        <p className="text-sm text-zinc-500 mb-4">
          팀이 기본적으로 일하는 요일을 설정하면, 작업 마감일과 캘린더에 반영됩니다.
        </p>
        <div className="flex flex-wrap gap-2">
          {allDays.map(d => {
            const active = workDays.includes(d);
            return (
              <button
                key={d}
                type="button"
                onClick={() => toggleDay(d)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                  active
                    ? 'bg-indigo-50 text-indigo-700 border-indigo-300'
                    : 'bg-white text-zinc-600 border-zinc-200 hover:bg-zinc-50'
                }`}>
                {d}
              </button>
            );
          })}
        </div>
      </Section>

      <Section title="근무 시간">
        <p className="text-sm text-zinc-500 mb-4">
          기본 근무 시간은 일정 추천, 알림 스케줄 등에 사용될 수 있습니다.
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <span className="text-xs text-zinc-500">시작</span>
          <input
            type="time"
            value={startTime}
            onChange={e => setStartTime(e.target.value)}
            className="border border-zinc-200 rounded-lg px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          />
          <span className="text-xs text-zinc-400">–</span>
          <span className="text-xs text-zinc-500">종료</span>
          <input
            type="time"
            value={endTime}
            onChange={e => setEndTime(e.target.value)}
            className="border border-zinc-200 rounded-lg px-3 py-1.5 text-sm outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
          />
        </div>
      </Section>

      <SettingsGroup title="알림과 연동">
        <SettingsRow
          label="근무 시간 외 알림 줄이기"
          description="근무 시간 외에는 멘션 및 긴급 알림 위주로만 전송합니다.">
          <ToggleItem checked />
        </SettingsRow>
        <SettingsRow
          label="캘린더 연동"
          description="외부 캘린더(예: Google Calendar)에 근무 시간을 표시해 팀 가용성을 공유합니다.">
          <Button variant="secondary" size="sm">
            캘린더 연결
          </Button>
        </SettingsRow>
      </SettingsGroup>

      <div className="flex justify-end pt-4">
        <Button onClick={() => showToast('작업 일정이 저장되었습니다.')}>저장</Button>
      </div>
    </div>
  );
}

/* Notion 스타일 계정/보안 레이아웃 */
function SecurityTab({ showToast }) {
  return (
    <div className="space-y-10">
      {/* 계정 영역 */}
      <SettingsGroup title="계정">
        <SettingsRow label="이름" description="계정에 표시되는 이름입니다.">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-zinc-800 text-white flex items-center justify-center text-sm font-semibold">
                준
              </div>
              <div className="text-sm text-zinc-900">준오 김</div>
            </div>
            <Button variant="secondary" size="sm">
              이름 변경
            </Button>
          </div>
        </SettingsRow>
      </SettingsGroup>

      {/* 계정 보안 */}
      <SettingsGroup title="계정보안">
        <SettingsRow label="이메일" description="로그인 및 알림에 사용되는 이메일입니다.">
          <span className="text-sm text-zinc-700 mr-3">kims2258@gmail.com</span>
          <Button variant="secondary" size="sm">
            이메일 변경
          </Button>
        </SettingsRow>

        <SettingsRow
          label="비밀번호"
          description="계정 로그인에 사용할 영구 비밀번호를 설정하세요.">
          <Button variant="secondary" size="sm">
            비밀번호 추가
          </Button>
        </SettingsRow>

        <SettingsRow label="2단계 인증" description="로그인 단계에서 계정 보안 방식을 추가하세요.">
          <Button variant="secondary" size="sm">
            인증 방법 추가
          </Button>
        </SettingsRow>

        <SettingsRow label="패스키" description="기기 생체 인식 인증으로 안전하게 로그인하세요.">
          <Button variant="secondary" size="sm">
            패스키 추가
          </Button>
        </SettingsRow>
      </SettingsGroup>

      {/* 공유 및 권한 */}
      <SettingsGroup title="공유 및 권한">
        <SettingsRow
          label="조직 도메인만 초대 허용"
          description="예: @company.com 이메일만 워크스페이스에 초대할 수 있도록 제한합니다.">
          <ToggleItem checked />
        </SettingsRow>
        <SettingsRow
          label="링크로 페이지 공개 허용"
          description="특정 페이지를 링크가 있는 모든 사람이 볼 수 있도록 허용합니다.">
          <ToggleItem checked />
        </SettingsRow>
        <SettingsRow
          label="게스트의 외부 공유 허용"
          description="게스트가 자신이 접근 가능한 페이지를 외부 사용자와 공유할 수 있도록 허용합니다.">
          <ToggleItem />
        </SettingsRow>
      </SettingsGroup>

      {/* 고급 보안 */}
      <SettingsGroup title="고급 보안">
        <SettingsRow
          label="모든 사용자에게 2단계 인증 요구"
          description="다음 로그인부터 모든 사용자에게 2단계 인증 설정을 요구합니다.">
          <ToggleItem />
        </SettingsRow>
        <SettingsRow
          label="SSO(단일 로그인) 사용"
          description="조직의 SSO 제공자를 통해서만 로그인하도록 강제합니다.">
          <ToggleItem />
        </SettingsRow>
        <SettingsRow
          label="장기 미사용 세션 자동 로그아웃"
          description="설정된 시간 동안 활동이 없으면 자동으로 로그아웃합니다. (예: 30일)">
          <ToggleItem checked />
        </SettingsRow>
      </SettingsGroup>

      {/* 지원 영역 */}
      <SettingsGroup title="지원">
        <SettingsRow
          label="지원팀 액세스"
          description="지원팀 액세스를 일시적으로 허용해 문제 해결과 콘텐츠 복구에 도움을 받을 수 있습니다. 언제든지 액세스 권한을 철회할 수 있습니다.">
          <ToggleItem checked={false} />
        </SettingsRow>

        <div className="pt-6 text-xs text-red-500 cursor-pointer hover:underline">내 계정 삭제</div>
      </SettingsGroup>

      <div className="flex justify-end pt-4">
        <Button onClick={() => showToast('보안 설정이 저장되었습니다.')}>저장</Button>
      </div>
    </div>
  );
}

function BillingTab({ showToast }) {
  const invoices = [
    { id: 'INV-001', date: '2024. 10. 01', amount: '₩12,000', status: 'Paid' },
    { id: 'INV-002', date: '2024. 11. 01', amount: '₩12,000', status: 'Paid' },
    { id: 'INV-003', date: '2024. 12. 01', amount: '₩12,000', status: 'Pending' }
  ];

  return (
    <div className="space-y-8">
      <Section title="현재 플랜">
        <div className="p-5 border border-indigo-100 rounded-xl bg-gradient-to-r from-indigo-50/50 to-purple-50/50 flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold px-2 py-0.5 rounded text-indigo-700 bg-white border border-indigo-200 shadow-sm">
                PRO
              </span>
              <span className="text-sm font-semibold text-indigo-900">Professional Plan</span>
            </div>
            <p className="text-xs text-zinc-600">
              다음 결제일: <span className="font-medium text-zinc-900">2025년 1월 1일</span>
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="bg-white hover:bg-zinc-50">
              플랜 변경
            </Button>
            <Button
              variant="secondary"
              size="sm"
              className="text-indigo-600 border-indigo-200 hover:border-indigo-300 hover:bg-indigo-50">
              결제 수단 관리
            </Button>
          </div>
        </div>
      </Section>

      <Section title="청구 내역">
        <div className="border border-zinc-200 rounded-lg overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-500">
              <tr>
                <th className="px-4 py-3 font-medium">송장 번호</th>
                <th className="px-4 py-3 font-medium">청구일</th>
                <th className="px-4 py-3 font-medium">금액</th>
                <th className="px-4 py-3 font-medium text-right">상태</th>
                <th className="px-4 py-3 w-10" />
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {invoices.map(inv => (
                <tr key={inv.id} className="group hover:bg-zinc-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-zinc-900 flex items-center gap-2">
                    <Icons.FileText className="w-4 h-4 text-zinc-400" />
                    {inv.id}
                  </td>
                  <td className="px-4 py-3 text-zinc-500">{inv.date}</td>
                  <td className="px-4 py-3 text-zinc-900">{inv.amount}</td>
                  <td className="px-4 py-3 text-right">
                    <span
                      className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium border ${
                        inv.status === 'Paid'
                          ? 'bg-green-50 text-green-700 border-green-100'
                          : 'bg-yellow-50 text-yellow-700 border-yellow-100'
                      }`}>
                      {inv.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <button className="text-zinc-400 hover:text-zinc-900" title="다운로드">
                      <Icons.Download className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Section>

      <div className="flex justify-end pt-2">
        <Button onClick={() => showToast('청구 설정이 저장되었습니다.')}>저장</Button>
      </div>
    </div>
  );
}

function MembersTab() {
  const members = [
    { name: '김준오', email: 'kim@company.com', role: 'Admin', active: true },
    { name: '김재환', email: 'lee@company.com', role: 'Member', active: true },
    { name: '박현수', email: 'park@company.com', role: 'Viewer', active: false },
    { name: '이준상', email: 'park@company.com', role: 'Viewer', active: false }
  ];

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-2">
        <SectionTitle title="멤버 관리" desc={`${members.length}명의 멤버가 있습니다.`} />
        <Button
          size="sm"
          className="bg-indigo-600 hover:bg-indigo-700 text-white border-transparent shadow-md shadow-indigo-200">
          초대하기
        </Button>
      </div>

      <div className="relative group">
        <Icons.Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 w-4 h-4 group-focus-within:text-zinc-600 transition-colors" />
        <input
          className="w-full pl-9 pr-3 py-2 text-sm border border-zinc-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-zinc-400"
          placeholder="이름 또는 이메일로 검색..."
        />
      </div>

      <div className="border border-zinc-200 rounded-lg overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-500 font-medium">
            <tr>
              <th className="px-4 py-3 w-1/2">사용자</th>
              <th className="px-4 py-3">권한</th>
              <th className="px-4 py-3 text-right">상태</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-100">
            {members.map((m, i) => (
              <tr key={i} className="group hover:bg-zinc-50 transition-colors">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center text-xs font-bold text-zinc-600">
                      {m.name[0]}
                    </div>
                    <div>
                      <div className="font-medium text-zinc-900">{m.name}</div>
                      <div className="text-xs text-zinc-500">{m.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <select className="bg-transparent border border-zinc-200 rounded px-2 py-1 text-xs font-medium text-zinc-700 outline-none hover:border-zinc-300 focus:border-indigo-500 cursor-pointer transition-colors">
                    <option>{m.role}</option>
                    <option>Admin</option>
                    <option>Member</option>
                    <option>Viewer</option>
                  </select>
                </td>
                <td className="px-4 py-3 text-right">
                  {m.active ? (
                    <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-green-50 text-green-700 text-xs font-medium border border-green-100">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-500" /> Active
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-zinc-100 text-zinc-500 text-xs font-medium border border-zinc-200">
                      대기중
                    </span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* 휴지통 탭 */
function TrashTab({ showToast }) {
  const [items] = useState([
    {
      id: 1,
      type: '페이지',
      name: '제품 로드맵',
      deletedAt: '2025. 01. 01',
      deletedBy: '김준오'
    },
    {
      id: 2,
      type: '작업',
      name: 'v1 런칭 체크리스트',
      deletedAt: '2025. 01. 03',
      deletedBy: '김재환'
    },
    {
      id: 3,
      type: '페이지',
      name: '디자인 가이드 초안',
      deletedAt: '2024. 12. 29',
      deletedBy: '박현수'
    }
  ]);

  const handleRestore = name => {
    showToast(`"${name}" 이(가) 복구되었습니다.`);
  };

  const handleEmpty = () => {
    showToast('휴지통이 비워졌습니다.');
  };

  return (
    <div className="space-y-6">
      <Section title="삭제된 항목">
        <p className="text-sm text-zinc-500 mb-4">
          최근 30일 이내에 삭제된 항목이 표시됩니다. 30일이 지나면 자동으로 완전히 삭제됩니다.
        </p>
        <div className="border border-zinc-200 rounded-lg overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="bg-zinc-50 border-b border-zinc-200 text-zinc-500 font-medium">
              <tr>
                <th className="px-4 py-3">이름</th>
                <th className="px-4 py-3">유형</th>
                <th className="px-4 py-3">삭제일</th>
                <th className="px-4 py-3">삭제한 사람</th>
                <th className="px-4 py-3 text-right">동작</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-100">
              {items.map(item => (
                <tr key={item.id} className="group hover:bg-zinc-50 transition-colors">
                  <td className="px-4 py-3 text-zinc-900">{item.name}</td>
                  <td className="px-4 py-3 text-zinc-500">{item.type}</td>
                  <td className="px-4 py-3 text-zinc-500">{item.deletedAt}</td>
                  <td className="px-4 py-3 text-zinc-500">{item.deletedBy}</td>
                  <td className="px-4 py-3 text-right">
                    <Button variant="secondary" size="sm" onClick={() => handleRestore(item.name)}>
                      복구
                    </Button>
                  </td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td className="px-4 py-6 text-center text-xs text-zinc-500" colSpan={5}>
                    휴지통이 비어 있습니다.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Section>

      <div className="flex justify-between items-center pt-2">
        <p className="text-[11px] text-zinc-500">
          휴지통을 비우면 모든 항목이 즉시 영구 삭제되며, 복구할 수 없습니다.
        </p>
        <Button
          variant="ghost"
          size="sm"
          className="text-red-600 hover:bg-red-100 hover:text-red-700"
          onClick={handleEmpty}>
          휴지통 비우기
        </Button>
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────────────────────
   [UI Component Kit] 재사용 컴포넌트
   ───────────────────────────────────────────────────────────────────────────── */

function SidebarItem({ id, label, icon: Icon, activeTab, setActiveTab }) {
  const active = activeTab === id;
  return (
    <button
      type="button"
      onClick={() => setActiveTab(id)}
      className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative group ${
        active
          ? 'text-white bg-white/10 shadow-[0_1px_2px_rgba(0,0,0,0.1)]'
          : 'text-zinc-400 hover:text-zinc-100 hover:bg-white/5'
      }`}>
      <Icon
        className={`w-[18px] h-[18px] transition-colors ${
          active ? 'text-indigo-400' : 'text-zinc-500 group-hover:text-zinc-400'
        }`}
      />
      <span className="tracking-wide">{label}</span>
      {active && (
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-indigo-500 rounded-r-full shadow-[0_0_12px_rgba(99,102,241,0.6)]" />
      )}
    </button>
  );
}

function Input({ label, placeholder, defaultValue, icon, description, type = 'text', prefix }) {
  return (
    <div className="flex flex-col gap-2">
      {label && <label className="text-sm font-medium text-zinc-700">{label}</label>}
      <div className="relative group">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none group-focus-within:text-zinc-600 transition-colors">
            {icon}
          </div>
        )}
        {prefix && (
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400 text-sm pointer-events-none">
            {prefix}
          </span>
        )}
        <input
          type={type}
          defaultValue={defaultValue}
          placeholder={placeholder}
          className={`w-full bg-white border border-zinc-200 rounded-lg py-2 text-sm text-zinc-900 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all placeholder:text-zinc-400 hover:border-zinc-300 ${
            icon ? 'pl-9 pr-3' : prefix ? 'pl-16 pr-3' : 'px-3'
          }`}
        />
      </div>
      {description && <p className="text-[11px] text-zinc-500 mt-1 mb-3">{description}</p>}
    </div>
  );
}

function CopyInput({ label, value, onCopy }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(value);
    setCopied(true);
    onCopy && onCopy();
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-2">
      {label && <label className="text-sm font-medium text-zinc-700">{label}</label>}
      <div className="flex gap-2">
        <div className="flex-1 bg-zinc-50 border border-zinc-200 rounded-lg px-3 py-2 text-sm text-zinc-600 font-mono truncate">
          {value}
        </div>
        <Button
          variant="secondary"
          onClick={handleCopy}
          className="w-10 px-0 flex items-center justify-center">
          {copied ? (
            <Icons.Check className="w-4 h-4 text-green-500" />
          ) : (
            <Icons.Copy className="w-4 h-4" />
          )}
        </Button>
      </div>
    </div>
  );
}

function Select({ label, options }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium text-zinc-700">{label}</label>
      <div className="relative">
        <select className="w-full appearance-none bg-white border border-zinc-200 rounded-lg px-3 py-2 text-sm text-zinc-900 outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 cursor-pointer transition-all hover:border-zinc-300">
          {options.map(o => (
            <option key={o}>{o}</option>
          ))}
        </select>
        <Icons.ChevronRight className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 rotate-90 pointer-events-none w-3.5 h-3.5" />
      </div>
    </div>
  );
}

function ToggleItem({ label, desc, checked }) {
  const [isOn, setIsOn] = useState(checked);
  const toggle = () => setIsOn(prev => !prev);
  return (
    <div className="flex items-center justify-between py-1.5 group cursor-pointer" onClick={toggle}>
      <div>
        {label && (
          <div className="text-sm font-medium text-zinc-900 group-hover:text-black transition-colors">
            {label}
          </div>
        )}
        {desc && <div className="text-xs text-zinc-500">{desc}</div>}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={isOn}
        onClick={e => {
          e.stopPropagation();
          toggle();
        }}
        className={`relative w-11 h-6 rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${
          isOn ? 'bg-indigo-600' : 'bg-zinc-200'
        }`}>
        <span
          className={`block w-5 h-5 bg-white rounded-full shadow-sm transform transition-transform duration-200 mt-0.5 ml-0.5 ${
            isOn ? 'translate-x-5' : 'translate-x-0'
          }`}
        />
      </button>
    </div>
  );
}

function ConnectionItem({ name, icon, desc, connected }) {
  return (
    <div className="flex items-center justify-between p-4 border border-zinc-200 rounded-xl bg-white hover:border-zinc-300 hover:shadow-sm transition-all group">
      <div className="flex items-center gap-4">
        <div className="w-10 h-10 rounded-lg bg-zinc-50 border border-zinc-100 flex items-center justify-center p-2 group-hover:bg-white transition-colors">
          <img src={icon} alt={name} className="w-full h-full object-contain" />
        </div>
        <div>
          <h4 className="text-sm font-semibold text-zinc-900">{name}</h4>
          <p className="text-xs text-zinc-500">{desc}</p>
        </div>
      </div>
      <Button variant={connected ? 'outline' : 'secondary'} size="sm">
        {connected ? '설정' : '연결'}
      </Button>
    </div>
  );
}

function Button({ children, variant = 'primary', size = 'md', className = '', ...props }) {
  const base =
    'inline-flex items-center justify-center font-medium rounded-lg transition-all active:scale-95 focus:outline-none focus:ring-2 focus:ring-offset-1';
  const variants = {
    primary: 'bg-zinc-900 text-white hover:bg-black shadow-sm focus:ring-zinc-900 hover:shadow-md',
    secondary:
      'bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-50 hover:border-zinc-300 focus:ring-zinc-200',
    outline:
      'border border-zinc-200 text-zinc-600 hover:text-zinc-900 hover:border-zinc-300 bg-transparent',
    ghost: 'text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900 border border-transparent'
  };
  const sizes = { sm: 'px-3 py-1.5 text-xs', md: 'px-5 py-2.5 text-sm' };
  return (
    <button className={`${base} ${variants[variant]} ${sizes[size]} ${className}`} {...props}>
      {children}
    </button>
  );
}

/* Notion-style group / row 컴포넌트 */

function SettingsGroup({ title, children }) {
  return (
    <section className="pt-8 first:pt-0">
      <h3 className="text-xs font-semibold text-zinc-500 tracking-wide mb-3">{title}</h3>
      <div className="border-t border-zinc-200">{children}</div>
    </section>
  );
}

function SettingsRow({ label, description, children }) {
  return (
    <div
      className="flex items-start justify-between border-b border-zinc-200 last:border-b-0"
      style={{ paddingTop: 10, paddingBottom: 10 }}>
      <div>
        <div className="text-sm font-medium text-zinc-900 mb-0.5">{label}</div>
        {description && (
          <p
            className="text-xs text-zinc-500 max-w-xl"
            style={{ marginTop: 2, lineHeight: 1.5, whiteSpace: 'pre-line' }}>
            {description}
          </p>
        )}
      </div>

      {children && <div className="ml-6 shrink-0 flex items-center gap-2">{children}</div>}
    </div>
  );
}

/* 기존 Section / SectionTitle (다른 탭에서 사용) */

function Section({ title, children }) {
  return (
    <section className="space-y-4 pb-10 border-b border-zinc-100 last:border-b-0 last:pb-0">
      <h3 className="text-sm font-semibold text-zinc-900">{title}</h3>
      {children}
    </section>
  );
}

function SectionTitle({ title, desc }) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-zinc-900">{title}</h3>
      {desc && <p className="text-xs text-zinc-500">{desc}</p>}
    </div>
  );
}
