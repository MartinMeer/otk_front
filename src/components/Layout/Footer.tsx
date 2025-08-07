/**
 * Footer component with copyright and contact information
 */

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300 py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* About */}
          <div>
            <h3 className="text-white font-semibold mb-3">О проекте</h3>
            <p className="text-sm">
              Ассистент контролера ОТК - современный инструмент для расчетов 
              и измерений в области технического контроля качества.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-3">Быстрые ссылки</h3>
            <ul className="space-y-1 text-sm">
              <li><a href="#home" className="hover:text-blue-400 transition-colors">Главная</a></li>
              <li><a href="#ost22" className="hover:text-blue-400 transition-colors">ОСТ 22</a></li>
              <li><a href="#tolerances" className="hover:text-blue-400 transition-colors">Допуски и посадки</a></li>
              <li><a href="#thread" className="hover:text-blue-400 transition-colors">Метрическая резьба</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-3">Контакты</h3>
            <p className="text-sm">
              email@example.com<br />
              Обновлено: {new Date().toLocaleDateString('ru-RU')}
            </p>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-6 pt-6 text-center">
          <p className="text-sm">
            © {currentYear} Ассистент контролера ОТК. Все права защищены.
          </p>
        </div>
      </div>
    </footer>
  );
}