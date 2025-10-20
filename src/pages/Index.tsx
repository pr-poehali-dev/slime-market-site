import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const Index = () => {
  const [activeSection, setActiveSection] = useState('home');

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Store" size={28} className="text-primary" />
            <h1 className="text-2xl font-bold text-primary">Лизунск</h1>
          </div>
          <nav className="hidden md:flex gap-6">
            <Button variant="ghost" onClick={() => scrollToSection('home')}>Главная</Button>
            <Button variant="ghost" onClick={() => scrollToSection('about')}>О рынке</Button>
            <Button variant="ghost" onClick={() => scrollToSection('shops')}>Магазины</Button>
            <Button variant="ghost" onClick={() => scrollToSection('services')}>Услуги</Button>
            <Button variant="ghost" onClick={() => scrollToSection('currency')}>Валюты</Button>
            <Button variant="ghost" onClick={() => scrollToSection('schedule')}>График</Button>
            <Button variant="ghost" onClick={() => scrollToSection('contacts')}>Контакты</Button>
          </nav>
          <Button onClick={() => scrollToSection('rent')}>Арендовать место</Button>
        </div>
      </header>

      <section id="home" className="relative h-[600px] flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: 'url(https://cdn.poehali.dev/projects/f2fbb998-deec-431a-9b43-1d5fd7e6814f/files/77ed14cc-9007-4180-845f-3e5e00111a4b.jpg)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/70" />
        </div>
        <div className="container relative z-10 text-center">
          <h2 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">Торговый рынок Лизунск</h2>
          <p className="text-xl md:text-2xl mb-8 text-muted-foreground max-w-2xl mx-auto">
            Современный торговый центр с удобной системой расчётов и широким выбором товаров
          </p>
          <div className="flex gap-4 justify-center">
            <Button size="lg" onClick={() => scrollToSection('shops')}>
              <Icon name="ShoppingBag" size={20} className="mr-2" />
              Посмотреть магазины
            </Button>
            <Button size="lg" variant="outline" onClick={() => scrollToSection('rent')}>
              Арендовать место
            </Button>
          </div>
        </div>
      </section>

      <section id="about" className="py-20 bg-muted/30">
        <div className="container">
          <h2 className="text-4xl font-bold text-center mb-12">О торговом рынке</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="hover-scale">
              <CardHeader>
                <Icon name="Users" size={40} className="text-primary mb-4" />
                <CardTitle>500+ продавцов</CardTitle>
                <CardDescription>Проверенные предприниматели и магазины</CardDescription>
              </CardHeader>
            </Card>
            <Card className="hover-scale">
              <CardHeader>
                <Icon name="MapPin" size={40} className="text-primary mb-4" />
                <CardTitle>Удобное расположение</CardTitle>
                <CardDescription>В центре города с хорошей транспортной доступностью</CardDescription>
              </CardHeader>
            </Card>
            <Card className="hover-scale">
              <CardHeader>
                <Icon name="Coins" size={40} className="text-primary mb-4" />
                <CardTitle>Система валют</CardTitle>
                <CardDescription>Уникальная программа лояльности с внутренней валютой</CardDescription>
              </CardHeader>
            </Card>
          </div>
          <div className="mt-12 flex justify-center">
            <img 
              src="https://cdn.poehali.dev/projects/f2fbb998-deec-431a-9b43-1d5fd7e6814f/files/eb1635e8-f0cb-4175-b7c0-2b3148c760b3.jpg"
              alt="Интерьер рынка"
              className="rounded-lg shadow-lg max-w-3xl w-full"
            />
          </div>
        </div>
      </section>

      <section id="shops" className="py-20">
        <div className="container">
          <h2 className="text-4xl font-bold text-center mb-12">Наши магазины</h2>
          <Tabs defaultValue="all" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-4 mb-8">
              <TabsTrigger value="all">Все</TabsTrigger>
              <TabsTrigger value="food">Еда</TabsTrigger>
              <TabsTrigger value="clothes">Одежда</TabsTrigger>
              <TabsTrigger value="tech">Техника</TabsTrigger>
            </TabsList>
            <TabsContent value="all" className="space-y-4">
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { name: 'Продукты "Свежесть"', category: 'Продукты', rating: 4.8, icon: 'Apple' },
                  { name: 'Одежда "Стиль"', category: 'Одежда', rating: 4.6, icon: 'Shirt' },
                  { name: 'Техномир', category: 'Электроника', rating: 4.9, icon: 'Laptop' },
                  { name: 'Обувной двор', category: 'Обувь', rating: 4.7, icon: 'Footprints' },
                  { name: 'Хозтовары', category: 'Дом', rating: 4.5, icon: 'Home' },
                  { name: 'Книжная лавка', category: 'Книги', rating: 4.8, icon: 'Book' },
                ].map((shop, idx) => (
                  <Card key={idx} className="hover-scale">
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                            <Icon name={shop.icon as any} size={24} className="text-primary" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{shop.name}</CardTitle>
                            <CardDescription>{shop.category}</CardDescription>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-1 mt-2">
                        <Icon name="Star" size={16} className="text-yellow-500 fill-yellow-500" />
                        <span className="font-semibold">{shop.rating}</span>
                      </div>
                    </CardHeader>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <section id="services" className="py-20 bg-muted/30">
        <div className="container">
          <h2 className="text-4xl font-bold text-center mb-12">Услуги и возможности</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: 'Parking', title: 'Парковка', desc: 'Бесплатная парковка для покупателей' },
              { icon: 'Wifi', title: 'Wi-Fi', desc: 'Бесплатный интернет во всём здании' },
              { icon: 'CreditCard', title: 'Оплата картой', desc: 'Принимаем все виды карт' },
              { icon: 'Package', title: 'Доставка', desc: 'Доставка товаров по городу' },
            ].map((service, idx) => (
              <Card key={idx} className="text-center hover-scale">
                <CardHeader>
                  <Icon name={service.icon as any} size={40} className="text-primary mx-auto mb-4" />
                  <CardTitle className="text-lg">{service.title}</CardTitle>
                  <CardDescription>{service.desc}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="currency" className="py-20">
        <div className="container">
          <h2 className="text-4xl font-bold text-center mb-4">Система валют</h2>
          <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
            Зарабатывайте внутреннюю валюту за покупки и получайте дополнительные бонусы
          </p>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Coins" className="text-primary" />
                  Лизкоины
                </CardTitle>
                <CardDescription>Основная внутренняя валюта</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Курс обмена</span>
                    <span className="font-bold">1₽ = 10 ЛК</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Кэшбэк</span>
                    <Badge>5%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Award" className="text-primary" />
                  Бонусы
                </CardTitle>
                <CardDescription>Дополнительные награды</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">За покупку</span>
                    <span className="font-bold">+10 ЛК</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">День рождения</span>
                    <Badge>+500 ЛК</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <Card className="max-w-4xl mx-auto">
            <CardHeader>
              <CardTitle>Как зарабатывать лизкоины?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <Icon name="ShoppingCart" size={28} className="text-primary" />
                  </div>
                  <h4 className="font-semibold mb-2">Покупайте</h4>
                  <p className="text-sm text-muted-foreground">5% от суммы покупки возвращается лизкоинами</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <Icon name="UserPlus" size={28} className="text-primary" />
                  </div>
                  <h4 className="font-semibold mb-2">Приглашайте</h4>
                  <p className="text-sm text-muted-foreground">200 ЛК за каждого приглашённого друга</p>
                </div>
                <div className="text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                    <Icon name="Star" size={28} className="text-primary" />
                  </div>
                  <h4 className="font-semibold mb-2">Оценивайте</h4>
                  <p className="text-sm text-muted-foreground">10 ЛК за каждый отзыв о магазине</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="schedule" className="py-20 bg-muted/30">
        <div className="container max-w-3xl">
          <h2 className="text-4xl font-bold text-center mb-12">График работы</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {[
                  { day: 'Понедельник - Пятница', time: '08:00 - 20:00', isToday: true },
                  { day: 'Суббота', time: '09:00 - 21:00', isToday: false },
                  { day: 'Воскресенье', time: '10:00 - 19:00', isToday: false },
                ].map((schedule, idx) => (
                  <div 
                    key={idx} 
                    className={`flex justify-between items-center p-4 rounded-lg ${
                      schedule.isToday ? 'bg-primary/10 border-2 border-primary' : 'bg-muted/50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon name="Clock" size={20} className="text-primary" />
                      <span className="font-semibold">{schedule.day}</span>
                    </div>
                    <span className="font-mono font-bold">{schedule.time}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6 p-4 bg-accent/20 rounded-lg flex items-start gap-3">
                <Icon name="Info" size={20} className="text-primary mt-1" />
                <p className="text-sm">
                  В праздничные дни график работы может меняться. Следите за объявлениями в новостях.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="rent" className="py-20">
        <div className="container max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-4">Аренда торгового места</h2>
          <p className="text-center text-muted-foreground mb-12">
            Станьте частью нашего торгового сообщества
          </p>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { title: 'Малое место', price: '15 000₽', area: 'до 10 м²' },
              { title: 'Среднее место', price: '30 000₽', area: '10-25 м²' },
              { title: 'Большое место', price: '50 000₽', area: '25+ м²' },
            ].map((plan, idx) => (
              <Card key={idx} className="text-center hover-scale">
                <CardHeader>
                  <CardTitle>{plan.title}</CardTitle>
                  <div className="text-3xl font-bold text-primary my-4">{plan.price}</div>
                  <CardDescription>в месяц</CardDescription>
                  <p className="text-sm text-muted-foreground mt-2">{plan.area}</p>
                </CardHeader>
              </Card>
            ))}
          </div>
          <Card>
            <CardHeader>
              <CardTitle>Оставьте заявку</CardTitle>
              <CardDescription>Мы свяжемся с вами в ближайшее время</CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input placeholder="Ваше имя" />
                  <Input type="tel" placeholder="Телефон" />
                </div>
                <Input type="email" placeholder="Email" />
                <Textarea placeholder="Расскажите о вашем бизнесе" rows={4} />
                <Button className="w-full">
                  <Icon name="Send" size={18} className="mr-2" />
                  Отправить заявку
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <section id="contacts" className="py-20 bg-muted/30">
        <div className="container max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-12">Контакты</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Свяжитесь с нами</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <Icon name="MapPin" size={20} className="text-primary" />
                  <div>
                    <p className="font-semibold">Адрес</p>
                    <p className="text-sm text-muted-foreground">г. Лизунск, ул. Торговая, 15</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="Phone" size={20} className="text-primary" />
                  <div>
                    <p className="font-semibold">Телефон</p>
                    <p className="text-sm text-muted-foreground">+7 (800) 123-45-67</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Icon name="Mail" size={20} className="text-primary" />
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="text-sm text-muted-foreground">info@lizunsk-market.ru</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Напишите нам</CardTitle>
              </CardHeader>
              <CardContent>
                <form className="space-y-4">
                  <Input placeholder="Ваше имя" />
                  <Input type="email" placeholder="Email" />
                  <Textarea placeholder="Сообщение" rows={3} />
                  <Button className="w-full">Отправить</Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="border-t py-12 bg-background">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Icon name="Store" size={24} className="text-primary" />
                <h3 className="font-bold text-lg">Лизунск</h3>
              </div>
              <p className="text-sm text-muted-foreground">
                Современный торговый центр с удобной системой расчётов
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Навигация</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><button onClick={() => scrollToSection('about')} className="hover:text-primary">О рынке</button></li>
                <li><button onClick={() => scrollToSection('shops')} className="hover:text-primary">Магазины</button></li>
                <li><button onClick={() => scrollToSection('services')} className="hover:text-primary">Услуги</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Информация</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li><button onClick={() => scrollToSection('currency')} className="hover:text-primary">Валюты</button></li>
                <li><button onClick={() => scrollToSection('schedule')} className="hover:text-primary">График</button></li>
                <li><button onClick={() => scrollToSection('rent')} className="hover:text-primary">Аренда</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Социальные сети</h4>
              <div className="flex gap-3">
                <Button size="icon" variant="outline">
                  <Icon name="Facebook" size={18} />
                </Button>
                <Button size="icon" variant="outline">
                  <Icon name="Instagram" size={18} />
                </Button>
                <Button size="icon" variant="outline">
                  <Icon name="Twitter" size={18} />
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t pt-8 text-center text-sm text-muted-foreground">
            <p>© 2024 Торговый рынок Лизунск. Все права защищены.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
