import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export default function GamesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  const games = [
    {
      title: 'Crypto Clicker',
      description: 'Кликай и зарабатывай криптовалюту',
      icon: 'MousePointerClick',
      color: 'from-purple-600 to-blue-600',
      reward: '+100 ЛК/клик'
    },
    {
      title: 'Mining Tycoon',
      description: 'Стань магнатом криптомайнинга',
      icon: 'Pickaxe',
      color: 'from-orange-600 to-red-600',
      reward: '+500 ЛК/мин'
    },
    {
      title: 'Market Trader',
      description: 'Торгуй валютами на бирже',
      icon: 'TrendingUp',
      color: 'from-green-600 to-emerald-600',
      reward: '×2 прибыль'
    },
    {
      title: 'Crypto Quiz',
      description: 'Проверь свои знания о крипте',
      icon: 'Brain',
      color: 'from-pink-600 to-purple-600',
      reward: '+1000 ЛК'
    }
  ];

  return (
    <section id="games" className="py-24 px-4 md:px-8 relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-purple-600/5 to-transparent pointer-events-none"></div>
      
      <div className="container mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-6xl md:text-7xl font-black text-white mb-6 tracking-tight">
            🎮 Игры
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Зарабатывай валюту играя в увлекательные мини-игры
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {games.map((game, index) => (
            <motion.div
              key={game.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="group relative"
            >
              <div className="relative bg-gradient-to-br from-white/5 to-white/[0.02] backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-white/20 transition-all duration-300 hover:scale-105">
                <div className={`w-16 h-16 rounded-xl bg-gradient-to-br ${game.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <Icon name={game.icon as any} size={32} className="text-white" />
                </div>

                <h3 className="text-2xl font-bold text-white mb-2">
                  {game.title}
                </h3>
                <p className="text-gray-400 mb-4 text-sm">
                  {game.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-sm text-green-400 font-medium">
                    {game.reward}
                  </span>
                  <Button 
                    size="sm" 
                    className={`bg-gradient-to-r ${game.color} hover:opacity-90 transition-opacity`}
                  >
                    Играть
                  </Button>
                </div>

                <div className={`absolute inset-0 bg-gradient-to-br ${game.color} opacity-0 group-hover:opacity-10 rounded-2xl transition-opacity duration-300 pointer-events-none`}></div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center mt-12"
        >
          <p className="text-gray-500 text-sm">
            💡 Совет: играй каждый день и получай бонусные награды
          </p>
        </motion.div>
      </div>
    </section>
  );
}
