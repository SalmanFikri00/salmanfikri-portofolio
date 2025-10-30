import { createContext, useContext, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

const PageTransitionContext = createContext();

export const usePageTransition = () => {
  const context = useContext(PageTransitionContext);
  if (!context) {
    throw new Error('usePageTransition must be used within PageTransitionProvider');
  }
  return context;
};

export const PageTransitionProvider = ({ children }) => {
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [nextPath, setNextPath] = useState(null);
  const navigate = useNavigate();

  const transitionToPage = useCallback((path) => {
    // Don't transition if already on the same page
    if (window.location.pathname === path) return;

    setNextPath(path);
    setIsTransitioning(true);
  }, []);

  const completeTransition = useCallback(() => {
    if (nextPath) {
      navigate(nextPath);
      setIsTransitioning(false);
      // Small delay before hiding transition overlay
      setTimeout(() => {
        setNextPath(null);
      }, 100);
    }
  }, [nextPath, navigate]);

  return (
    <PageTransitionContext.Provider
      value={{
        isTransitioning,
        transitionToPage,
        completeTransition,
      }}
    >
      {children}
    </PageTransitionContext.Provider>
  );
};
