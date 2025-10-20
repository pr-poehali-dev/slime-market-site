import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface CurrencySectionProps {
  setShowAuthModal: (show: boolean) => void;
}

export default function CurrencySection({ setShowAuthModal }: CurrencySectionProps) {
  return (
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
  );
}
