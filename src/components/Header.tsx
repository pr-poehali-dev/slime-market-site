import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

interface HeaderProps {
  isLoggedIn: boolean;
  username: string;
  userBalance: number;
  password: string;
  setUsername: (value: string) => void;
  setPassword: (value: string) => void;
  setAuthMode: (mode: 'login' | 'register') => void;
  setShowAuthModal: (show: boolean) => void;
  handleAuth: (e: React.FormEvent) => void;
  handleLogout: () => void;
}

export default function Header({
  isLoggedIn,
  username,
  userBalance,
  password,
  setUsername,
  setPassword,
  setAuthMode,
  setShowAuthModal,
  handleAuth,
  handleLogout,
}: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#1a1d2e]/80 backdrop-blur-md border-b border-white/5">
      <div className="container flex h-16 items-center justify-between">
        <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
          <Icon name="Menu" size={24} className="text-white" />
        </button>
        
        <nav className="hidden md:flex gap-8 items-center absolute left-1/2 -translate-x-1/2">
          <a href="#collection" className="text-white font-medium border-b-2 border-white pb-1">collection</a>
          <a href="#about" className="text-gray-400 hover:text-white transition-colors">about</a>
          <a href="#editorial" className="text-gray-400 hover:text-white transition-colors">editorial</a>
        </nav>

        {isLoggedIn ? (
          <div className="flex items-center gap-3">
            <Badge className="text-sm px-3 py-1.5 bg-gradient-to-r from-orange-500/20 to-red-500/20 text-orange-400 border border-orange-500/30">
              💰 {userBalance} ЛК
            </Badge>
            <Button size="sm" variant="ghost" className="text-white hover:bg-white/10">
              <Icon name="User" size={18} className="mr-2" />
              {username}
            </Button>
            <Button size="sm" variant="ghost" onClick={handleLogout} className="text-gray-400 hover:bg-white/10">
              <Icon name="LogOut" size={18} />
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-3">
            <Input 
              placeholder="Логин" 
              className="h-10 w-32 bg-white/5 border-white/10 text-white text-sm"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input 
              type="password" 
              placeholder="Пароль" 
              className="h-10 w-32 bg-white/5 border-white/10 text-white text-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  setAuthMode('login');
                  handleAuth(e as any);
                }
              }}
            />
            <Button 
              onClick={(e) => {
                setAuthMode('login');
                handleAuth(e as any);
              }}
              className="text-white bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 h-10"
              disabled={!username || !password}
            >
              <Icon name="LogIn" size={18} className="mr-2" />
              Вход
            </Button>
            <button
              onClick={() => {
                setAuthMode('register');
                setShowAuthModal(true);
              }}
              className="text-gray-400 hover:text-white text-sm transition-colors whitespace-nowrap"
            >
              Нет аккаунта?
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
