import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface BookingRecord {
  date: string;
  service: string;
  status: string;
}

interface AuthUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  address: string;
}

interface AuthContextType {
  user: AuthUser | null;
  session: Session | null;
  isAuthenticated: boolean;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ error: any }>;
  signup: (email: string, password: string, userData: { firstName: string; lastName: string; phoneNumber: string; address: string }) => Promise<{ error: any }>;
  logout: () => Promise<void>;
  updateUser: (userData: Partial<AuthUser>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  // Fetch user profile from Supabase
  const fetchUserProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) throw error;

      if (data) {
        // Get email from auth session
        const { data: { session } } = await supabase.auth.getSession();
        
        setUser({
          id: data.id,
          firstName: data.first_name || '',
          lastName: data.last_name || '',
          email: session?.user?.email || '',
          phoneNumber: data.phone_number || '',
          address: data.address || ''
        });
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
      
      if (session?.user) {
        // Defer profile fetch to avoid blocking
        setTimeout(() => {
          fetchUserProfile(session.user.id);
        }, 0);
      } else {
        setUser(null);
      }
      
      setLoading(false);
    });

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (session?.user) {
        fetchUserProfile(session.user.id);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const signup = async (
    email: string, 
    password: string, 
    userData: { firstName: string; lastName: string; phoneNumber: string; address: string }
  ) => {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            first_name: userData.firstName,
            last_name: userData.lastName,
            phone_number: userData.phoneNumber,
            address: userData.address
          },
          emailRedirectTo: `${window.location.origin}/`
        }
      });

      return { error };
    } catch (error: any) {
      return { error };
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      return { error };
    } catch (error: any) {
      return { error };
    }
  };

  const logout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
  };

  const updateUser = async (userData: Partial<AuthUser>) => {
    if (!user) return;

    try {
      const updateData: any = {};
      if (userData.firstName) updateData.first_name = userData.firstName;
      if (userData.lastName) updateData.last_name = userData.lastName;
      if (userData.email) updateData.email = userData.email;
      if (userData.address) updateData.address = userData.address;

      const { error } = await supabase
        .from('profiles')
        .update(updateData)
        .eq('id', user.id);

      if (error) throw error;

      setUser({ ...user, ...userData });
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      session,
      isAuthenticated: !!session, 
      loading,
      login, 
      signup,
      logout, 
      updateUser 
    }}>
      {children}
    </AuthContext.Provider>
  );
};
