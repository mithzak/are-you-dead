
import express from 'express';
import cors from 'cors';

/**
 * PRODUCTION-READY ARCHITECTURAL PROTOTYPE
 * Stack: Node.js, TypeScript, Express
 * Purpose: SafeCheck MVP Backend
 */

interface User {
  id: string;
  name: string;
  lastCheckIn: Date;
  lastLocation: { lat: number; lng: number } | null;
  batteryLevel: number;
  isEscalated: boolean;
  emergencyContacts: string[]; // IDs or Phone numbers
}

const app = express();
// Add explicit cast to RequestHandler to fix type incompatibility with cors middleware
app.use(cors() as express.RequestHandler);
app.use(express.json());

// Simulated Database
const users: Map<string, User> = new Map([
  ["usr_1", {
    id: "usr_1",
    name: "Jane Doe",
    lastCheckIn: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12h ago
    lastLocation: { lat: 37.7749, lng: -122.4194 },
    batteryLevel: 85,
    isEscalated: false,
    emergencyContacts: ["+15551234567"]
  }]
]);

/**
 * HEARTBEAT ENDPOINT
 * Receives check-in data from the Flutter app.
 */
// Use express.Request and express.Response explicitly to ensure standard properties (body, status, json) are available
app.post('/api/check-in', (req: express.Request, res: express.Response) => {
  const { userId, location, batteryLevel } = req.body;
  
  const user = users.get(userId);
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  // Update user state and reset escalation
  user.lastCheckIn = new Date();
  user.lastLocation = location;
  user.batteryLevel = batteryLevel;
  user.isEscalated = false;

  console.log(`[Heartbeat] User ${userId} checked in. Battery: ${batteryLevel}%`);
  
  res.json({ 
    success: true, 
    nextCheckInDeadline: new Date(Date.now() + 48 * 60 * 60 * 1000) 
  });
});

/**
 * THE WATCHDOG SERVICE
 * Runs every minute to check for users who haven't checked in for > 48 hours.
 */
const ESCALATION_THRESHOLD_MS = 48 * 60 * 60 * 1000;

const runWatchdog = () => {
  const now = new Date().getTime();
  
  users.forEach((user, id) => {
    const diff = now - user.lastCheckIn.getTime();
    
    if (diff > ESCALATION_THRESHOLD_MS && !user.isEscalated) {
      triggerEscalation(user);
    }
  });
};

const triggerEscalation = (user: User) => {
  user.isEscalated = true;
  
  // Construct the Emergency Payload
  const alertPayload = {
    type: "SAFETY_ALERT_INACTIVITY",
    userName: user.name,
    batteryAtLastCheck: user.batteryLevel,
    location: user.lastLocation,
    mapsUrl: user.lastLocation ? `https://maps.google.com/?q=${user.lastLocation.lat},${user.lastLocation.lng}` : "Unknown",
    timestamp: new Date().toISOString()
  };

  console.warn(`!!! [ESCALATION] User ${user.name} is unresponsive. Alerting contacts...`);
  console.warn(`!!! Payload sent to ${user.emergencyContacts.join(', ')}:`, alertPayload);
  
  // In production, this would call Twilio/Firebase Cloud Messaging
};

// Start the watchdog
setInterval(runWatchdog, 60000); 

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`SafeCheck Node.js Backend running on port ${PORT}`);
});
