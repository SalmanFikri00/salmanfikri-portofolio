/* eslint-disable no-unused-vars */
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import useScrollToTop from './useScrollToTop';
import { AdminSessionProvider } from './context/AdminSessionContext';
import { PageTransitionProvider } from './context/PageTransitionContext';
import PageTransition from './components/PageTransition';
import AdminRoute from './components/AdminRoute';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import { usePageTransition } from './context/PageTransitionContext';


const AppRoutes = () => {
  useScrollToTop();
  const { isTransitioning, completeTransition } = usePageTransition();

  return (
    <>
      <PageTransition
        isTransitioning={isTransitioning}
        onTransitionComplete={completeTransition}
      />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/projects' element={<Projects />} />
        <Route path='/admin/00/login' element={<AdminLogin />} />
        <Route element={<AdminRoute />}>
          <Route path='/admin/00/dashboard' element={<AdminDashboard />} />
        </Route>
      </Routes>
    </>
  );
};

const App = () => (
  <BrowserRouter>
    <AdminSessionProvider>
      <PageTransitionProvider>
        <AppRoutes />
      </PageTransitionProvider>
    </AdminSessionProvider>
  </BrowserRouter>
);

export default App
