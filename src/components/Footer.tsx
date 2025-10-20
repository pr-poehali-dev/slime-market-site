import Icon from '@/components/ui/icon';

export default function Footer() {
  return (
    <footer className="border-t border-white/10 py-12 px-4 md:px-8 bg-[#1a1d2e]">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Slime Market 💙</h3>
            <p className="text-gray-400 text-sm">Твой универсальный онлайн-рынок с крипто-бонусами и лизкоинами!</p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Покупки</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">Категории</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Новинки</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Скидки</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Криптовалюта</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#crypto" className="hover:text-white transition-colors">Обмен</a></li>
              <li><a href="#crypto" className="hover:text-white transition-colors">Курсы</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Кошелёк</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-4">Поддержка</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Контакты</a></li>
              <li><a href="#" className="hover:text-white transition-colors">О нас</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-400 text-sm">© 2024 Slime Market. Все права защищены.</p>
          <div className="flex gap-4">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Icon name="Twitter" size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Icon name="Instagram" size={20} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Icon name="Facebook" size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
