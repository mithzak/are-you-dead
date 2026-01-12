
import React, { useState } from 'react';
import { 
  CommandLineIcon,
  BoltIcon,
  ShieldCheckIcon,
  CloudIcon,
  CodeBracketIcon,
  DocumentTextIcon
} from '@heroicons/react/24/outline';

const ArchitectureDoc: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'source'>('overview');

  const nodeCode = `// server.js (Node.js/Express)
import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// The Safety Watchdog
const watchdog = () => {
  const now = Date.now();
  users.forEach((user) => {
    if (now - user.lastCheckIn > 48 * 3600 * 1000) {
      triggerEscalation(user);
    }
  });
};

setInterval(watchdog, 60000);

app.post('/api/check-in', (req, res) => {
  // Update battery & location logic...
  res.json({ success: true });
});

app.listen(3000);`;

  return (
    <div className="space-y-10">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-3xl font-black text-gray-900 mb-2 tracking-tight text-center md:text-left">Node.js Backend Architecture</h2>
          <p className="text-gray-500 text-sm font-medium text-center md:text-left italic">Cross-platform Safety MVP Technical Stack</p>
        </div>
        <div className="flex bg-gray-100 p-1 rounded-xl self-center md:self-auto">
          <button 
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${activeTab === 'overview' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            System Overview
          </button>
          <button 
            onClick={() => setActiveTab('source')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-all ${activeTab === 'source' ? 'bg-white text-blue-600 shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            View server.js
          </button>
        </div>
      </div>

      {activeTab === 'overview' ? (
        <div className="space-y-10">
          <section className="bg-white p-8 rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/20 space-y-6">
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-3 bg-green-600 rounded-2xl shadow-lg shadow-green-100">
                <CommandLineIcon className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-black text-gray-900 tracking-tight">Node.js Engine</h3>
                <p className="text-[10px] uppercase font-bold text-green-600 tracking-widest">Runtime Environment</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="font-extrabold text-gray-800 flex items-center">
                  <span className="w-2 h-2 rounded-full bg-green-600 mr-2"></span>
                  Watchdog Implementation
                </h4>
                <p className="text-sm text-gray-600 leading-relaxed">
                  The backend uses an event-loop friendly <code>setInterval</code> (or <strong>BullMQ</strong> in production) to perform linear sweeps of the user check-in table.
                </p>
                <ul className="space-y-3 text-xs text-gray-500 font-medium">
                  <li className="bg-gray-50 p-3 rounded-xl border border-gray-100"><strong>Stateless Heartbeat:</strong> Mobile clients POST location/battery data to a secured endpoint.</li>
                  <li className="bg-gray-50 p-3 rounded-xl border border-gray-100"><strong>Payload Generation:</strong> Automatic inclusion of <code>battery_level</code> in all contact notifications.</li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="font-extrabold text-gray-800 flex items-center">
                  <span className="w-2 h-2 rounded-full bg-green-600 mr-2"></span>
                  Emergency Contacts API
                </h4>
                <div className="bg-gray-900 p-5 rounded-2xl font-mono text-[10px] text-green-400 border border-green-900/50 shadow-inner">
                  <p className="text-gray-500 mb-2">// Node.js JSON Response</p>
                  <p>{"{"}</p>
                  <p className="pl-4 text-green-300">"status": "active_escalation",</p>
                  <p className="pl-4">"user": "Jane Doe",</p>
                  <p className="pl-4 font-black text-amber-400">"battery": 14,</p>
                  <p className="pl-4 text-red-400">"coords": [37.77, -122.41],</p>
                  <p className="pl-4">"notified_via": ["SMS", "Push"]</p>
                  <p>{"}"}</p>
                </div>
              </div>
            </div>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { 
                icon: BoltIcon, 
                title: "Low Latency", 
                desc: "Node.js asynchronous I/O handles thousands of concurrent heartbeats without blocking the safety watchdog." 
              },
              { 
                icon: ShieldCheckIcon, 
                title: "JWT Auth", 
                desc: "Every heartbeat is signed with a JWT, ensuring GPS data is only accepted from authenticated devices." 
              },
              { 
                icon: CloudIcon, 
                title: "Easy Scaling", 
                desc: "Containerized Node.js services allow for rapid deployment to AWS Lambda or Google Cloud Run." 
              }
            ].map((item, idx) => (
              <div key={idx} className="bg-white border border-gray-100 p-8 rounded-3xl shadow-sm hover:shadow-md transition-shadow">
                <item.icon className="h-10 w-10 text-green-600 mb-4" />
                <h4 className="font-black text-gray-900 mb-2 tracking-tight">{item.title}</h4>
                <p className="text-xs text-gray-500 leading-relaxed font-medium">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="bg-gray-900 rounded-3xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
          <div className="flex items-center justify-between px-6 py-4 bg-gray-800 border-b border-gray-700">
            <div className="flex space-x-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center">
              <CodeBracketIcon className="h-4 w-4 mr-2" />
              server.js - JavaScript (Node.js)
            </div>
          </div>
          <pre className="p-8 text-xs sm:text-sm font-mono text-gray-300 leading-relaxed overflow-x-auto">
            <code>{nodeCode}</code>
          </pre>
          <div className="p-4 bg-gray-950 text-center">
            <p className="text-[10px] text-gray-500 uppercase font-black tracking-widest">SafeCheck Backend v1.0.0 Production Source</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArchitectureDoc;
