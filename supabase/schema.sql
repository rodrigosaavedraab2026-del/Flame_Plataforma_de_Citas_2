-- Flama Database Schema for Supabase
-- Run this in your Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Profiles table
CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  age INTEGER CHECK (age >= 18 AND age <= 99),
  gender TEXT CHECK (gender IN ('male', 'female', 'other')) NOT NULL,
  looking_for TEXT CHECK (looking_for IN ('male', 'female', 'everyone')) NOT NULL,
  bio TEXT,
  photos TEXT[] DEFAULT '{}',
  interests TEXT[] DEFAULT '{}',
  location JSONB,
  verified BOOLEAN DEFAULT FALSE,
  membership_tier TEXT DEFAULT 'free' CHECK (membership_tier IN ('free', 'plus', 'gold', 'platinum', 'select')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Matches table
CREATE TABLE matches (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  matched_user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'matched', 'rejected')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, matched_user_id)
);

-- Messages table
CREATE TABLE messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  chat_id UUID NOT NULL,
  sender_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  type TEXT DEFAULT 'text' CHECK (type IN ('text', 'image', 'voice')),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Subscriptions table
CREATE TABLE subscriptions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  stripe_subscription_id TEXT UNIQUE,
  tier TEXT CHECK (tier IN ('plus', 'gold', 'platinum', 'select')),
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'canceled', 'past_due')),
  current_period_end TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Notifications table
CREATE TABLE notifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  read BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Events table
CREATE TABLE events (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  date TIMESTAMPTZ NOT NULL,
  location TEXT NOT NULL,
  attendees INTEGER DEFAULT 0,
  max_attendees INTEGER,
  image TEXT,
  category TEXT CHECK (category IN ('social', 'dating', 'networking', 'fun')),
  price DECIMAL(10, 2) DEFAULT 0,
  is_vip BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Event registrations
CREATE TABLE event_registrations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  event_id UUID REFERENCES events(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  registered_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(event_id, user_id)
);

-- Stories table
CREATE TABLE stories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  type TEXT DEFAULT 'text' CHECK (type IN ('photo', 'video', 'text')),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  expires_at TIMESTAMPTZ DEFAULT (NOW() + INTERVAL '24 hours')
);

-- Indexes for performance
CREATE INDEX idx_profiles_gender ON profiles(gender);
CREATE INDEX idx_profiles_age ON profiles(age);
CREATE INDEX idx_profiles_verified ON profiles(verified);
CREATE INDEX idx_profiles_membership ON profiles(membership_tier);
CREATE INDEX idx_matches_user ON matches(user_id);
CREATE INDEX idx_matches_matched ON matches(matched_user_id);
CREATE INDEX idx_matches_status ON matches(status);
CREATE INDEX idx_messages_chat ON messages(chat_id);
CREATE INDEX idx_messages_sender ON messages(sender_id);
CREATE INDEX idx_messages_created ON messages(created_at);
CREATE INDEX idx_notifications_user ON notifications(user_id);
CREATE INDEX idx_notifications_read ON notifications(read);
CREATE INDEX idx_events_date ON events(date);
CREATE INDEX idx_events_category ON events(category);

-- Row Level Security (RLS) Policies

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE matches ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE notifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE event_registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE stories ENABLE ROW LEVEL SECURITY;

-- Profiles policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  USING (true);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

-- Matches policies
CREATE POLICY "Users can view their own matches"
  ON matches FOR SELECT
  USING (auth.uid() = user_id OR auth.uid() = matched_user_id);

CREATE POLICY "Users can create their own matches"
  ON matches FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own matches"
  ON matches FOR UPDATE
  USING (auth.uid() = user_id OR auth.uid() = matched_user_id);

-- Messages policies
CREATE POLICY "Users can view messages in their chats"
  ON messages FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM matches
      WHERE matches.id = messages.chat_id
      AND (matches.user_id = auth.uid() OR matches.matched_user_id = auth.uid())
      AND matches.status = 'matched'
    )
  );

CREATE POLICY "Users can send messages in their chats"
  ON messages FOR INSERT
  WITH CHECK (
    auth.uid() = sender_id AND
    EXISTS (
      SELECT 1 FROM matches
      WHERE matches.id = messages.chat_id
      AND (matches.user_id = auth.uid() OR matches.matched_user_id = auth.uid())
      AND matches.status = 'matched'
    )
  );

-- Subscriptions policies
CREATE POLICY "Users can view their own subscriptions"
  ON subscriptions FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own subscriptions"
  ON subscriptions FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Notifications policies
CREATE POLICY "Users can view their own notifications"
  ON notifications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications"
  ON notifications FOR UPDATE
  USING (auth.uid() = user_id);

-- Events policies
CREATE POLICY "Events are viewable by everyone"
  ON events FOR SELECT
  USING (true);

CREATE POLICY "Users can register for events"
  ON event_registrations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view their own registrations"
  ON event_registrations FOR SELECT
  USING (auth.uid() = user_id);

-- Stories policies
CREATE POLICY "Stories are viewable by everyone"
  ON stories FOR SELECT
  USING (true);

CREATE POLICY "Users can create their own stories"
  ON stories FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own stories"
  ON stories FOR DELETE
  USING (auth.uid() = user_id);

-- Functions

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Auto-create profile on user signup
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, name, age, gender, looking_for)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'name', 'User'),
    COALESCE((NEW.raw_user_meta_data->>'age')::INTEGER, 25),
    COALESCE(NEW.raw_user_meta_data->>'gender', 'other'),
    COALESCE(NEW.raw_user_meta_data->>'lookingFor', 'everyone')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();

-- Storage buckets
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('profile-photos', 'profile-photos', true),
  ('chat-images', 'chat-images', false),
  ('voice-messages', 'voice-messages', false),
  ('stories', 'stories', true);

-- Storage policies
CREATE POLICY "Profile photos are publicly accessible"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'profile-photos');

CREATE POLICY "Users can upload their own profile photos"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'profile-photos' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Users can update their own profile photos"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'profile-photos' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Users can delete their own profile photos"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'profile-photos' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );
