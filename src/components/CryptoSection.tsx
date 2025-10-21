import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function CryptoSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="crypto" className="py-16 px-4 md:px-8 bg-gradient-to-b from-transparent via-orange-950/5 to-transparent relative" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-r from-orange-600/5 via-transparent to-red-600/5 pointer-events-none"></div>
      
      <div className="container mx-auto relative z-10">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-5xl font-bold text-white mb-4">
            Криптовалюты 💎
          </h2>
          <p className="text-gray-400 text-lg">Покупай, продавай и обменивай крипту</p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { name: 'Bitcoin', symbol: 'BTC', icon: '₿', price: '45,230', change: '+5.2%' },
            { name: 'Ethereum', symbol: 'ETH', icon: 'Ξ', price: '3,120', change: '+3.8%' },
            { name: 'Лизкоин', symbol: 'LZK', icon: '💙', price: '0.10', change: '+12.5%' },
            { name: 'Solana', symbol: 'SOL', icon: '◎', price: '98.5', change: '+7.1%' },
          ].map((crypto, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Card className="hover-scale bg-gradient-to-br from-orange-950/20 to-red-950/20 border-orange-500/20 hover:border-orange-500/40 transition-all backdrop-blur-sm h-full">
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
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
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
        </motion.div>
      </div>
    </section>
  );
}