import { useStore } from './store/useStore';
import Welcome from './components/Welcome';
import Auth from './components/Auth';
import Onboarding from './components/Onboarding';
import SwipeScreen from './components/SwipeScreen';
import Membership from './components/Membership';
import Payment from './components/Payment';
import Chat from './components/Chat';
import Notifications from './components/Notifications';
import Profile from './components/Profile';
import Navigation from './components/Navigation';
import { AnimatePresence, motion } from 'framer-motion';

const screensWithNav = ['swipe', 'membership', 'chat', 'notifications', 'profile'];

function App() {
  const screen = useStore((s) => s.screen);

  const renderScreen = () => {
    switch (screen) {
      case 'welcome': return <Welcome />;
      case 'auth': return <Auth />;
      case 'onboarding': return <Onboarding />;
      case 'swipe': return <SwipeScreen />;
      case 'membership': return <Membership />;
      case 'payment': return <Payment />;
      case 'chat': return <Chat />;
      case 'notifications': return <Notifications />;
      case 'profile': return <Profile />;
      default: return <Welcome />;
    }
  };

  const showNav = screensWithNav.includes(screen);

  return (
    <div className="min-h-screen bg-slate-900 max-w-lg mx-auto relative overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.div key={screen} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }} className={showNav ? 'pb-20' : ''}>
          {renderScreen()}
        </motion.div>
      </AnimatePresence>
      {showNav && <Navigation />}
    </div>
  );
}

export default App;
