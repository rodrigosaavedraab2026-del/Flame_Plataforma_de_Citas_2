import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage, MessagePayload } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'your-api-key',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'your-project.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'your-project-id',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'your-project.appspot.com',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || 'your-sender-id',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || 'your-app-id',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const messaging = typeof window !== 'undefined' ? getMessaging(app) : null;

// VAPID public key (generate this in Firebase Console)
const VAPID_KEY = import.meta.env.VITE_FIREBASE_VAPID_KEY || 'your-vapid-key';

export const pushNotificationService = {
  // Request permission and get FCM token
  async requestPermission(): Promise<string | null> {
    if (!messaging) return null;

    try {
      const permission = await Notification.requestPermission();
      
      if (permission === 'granted') {
        const token = await getToken(messaging, {
          vapidKey: VAPID_KEY,
        });
        
        // Send token to your backend to save it
        await this.saveTokenToBackend(token);
        
        return token;
      }
      
      return null;
    } catch (error) {
      console.error('Error getting permission:', error);
      return null;
    }
  },

  // Save token to backend
  async saveTokenToBackend(token: string) {
    try {
      await fetch('/api/save-fcm-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token }),
      });
    } catch (error) {
      console.error('Error saving token:', error);
    }
  },

  // Listen for foreground messages
  onForegroundMessage(callback: (payload: MessagePayload) => void) {
    if (!messaging) return () => {};

    const unsubscribe = onMessage(messaging, callback);
    return unsubscribe;
  },

  // Send local notification
  showLocalNotification(title: string, body: string, icon?: string) {
    if (Notification.permission === 'granted') {
      const notification = new Notification(title, {
        body,
        icon: icon || '/logo.png',
        badge: '/badge.png',
        tag: 'flama-notification',
        requireInteraction: false,
      });

      notification.onclick = () => {
        window.focus();
        notification.close();
      };

      return notification;
    }
    return null;
  },

  // Send push notification via backend
  async sendPushNotification(userId: string, title: string, body: string, data?: any) {
    try {
      await fetch('/api/send-push-notification', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId,
          title,
          body,
          data,
        }),
      });
    } catch (error) {
      console.error('Error sending push notification:', error);
    }
  },

  // Subscribe to topic (for broadcast notifications)
  async subscribeToTopic(topic: string) {
    try {
      await fetch('/api/subscribe-topic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic }),
      });
    } catch (error) {
      console.error('Error subscribing to topic:', error);
    }
  },

  // Unsubscribe from topic
  async unsubscribeFromTopic(topic: string) {
    try {
      await fetch('/api/unsubscribe-topic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topic }),
      });
    } catch (error) {
      console.error('Error unsubscribing from topic:', error);
    }
  },

  // Check if notifications are enabled
  isPermissionGranted(): boolean {
    return typeof window !== 'undefined' && Notification.permission === 'granted';
  },

  // Check if notifications are supported
  isSupported(): boolean {
    return typeof window !== 'undefined' && 'Notification' in window && 'serviceWorker' in navigator;
  },
};

// Notification types
export interface NotificationData {
  type: 'match' | 'message' | 'like' | 'super_like' | 'boost' | 'event';
  senderId?: string;
  senderName?: string;
  matchId?: string;
  chatId?: string;
  eventId?: string;
}

// Notification templates
export const notificationTemplates = {
  match: (name: string) => ({
    title: '¡Es un Match! 💕',
    body: `Tú y ${name} se gustaron mutuamente`,
  }),
  message: (name: string, message: string) => ({
    title: `${name} te envió un mensaje`,
    body: message,
  }),
  like: (name: string) => ({
    title: 'Nuevo Like 👍',
    body: `A ${name} le gustaste`,
  }),
  superLike: (name: string) => ({
    title: '¡Super Like! ⭐',
    body: `${name} te envió un Super Like`,
  }),
  boost: () => ({
    title: '¡Tu Boost está activo! 🚀',
    body: 'Eres 10x más visible en los próximos 30 minutos',
  }),
  event: (eventName: string) => ({
    title: 'Nuevo Evento 🎉',
    body: `No te pierdas: ${eventName}`,
  }),
};
