import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import { supabaseClient } from '../lib/supabaseClient';

const AdminSessionContext = createContext({
  user: null,
  profile: null,
  session: null,
  isLoading: true,
  isAdmin: false,
  error: null,
  refreshProfile: async () => {},
  signOut: async () => {},
});

export const AdminSessionProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [profile, setProfile] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    const bootstrapAuth = async () => {
      setIsLoading(true);

      try {
        const { data, error: sessionError } = await supabaseClient.auth.getSession();

        if (!isMounted) return;

        if (sessionError) {
          throw sessionError;
        }

        const currentSession = data?.session ?? null;
        console.info('[AdminSession] Initial session', currentSession);
        setError(null);
        setSession(currentSession);

        // Skip profile fetching since we don't need admin check anymore
        setProfile(null);
      } catch (bootstrapError) {
        if (!isMounted) return;
        console.error('[AdminSession] Failed to bootstrap session', bootstrapError);
        setError(bootstrapError);
        setSession(null);
        setProfile(null);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    bootstrapAuth();

    const {
      data: authListener,
    } = supabaseClient.auth.onAuthStateChange(async (_event, nextSession) => {
      if (!isMounted) return;
      
      console.info('[AdminSession] Auth state change', _event, nextSession);
      setError(null);
      setSession(nextSession ?? null);
      setProfile(null); // Skip profile fetching

      if (isMounted) {
        setIsLoading(false);
      }
    });

    return () => {
      isMounted = false;
      authListener?.subscription?.unsubscribe();
    };
  }, []);

  const value = useMemo(
    () => {
      const isAdminValue = Boolean(session?.user); // Always true if user exists
      
      console.log('[AdminSession] Context value updated:', {
        user: session?.user ?? null,
        profile,
        isLoading,
        error,
        isAdmin: isAdminValue
      });
      
      return {
        user: session?.user ?? null,
        session,
        profile,
        isLoading,
        error,
        isAdmin: isAdminValue,
        refreshProfile: async () => {
          // Profile fetching is no longer needed
          setProfile(null);
          return null;
        },
        signOut: async () => {
          await supabaseClient.auth.signOut();
        },
      };
    },
    [session, profile, isLoading, error],
  );

  return (
    <AdminSessionContext.Provider value={value}>
      {children}
    </AdminSessionContext.Provider>
  );
};

export const useAdminSession = () => useContext(AdminSessionContext);

AdminSessionProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
