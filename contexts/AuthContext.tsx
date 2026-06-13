'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { User } from '@supabase/supabase-js';
import { supabase } from '@/lib/supabase';
import { Profile, Organisation, IndividualSubscription } from '@/lib/types';

interface AuthContextType {
  user: User | null;
  profile: Profile | null;
  organisation: Organisation | null;
  individualSubscription: IndividualSubscription | null;
  isIndividual: boolean;
  loading: boolean;
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>;
  signUp: (email: string, password: string, metadata: Record<string, string>) => Promise<{ error: Error | null }>;
  signOut: () => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [organisation, setOrganisation] = useState<Organisation | null>(null);
  const [individualSubscription, setIndividualSubscription] = useState<IndividualSubscription | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async (userId: string) => {
    try {
      const { data: profileData } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .maybeSingle();

      if (profileData) {
        setProfile(profileData as Profile);

        if (profileData.organisation_id) {
          const { data: orgData } = await supabase
            .from('organisations')
            .select('*')
            .eq('id', profileData.organisation_id)
            .maybeSingle();
          setOrganisation(orgData as Organisation);
        } else {
          setOrganisation(null);
        }

        // Load individual subscription if applicable
        if (profileData.account_type === 'individual') {
          const { data: subData } = await supabase
            .from('individual_subscriptions')
            .select('*')
            .eq('user_id', userId)
            .eq('status', 'active')
            .maybeSingle();
          setIndividualSubscription((subData as IndividualSubscription) ?? null);
        } else {
          setIndividualSubscription(null);
        }

        await supabase
          .from('profiles')
          .update({ last_login: new Date().toISOString() })
          .eq('id', userId);
      }
    } catch (err) {
      console.error('fetchProfile error:', err);
    }
  };

  const refreshProfile = async () => {
    if (user) await fetchProfile(user.id);
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        fetchProfile(session.user.id).finally(() => setLoading(false));
      } else {
        setLoading(false);
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (session?.user) {
        (async () => {
          await fetchProfile(session.user.id);
          setLoading(false);
        })();
      } else {
        setProfile(null);
        setOrganisation(null);
        setIndividualSubscription(null);
        setLoading(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error: error as Error | null };
  };

  const signUp = async (email: string, password: string, metadata: Record<string, string>) => {
    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: { data: metadata },
    });
    return { error: error as Error | null };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    setOrganisation(null);
    setIndividualSubscription(null);
  };

  const isIndividual = profile?.account_type === 'individual';

  return (
    <AuthContext.Provider value={{
      user, profile, organisation, individualSubscription, isIndividual,
      loading, signIn, signUp, signOut, refreshProfile,
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
