import { describe, it, expect, beforeEach } from 'vitest';
import { useStore } from '../store/useStore';

describe('Zustand Store', () => {
  beforeEach(() => {
    // Reset store before each test
    useStore.setState({
      screen: 'welcome',
      isAuthenticated: false,
      user: null,
      likedProfiles: [],
      passedProfiles: [],
      superLikedProfiles: [],
    });
  });

  describe('Navigation', () => {
    it('sets screen correctly', () => {
      useStore.getState().setScreen('auth');
      expect(useStore.getState().screen).toBe('auth');
    });

    it('navigates through screens', () => {
      const { setScreen } = useStore.getState();
      
      setScreen('auth');
      expect(useStore.getState().screen).toBe('auth');
      
      setScreen('swipe');
      expect(useStore.getState().screen).toBe('swipe');
      
      setScreen('chat');
      expect(useStore.getState().screen).toBe('chat');
    });
  });

  describe('Authentication', () => {
    it('logs in user', async () => {
      const { login } = useStore.getState();
      
      const success = await login('test@example.com', 'password123');
      
      expect(success).toBe(true);
      expect(useStore.getState().isAuthenticated).toBe(true);
      expect(useStore.getState().user).not.toBeNull();
      expect(useStore.getState().user?.email).toBe('test@example.com');
    });

    it('fails login with invalid credentials', async () => {
      const { login } = useStore.getState();
      
      const success = await login('test@example.com', 'short');
      
      expect(success).toBe(false);
      expect(useStore.getState().isAuthenticated).toBe(false);
    });

    it('registers new user', async () => {
      const { register } = useStore.getState();
      
      const success = await register({
        name: 'Test User',
        email: 'test@example.com',
        password: 'password123',
        age: 25,
        gender: 'male',
        lookingFor: 'female',
      });
      
      expect(success).toBe(true);
      expect(useStore.getState().isAuthenticated).toBe(true);
      expect(useStore.getState().user?.name).toBe('Test User');
    });

    it('logs out user', () => {
      // First login
      useStore.setState({
        isAuthenticated: true,
        user: {
          id: '123',
          email: 'test@example.com',
          name: 'Test',
          age: 25,
          gender: 'male',
          lookingFor: 'female',
          verified: false,
          profileComplete: false,
          createdAt: new Date(),
        },
      });
      
      const { logout } = useStore.getState();
      logout();
      
      expect(useStore.getState().isAuthenticated).toBe(false);
      expect(useStore.getState().user).toBeNull();
      expect(useStore.getState().screen).toBe('welcome');
    });
  });

  describe('Profile Actions', () => {
    it('likes a profile', () => {
      const { likeProfile } = useStore.getState();
      
      likeProfile(1);
      
      expect(useStore.getState().likedProfiles).toContain(1);
    });

    it('passes on a profile', () => {
      const { passProfile } = useStore.getState();
      
      passProfile(1);
      
      expect(useStore.getState().passedProfiles).toContain(1);
    });

    it('super likes a profile', () => {
      const { superLikeProfile } = useStore.getState();
      
      superLikeProfile(1);
      
      expect(useStore.getState().superLikedProfiles).toContain(1);
    });

    it('tracks multiple likes', () => {
      const { likeProfile } = useStore.getState();
      
      likeProfile(1);
      likeProfile(2);
      likeProfile(3);
      
      expect(useStore.getState().likedProfiles).toEqual([1, 2, 3]);
    });
  });

  describe('Membership', () => {
    it('sets membership tier', () => {
      const { setMembership } = useStore.getState();
      
      setMembership('gold');
      
      expect(useStore.getState().membership).toBe('gold');
    });

    it('upgrades membership', () => {
      const { setMembership } = useStore.getState();
      
      setMembership('free');
      expect(useStore.getState().membership).toBe('free');
      
      setMembership('platinum');
      expect(useStore.getState().membership).toBe('platinum');
    });
  });

  describe('Consumables', () => {
    it('uses boost', () => {
      const initialBoosts = useStore.getState().boostsRemaining;
      const { useBoost } = useStore.getState();
      
      useBoost();
      
      expect(useStore.getState().boostsRemaining).toBe(initialBoosts - 1);
    });

    it('uses super like', () => {
      const initialSuperLikes = useStore.getState().superLikesRemaining;
      const { useSuperLike } = useStore.getState();
      
      useSuperLike();
      
      expect(useStore.getState().superLikesRemaining).toBe(initialSuperLikes - 1);
    });

    it('does not go below zero', () => {
      useStore.setState({ boostsRemaining: 0 });
      const { useBoost } = useStore.getState();
      
      useBoost();
      
      expect(useStore.getState().boostsRemaining).toBe(0);
    });
  });

  describe('Notifications', () => {
    it('adds notification', () => {
      const { addNotification } = useStore.getState();
      
      addNotification({
        id: '1',
        type: 'match',
        title: 'New Match',
        description: 'You matched with someone!',
        timestamp: new Date(),
        read: false,
      });
      
      expect(useStore.getState().notifications).toHaveLength(1);
    });

    it('marks notification as read', () => {
      const { addNotification, markAsRead } = useStore.getState();
      
      addNotification({
        id: '1',
        type: 'match',
        title: 'New Match',
        description: 'You matched with someone!',
        timestamp: new Date(),
        read: false,
      });
      
      markAsRead('1');
      
      expect(useStore.getState().notifications[0].read).toBe(true);
    });

    it('marks all notifications as read', () => {
      const { addNotification, markAllAsRead } = useStore.getState();
      
      addNotification({
        id: '1',
        type: 'match',
        title: 'Match 1',
        description: 'Description 1',
        timestamp: new Date(),
        read: false,
      });
      
      addNotification({
        id: '2',
        type: 'like',
        title: 'Like 1',
        description: 'Description 2',
        timestamp: new Date(),
        read: false,
      });
      
      markAllAsRead();
      
      const notifications = useStore.getState().notifications;
      expect(notifications.every(n => n.read)).toBe(true);
    });

    it('counts unread notifications', () => {
      const { addNotification, unreadCount } = useStore.getState();
      
      addNotification({
        id: '1',
        type: 'match',
        title: 'Match 1',
        description: 'Description 1',
        timestamp: new Date(),
        read: false,
      });
      
      addNotification({
        id: '2',
        type: 'like',
        title: 'Like 1',
        description: 'Description 2',
        timestamp: new Date(),
        read: true,
      });
      
      expect(unreadCount()).toBe(1);
    });
  });
});
