import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import CryptoSection from '@/components/CryptoSection';
import CurrencySection from '@/components/CurrencySection';
import AuthModal from '@/components/AuthModal';
import Footer from '@/components/Footer';

const AUTH_API = 'https://functions.poehali.dev/dc17df15-258e-467e-84e5-2123c7521e48';

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [authError, setAuthError] = useState('');
  const [userBalance, setUserBalance] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      checkAuth(token);
    }
  }, []);

  const checkAuth = async (token: string) => {
    try {
      const response = await fetch(AUTH_API, {
        method: 'GET',
        headers: {
          'X-Auth-Token': token,
        },
      });

      const data = await response.json();
      
      if (response.ok && data.success) {
        setIsLoggedIn(true);
        setUsername(data.user.username);
        setUserBalance(data.user.balance);
      } else {
        localStorage.removeItem('authToken');
        setIsLoggedIn(false);
      }
    } catch (error) {
      localStorage.removeItem('authToken');
      setIsLoggedIn(false);
    }
  };

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError('');

    const body = authMode === 'register' 
      ? { action: 'register', username, email, password }
      : { action: 'login', username, password };

    try {
      const response = await fetch(AUTH_API, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        localStorage.setItem('authToken', data.token);
        setIsLoggedIn(true);
        setUsername(data.user.username);
        setUserBalance(data.user.balance);
        setShowAuthModal(false);
        setPassword('');
        setEmail('');
      } else {
        setAuthError(data.error || 'Ошибка авторизации');
      }
    } catch (error) {
      setAuthError('Ошибка соединения с сервером');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    setIsLoggedIn(false);
    setUsername('');
    setUserBalance(0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e1e2e] via-[#27293d] to-[#1a1d2e]">
      <Header
        isLoggedIn={isLoggedIn}
        username={username}
        userBalance={userBalance}
        password={password}
        setUsername={setUsername}
        setPassword={setPassword}
        setAuthMode={setAuthMode}
        setShowAuthModal={setShowAuthModal}
        handleAuth={handleAuth}
        handleLogout={handleLogout}
      />

      <HeroSection />
      <CryptoSection />
      <CurrencySection setShowAuthModal={setShowAuthModal} />

      <AuthModal
        showAuthModal={showAuthModal}
        authError={authError}
        username={username}
        email={email}
        password={password}
        setUsername={setUsername}
        setEmail={setEmail}
        setPassword={setPassword}
        setShowAuthModal={setShowAuthModal}
        handleAuth={handleAuth}
      />

      <Footer />
    </div>
  );
};

export default Index;
