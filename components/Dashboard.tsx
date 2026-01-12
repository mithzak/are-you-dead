
import React, { useState, useEffect } from 'react';
import { UserState } from '../types';
import { 
  CheckCircleIcon, 
  ClockIcon, 
  MapPinIcon, 
  PhoneIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon,
  Battery100Icon,
  Battery50Icon,
  Battery0Icon
} from '@heroicons/react/24/solid';

interface DashboardProps {
  user: UserState;
  onCheckIn: () => void;
  onSimulateLastCheckIn: (date: Date) => void;
  onSimulateBattery: (level: number) => void;
}

const StylizedMap: React.FC<{ location: { lat: number; lng: number } | null, consent: boolean }> = ({ location, consent }) => {
  if (!consent || !location) {
    return (
      <div className="w-full h-48 bg-gray-100 rounded-2xl flex flex-col items-center justify-center text-gray-400 border border-dashed border-gray-300">
        <MapPinIcon className="h-10 w-10 mb-2 opacity-20" />
        <p className="text-xs font-medium uppercase tracking-widest">Location Unavailable</p>
      </div>
    );
  }

  return (
    <div className="relative w-full h-48 bg-blue-50 rounded-2xl overflow-hidden border border-blue-100 shadow-inner group">
      {/* Grid Pattern Background */}
      <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#2563eb 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
      
      {/* Simulated Map Elements */}
      <div className="absolute top-1/4 left-1/3 w-16 h-2 bg-blue-200 rounded-full rotate-12"></div>
      <div className="absolute top-2/3 right-1/4 w-24 h-2 bg-blue-200 rounded-full -rotate-45"></div>
      <div className="absolute bottom-1/4 left-1/4 w-32 h-2 bg-blue-200 rounded-full"></div>
      
      {/* User Pin */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center z-10">
        <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center shadow-lg animate-bounce border-2 border-white group-hover:scale-110 transition-transform">
          <MapPinIcon className="h-5 w-5 text-white" />
        </div>
        <div className="w-2 h-2 bg-blue-900/20 rounded-full mt-1 blur-[1px]"></div>
      </div>

      <div className="absolute bottom-3 right-3 bg-white/90 backdrop-blur px-2 py-1 rounded-md text-[9px] font-bold text-blue-600 border border-blue-200 shadow-sm">
        ACTIVE GPS LOCK
      </div>

      <div className="absolute bottom-3 left-3 bg-gray-900/80 backdrop-blur px-2 py-1 rounded-md text-[10px] font-mono text-white border border-gray-700">
        {location.lat.toFixed(5)}, {location.lng.toFixed(5)}
      </div>
    </div>
  );
};

const BatteryStatus: React.FC<{ level: number }> = ({ level }) => {
  const getIcon = () => {
    if (level > 70) return <Battery100Icon className="h-5 w-5 text-green-500" />;
    if (level > 20) return <Battery50Icon className="h-5 w-5 text-yellow-500" />;
    return <Battery0Icon className="h-5 w-5 text-red-500 animate-pulse" />;
  };

  const getLabelColor = () => {
    if (level > 70) return 'text-green-700';
    if (level > 20) return 'text-yellow-700';
    return 'text-red-700';
  };

  return (
    <div className={`flex items-center space-x-2 bg-white px-3 py-1.5 rounded-full border border-gray-100 shadow-sm ${level < 10 ? 'ring-2 ring-red-100' : ''}`}>
      {getIcon()}
      <span className={`text-xs font-bold ${getLabelColor()}`}>{level}%</span>
    </div>
  );
};

const Dashboard: React.FC<DashboardProps> = ({ user, onCheckIn, onSimulateLastCheckIn, onSimulateBattery }) => {
  const [timeLeft, setTimeLeft] = useState<number>(48 * 3600);
  const [isAlerting, setIsAlerting] = useState(false);

  useEffect(() => {
    if (!user.lastCheckIn) return;

    const interval = setInterval(() => {
      const now = new Date();
      const diffMs = now.getTime() - user.lastCheckIn!.getTime();
      const remainingSeconds = Math.max(0, (48 * 3600) - Math.floor(diffMs / 1000));
      
      setTimeLeft(remainingSeconds);
      setIsAlerting(remainingSeconds <= 0);
    }, 1000);

    return () => clearInterval(interval);
  }, [user.lastCheckIn]);

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = seconds % 60;
    return `${h}h ${m}m ${s}s`;
  };

  const handleManualEmergency = () => {
    if (confirm("This will open your device dialer to call emergency services. Proceed?")) {
      window.location.href = "tel:911";
    }
  };

  return (
    <div className="space-y-6">
      {isAlerting && (
        <div className="bg-red-50 border-l-4 border-red-500 p-5 rounded-r-2xl shadow-lg animate-in slide-in-from-top duration-500">
          <div className="flex items-start">
            <div className="bg-red-500 p-2 rounded-full mr-4 shadow-sm">
              <ExclamationTriangleIcon className="h-6 w-6 text-white" />
            </div>
            <div>
              <p className="text-red-900 font-extrabold text-lg uppercase tracking-tight">Emergency Escalation Active</p>
              <p className="text-red-700 text-sm mt-1">
                Your contacts were notified with your last coordinates and 
                <span className="font-bold bg-red-200 px-1.5 py-0.5 rounded ml-1">Battery Level: {user.batteryLevel}%</span>.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-3xl p-8 border border-gray-100 shadow-xl shadow-gray-200/50 flex flex-col items-center text-center">
          <div className="w-full flex justify-between items-center mb-8">
            <h2 className="text-xl font-extrabold text-gray-800 tracking-tight">Safety Hub</h2>
            <BatteryStatus level={user.batteryLevel} />
          </div>
          
          <button
            onClick={onCheckIn}
            className="group relative w-48 h-48 rounded-full bg-blue-600 flex flex-col items-center justify-center transition-all duration-300 hover:bg-blue-700 hover:scale-105 active:scale-95 shadow-2xl shadow-blue-200"
          >
            <div className="absolute inset-0 rounded-full bg-blue-400 opacity-20 group-hover:animate-ping"></div>
            <CheckCircleIcon className="h-16 w-16 text-white mb-2" />
            <span className="text-white font-black text-lg uppercase tracking-widest">I am OK</span>
          </button>

          <div className="mt-10 w-full space-y-6">
            <div className="grid grid-cols-2 gap-4 border-t border-b py-6">
              <div className="flex flex-col items-center border-r border-gray-100">
                <ClockIcon className="h-5 w-5 text-blue-500 mb-1" />
                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Sync Time</span>
                <span className="text-sm font-bold text-gray-700">
                  {user.lastCheckIn?.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) || '00:00'}
                </span>
              </div>
              <div className="flex flex-col items-center">
                <MapPinIcon className="h-5 w-5 text-blue-500 mb-1" />
                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">GPS Confidence</span>
                <span className="text-sm font-bold text-green-600">High (98%)</span>
              </div>
            </div>

            <div className="text-left">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] uppercase font-bold text-gray-400 tracking-widest">Last Confirmed Location</span>
                {user.locationConsent && <span className="text-[9px] bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-bold">ENCRYPTED</span>}
              </div>
              <StylizedMap location={user.lastLocation} consent={user.locationConsent} />
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-6">
          <div className="bg-gray-900 rounded-3xl p-8 text-white shadow-xl relative overflow-hidden flex-1">
            <div 
              className="absolute bottom-0 left-0 right-0 bg-blue-500/10 transition-all duration-1000 border-t border-blue-500/20" 
              style={{ height: `${user.batteryLevel}%` }}
            ></div>

            <h3 className="text-blue-400 text-xs font-black uppercase tracking-[0.2em] mb-4 relative z-10">Server Escalation Clock</h3>
            <div className="text-6xl font-mono font-black tracking-tight mb-2 relative z-10 text-white tabular-nums">
              {formatTime(timeLeft)}
            </div>
            <div className="w-full bg-gray-800 rounded-full h-3 mt-6 overflow-hidden relative z-10">
              <div 
                className={`h-full transition-all duration-1000 ${timeLeft < 3600 ? 'bg-red-500 animate-pulse' : 'bg-blue-500'}`} 
                style={{ width: `${(timeLeft / (48 * 3600)) * 100}%` }}
              ></div>
            </div>
            <p className="mt-6 text-xs text-gray-400 leading-relaxed italic relative z-10 border-l-2 border-gray-700 pl-4">
              "Note: Your contacts will receive your battery percentage at time of check-in to help them assess the situation."
            </p>
          </div>

          <button
            onClick={handleManualEmergency}
            className="bg-red-600 rounded-3xl p-8 text-white flex items-center justify-between transition-all hover:bg-red-700 hover:shadow-2xl hover:shadow-red-200 active:scale-[0.98]"
          >
            <div className="flex items-center space-x-5">
              <div className="p-4 bg-white/20 rounded-2xl">
                <PhoneIcon className="h-10 w-10 text-white" />
              </div>
              <div className="text-left">
                <p className="font-black text-2xl tracking-tight">SOS EMERGENCY</p>
                <p className="text-xs text-red-100 uppercase font-bold tracking-widest opacity-80">Manual Local Dial (911/112)</p>
              </div>
            </div>
            <ArrowPathIcon className="h-8 w-8 text-white/30 hidden sm:block" />
          </button>
        </div>
      </div>

      <div className="bg-white border border-dashed border-gray-300 rounded-2xl p-6 shadow-sm">
        <div className="flex items-center space-x-2 mb-4">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-ping"></div>
          <span className="text-sm text-gray-800 font-black uppercase tracking-widest">Architect Simulator</span>
        </div>
        <div className="flex flex-wrap gap-3">
          <button 
            onClick={() => onSimulateLastCheckIn(new Date(Date.now() - (47 * 3600 * 1000 + 58 * 60 * 1000)))}
            className="px-4 py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 text-xs rounded-xl font-bold transition-colors"
          >
            Set Timer to 2m Left
          </button>
          <button 
            onClick={() => onSimulateLastCheckIn(new Date(Date.now() - (49 * 3600 * 1000)))}
            className="px-4 py-2 bg-red-50 hover:bg-red-100 border border-red-100 text-red-700 text-xs rounded-xl font-bold transition-colors"
          >
            Trigger Timeout
          </button>
          <div className="h-8 w-px bg-gray-200 mx-2"></div>
          <button 
            onClick={() => onSimulateBattery(5)}
            className="px-4 py-2 bg-amber-50 hover:bg-amber-100 border border-amber-100 text-amber-700 text-xs rounded-xl font-bold transition-colors"
          >
            Battery Critial (5%)
          </button>
          <button 
            onClick={() => onSimulateBattery(95)}
            className="px-4 py-2 bg-green-50 hover:bg-green-100 border border-green-100 text-green-700 text-xs rounded-xl font-bold transition-colors"
          >
            Battery Healthy (95%)
          </button>
          <button 
            onClick={() => window.location.reload()}
            className="ml-auto bg-gray-900 text-white p-2 rounded-xl hover:bg-black transition-colors"
            title="Reset Simulator"
          >
            <ArrowPathIcon className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
