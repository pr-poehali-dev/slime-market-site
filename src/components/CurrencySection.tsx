import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

interface CurrencySectionProps {
  setShowAuthModal: (show: boolean) => void;
}

export default function CurrencySection({ setShowAuthModal }: CurrencySectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="currency" className="py-16 px-4 md:px-8" ref={ref}>
      <div className="container mx-auto">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl font-bold text-white mb-4">
            Лизкоины 💰
          </h2>
          <p className="text-gray-400 text-lg">Внутренняя валюта рынка с крутыми бонусами</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {[
            { icon: '🛒', title: 'Покупай', desc: '10% кэшбэк лизкоинами на каждую покупку', bonus: '+100 ЛК' },
            { icon: '💎', title: 'Майни крипту', desc: 'Конвертируй криптовалюту в лизкоины', bonus: '+500 ЛК' },
            { icon: '🎁', title: 'Получай бонусы', desc: 'Ежедневные задания и награды', bonus: '+50 ЛК' },
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: idx * 0.15 }}
            >
              <Card className="hover-scale bg-gradient-to-br from-[#2a2d3e]/80 to-[#1e2130]/80 border-white/5 hover:border-orange-500/30 transition-all text-center backdrop-blur-sm h-full">
                <CardHeader>
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-orange-600 to-red-600 flex items-center justify-center text-4xl">
                    {item.icon}
                  </div>
                  <CardTitle className="text-xl text-white">{item.title}</CardTitle>
                  <CardDescription className="text-gray-400 text-base">{item.desc}</CardDescription>
                  <div className="text-3xl font-bold text-orange-400 mt-4">{item.bonus}</div>
                </CardHeader>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
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
        </motion.div>
      </div>
    </section>
  );
}