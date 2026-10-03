import { useStore } from './store/useStore';
import Welcome from './components/Welcome';
import Auth from './components/Auth';
import ProfileSetup from './components/ProfileSetup';
import Onboarding from './components/Onboarding';
import SwipeScreen from './components/SwipeScreen';
import Membership from './components/Membership';
import Payment from './components/Payment';
import Chat from './components/Chat';
import Notifications from './components/Notifications';
import Profile from './components/Profile';
import Consumables from './components/Consumables';
import Navigation from './components/Navigation';
import Stories from './components/Stories';
import Events from './components/Events';
import IceBreaker from './components/IceBreaker';
import AIMatching from './components/AIMatching';
import Compatibility from './components/Compatibility';
import BFFMode, { LinkedInVerify } from './components/BFFMode';
import Analytics from './components/Analytics';
import VideoProfile from './components/VideoProfile';
import Settings from './components/Settings';
import EditProfile from './components/EditProfile';
import LikesReceived from './components/LikesReceived';
import Search from './components/Search';
import HelpCenter from './components/HelpCenter';
import Referral from './components/Referral';
import Badges from './components/Badges';
import TopPicks from './components/TopPicks';
import ProfileDetail from './components/ProfileDetail';
import Toast from './components/Toast';
import VideoCall from './components/VideoCall';
import PushNotifications from './components/PushNotifications';
import GiftMarketplace from './components/GiftMarketplace';
import GroupMode from './components/GroupMode';
import SpotifyIntegration from './components/SpotifyIntegration';
import ARFilters from './components/ARFilters';
import DateScheduler from './components/DateScheduler';
import AIVerification from './components/AIVerification';
import AIModeration from './components/AIModeration';
import { AnimatePresence, motion } from 'framer-motion';

const screensWithNav = ['swipe', 'membership', 'chat', 'notifications', 'profile', 'stories', 'events', 'consumables'];

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
      case 'onboarding':
        return <Onboarding />;
      case 'swipe':
        return <SwipeScreen />;
      case 'membership':
        return <Membership />;
      case 'payment':
        return <Payment />;
      case 'chat':
        return <Chat />;
      case 'notifications':
        return <Notifications />;
      case 'profile':
        return <Profile />;
      case 'consumables':
        return <Consumables />;
      case 'stories':
        return <Stories />;
      case 'events':
        return <Events />;
      case 'iceBreaker':
        return <IceBreaker />;
      case 'aiMatching':
        return <AIMatching />;
      case 'compatibility':
        return <Compatibility />;
      case 'bffMode':
        return <BFFMode />;
      case 'linkedinVerify':
        return <LinkedInVerify />;
      case 'analytics':
        return <Analytics />;
      case 'videoProfile':
        return <VideoProfile />;
      case 'settings':
        return <Settings />;
      case 'editProfile':
        return <EditProfile />;
      case 'likesReceived':
        return <LikesReceived />;
      case 'search':
        return <Search />;
      case 'helpCenter':
        return <HelpCenter />;
      case 'referral':
        return <Referral />;
      case 'badges':
        return <Badges />;
      case 'topPicks':
        return <TopPicks />;
      case 'profileDetail':
        return <ProfileDetail />;
      case 'videoCall':
        return <VideoCall />;
      case 'pushNotifications':
        return <PushNotifications />;
      case 'giftMarketplace':
        return <GiftMarketplace />;
      case 'groupMode':
        return <GroupMode />;
      case 'spotifyIntegration':
        return <SpotifyIntegration />;
      case 'arFilters':
        return <ARFilters />;
      case 'dateScheduler':
        return <DateScheduler />;
      case 'aiVerification':
        return <AIVerification />;
      case 'aiModeration':
        return <AIModeration />;
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
