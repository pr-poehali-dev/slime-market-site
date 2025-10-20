import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const Index = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [userBalance, setUserBalance] = useState(1250);

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-100 via-white to-blue-100">
      <header className="sticky top-0 z-50 w-full border-b border-blue-200 bg-white/90 backdrop-blur supports-[backdrop-filter]:bg-white/80 shadow-sm">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="text-4xl">💙</div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-yellow-500 bg-clip-text text-transparent">
              Лизунск
            </h1>
          </div>
          <nav className="hidden md:flex gap-4 items-center">
            <a href="#home" className="hover:text-primary transition-colors font-medium">Главная</a>
            <a href="#shops" className="hover:text-primary transition-colors font-medium">Магазины</a>
            <a href="#crypto" className="hover:text-primary transition-colors font-medium">Крипта 💎</a>
            <a href="#currency" className="hover:text-primary transition-colors font-medium">Лизкоины</a>
          </nav>
          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              <Badge className="text-lg px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600">
                💰 {userBalance} ЛК
              </Badge>
              <Button size="sm" variant="outline">
                <Icon name="User" size={18} className="mr-2" />
                Профиль
              </Button>
            </div>
          ) : (
            <Button onClick={() => setShowAuthModal(true)} className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
              <Icon name="LogIn" size={18} className="mr-2" />
              Войти 💙
            </Button>
          )}
        </div>
      </header>

      <section id="home" className="py-16">
        <div className="container">
          <div className="grid lg:grid-cols-5 gap-8">
            <Card className="hover-scale lg:col-span-3 bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-xl">
              <CardHeader>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-4xl">🛒</span>
                  <CardTitle className="text-3xl text-white">Торговый рынок будущего</CardTitle>
                </div>
                <CardDescription className="text-blue-50 text-lg">
                  Виртуальная валюта, крипта и современный шопинг 💙
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-white">
                    <Icon name="Zap" size={24} className="text-yellow-300" />
                    <span className="font-medium">Быстрые криптоплатежи</span>
                  </div>
                  <div className="flex items-center gap-3 text-white">
                    <Icon name="TrendingUp" size={24} className="text-yellow-300" />
                    <span className="font-medium">Зарабатывай лизкоины</span>
                  </div>
                  <div className="flex items-center gap-3 text-white">
                    <Icon name="Users" size={24} className="text-yellow-300" />
                    <span className="font-medium">500+ магазинов</span>
                  </div>
                  <Button size="lg" className="w-full mt-4 bg-yellow-400 text-blue-900 hover:bg-yellow-500 font-bold">
                    <Icon name="Rocket" size={20} className="mr-2" />
                    Начать шопинг 🚀
                  </Button>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-scale lg:col-span-2 bg-gradient-to-br from-yellow-300 to-yellow-400 border-0 shadow-xl">
              <CardHeader>
                <div className="flex items-center gap-2">
                  <span className="text-3xl">💎</span>
                  <CardTitle className="text-2xl text-blue-900">Крипто-баланс</CardTitle>
                </div>
                <CardDescription className="text-blue-800 font-medium">
                  Твоя виртуальная валюта
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-5xl font-bold text-blue-900 mb-4">
                  {isLoggedIn ? `${userBalance} ЛК` : '--- ЛК'}
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-blue-900">
                    <span>Биткоин</span>
                    <span className="font-bold">0.0024 BTC</span>
                  </div>
                  <div className="flex justify-between text-blue-900">
                    <span>Эфириум</span>
                    <span className="font-bold">0.15 ETH</span>
                  </div>
                </div>
                {!isLoggedIn && (
                  <Button 
                    onClick={() => setShowAuthModal(true)} 
                    className="w-full mt-4 bg-blue-600 hover:bg-blue-700"
                  >
                    Создать аккаунт 💙
                  </Button>
                )}
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <Card className="hover-scale border-blue-200 shadow-lg">
              <CardHeader>
                <div className="text-4xl mb-2">⚡</div>
                <CardTitle className="text-xl bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                  Мгновенные транзакции
                </CardTitle>
                <CardDescription>Оплата за секунды через блокчейн</CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover-scale border-blue-200 shadow-lg">
              <CardHeader>
                <div className="text-4xl mb-2">🎁</div>
                <CardTitle className="text-xl bg-gradient-to-r from-yellow-500 to-yellow-600 bg-clip-text text-transparent">
                  Кэшбэк 10%
                </CardTitle>
                <CardDescription>Возврат лизкоинами на все покупки</CardDescription>
              </CardHeader>
            </Card>

            <Card className="hover-scale border-blue-200 shadow-lg">
              <CardHeader>
                <div className="text-4xl mb-2">🔒</div>
                <CardTitle className="text-xl bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">
                  Безопасность
                </CardTitle>
                <CardDescription>Твои активы под защитой 💙</CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <section id="shops" className="py-16 bg-white/60">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-yellow-500 bg-clip-text text-transparent">
              Магазины 🛍️
            </h2>
            <p className="text-muted-foreground text-lg">500+ крутых мест для шопинга</p>
          </div>

          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full max-w-2xl mx-auto grid-cols-4 mb-8 h-12 bg-blue-100">
              <TabsTrigger value="all" className="font-bold">Все 🔥</TabsTrigger>
              <TabsTrigger value="food" className="font-bold">Еда 🍕</TabsTrigger>
              <TabsTrigger value="clothes" className="font-bold">Одежда 👕</TabsTrigger>
              <TabsTrigger value="tech" className="font-bold">Техника 📱</TabsTrigger>
            </TabsList>
            
            <TabsContent value="all">
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { name: 'Техномаркет', category: 'Электроника', cashback: '15%', icon: '📱', color: 'from-blue-500 to-blue-600' },
                  { name: 'Стритвир', category: 'Одежда', cashback: '10%', icon: '👕', color: 'from-yellow-400 to-yellow-500' },
                  { name: 'Фудкорт', category: 'Еда', cashback: '8%', icon: '🍕', color: 'from-blue-400 to-blue-500' },
                  { name: 'Гейм Зона', category: 'Игры', cashback: '12%', icon: '🎮', color: 'from-yellow-500 to-yellow-600' },
                  { name: 'Книжный', category: 'Книги', cashback: '5%', icon: '📚', color: 'from-blue-500 to-blue-600' },
                  { name: 'Спорт Хаб', category: 'Спорт', cashback: '10%', icon: '⚽', color: 'from-yellow-400 to-yellow-500' },
                ].map((shop, idx) => (
                  <Card key={idx} className="hover-scale border-blue-200 shadow-lg overflow-hidden">
                    <div className={`h-2 bg-gradient-to-r ${shop.color}`} />
                    <CardHeader>
                      <div className="flex items-start justify-between mb-3">
                        <div className="text-5xl">{shop.icon}</div>
                        <Badge className="bg-gradient-to-r from-yellow-400 to-yellow-500 text-blue-900 font-bold">
                          {shop.cashback} кэшбэк 💰
                        </Badge>
                      </div>
                      <CardTitle className="text-xl">{shop.name}</CardTitle>
                      <CardDescription className="text-base">{shop.category}</CardDescription>
                      <Button className="w-full mt-4 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
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

      <section id="crypto" className="py-16">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-yellow-500 bg-clip-text text-transparent">
              Криптовалюты 💎
            </h2>
            <p className="text-muted-foreground text-lg">Покупай, продавай и обменивай крипту</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Bitcoin', symbol: 'BTC', icon: '₿', price: '45,230', change: '+5.2%', color: 'from-orange-400 to-orange-500' },
              { name: 'Ethereum', symbol: 'ETH', icon: 'Ξ', price: '3,120', change: '+3.8%', color: 'from-blue-500 to-blue-600' },
              { name: 'Лизкоин', symbol: 'LZK', icon: '💙', price: '0.10', change: '+12.5%', color: 'from-yellow-400 to-yellow-500' },
              { name: 'Solana', symbol: 'SOL', icon: '◎', price: '98.5', change: '+7.1%', color: 'from-purple-500 to-purple-600' },
            ].map((crypto, idx) => (
              <Card key={idx} className={`hover-scale bg-gradient-to-br ${crypto.color} text-white border-0 shadow-xl`}>
                <CardHeader>
                  <div className="flex justify-between items-start mb-4">
                    <div className="text-5xl">{crypto.icon}</div>
                    <Badge className="bg-green-500 text-white border-0 font-bold">
                      {crypto.change}
                    </Badge>
                  </div>
                  <CardTitle className="text-2xl text-white">{crypto.name}</CardTitle>
                  <CardDescription className="text-white/80 font-medium text-base">
                    {crypto.symbol}
                  </CardDescription>
                  <div className="text-3xl font-bold text-white mt-3">
                    ${crypto.price}
                  </div>
                  <Button 
                    className="w-full mt-4 bg-white/20 hover:bg-white/30 text-white border-white/40"
                    variant="outline"
                  >
                    <Icon name="ArrowRightLeft" size={18} className="mr-2" />
                    Обменять
                  </Button>
                </CardHeader>
              </Card>
            ))}
          </div>

          <Card className="mt-8 max-w-4xl mx-auto border-blue-200 shadow-xl">
            <CardHeader>
              <CardTitle className="text-2xl flex items-center gap-2">
                <span className="text-3xl">⚡</span>
                Быстрый обмен криптовалют
              </CardTitle>
              <CardDescription className="text-base">Конвертируй крипту в лизкоины за секунды</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="font-medium mb-2 block">Отдаешь</label>
                  <div className="flex gap-2">
                    <Input placeholder="0.00" className="text-xl font-bold" />
                    <Button variant="outline" className="min-w-[120px]">
                      BTC ₿
                    </Button>
                  </div>
                </div>
                <div>
                  <label className="font-medium mb-2 block">Получаешь</label>
                  <div className="flex gap-2">
                    <Input placeholder="0.00" className="text-xl font-bold" />
                    <Button variant="outline" className="min-w-[120px]">
                      ЛК 💙
                    </Button>
                  </div>
                </div>
              </div>
              <Button className="w-full mt-6 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 h-12 text-lg font-bold">
                <Icon name="Zap" size={20} className="mr-2" />
                Обменять сейчас 🚀
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="currency" className="py-16 bg-white/60">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 bg-gradient-to-r from-blue-600 to-yellow-500 bg-clip-text text-transparent">
              Лизкоины 💰
            </h2>
            <p className="text-muted-foreground text-lg">Внутренняя валюта рынка с крутыми бонусами</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <Card className="hover-scale border-blue-200 shadow-lg text-center">
              <CardHeader>
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-4xl">
                  🛒
                </div>
                <CardTitle className="text-xl">Покупай</CardTitle>
                <CardDescription className="text-base">10% кэшбэк лизкоинами на каждую покупку</CardDescription>
                <div className="text-3xl font-bold text-primary mt-4">+100 ЛК</div>
              </CardHeader>
            </Card>

            <Card className="hover-scale border-blue-200 shadow-lg text-center">
              <CardHeader>
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-yellow-400 to-yellow-500 flex items-center justify-center text-4xl">
                  💎
                </div>
                <CardTitle className="text-xl">Майни крипту</CardTitle>
                <CardDescription className="text-base">Конвертируй криптовалюту в лизкоины</CardDescription>
                <div className="text-3xl font-bold text-secondary mt-4">+500 ЛК</div>
              </CardHeader>
            </Card>

            <Card className="hover-scale border-blue-200 shadow-lg text-center">
              <CardHeader>
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center text-4xl">
                  🎁
                </div>
                <CardTitle className="text-xl">Получай бонусы</CardTitle>
                <CardDescription className="text-base">Ежедневные задания и награды</CardDescription>
                <div className="text-3xl font-bold text-primary mt-4">+50 ЛК</div>
              </CardHeader>
            </Card>
          </div>

          <Card className="max-w-4xl mx-auto bg-gradient-to-br from-blue-500 to-blue-600 text-white border-0 shadow-xl">
            <CardHeader>
              <CardTitle className="text-3xl text-white flex items-center gap-2">
                <span className="text-4xl">🚀</span>
                Начни зарабатывать прямо сейчас
              </CardTitle>
              <CardDescription className="text-blue-50 text-lg">
                Создай аккаунт и получи 1000 ЛК в подарок 💙
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-yellow-300 font-bold text-lg mb-2">+1000 ЛК</div>
                  <p className="text-blue-50">За регистрацию</p>
                </div>
                <div className="bg-white/10 rounded-lg p-4">
                  <div className="text-yellow-300 font-bold text-lg mb-2">+200 ЛК</div>
                  <p className="text-blue-50">За каждого друга</p>
                </div>
              </div>
              <Button 
                onClick={() => setShowAuthModal(true)}
                className="w-full mt-6 bg-yellow-400 text-blue-900 hover:bg-yellow-500 h-12 text-lg font-bold"
              >
                <Icon name="Sparkles" size={20} className="mr-2" />
                Забрать 1000 ЛК 🎁
              </Button>
            </CardContent>
          </Card>
        </div>
      </section>

      {showAuthModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4" onClick={() => setShowAuthModal(false)}>
          <Card className="max-w-md w-full border-blue-200 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <CardHeader>
              <div className="text-center mb-4">
                <div className="text-6xl mb-4">💙</div>
                <CardTitle className="text-2xl">Создай аккаунт</CardTitle>
                <CardDescription className="text-base">Получи 1000 ЛК в подарок</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <form className="space-y-4" onSubmit={(e) => {
                e.preventDefault();
                setIsLoggedIn(true);
                setUserBalance(1000);
                setShowAuthModal(false);
              }}>
                <Input placeholder="Твой никнейм 😎" className="h-12" />
                <Input type="email" placeholder="Email" className="h-12" />
                <Input type="password" placeholder="Пароль" className="h-12" />
                <Button type="submit" className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 h-12 text-lg font-bold">
                  <Icon name="Rocket" size={20} className="mr-2" />
                  Начать 🚀
                </Button>
                <div className="text-center">
                  <button 
                    type="button"
                    className="text-sm text-muted-foreground hover:text-primary"
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

      <footer className="border-t border-blue-200 py-12 bg-white">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="text-3xl">💙</div>
                <h3 className="font-bold text-xl bg-gradient-to-r from-blue-600 to-yellow-500 bg-clip-text text-transparent">
                  Лизунск
                </h3>
              </div>
              <p className="text-muted-foreground">
                Торговый рынок будущего с крипто-валютой
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Разделы</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#home" className="hover:text-primary">Главная 🏠</a></li>
                <li><a href="#shops" className="hover:text-primary">Магазины 🛍️</a></li>
                <li><a href="#crypto" className="hover:text-primary">Крипта 💎</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Валюты</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#currency" className="hover:text-primary">Лизкоины 💰</a></li>
                <li><a href="#crypto" className="hover:text-primary">Bitcoin ₿</a></li>
                <li><a href="#crypto" className="hover:text-primary">Ethereum Ξ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Соцсети</h4>
              <div className="flex gap-3">
                <Button size="icon" variant="outline" className="hover:bg-blue-100">
                  <Icon name="MessageCircle" size={18} />
                </Button>
                <Button size="icon" variant="outline" className="hover:bg-blue-100">
                  <Icon name="Instagram" size={18} />
                </Button>
                <Button size="icon" variant="outline" className="hover:bg-blue-100">
                  <Icon name="Twitter" size={18} />
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t border-blue-200 pt-8 text-center text-muted-foreground">
            <p>© 2024 Лизунск 💙 Все права защищены</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
