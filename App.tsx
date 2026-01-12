
import React, { useState, useEffect, useCallback } from 'react';
import { 
  ShieldCheckIcon, 
  UserGroupIcon, 
  ServerIcon, 
  ScaleIcon, 
  CheckCircleIcon, 
  ExclamationTriangleIcon,
  PhoneIcon,
  MapPinIcon,
  ClockIcon
} from '@heroicons/react/24/outline';
import Dashboard from './components/Dashboard';
import Contacts from './components/Contacts';
import ArchitectureDoc from './components/ArchitectureDoc';
import LegalCompliance from './components/LegalCompliance';
import Sidebar from './components/Sidebar';
import { UserState, EmergencyContact, ViewState } from './types';

const App: React.FC = () => {
  const [activeView, setActiveView] = useState<ViewState>('dashboard');
  const [user, setUser] = useState<UserState>({
    isLoggedIn: true,
    name: "Jane Doe",
    lastCheckIn: new Date(Date.now() - 1000 * 60 * 60 * 12), // 12 hours ago
    emergencyContacts: [
      { id: '1', name: 'John Doe', phone: '+1 555 123 4567', email: 'john@example.com', type: 'Phone' }
    ],
    locationConsent: true,
    notificationConsent: true,
    batteryLevel: 85,
    lastLocation: { lat: 37.7749, lng: -122.4194 } // San Francisco
  });

  const handleCheckIn = useCallback(() => {
    setUser(prev => ({
      ...prev,
      lastCheckIn: new Date(),
      // In a real app, we'd fetch real battery and location here
      batteryLevel: Math.floor(Math.random() * 20) + 80 
    }));
  }, []);

  const handleSimulateLastCheckIn = useCallback((date: Date) => {
    setUser(prev => ({
      ...prev,
      lastCheckIn: date
    }));
  }, []);

  const handleSimulateBattery = useCallback((level: number) => {
    setUser(prev => ({
      ...prev,
      batteryLevel: level
    }));
  }, []);

  const addContact = (contact: Omit<EmergencyContact, 'id'>) => {
    setUser(prev => ({
      ...prev,
      emergencyContacts: [...prev.emergencyContacts, { ...contact, id: Date.now().toString() }]
    }));
  };

  const removeContact = (id: string) => {
    setUser(prev => ({
      ...prev,
      emergencyContacts: prev.emergencyContacts.filter(c => c.id !== id)
    }));
  };

  const renderContent = () => {
    switch (activeView) {
      case 'dashboard':
        return (
          <Dashboard 
            user={user} 
            onCheckIn={handleCheckIn} 
            onSimulateLastCheckIn={handleSimulateLastCheckIn}
            onSimulateBattery={handleSimulateBattery}
          />
        );
      case 'contacts':
        return <Contacts contacts={user.emergencyContacts} onAdd={addContact} onRemove={removeContact} />;
      case 'architecture':
        return <ArchitectureDoc />;
      case 'legal':
        return <LegalCompliance />;
      default:
        return (
          <Dashboard 
            user={user} 
            onCheckIn={handleCheckIn} 
            onSimulateLastCheckIn={handleSimulateLastCheckIn}
            onSimulateBattery={handleSimulateBattery}
          />
        );
    }
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
      <Sidebar activeView={activeView} setActiveView={setActiveView} />
      
      <main className="flex-1 overflow-y-auto p-4 md:p-8">
        <div className="max-w-5xl mx-auto">
          <header className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">SafeCheck <span className="text-blue-600">MVP</span></h1>
              <p className="text-gray-500 mt-1">Personal Safety Architect & Prototype</p>
            </div>
            <div className="hidden sm:flex items-center space-x-2 bg-white px-3 py-1 rounded-full border shadow-sm">
              <span className="flex h-2 w-2 rounded-full bg-green-500"></span>
              <span className="text-sm font-medium text-gray-600">Backend Online</span>
            </div>
          </header>

          <div className="transition-all duration-300">
            {renderContent()}
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
