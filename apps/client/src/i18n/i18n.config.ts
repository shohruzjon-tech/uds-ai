import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      welcome: 'Welcome to UDS GO',
      taxi: 'Taxi',
      delivery: 'Delivery',
      rides: 'Rides',
      wallet: 'Wallet',
      profile: 'Profile',
      bookRide: 'Book a Ride',
      orderDelivery: 'Order Delivery',
      pickupLocation: 'Pickup Location',
      dropoffLocation: 'Dropoff Location',
      confirm: 'Confirm',
      cancel: 'Cancel',
    },
  },
  uz: {
    translation: {
      welcome: 'UDS GO ga xush kelibsiz',
      taxi: 'Taksi',
      delivery: 'Yetkazib berish',
      rides: 'Sayohatlar',
      wallet: 'Hamyon',
      profile: 'Profil',
      bookRide: 'Taksi buyurtma qilish',
      orderDelivery: 'Yetkazib berish buyurtmasi',
      pickupLocation: 'Olib ketish joyi',
      dropoffLocation: 'Yetkazib berish joyi',
      confirm: 'Tasdiqlash',
      cancel: 'Bekor qilish',
    },
  },
  ru: {
    translation: {
      welcome: 'Добро пожаловать в UDS GO',
      taxi: 'Такси',
      delivery: 'Доставка',
      rides: 'Поездки',
      wallet: 'Кошелек',
      profile: 'Профиль',
      bookRide: 'Заказать такси',
      orderDelivery: 'Заказать доставку',
      pickupLocation: 'Место посадки',
      dropoffLocation: 'Место назначения',
      confirm: 'Подтвердить',
      cancel: 'Отменить',
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
