import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      welcome: 'Welcome Driver',
      orders: 'Orders',
      earnings: 'Earnings',
      statistics: 'Statistics',
      settings: 'Settings',
      newOrders: 'New Orders',
      activeOrders: 'Active Orders',
      completedOrders: 'Completed Orders',
      accept: 'Accept',
      start: 'Start',
      complete: 'Complete',
      navigate: 'Navigate',
      totalEarnings: 'Total Earnings',
      todayEarnings: "Today's Earnings",
      online: 'Online',
      offline: 'Offline',
    },
  },
  uz: {
    translation: {
      welcome: 'Xush kelibsiz Haydovchi',
      orders: 'Buyurtmalar',
      earnings: 'Daromadlar',
      statistics: 'Statistika',
      settings: 'Sozlamalar',
      newOrders: 'Yangi buyurtmalar',
      activeOrders: 'Faol buyurtmalar',
      completedOrders: 'Bajarilgan buyurtmalar',
      accept: 'Qabul qilish',
      start: 'Boshlash',
      complete: 'Yakunlash',
      navigate: 'Navigatsiya',
      totalEarnings: 'Jami daromad',
      todayEarnings: 'Bugungi daromad',
      online: 'Onlayn',
      offline: 'Oflayn',
    },
  },
  ru: {
    translation: {
      welcome: 'Добро пожаловать Водитель',
      orders: 'Заказы',
      earnings: 'Заработок',
      statistics: 'Статистика',
      settings: 'Настройки',
      newOrders: 'Новые заказы',
      activeOrders: 'Активные заказы',
      completedOrders: 'Завершенные заказы',
      accept: 'Принять',
      start: 'Начать',
      complete: 'Завершить',
      navigate: 'Навигация',
      totalEarnings: 'Общий заработок',
      todayEarnings: 'Заработок за сегодня',
      online: 'Онлайн',
      offline: 'Оффлайн',
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'uz',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
