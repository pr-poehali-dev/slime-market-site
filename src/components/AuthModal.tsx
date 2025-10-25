import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { motion, AnimatePresence } from 'framer-motion';

interface AuthModalProps {
  showAuthModal: boolean;
  authError: string;
  username: string;
  password: string;
  authMode: 'login' | 'register';
  setUsername: (value: string) => void;
  setPassword: (value: string) => void;
  setShowAuthModal: (show: boolean) => void;
  setAuthMode: (mode: 'login' | 'register') => void;
  handleAuth: (e: React.FormEvent) => void;
}

export default function AuthModal({
  showAuthModal,
  authError,
  username,
  password,
  authMode,
  setUsername,
  setPassword,
  setShowAuthModal,
  setAuthMode,
  handleAuth,
}: AuthModalProps) {
  return (
    <AnimatePresence>
      {showAuthModal && (
        <motion.div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/80" 
          onClick={() => setShowAuthModal(false)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", duration: 0.5 }}
          >
            <Card className="max-w-md w-full bg-[#1a1a2e] border-white/10 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <CardHeader>
          <div className="text-center mb-4">
            <div className="text-6xl mb-4">{authMode === 'register' ? '💙' : '🔐'}</div>
            <CardTitle className="text-2xl text-white">
              {authMode === 'register' ? 'Создай аккаунт' : 'Войти в аккаунт'}
            </CardTitle>
            <CardDescription className="text-gray-400 text-base">
              {authMode === 'register' ? 'Получи 1000 ЛК в подарок' : 'С возвращением! 👋'}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleAuth}>
            {authError && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-3 rounded-lg text-sm">
                {authError}
              </div>
            )}
            
            <Input 
              placeholder="Логин 😎" 
              className="h-12 bg-white/5 border-white/10 text-white" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            
            <Input 
              type="password" 
              placeholder="Пароль" 
              className="h-12 bg-white/5 border-white/10 text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            
            <Button type="submit" className="w-full bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white h-12 text-lg font-bold border-0">
              <Icon name={authMode === 'register' ? "Rocket" : "LogIn"} size={20} className="mr-2" />
              {authMode === 'register' ? 'Начать 🚀' : 'Войти'}
            </Button>
            <div className="text-center flex justify-between">
              <button 
                type="button"
                className="text-sm text-gray-400 hover:text-white transition-colors"
                onClick={() => setAuthMode(authMode === 'register' ? 'login' : 'register')}
              >
                {authMode === 'register' ? 'Уже есть аккаунт?' : 'Создать аккаунт'}
              </button>
              <button 
                type="button"
                className="text-sm text-gray-400 hover:text-white transition-colors"
                onClick={() => setShowAuthModal(false)}
              >
                Закрыть
              </button>
            </div>
          </form>
        </CardContent>
      </Card>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}