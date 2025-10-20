import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';

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
  const [currentSlide, setCurrentSlide] = useState(1);

  // Проверка авторизации при загрузке
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

      <section id="collection" className="pt-24 pb-16 px-4 md:px-8 min-h-screen flex items-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 via-transparent to-red-600/10 pointer-events-none"></div>
        
        <div className="container mx-auto relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div>
                <h1 className="text-7xl md:text-8xl font-black text-white mb-6 tracking-tight leading-none">
                  SpaceAge
                </h1>
                <p className="text-gray-400 text-lg max-w-md leading-relaxed">
                  The year is 3030, hyper-warp to mega speed and peer into a futuristic anti gravitational lookbook
                </p>
              </div>

              <div className="flex items-center gap-4 pt-8">
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Icon key={star} name="Star" size={20} className="text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <span className="text-white text-lg font-medium">5/5</span>
              </div>
            </div>

            <div className="relative">
              <div className="absolute -right-4 top-8 text-right z-10">
                <div className="text-gray-500 text-sm mb-2">Sophia Ledbetter</div>
                <div className="flex items-center gap-4 justify-end">
                  <span className="text-white text-4xl font-bold">01</span>
                  <div className="w-32 h-0.5 bg-gradient-to-r from-white/50 to-transparent"></div>
                  <span className="text-gray-600 text-2xl">03</span>
                </div>
              </div>

              <div className="relative overflow-hidden rounded-2xl group">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-600/30 via-red-600/20 to-transparent mix-blend-overlay z-10 pointer-events-none"></div>
                <img 
                  src="https://cdn.poehali.dev/files/a8b706a6-bea0-43c9-a8f9-ff4e62aca159.png"
                  alt="SpaceAge Collection"
                  className="w-full h-[600px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-4 md:px-8 bg-gradient-to-b from-transparent via-orange-950/5 to-transparent relative">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/5 via-transparent to-red-600/5 pointer-events-none"></div>
        
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-8">
            <span className="text-gray-500 uppercase tracking-widest text-xs font-medium">NEWS</span>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="bg-gradient-to-br from-[#2a2d3e]/80 to-[#1e2130]/80 border-white/5 hover:border-orange-500/20 transition-all hover-scale overflow-hidden group backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white text-2xl mb-2">Lionshead Studios redesign</CardTitle>
                <CardDescription className="text-gray-400 text-base">
                  A new skin for the LA location
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="bg-gradient-to-br from-[#2a2d3e]/80 to-[#1e2130]/80 border-white/5 hover:border-orange-500/20 transition-all hover-scale overflow-hidden group backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white text-2xl mb-2">Ceneviva shows his amazing work</CardTitle>
                <CardDescription className="text-gray-400 text-base">
                  Post-production is art
                </CardDescription>
              </CardHeader>
            </Card>
          </div>

          <div className="flex justify-center gap-2 mt-8">
            {[1, 2, 3].map((dot) => (
              <button
                key={dot}
                onClick={() => setCurrentSlide(dot)}
                className={`w-2 h-2 rounded-full transition-all ${
                  currentSlide === dot ? 'bg-white w-8' : 'bg-gray-600'
                }`}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="shops" className="py-16 px-4 md:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-white mb-4">
              Магазины 🛍️
            </h2>
            <p className="text-gray-400 text-lg">500+ крутых мест для шопинга</p>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 mb-8 h-12 bg-gradient-to-r from-[#2a2d3e] to-[#1e2130] border border-white/10">
              <TabsTrigger value="all" className="font-bold text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-600 data-[state=active]:to-red-600">Все 🔥</TabsTrigger>
              <TabsTrigger value="food" className="font-bold text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-600 data-[state=active]:to-red-600">Еда 🍕</TabsTrigger>
              <TabsTrigger value="clothes" className="font-bold text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-600 data-[state=active]:to-red-600">Одежда 👕</TabsTrigger>
              <TabsTrigger value="tech" className="font-bold text-white data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-600 data-[state=active]:to-red-600">Техника 📱</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { name: 'Техномаркет', category: 'Электроника', cashback: '15%', icon: '📱' },
                  { name: 'Стритвир', category: 'Одежда', cashback: '10%', icon: '👕' },
                  { name: 'Фудкорт', category: 'Еда', cashback: '8%', icon: '🍕' },
                  { name: 'Гейм Зона', category: 'Игры', cashback: '12%', icon: '🎮' },
                  { name: 'Книжный', category: 'Книги', cashback: '5%', icon: '📚' },
                  { name: 'Спорт Хаб', category: 'Спорт', cashback: '10%', icon: '⚽' },
                ].map((shop, idx) => (
                  <Card key={idx} className="hover-scale bg-gradient-to-br from-[#2a2d3e]/80 to-[#1e2130]/80 border-white/5 hover:border-orange-500/30 transition-all overflow-hidden group backdrop-blur-sm">
                    <div className="h-1 bg-gradient-to-r from-orange-600 to-red-600"></div>
                    <CardHeader>
                      <div className="flex items-start justify-between mb-3">
                        <div className="text-5xl">{shop.icon}</div>
                        <Badge className="bg-gradient-to-r from-orange-600/20 to-red-600/20 text-orange-400 border border-orange-500/30 font-bold">
                          {shop.cashback} кэшбэк
                        </Badge>
                      </div>
                      <CardTitle className="text-xl text-white">{shop.name}</CardTitle>
                      <CardDescription className="text-gray-400 text-base">{shop.category}</CardDescription>
                      <Button className="w-full mt-4 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white border-0">
                        <Icon name="ShoppingCart" size={18} className="mr-2" />
                        Открыть магазин
                      </Button>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section id="crypto" className="py-16 px-4 md:px-8 bg-gradient-to-b from-transparent via-orange-950/5 to-transparent relative">
        <div className="absolute inset-0 bg-gradient-to-r from-orange-600/5 via-transparent to-red-600/5 pointer-events-none"></div>
        
        <div className="container mx-auto relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-white mb-4">
              Криптовалюты 💎
            </h2>
            <p className="text-gray-400 text-lg">Покупай, продавай и обменивай крипту</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Bitcoin', symbol: 'BTC', icon: '₿', price: '45,230', change: '+5.2%' },
              { name: 'Ethereum', symbol: 'ETH', icon: 'Ξ', price: '3,120', change: '+3.8%' },
              { name: 'Лизкоин', symbol: 'LZK', icon: '💙', price: '0.10', change: '+12.5%' },
              { name: 'Solana', symbol: 'SOL', icon: '◎', price: '98.5', change: '+7.1%' },
            ].map((crypto, idx) => (
              <Card key={idx} className="hover-scale bg-gradient-to-br from-orange-950/20 to-red-950/20 border-orange-500/20 hover:border-orange-500/40 transition-all backdrop-blur-sm">
                <CardHeader>
                  <div className="flex justify-between items-start mb-4">
                    <div className="text-5xl">{crypto.icon}</div>
                    <Badge className="bg-green-600/20 text-green-400 border border-green-600/30 font-bold">
                      {crypto.change}
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl text-white">{crypto.name}</CardTitle>
                  <CardDescription className="text-gray-400 font-medium text-base">
                    {crypto.symbol}
                  </CardDescription>
                  <div className="text-3xl font-bold text-white mt-3">
                    ${crypto.price}
                  </div>
                  <Button 
                    className="w-full mt-4 bg-gradient-to-r from-orange-600/20 to-red-600/20 hover:from-orange-600/30 hover:to-red-600/30 text-white border border-orange-500/30"
                    variant="outline"
                  >
                    <Icon name="ArrowRightLeft" size={18} className="mr-2" />
                    Обменять
                  </Button>
                </CardHeader>
              </Card>
            ))}
          </div>

          <Card className="mt-8 max-w-4xl mx-auto bg-gradient-to-br from-[#2a2d3e]/80 to-[#1e2130]/80 border-white/5 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2 text-white">
                <span className="text-3xl">⚡</span>
                Быстрый обмен криптовалют
              </CardTitle>
              <CardDescription className="text-gray-400 text-base">Конвертируй крипту в лизкоины за секунды</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="font-medium mb-2 block text-gray-300">Отдаешь</label>
                  <div className="flex gap-2">
                    <Input placeholder="0.00" className="text-xl font-bold bg-white/5 border-white/10 text-white" />
                    <Button variant="outline" className="min-w-[120px] bg-white/5 border-white/10 text-white hover:bg-white/10">
                      BTC ₿
                    </Button>
                  </div>
                </div>
                <div>
                  <label className="font-medium mb-2 block text-gray-300">Получаешь</label>
                  <div className="flex gap-2">
                    <Input placeholder="0.00" className="text-xl font-bold bg-white/5 border-white/10 text-white" />
                    <Button variant="outline" className="min-w-[120px] bg-white/5 border-white/10 text-white hover:bg-white/10">
                      ЛК 💙
                    </Button>
                  </div>
                </div>
              </div>
              <Button className="w-full mt-6 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white h-12 text-lg font-bold border-0">
                <Icon name="Zap" size={20} className="mr-2" />
                Обменять сейчас 🚀
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="currency" className="py-16 px-4 md:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-white mb-4">
              Лизкоины 💰
            </h2>
            <p className="text-gray-400 text-lg">Внутренняя валюта рынка с крутыми бонусами</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="hover-scale bg-gradient-to-br from-[#2a2d3e]/80 to-[#1e2130]/80 border-white/5 hover:border-orange-500/30 transition-all text-center backdrop-blur-sm">
              <CardHeader>
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-orange-600 to-red-600 flex items-center justify-center text-4xl">
                  🛒
                </div>
                <CardTitle className="text-xl text-white">Покупай</CardTitle>
                <CardDescription className="text-gray-400 text-base">10% кэшбэк лизкоинами на каждую покупку</CardDescription>
                <div className="text-3xl font-bold text-orange-400 mt-4">+100 ЛК</div>
              </CardHeader>
            </Card>

            <Card className="hover-scale bg-gradient-to-br from-[#2a2d3e]/80 to-[#1e2130]/80 border-white/5 hover:border-orange-500/30 transition-all text-center backdrop-blur-sm">
              <CardHeader>
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-orange-600 to-red-600 flex items-center justify-center text-4xl">
                  💎
                </div>
                <CardTitle className="text-xl text-white">Майни крипту</CardTitle>
                <CardDescription className="text-gray-400 text-base">Конвертируй криптовалюту в лизкоины</CardDescription>
                <div className="text-3xl font-bold text-orange-400 mt-4">+500 ЛК</div>
              </CardHeader>
            </Card>

            <Card className="hover-scale bg-gradient-to-br from-[#2a2d3e]/80 to-[#1e2130]/80 border-white/5 hover:border-orange-500/30 transition-all text-center backdrop-blur-sm">
              <CardHeader>
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-orange-600 to-red-600 flex items-center justify-center text-4xl">
                  🎁
                </div>
                <CardTitle className="text-xl text-white">Получай бонусы</CardTitle>
                <CardDescription className="text-gray-400 text-base">Ежедневные задания и награды</CardDescription>
                <div className="text-3xl font-bold text-orange-400 mt-4">+50 ЛК</div>
              </CardHeader>
            </Card>
          </div>

          <Card className="max-w-4xl mx-auto bg-gradient-to-br from-orange-950/30 to-red-950/30 border-orange-500/30 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-3xl text-white flex items-center gap-2">
                <span className="text-4xl">🚀</span>
                Начни зарабатывать прямо сейчас
              </CardTitle>
              <CardDescription className="text-gray-400 text-lg">
                Создай аккаунт и получи 1000 ЛК в подарок 💙
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <div className="text-orange-400 font-bold text-lg mb-2">+1000 ЛК</div>
                  <p className="text-gray-400">За регистрацию</p>
                </div>
                <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                  <div className="text-orange-400 font-bold text-lg mb-2">+200 ЛК</div>
                  <p className="text-gray-400">За каждого друга</p>
                </div>
              </div>
              <Button 
                onClick={() => setShowAuthModal(true)}
                className="w-full mt-6 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white h-12 text-lg font-bold border-0"
              >
                <Icon name="Sparkles" size={20} className="mr-2" />
                Забрать 1000 ЛК 🎁
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-sm bg-black/80" onClick={() => setShowAuthModal(false)}>
          <Card className="max-w-md w-full bg-[#1a1a2e] border-white/10 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <CardHeader>
              <div className="text-center mb-4">
                <div className="text-6xl mb-4">💙</div>
                <CardTitle className="text-2xl text-white">Создай аккаунт</CardTitle>
                <CardDescription className="text-gray-400 text-base">Получи 1000 ЛК в подарок</CardDescription>
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
                  type="email" 
                  placeholder="Email" 
                  className="h-12 bg-white/5 border-white/10 text-white"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  <Icon name="Rocket" size={20} className="mr-2" />
                  Начать 🚀
                </Button>
                <div className="text-center">
                  <button 
                    type="button"
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                    onClick={() => {
                      setIsLoggedIn(true);
                      setUserBalance(1250);
                      setShowAuthModal(false);
                    }}
                  >
                    Уже есть аккаунт? Войти
                  </button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      <footer className="border-t border-white/10 py-12 px-4 md:px-8 bg-[#1a1d2e]">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="text-3xl">💙</div>
                <h3 className="font-bold text-xl text-white">
                  Лизунск
                </h3>
              </div>
              <p className="text-gray-400">
                Торговый рынок будущего с крипто-валютой
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-white">Разделы</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#collection" className="hover:text-white transition-colors">Главная 🏠</a></li>
                <li><a href="#shops" className="hover:text-white transition-colors">Магазины 🛍️</a></li>
                <li><a href="#crypto" className="hover:text-white transition-colors">Крипта 💎</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-white">Валюты</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#currency" className="hover:text-white transition-colors">Лизкоины 💰</a></li>
                <li><a href="#crypto" className="hover:text-white transition-colors">Bitcoin ₿</a></li>
                <li><a href="#crypto" className="hover:text-white transition-colors">Ethereum Ξ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-white">Соцсети</h4>
              <div className="flex gap-3">
                <Button size="icon" variant="ghost" className="hover:bg-white/10 text-white">
                  <Icon name="MessageCircle" size={18} />
                </Button>
                <Button size="icon" variant="ghost" className="hover:bg-white/10 text-white">
                  <Icon name="Instagram" size={18} />
                </Button>
                <Button size="icon" variant="ghost" className="hover:bg-white/10 text-white">
                  <Icon name="Twitter" size={18} />
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 pt-8 text-center text-gray-500">
            <p>© 2024 Лизунск 💙 Все права защищены</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;