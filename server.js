
import express from 'express';
import cors from 'cors';

/**
 * SafeCheck MVP Backend - Node.js Implementation
 * This server handles mobile heartbeats and runs the safety watchdog.
 */

const app = express();
app.use(cors());
app.use(express.json());

// In-memory data store for the MVP
const users = new Map([
  ["usr_1", {
    id: "usr_1",
    name: "Jane Doe",
    lastCheckIn: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12h ago
    batteryLevel: 85,
    isEscalated: false,
    emergencyContacts: ["+15551234567"]
  }]
]);

/**
 * HEARTBEAT API
 * Triggered by the Flutter app via a background work manager.
 */
app.post('/api/check-in', (req, res) => {
  const { userId, batteryLevel, location } = req.body;
  
  const user = users.get(userId);
  if (!user) return res.status(404).json({ error: "User not found" });

  // Update state
  user.lastCheckIn = new Date();
  user.batteryLevel = batteryLevel;
  user.lastLocation = location;
  user.isEscalated = false;

  console.log(`[Node.js] Heartbeat received for ${user.name}. Battery: ${batteryLevel}%`);
  
  res.json({ success: true, serverTime: new Date() });
});

/**
 * WATCHDOG SERVICE
 * Scans for stale check-ins every 60 seconds.
 */
const INACTIVITY_LIMIT = 48 * 60 * 60 * 1000; // 48 Hours

const watchdog = () => {
  const now = Date.now();
  
  users.forEach((user) => {
    const timeSinceLastCheck = now - user.lastCheckIn.getTime();
    
    if (timeSinceLastCheck > INACTIVITY_LIMIT && !user.isEscalated) {
      triggerEscalation(user);
    }
  });
};

const triggerEscalation = (user) => {
  user.isEscalated = true;
  
  const payload = {
    alert: "SAFETY_CRITICAL",
    message: `${user.name} has not checked in for 48 hours.`,
    diagnostics: {
      battery: `${user.batteryLevel}%`,
      lastSeen: user.lastCheckIn,
      gps: user.lastLocation || "Unavailable"
    }
  };

  console.error("!!! [ALERT] ESCALATING TO CONTACTS !!!");
  console.table(payload.diagnostics);
  // Integration point for Twilio / SendGrid / FCM
};

// Start background task
setInterval(watchdog, 60000);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Node.js Safety Backend active on port ${PORT}`);
});
