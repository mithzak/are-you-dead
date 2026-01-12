
import React from 'react';
import { 
  ShieldCheckIcon, 
  UserGroupIcon, 
  ServerIcon, 
  ScaleIcon,
  HomeIcon
} from '@heroicons/react/24/outline';
import { ViewState } from '../types';

interface SidebarProps {
  activeView: ViewState;
  setActiveView: (view: ViewState) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, setActiveView }) => {
  const menuItems = [
    { id: 'dashboard', label: 'Safety Dashboard', icon: HomeIcon },
    { id: 'contacts', label: 'Emergency Contacts', icon: UserGroupIcon },
    { id: 'architecture', label: 'Technical Architecture', icon: ServerIcon },
    { id: 'legal', label: 'Compliance & Legal', icon: ScaleIcon },
  ];

  return (
    <aside className="w-20 md:w-64 bg-white border-r border-gray-200 flex flex-col h-full z-10">
      <div className="p-6 flex items-center justify-center md:justify-start">
        <ShieldCheckIcon className="h-8 w-8 text-blue-600" />
        <span className="hidden md:block ml-3 font-bold text-xl text-gray-900 tracking-tight">SafeCheck</span>
      </div>

      <nav className="flex-1 px-3 space-y-1">
        {menuItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveView(item.id as ViewState)}
            className={`w-full flex items-center px-3 py-3 rounded-xl transition-all duration-200 group ${
              activeView === item.id 
                ? 'bg-blue-50 text-blue-700 shadow-sm' 
                : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
            }`}
          >
            <item.icon className={`h-6 w-6 shrink-0 ${activeView === item.id ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'}`} />
            <span className="hidden md:block ml-3 text-sm font-semibold">{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="p-4 border-t border-gray-100">
        <div className="hidden md:block bg-blue-600 rounded-2xl p-4 text-white shadow-lg shadow-blue-200">
          <p className="text-xs font-bold uppercase tracking-widest opacity-80 mb-1">Architecture Mode</p>
          <p className="text-sm font-medium">MVP Design: V1.0</p>
          <div className="mt-4 text-[10px] leading-relaxed opacity-90">
            CONFIDENTIAL: System Design & Implementation Specs.
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
