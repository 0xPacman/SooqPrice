import React, { createContext, useContext, useState, useCallback } from 'react';

export type Language = 'en' | 'ar' | 'fr';
export type Direction = 'ltr' | 'rtl';

interface LanguageContextType {
  currentLanguage: Language;
  direction: Direction;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
  isLanguageSupported: (language: Language) => boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Basic translations - starting with English, others coming soon
const translations = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.markets': 'Markets',
    'nav.submit': 'Submit',
    'nav.activity': 'Activity',
    'nav.profile': 'Profile',
    'nav.settings': 'Settings',
    'nav.notifications': 'Notifications',
    'nav.rewards': 'Rewards',
    'nav.analytics': 'Analytics',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.edit': 'Edit',
    'common.delete': 'Delete',
    'common.back': 'Back',
    'common.next': 'Next',
    'common.previous': 'Previous',
    'common.continue': 'Continue',
    'common.submit': 'Submit',
    'common.search': 'Search',
    'common.filter': 'Filter',
    'common.sort': 'Sort',
    'common.comingSoon': 'Coming Soon',
    
    // App specific
    'app.name': 'SooqPrice',
    'app.tagline': 'Monitoring and comparing fresh-produce prices across Moroccan souks',
    'app.welcome': 'Welcome to SooqPrice',
    'app.description': 'Monitor and compare fresh produce prices across Moroccan souks. Join our community and help others find the best deals!',
    
    // Language settings
    'language.current': 'English',
    'language.name': 'Language',
    'language.en': 'English',
    'language.ar': 'Arabic (Coming Soon)',
    'language.fr': 'French (Coming Soon)',
    'language.changeNotice': 'Language changes will take effect after page refresh',
    
    // Price submission
    'price.submit': 'Submit Price',
    'price.product': 'Product',
    'price.price': 'Price',
    'price.quality': 'Quality',
    'price.review': 'Review',
    'price.notes': 'Notes',
    'price.market': 'Market',
    'price.unit': 'Unit',
    
    // Authentication
    'auth.login': 'Login',
    'auth.register': 'Register',
    'auth.logout': 'Logout',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.confirmPassword': 'Confirm Password',
    'auth.fullName': 'Full Name',
    'auth.username': 'Username',
    'auth.phone': 'Phone',
    'auth.city': 'City',
    
    // Profile
    'profile.myProfile': 'My Profile',
    'profile.submissions': 'My Submissions',
    'profile.badges': 'Badges & Achievements',
    'profile.settings': 'Settings',
    'profile.reputation': 'Reputation',
    'profile.accuracy': 'Accuracy Rate',
    'profile.totalSubmissions': 'Total Submissions',
    
    // Markets
    'markets.browse': 'Browse Markets',
    'markets.searchPlaceholder': 'Search markets by name...',
    'markets.filterByCity': 'Filter by City',
    'markets.allCities': 'All Cities',
    'markets.currentPrices': 'Current Prices',
    'markets.recentUpdates': 'Recent Updates',
    'markets.openingHours': 'Opening Hours',
    'markets.noData': 'No price data available',
    'markets.submitFirst': 'Be the first to submit price information for this market',
    
    // Coming soon features
    'comingSoon.activity.title': 'Activity Feed',
    'comingSoon.activity.description': 'Stay updated with real-time price submissions, market trends, and community activity.',
    'comingSoon.notifications.title': 'Notifications & Alerts',
    'comingSoon.notifications.description': 'Get instant notifications about price changes and market updates.',
    'comingSoon.rewards.title': 'Rewards & Leaderboard',
    'comingSoon.rewards.description': 'Earn points, climb the leaderboard, and get rewarded for contributions.',
    'comingSoon.analytics.title': 'Price Analytics & Charts',
    'comingSoon.analytics.description': 'Visualize price trends and get insights with interactive charts.',
    'comingSoon.settings.title': 'Settings & Preferences',
    'comingSoon.settings.description': 'Customize your experience with personalized settings and preferences.',
  },  ar: {
    // Placeholder for Arabic translations - Coming Soon
    'language.current': 'Arabic',
    'language.changeNotice': 'Language changes will take effect after page refresh',
    'common.comingSoon': 'Coming Soon',
  },
  fr: {
    // Placeholder for French translations - Coming Soon
    'language.current': 'French',
    'language.changeNotice': 'Language changes will take effect after page refresh',
    'common.comingSoon': 'Coming Soon',
  }
};

const getDirection = (language: Language): Direction => {
  return language === 'ar' ? 'rtl' : 'ltr';
};

const supportedLanguages: Language[] = ['en']; // Only English is fully supported for now

interface LanguageProviderProps {
  children: React.ReactNode;
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState<Language>(() => {
    // Try to get language from localStorage, default to English
    const savedLanguage = localStorage.getItem('sooqprice-language') as Language;
    return savedLanguage && supportedLanguages.includes(savedLanguage) ? savedLanguage : 'en';
  });

  const direction = getDirection(currentLanguage);

  const setLanguage = useCallback((language: Language) => {
    if (!supportedLanguages.includes(language)) {
      console.warn(`Language ${language} is not fully supported yet. Staying with current language.`);
      return;
    }
    
    setCurrentLanguage(language);
    localStorage.setItem('sooqprice-language', language);
    
    // Update document direction
    document.documentElement.dir = getDirection(language);
    document.documentElement.lang = language;
  }, []);
  const t = useCallback((key: string): string => {
    const languageTranslations = translations[currentLanguage] as any;
    const fallbackTranslations = translations.en as any;
    
    // Return translation if it exists, otherwise fallback to English, otherwise return the key
    return languageTranslations?.[key] || fallbackTranslations?.[key] || key;
  }, [currentLanguage]);

  const isLanguageSupported = useCallback((language: Language): boolean => {
    return supportedLanguages.includes(language);
  }, []);

  // Set initial document properties
  React.useEffect(() => {
    document.documentElement.dir = direction;
    document.documentElement.lang = currentLanguage;
  }, [currentLanguage, direction]);

  const value: LanguageContextType = {
    currentLanguage,
    direction,
    setLanguage,
    t,
    isLanguageSupported,
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext;
