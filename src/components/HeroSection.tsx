import Icon from '@/components/ui/icon';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export default function HeroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section id="collection" className="pt-24 pb-16 px-4 md:px-8 min-h-screen flex items-center relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 bg-gradient-to-r from-orange-600/10 via-transparent to-red-600/10 pointer-events-none"></div>
      
      <div className="container mx-auto relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-7xl md:text-8xl font-black text-white mb-6 tracking-tight leading-none">
                SpaceAge
              </h1>
              <p className="text-gray-400 text-lg max-w-md leading-relaxed">
                The year is 3030, hyper-warp to mega speed and peer into a futuristic anti gravitational lookbook
              </p>
            </motion.div>

            <motion.div 
              className="flex items-center gap-4 pt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.8, delay: 0.3 }}
            >
              <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Icon key={star} name="Star" size={20} className="text-yellow-500 fill-yellow-500" />
                ))}
              </div>
              <span className="text-white text-lg font-medium">5/5</span>
            </motion.div>
          </div>

          <motion.div 
            className="relative"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
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
              <div className="absolute inset-0 bg-gradient-to-t from-[#1e1e2e] via-transparent to-transparent z-5"></div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}