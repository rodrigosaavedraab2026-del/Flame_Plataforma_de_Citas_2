import { useStore } from './store/useStore';
import Welcome from './components/Welcome';
import Auth from './components/Auth';
import {
  ProfileSetup,
  SwipeScreen,
  Navigation,
  Toast,
  ChatScreen,
  NotificationsScreen,
  ProfileScreen,
  MembershipScreen,
  PaymentScreen,
  ConsumablesScreen,
  StoriesScreen,
  EventsScreen,
  AIMatchingScreen,
} from './components/Screens';
import { AnimatePresence, motion } from 'framer-motion';

const screensWithNav = ['swipe', 'membership', 'chat', 'notifications', 'profile', 'consumables'];

function App() {
  const screen = useStore((s) => s.screen);

  const renderScreen = () => {
    switch (screen) {
      case 'welcome':
        return <Welcome />;
      case 'auth':
        return <Auth />;
      case 'profileSetup':
        return <ProfileSetup />;
      case 'swipe':
        return <SwipeScreen />;
      case 'membership':
        return <MembershipScreen />;
      case 'payment':
        return <PaymentScreen />;
      case 'chat':
        return <ChatScreen />;
      case 'notifications':
        return <NotificationsScreen />;
      case 'profile':
        return <ProfileScreen />;
      case 'consumables':
        return <ConsumablesScreen />;
      case 'stories':
        return <StoriesScreen />;
      case 'events':
        return <EventsScreen />;
      case 'aiMatching':
        return <AIMatchingScreen />;
      default:
        return <Welcome />;
    }
  };

  const showNav = screensWithNav.includes(screen);

  return (
    <div className="min-h-screen bg-slate-900 max-w-lg mx-auto relative overflow-hidden">
      <Toast />
      <AnimatePresence mode="wait">
        <motion.div
          key={screen}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={showNav ? 'pb-20' : ''}
        >
          {renderScreen()}
        </motion.div>
      </AnimatePresence>
      {showNav && <Navigation />}
    </div>
  );
}

export default App;
