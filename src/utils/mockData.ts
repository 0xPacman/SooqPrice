import { City, Market, Product, User, PriceSubmission, Badge } from '@/types';

// Mock Cities - Comprehensive list of Moroccan cities with traditional souks
export const mockCities: City[] = [
  // Tanger-Tétouan-Al Hoceima Region
  {
    id: '1',
    name: 'Tangier',
    nameAr: 'طنجة',
    nameFr: 'Tanger',
    region: 'Tanger-Tétouan-Al Hoceima',
    coordinates: { lat: 35.7595, lng: -5.8340 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    name: 'Tétouan',
    nameAr: 'تطوان',
    nameFr: 'Tétouan',
    region: 'Tanger-Tétouan-Al Hoceima',
    coordinates: { lat: 35.5785, lng: -5.3684 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '3',
    name: 'Al Hoceima',
    nameAr: 'الحسيمة',
    nameFr: 'Al Hoceima',
    region: 'Tanger-Tétouan-Al Hoceima',
    coordinates: { lat: 35.2517, lng: -3.9317 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '4',
    name: 'Asilah',
    nameAr: 'أصيلة',
    nameFr: 'Asilah',
    region: 'Tanger-Tétouan-Al Hoceima',
    coordinates: { lat: 35.4650, lng: -6.0350 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '5',
    name: 'Chefchaouen',
    nameAr: 'شفشاون',
    nameFr: 'Chefchaouen',
    region: 'Tanger-Tétouan-Al Hoceima',
    coordinates: { lat: 35.1714, lng: -5.2636 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '6',
    name: 'Fnideq',
    nameAr: 'الفنيدق',
    nameFr: 'Fnideq',
    region: 'Tanger-Tétouan-Al Hoceima',
    coordinates: { lat: 35.8500, lng: -5.3580 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '7',
    name: 'Ksar El Kebir',
    nameAr: 'القصر الكبير',
    nameFr: 'Ksar El Kebir',
    region: 'Tanger-Tétouan-Al Hoceima',
    coordinates: { lat: 35.0018, lng: -5.9045 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '8',
    name: 'Larache',
    nameAr: 'العرائش',
    nameFr: 'Larache',
    region: 'Tanger-Tétouan-Al Hoceima',
    coordinates: { lat: 35.1932, lng: -6.1563 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '9',
    name: 'M\'diq',
    nameAr: 'مضيق',
    nameFr: 'M\'diq',
    region: 'Tanger-Tétouan-Al Hoceima',
    coordinates: { lat: 35.6850, lng: -5.3260 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '10',
    name: 'Martil',
    nameAr: 'مارتيل',
    nameFr: 'Martil',
    region: 'Tanger-Tétouan-Al Hoceima',
    coordinates: { lat: 35.6170, lng: -5.2750 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '11',
    name: 'Ouazzane',
    nameAr: 'وزان',
    nameFr: 'Ouazzane',
    region: 'Tanger-Tétouan-Al Hoceima',
    coordinates: { lat: 34.7973, lng: -5.5835 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '12',
    name: 'Taounate',
    nameAr: 'تاونات',
    nameFr: 'Taounate',
    region: 'Tanger-Tétouan-Al Hoceima',
    coordinates: { lat: 34.5317, lng: -4.6372 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },

  // L'Oriental Region
  {
    id: '13',
    name: 'Oujda',
    nameAr: 'وجدة',
    nameFr: 'Oujda',
    region: 'L\'Oriental',
    coordinates: { lat: 34.6814, lng: -1.9086 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '14',
    name: 'Nador',
    nameAr: 'الناظور',
    nameFr: 'Nador',
    region: 'L\'Oriental',
    coordinates: { lat: 35.1740, lng: -2.9287 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '15',
    name: 'Berkane',
    nameAr: 'بركان',
    nameFr: 'Berkane',
    region: 'L\'Oriental',
    coordinates: { lat: 34.9218, lng: -2.3184 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '16',
    name: 'Taourirt',
    nameAr: 'تاوريرت',
    nameFr: 'Taourirt',
    region: 'L\'Oriental',
    coordinates: { lat: 34.4096, lng: -2.8934 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '17',
    name: 'Guercif',
    nameAr: 'كرسيف',
    nameFr: 'Guercif',
    region: 'L\'Oriental',
    coordinates: { lat: 34.2268, lng: -3.3512 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '18',
    name: 'Beni Ansar',
    nameAr: 'بني انصار',
    nameFr: 'Beni Ansar',
    region: 'L\'Oriental',
    coordinates: { lat: 35.1689, lng: -2.9280 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '19',
    name: 'Ahfir',
    nameAr: 'أحفير',
    nameFr: 'Ahfir',
    region: 'L\'Oriental',
    coordinates: { lat: 34.9420, lng: -2.1830 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '20',
    name: 'Driouch',
    nameAr: 'الدريوش',
    nameFr: 'Driouch',
    region: 'L\'Oriental',
    coordinates: { lat: 35.1374, lng: -3.3891 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '21',
    name: 'Selouane',
    nameAr: 'سلوان',
    nameFr: 'Selouane',
    region: 'L\'Oriental',
    coordinates: { lat: 35.0847, lng: -2.9438 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '22',
    name: 'Zaio',
    nameAr: 'زايو',
    nameFr: 'Zaio',
    region: 'L\'Oriental',
    coordinates: { lat: 35.0161, lng: -2.7394 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '23',
    name: 'Saidia',
    nameAr: 'السعيدية',
    nameFr: 'Saidia',
    region: 'L\'Oriental',
    coordinates: { lat: 35.0939, lng: -2.2278 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },

  // Fès-Meknès Region
  {
    id: '24',
    name: 'Fez',
    nameAr: 'فاس',
    nameFr: 'Fès',
    region: 'Fès-Meknès',
    coordinates: { lat: 34.0181, lng: -5.0078 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '25',
    name: 'Meknès',
    nameAr: 'مكناس',
    nameFr: 'Meknès',
    region: 'Fès-Meknès',
    coordinates: { lat: 33.8935, lng: -5.5473 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '26',
    name: 'Sefrou',
    nameAr: 'صفرو',
    nameFr: 'Sefrou',
    region: 'Fès-Meknès',
    coordinates: { lat: 33.8307, lng: -4.8372 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '27',
    name: 'Taza',
    nameAr: 'تازة',
    nameFr: 'Taza',
    region: 'Fès-Meknès',
    coordinates: { lat: 34.2133, lng: -4.0103 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '28',
    name: 'Ifrane',
    nameAr: 'إفران',
    nameFr: 'Ifrane',
    region: 'Fès-Meknès',
    coordinates: { lat: 33.5228, lng: -5.1100 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '29',
    name: 'Azrou',
    nameAr: 'أزرو',
    nameFr: 'Azrou',
    region: 'Fès-Meknès',
    coordinates: { lat: 33.4347, lng: -5.2214 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '30',
    name: 'Moulay Yacoub',
    nameAr: 'مولاي يعقوب',
    nameFr: 'Moulay Yacoub',
    region: 'Fès-Meknès',
    coordinates: { lat: 34.0847, lng: -5.1761 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '31',
    name: 'Tifelt',
    nameAr: 'تيفلت',
    nameFr: 'Tifelt',
    region: 'Fès-Meknès',
    coordinates: { lat: 33.8986, lng: -6.3164 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },

  // Rabat-Salé-Kénitra Region
  {
    id: '32',
    name: 'Rabat',
    nameAr: 'الرباط',
    nameFr: 'Rabat',
    region: 'Rabat-Salé-Kénitra',
    coordinates: { lat: 34.0209, lng: -6.8416 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '33',
    name: 'Salé',
    nameAr: 'سلا',
    nameFr: 'Salé',
    region: 'Rabat-Salé-Kénitra',
    coordinates: { lat: 34.0531, lng: -6.7985 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '34',
    name: 'Kénitra',
    nameAr: 'القنيطرة',
    nameFr: 'Kénitra',
    region: 'Rabat-Salé-Kénitra',
    coordinates: { lat: 34.2610, lng: -6.5802 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '35',
    name: 'Temara',
    nameAr: 'تمارة',
    nameFr: 'Temara',
    region: 'Rabat-Salé-Kénitra',
    coordinates: { lat: 33.9287, lng: -6.9067 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '36',
    name: 'Skhirat',
    nameAr: 'الصخيرات',
    nameFr: 'Skhirat',
    region: 'Rabat-Salé-Kénitra',
    coordinates: { lat: 33.8539, lng: -7.0364 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '37',
    name: 'Khemisset',
    nameAr: 'الخميسات',
    nameFr: 'Khemisset',
    region: 'Rabat-Salé-Kénitra',
    coordinates: { lat: 33.8244, lng: -6.0669 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '38',
    name: 'Sidi Kacem',
    nameAr: 'سيدي قاسم',
    nameFr: 'Sidi Kacem',
    region: 'Rabat-Salé-Kénitra',
    coordinates: { lat: 34.2214, lng: -5.7081 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '39',
    name: 'Sidi Slimane',
    nameAr: 'سيدي سليمان',
    nameFr: 'Sidi Slimane',
    region: 'Rabat-Salé-Kénitra',
    coordinates: { lat: 34.2656, lng: -5.9267 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },

  // Beni Mellal-Khénifra Region
  {
    id: '40',
    name: 'Beni Mellal',
    nameAr: 'بني ملال',
    nameFr: 'Beni Mellal',
    region: 'Beni Mellal-Khénifra',
    coordinates: { lat: 32.3372, lng: -6.3498 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '41',
    name: 'Khenifra',
    nameAr: 'خنيفرة',
    nameFr: 'Khenifra',
    region: 'Beni Mellal-Khénifra',
    coordinates: { lat: 32.9356, lng: -5.6681 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '42',
    name: 'Azilal',
    nameAr: 'أزيلال',
    nameFr: 'Azilal',
    region: 'Beni Mellal-Khénifra',
    coordinates: { lat: 31.9647, lng: -6.5711 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '43',
    name: 'Fquih Ben Salah',
    nameAr: 'الفقيه بن صالح',
    nameFr: 'Fquih Ben Salah',
    region: 'Beni Mellal-Khénifra',
    coordinates: { lat: 32.5019, lng: -6.6889 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '44',
    name: 'Kasba Tadla',
    nameAr: 'قصبة تادلة',
    nameFr: 'Kasba Tadla',
    region: 'Beni Mellal-Khénifra',
    coordinates: { lat: 32.5936, lng: -6.2661 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '45',
    name: 'Midelt',
    nameAr: 'ميدلت',
    nameFr: 'Midelt',
    region: 'Beni Mellal-Khénifra',
    coordinates: { lat: 32.6792, lng: -4.7339 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },

  // Casablanca-Settat Region
  {
    id: '46',
    name: 'Casablanca',
    nameAr: 'الدار البيضاء',
    nameFr: 'Casablanca',
    region: 'Casablanca-Settat',
    coordinates: { lat: 33.5731, lng: -7.5898 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '47',
    name: 'Mohammedia',
    nameAr: 'المحمدية',
    nameFr: 'Mohammedia',
    region: 'Casablanca-Settat',
    coordinates: { lat: 33.6866, lng: -7.3833 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '48',
    name: 'El Jadida',
    nameAr: 'الجديدة',
    nameFr: 'El Jadida',
    region: 'Casablanca-Settat',
    coordinates: { lat: 33.2316, lng: -8.5007 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '49',
    name: 'Settat',
    nameAr: 'سطات',
    nameFr: 'Settat',
    region: 'Casablanca-Settat',
    coordinates: { lat: 33.0014, lng: -7.6164 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '50',
    name: 'Berrechid',
    nameAr: 'برشيد',
    nameFr: 'Berrechid',
    region: 'Casablanca-Settat',
    coordinates: { lat: 33.2650, lng: -7.5839 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '51',
    name: 'Benslimane',
    nameAr: 'بن سليمان',
    nameFr: 'Benslimane',
    region: 'Casablanca-Settat',
    coordinates: { lat: 33.6144, lng: -7.1250 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '52',
    name: 'Khouribga',
    nameAr: 'خريبكة',
    nameFr: 'Khouribga',
    region: 'Casablanca-Settat',
    coordinates: { lat: 32.8811, lng: -6.9063 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '53',
    name: 'Oued Zem',
    nameAr: 'وادي زم',
    nameFr: 'Oued Zem',
    region: 'Casablanca-Settat',
    coordinates: { lat: 32.8656, lng: -6.5728 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '54',
    name: 'Azemmour',
    nameAr: 'أزمور',
    nameFr: 'Azemmour',
    region: 'Casablanca-Settat',
    coordinates: { lat: 33.2847, lng: -8.3411 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '55',
    name: 'Sidi Bennour',
    nameAr: 'سيدي بنور',
    nameFr: 'Sidi Bennour',
    region: 'Casablanca-Settat',
    coordinates: { lat: 32.6550, lng: -8.4281 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '56',
    name: 'Youssoufia',
    nameAr: 'اليوسفية',
    nameFr: 'Youssoufia',
    region: 'Casablanca-Settat',
    coordinates: { lat: 32.2458, lng: -8.5297 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '57',
    name: 'Ben Guerir',
    nameAr: 'بن جرير',
    nameFr: 'Ben Guerir',
    region: 'Casablanca-Settat',
    coordinates: { lat: 32.2364, lng: -7.9511 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },

  // Marrakech-Safi Region
  {
    id: '58',
    name: 'Marrakech',
    nameAr: 'مراكش',
    nameFr: 'Marrakech',
    region: 'Marrakech-Safi',
    coordinates: { lat: 31.6295, lng: -7.9811 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '59',
    name: 'Safi',
    nameAr: 'آسفي',
    nameFr: 'Safi',
    region: 'Marrakech-Safi',
    coordinates: { lat: 32.2994, lng: -9.2372 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '60',
    name: 'Essaouira',
    nameAr: 'الصويرة',
    nameFr: 'Essaouira',
    region: 'Marrakech-Safi',
    coordinates: { lat: 31.5085, lng: -9.7595 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '61',
    name: 'El Kelaa Des Sraghna',
    nameAr: 'قلعة السراغنة',
    nameFr: 'El Kelaa Des Sraghna',
    region: 'Marrakech-Safi',
    coordinates: { lat: 32.0556, lng: -7.4056 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '62',
    name: 'Amizmiz',
    nameAr: 'أميزميز',
    nameFr: 'Amizmiz',
    region: 'Marrakech-Safi',
    coordinates: { lat: 31.2097, lng: -8.2392 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '63',
    name: 'Asni',
    nameAr: 'أسني',
    nameFr: 'Asni',
    region: 'Marrakech-Safi',
    coordinates: { lat: 31.2386, lng: -7.9739 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '64',
    name: 'Imlil',
    nameAr: 'إمليل',
    nameFr: 'Imlil',
    region: 'Marrakech-Safi',
    coordinates: { lat: 31.1356, lng: -7.9250 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '65',
    name: 'Ourika',
    nameAr: 'أوريكة',
    nameFr: 'Ourika',
    region: 'Marrakech-Safi',
    coordinates: { lat: 31.3986, lng: -7.8689 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '66',
    name: 'Tahanaout',
    nameAr: 'تحناوت',
    nameFr: 'Tahanaout',
    region: 'Marrakech-Safi',
    coordinates: { lat: 31.4842, lng: -8.0286 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },

  // Drâa-Tafilalet Region
  {
    id: '67',
    name: 'Ouarzazate',
    nameAr: 'ورزازات',
    nameFr: 'Ouarzazate',
    region: 'Drâa-Tafilalet',
    coordinates: { lat: 30.9335, lng: -6.9370 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '68',
    name: 'Errachidia',
    nameAr: 'الراشيدية',
    nameFr: 'Errachidia',
    region: 'Drâa-Tafilalet',
    coordinates: { lat: 31.9314, lng: -4.4239 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '69',
    name: 'Zagora',
    nameAr: 'زاكورة',
    nameFr: 'Zagora',
    region: 'Drâa-Tafilalet',
    coordinates: { lat: 30.3314, lng: -5.8372 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '70',
    name: 'Tinghir',
    nameAr: 'تنغير',
    nameFr: 'Tinghir',
    region: 'Drâa-Tafilalet',
    coordinates: { lat: 31.5147, lng: -5.5347 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '71',
    name: 'Rissani',
    nameAr: 'الريصاني',
    nameFr: 'Rissani',
    region: 'Drâa-Tafilalet',
    coordinates: { lat: 31.2867, lng: -4.2539 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '72',
    name: 'Erfoud',
    nameAr: 'أرفود',
    nameFr: 'Erfoud',
    region: 'Drâa-Tafilalet',
    coordinates: { lat: 31.4347, lng: -4.2381 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '73',
    name: 'Merzouga',
    nameAr: 'مرزوقة',
    nameFr: 'Merzouga',
    region: 'Drâa-Tafilalet',
    coordinates: { lat: 31.0939, lng: -4.0147 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '74',
    name: 'Boumalne Dades',
    nameAr: 'بومالن دادس',
    nameFr: 'Boumalne Dades',
    region: 'Drâa-Tafilalet',
    coordinates: { lat: 31.2831, lng: -5.9700 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '75',
    name: 'Skoura',
    nameAr: 'سكورة',
    nameFr: 'Skoura',
    region: 'Drâa-Tafilalet',
    coordinates: { lat: 31.0581, lng: -6.5614 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '76',
    name: 'Kelaat M\'Gouna',
    nameAr: 'قلعة مڭونة',
    nameFr: 'Kelaat M\'Gouna',
    region: 'Drâa-Tafilalet',
    coordinates: { lat: 31.2481, lng: -6.1889 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '77',
    name: 'Goulmima',
    nameAr: 'كلميمة',
    nameFr: 'Goulmima',
    region: 'Drâa-Tafilalet',
    coordinates: { lat: 31.6486, lng: -4.6872 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },

  // Souss-Massa Region
  {
    id: '78',
    name: 'Agadir',
    nameAr: 'أڭادير',
    nameFr: 'Agadir',
    region: 'Souss-Massa',
    coordinates: { lat: 30.4278, lng: -9.5981 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '79',
    name: 'Inezgane',
    nameAr: 'إنزكان',
    nameFr: 'Inezgane',
    region: 'Souss-Massa',
    coordinates: { lat: 30.3556, lng: -9.5369 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '80',
    name: 'Ait Melloul',
    nameAr: 'أيت ملول',
    nameFr: 'Ait Melloul',
    region: 'Souss-Massa',
    coordinates: { lat: 30.3386, lng: -9.4997 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '81',
    name: 'Taroudant',
    nameAr: 'تارودانت',
    nameFr: 'Taroudant',
    region: 'Souss-Massa',
    coordinates: { lat: 30.4731, lng: -8.8778 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '82',
    name: 'Tiznit',
    nameAr: 'تزنيت',
    nameFr: 'Tiznit',
    region: 'Souss-Massa',
    coordinates: { lat: 29.6978, lng: -9.7328 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '83',
    name: 'Tafraout',
    nameAr: 'تافراوت',
    nameFr: 'Tafraout',
    region: 'Souss-Massa',
    coordinates: { lat: 29.7267, lng: -8.9739 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '84',
    name: 'Sidi Ifni',
    nameAr: 'سيدي إفني',
    nameFr: 'Sidi Ifni',
    region: 'Souss-Massa',
    coordinates: { lat: 29.3797, lng: -10.1731 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '85',
    name: 'Mirleft',
    nameAr: 'ميرلفت',
    nameFr: 'Mirleft',
    region: 'Souss-Massa',
    coordinates: { lat: 29.5831, lng: -10.0339 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '86',
    name: 'Oulad Teima',
    nameAr: 'أولاد تايمة',
    nameFr: 'Oulad Teima',
    region: 'Souss-Massa',
    coordinates: { lat: 30.3947, lng: -9.2156 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '87',
    name: 'Aourir',
    nameAr: 'أوريڭ',
    nameFr: 'Aourir',
    region: 'Souss-Massa',
    coordinates: { lat: 30.5231, lng: -9.6253 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '88',
    name: 'Tamraght',
    nameAr: 'تمراغت',
    nameFr: 'Tamraght',
    region: 'Souss-Massa',
    coordinates: { lat: 30.5439, lng: -9.6722 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },

  // Guelmim-Oued Noun Region
  {
    id: '89',
    name: 'Guelmim',
    nameAr: 'كلميم',
    nameFr: 'Guelmim',
    region: 'Guelmim-Oued Noun',
    coordinates: { lat: 28.9870, lng: -10.0574 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '90',
    name: 'Tan-Tan',
    nameAr: 'طانطان',
    nameFr: 'Tan-Tan',
    region: 'Guelmim-Oued Noun',
    coordinates: { lat: 28.4378, lng: -11.1031 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '91',
    name: 'Sidi Ouarzeg',
    nameAr: 'سيدي ورزگ',
    nameFr: 'Sidi Ouarzeg',
    region: 'Guelmim-Oued Noun',
    coordinates: { lat: 28.8550, lng: -10.2750 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },

  // Laâyoune-Sakia El Hamra Region
  {
    id: '92',
    name: 'Laâyoune',
    nameAr: 'العيون',
    nameFr: 'Laâyoune',
    region: 'Laâyoune-Sakia El Hamra',
    coordinates: { lat: 27.1536, lng: -13.1994 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },

  // Dakhla-Oued Ed-Dahab Region
  {
    id: '93',
    name: 'Dakhla',
    nameAr: 'الداخلة',
    nameFr: 'Dakhla',
    region: 'Dakhla-Oued Ed-Dahab',
    coordinates: { lat: 23.7181, lng: -15.9581 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },

  // Additional Comprehensive Cities with Traditional Souks
  {
    id: '93',
    name: 'Temsia',
    nameAr: 'Temsia',
    nameFr: 'Temsia',
    region: 'Souss-Massa',
    coordinates: { lat: 30.4000, lng: -9.5800 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '94',
    name: 'Biougra',
    nameAr: 'Biougra',
    nameFr: 'Biougra',
    region: 'Souss-Massa',
    coordinates: { lat: 30.2348, lng: -9.3569 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '95',
    name: 'Ait Amira',
    nameAr: 'Ait Amira',
    nameFr: 'Ait Amira',
    region: 'Souss-Massa',
    coordinates: { lat: 30.2000, lng: -9.3000 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '96',
    name: 'Sidi Bibi',
    nameAr: 'Sidi Bibi',
    nameFr: 'Sidi Bibi',
    region: 'Souss-Massa',
    coordinates: { lat: 30.6020, lng: -9.1720 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '97',
    name: 'Ouad Essafa',
    nameAr: 'Ouad Essafa',
    nameFr: 'Ouad Essafa',
    region: 'Souss-Massa',
    coordinates: { lat: 30.5500, lng: -9.2000 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '98',
    name: 'Taroudannt',
    nameAr: 'Taroudannt',
    nameFr: 'Taroudannt',
    region: 'Souss-Massa',
    coordinates: { lat: 30.4702, lng: -8.8777 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '99',
    name: 'Oulad Teima',
    nameAr: 'Oulad Teima',
    nameFr: 'Oulad Teima',
    region: 'Souss-Massa',
    coordinates: { lat: 30.3900, lng: -9.2100 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '100',
    name: 'Tiznit',
    nameAr: 'Tiznit',
    nameFr: 'Tiznit',
    region: 'Souss-Massa',
    coordinates: { lat: 29.6980, lng: -9.7320 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },

  // Guelmim-Oued Noun
  {
    id: '101',
    name: 'Guelmim',
    nameAr: 'Guelmim',
    nameFr: 'Guelmim',
    region: 'Guelmim-Oued Noun',
    coordinates: { lat: 28.9870, lng: -10.0575 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '102',
    name: 'Tan-Tan',
    nameAr: 'Tan-Tan',
    nameFr: 'Tan-Tan',
    region: 'Guelmim-Oued Noun',
    coordinates: { lat: 28.4378, lng: -11.1031 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },

  // Laâyoune-Sakia El Hamra
  {
    id: '103',
    name: 'Laâyoune',
    nameAr: 'Laâyoune',
    nameFr: 'Laâyoune',
    region: 'Laâyoune-Sakia El Hamra',
    coordinates: { lat: 27.1536, lng: -13.2033 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },

  // Dakhla-Oued Ed-Dahab
  {
    id: '104',
    name: 'Dakhla',
    nameAr: 'Dakhla',
    nameFr: 'Dakhla',
    region: 'Dakhla-Oued Ed-Dahab',
    coordinates: { lat: 23.7185, lng: -15.9582 },
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
];

// Mock Markets - Representative markets and souks across Moroccan cities
export const mockMarkets: Market[] = [
  // Tangier Markets
  {
    id: '1',
    cityId: '1',
    name: 'Grand Socco Market',
    nameAr: 'Grand Socco Market',
    nameFr: 'Grand Socco Market',
    address: 'Place du Grand Socco, Tangier',
    coordinates: { lat: 35.7595, lng: -5.8340 },
    openingHours: {
      monday: { open: '07:00', close: '19:00' },
      tuesday: { open: '07:00', close: '19:00' },
      wednesday: { open: '07:00', close: '19:00' },
      thursday: { open: '07:00', close: '19:00' },
      friday: { open: '07:00', close: '19:00' },
      saturday: { open: '07:00', close: '19:00' },
      sunday: { open: '08:00', close: '17:00' },
    },
    marketType: 'traditional',
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    cityId: '1',
    name: 'Souk Barra Tangier',
    nameAr: 'Souk Barra Tangier',
    nameFr: 'Souk Barra Tangier',
    address: 'Rue de Fes, Tangier',
    coordinates: { lat: 35.7555, lng: -5.8350 },
    openingHours: {
      monday: { open: '06:30', close: '18:30' },
      tuesday: { open: '06:30', close: '18:30' },
      wednesday: { open: '06:30', close: '18:30' },
      thursday: { open: '06:30', close: '18:30' },
      friday: { open: '06:30', close: '18:30' },
      saturday: { open: '06:30', close: '18:30' },
      sunday: { open: '08:00', close: '16:00' },
    },
    marketType: 'traditional',
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },

  // Oujda Markets
  {
    id: '3',
    cityId: '11',
    name: 'Souk El Had Oujda',
    nameAr: 'Souk El Had Oujda',
    nameFr: 'Souk El Had Oujda',
    address: 'Boulevard Hassan II, Oujda',
    coordinates: { lat: 34.6814, lng: -1.9086 },
    openingHours: {
      monday: { open: '07:00', close: '18:00' },
      tuesday: { open: '07:00', close: '18:00' },
      wednesday: { open: '07:00', close: '18:00' },
      thursday: { open: '07:00', close: '18:00' },
      friday: { open: '07:00', close: '18:00' },
      saturday: { open: '07:00', close: '18:00' },
      sunday: { open: '07:00', close: '18:00' },
    },
    marketType: 'traditional',
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },

  // Fez Markets
  {
    id: '4',
    cityId: '17',
    name: 'Souk El Attarine Fez',
    nameAr: 'Souk El Attarine Fez',
    nameFr: 'Souk El Attarine Fez',
    address: 'Medina, Fez',
    coordinates: { lat: 34.0181, lng: -5.0078 },
    openingHours: {
      monday: { open: '08:00', close: '19:00' },
      tuesday: { open: '08:00', close: '19:00' },
      wednesday: { open: '08:00', close: '19:00' },
      thursday: { open: '08:00', close: '19:00' },
      friday: { open: '08:00', close: '19:00' },
      saturday: { open: '08:00', close: '19:00' },
      sunday: { open: '09:00', close: '17:00' },
    },
    marketType: 'traditional',
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '5',
    cityId: '17',
    name: 'Marché Central Fez',
    nameAr: 'Marché Central Fez',
    nameFr: 'Marché Central Fez',
    address: 'Avenue Hassan II, Fez',
    coordinates: { lat: 34.0201, lng: -5.0058 },
    openingHours: {
      monday: { open: '06:00', close: '18:00' },
      tuesday: { open: '06:00', close: '18:00' },
      wednesday: { open: '06:00', close: '18:00' },
      thursday: { open: '06:00', close: '18:00' },
      friday: { open: '06:00', close: '18:00' },
      saturday: { open: '06:00', close: '18:00' },
      sunday: { open: '08:00', close: '16:00' },
    },
    marketType: 'modern',
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },

  // Rabat Markets
  {
    id: '6',
    cityId: '26',
    name: 'Rabat Central Market',
    nameAr: 'Rabat Central Market',
    nameFr: 'Rabat Central Market',
    address: 'Avenue Mohammed V, Rabat',
    coordinates: { lat: 34.0209, lng: -6.8416 },
    openingHours: {
      monday: { open: '06:30', close: '18:30' },
      tuesday: { open: '06:30', close: '18:30' },
      wednesday: { open: '06:30', close: '18:30' },
      thursday: { open: '06:30', close: '18:30' },
      friday: { open: '06:30', close: '18:30' },
      saturday: { open: '06:30', close: '18:30' },
      sunday: { open: '08:00', close: '16:00' },
    },
    marketType: 'modern',
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '7',
    cityId: '26',
    name: 'Souk Es Sebt Rabat',
    nameAr: 'Souk Es Sebt Rabat',
    nameFr: 'Souk Es Sebt Rabat',
    address: 'Hay Riad, Rabat',
    coordinates: { lat: 34.0189, lng: -6.8436 },
    openingHours: {
      monday: { open: '07:00', close: '19:00' },
      tuesday: { open: '07:00', close: '19:00' },
      wednesday: { open: '07:00', close: '19:00' },
      thursday: { open: '07:00', close: '19:00' },
      friday: { open: '07:00', close: '19:00' },
      saturday: { open: '07:00', close: '19:00' },
      sunday: { open: '08:00', close: '17:00' },
    },
    marketType: 'traditional',
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },

  // Casablanca Markets
  {
    id: '8',
    cityId: '50',
    name: 'Central Market Casablanca',
    nameAr: 'Central Market Casablanca',
    nameFr: 'Central Market Casablanca',
    address: 'Boulevard Mohammed V, Casablanca',
    coordinates: { lat: 33.5731, lng: -7.5898 },
    openingHours: {
      monday: { open: '06:00', close: '18:00' },
      tuesday: { open: '06:00', close: '18:00' },
      wednesday: { open: '06:00', close: '18:00' },
      thursday: { open: '06:00', close: '18:00' },
      friday: { open: '06:00', close: '18:00' },
      saturday: { open: '06:00', close: '18:00' },
      sunday: { open: '08:00', close: '16:00' },
    },
    marketType: 'traditional',
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '9',
    cityId: '50',
    name: 'Derb Ghallef Market',
    nameAr: 'Derb Ghallef Market',
    nameFr: 'Derb Ghallef Market',
    address: 'Derb Ghallef, Casablanca',
    coordinates: { lat: 33.5650, lng: -7.6114 },
    openingHours: {
      monday: { open: '07:00', close: '19:00' },
      tuesday: { open: '07:00', close: '19:00' },
      wednesday: { open: '07:00', close: '19:00' },
      thursday: { open: '07:00', close: '19:00' },
      friday: { open: '07:00', close: '19:00' },
      saturday: { open: '07:00', close: '19:00' },
      sunday: { open: '08:00', close: '17:00' },
    },
    marketType: 'traditional',
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '10',
    cityId: '50',
    name: 'Hay Mohammadi Market',
    nameAr: 'Hay Mohammadi Market',
    nameFr: 'Hay Mohammadi Market',
    address: 'Hay Mohammadi, Casablanca',
    coordinates: { lat: 33.5500, lng: -7.6200 },
    openingHours: {
      monday: { open: '06:30', close: '18:30' },
      tuesday: { open: '06:30', close: '18:30' },
      wednesday: { open: '06:30', close: '18:30' },
      thursday: { open: '06:30', close: '18:30' },
      friday: { open: '06:30', close: '18:30' },
      saturday: { open: '06:30', close: '18:30' },
      sunday: { open: '08:00', close: '16:00' },
    },
    marketType: 'modern',
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },

  // Marrakech Markets
  {
    id: '11',
    cityId: '72',
    name: 'Jemaa el-Fnaa Market',
    nameAr: 'Jemaa el-Fnaa Market',
    nameFr: 'Jemaa el-Fnaa Market',
    address: 'Jemaa el-Fnaa, Marrakech',
    coordinates: { lat: 31.6295, lng: -7.9811 },
    openingHours: {
      monday: { open: '07:00', close: '20:00' },
      tuesday: { open: '07:00', close: '20:00' },
      wednesday: { open: '07:00', close: '20:00' },
      thursday: { open: '07:00', close: '20:00' },
      friday: { open: '07:00', close: '20:00' },
      saturday: { open: '07:00', close: '20:00' },
      sunday: { open: '07:00', close: '20:00' },
    },
    marketType: 'traditional',
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '12',
    cityId: '72',
    name: 'Souk El Khemis Marrakech',
    nameAr: 'Souk El Khemis Marrakech',
    nameFr: 'Souk El Khemis Marrakech',
    address: 'Gueliz, Marrakech',
    coordinates: { lat: 31.6315, lng: -7.9831 },
    openingHours: {
      monday: { open: '06:00', close: '18:00' },
      tuesday: { open: '06:00', close: '18:00' },
      wednesday: { open: '06:00', close: '18:00' },
      thursday: { open: '06:00', close: '18:00' },
      friday: { open: '06:00', close: '18:00' },
      saturday: { open: '06:00', close: '18:00' },
      sunday: { open: '08:00', close: '16:00' },
    },
    marketType: 'traditional',
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },

  // Agadir Markets
  {
    id: '13',
    cityId: '87',
    name: 'Souk El Had Agadir',
    nameAr: 'Souk El Had Agadir',
    nameFr: 'Souk El Had Agadir',
    address: 'Boulevard Hassan II, Agadir',
    coordinates: { lat: 30.4278, lng: -9.5981 },
    openingHours: {
      monday: { open: '08:00', close: '18:00' },
      tuesday: { open: '08:00', close: '18:00' },
      wednesday: { open: '08:00', close: '18:00' },
      thursday: { open: '08:00', close: '18:00' },
      friday: { open: '08:00', close: '18:00' },
      saturday: { open: '08:00', close: '18:00' },
      sunday: { open: '08:00', close: '18:00' },
    },
    marketType: 'modern',
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },

  // Essaouira Markets
  {
    id: '14',
    cityId: '79',
    name: 'Souk Jdid Essaouira',
    nameAr: 'Souk Jdid Essaouira',
    nameFr: 'Souk Jdid Essaouira',
    address: 'Medina, Essaouira',
    coordinates: { lat: 31.5085, lng: -9.7595 },
    openingHours: {
      monday: { open: '07:00', close: '19:00' },
      tuesday: { open: '07:00', close: '19:00' },
      wednesday: { open: '07:00', close: '19:00' },
      thursday: { open: '07:00', close: '19:00' },
      friday: { open: '07:00', close: '19:00' },
      saturday: { open: '07:00', close: '19:00' },
      sunday: { open: '08:00', close: '17:00' },
    },
    marketType: 'traditional',
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },

  // Meknès Markets
  {
    id: '15',
    cityId: '19',
    name: 'Souk Bezaara Meknès',
    nameAr: 'Souk Bezaara Meknès',
    nameFr: 'Souk Bezaara Meknès',
    address: 'Ville Nouvelle, Meknès',
    coordinates: { lat: 33.8935, lng: -5.5473 },
    openingHours: {
      monday: { open: '07:00', close: '18:00' },
      tuesday: { open: '07:00', close: '18:00' },
      wednesday: { open: '07:00', close: '18:00' },
      thursday: { open: '07:00', close: '18:00' },
      friday: { open: '07:00', close: '18:00' },
      saturday: { open: '07:00', close: '18:00' },
      sunday: { open: '08:00', close: '16:00' },
    },
    marketType: 'traditional',
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },

  // Salé Markets
  {
    id: '16',
    cityId: '27',
    name: 'Souk El Ghezel Salé',
    nameAr: 'Souk El Ghezel Salé',
    nameFr: 'Souk El Ghezel Salé',
    address: 'Medina, Salé',
    coordinates: { lat: 34.0531, lng: -6.7985 },
    openingHours: {
      monday: { open: '07:00', close: '18:30' },
      tuesday: { open: '07:00', close: '18:30' },
      wednesday: { open: '07:00', close: '18:30' },
      thursday: { open: '07:00', close: '18:30' },
      friday: { open: '07:00', close: '18:30' },
      saturday: { open: '07:00', close: '18:30' },
      sunday: { open: '08:00', close: '17:00' },
    },
    marketType: 'traditional',
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },

  // Ouarzazate Markets
  {
    id: '17',
    cityId: '84',
    name: 'Souk El Khemis Ouarzazate',
    nameAr: 'Souk El Khemis Ouarzazate',
    nameFr: 'Souk El Khemis Ouarzazate',
    address: 'Centre Ville, Ouarzazate',
    coordinates: { lat: 30.9335, lng: -6.9370 },
    openingHours: {
      monday: { open: '07:00', close: '18:00' },
      tuesday: { open: '07:00', close: '18:00' },
      wednesday: { open: '07:00', close: '18:00' },
      thursday: { open: '07:00', close: '18:00' },
      friday: { open: '07:00', close: '18:00' },
      saturday: { open: '07:00', close: '18:00' },
      sunday: { open: '08:00', close: '16:00' },
    },
    marketType: 'traditional',
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },

  // Nador Markets
  {
    id: '18',
    cityId: '12',
    name: 'Souk Tleta Nador',
    nameAr: 'Souk Tleta Nador',
    nameFr: 'Souk Tleta Nador',
    address: 'Centre Ville, Nador',
    coordinates: { lat: 35.1740, lng: -2.9287 },
    openingHours: {
      monday: { open: '07:00', close: '18:00' },
      tuesday: { open: '07:00', close: '18:00' },
      wednesday: { open: '07:00', close: '18:00' },
      thursday: { open: '07:00', close: '18:00' },
      friday: { open: '07:00', close: '18:00' },
      saturday: { open: '07:00', close: '18:00' },
      sunday: { open: '08:00', close: '16:00' },
    },
    marketType: 'modern',
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },

  // Tetouan Markets
  {
    id: '19',
    cityId: '6',
    name: 'Souk El Fouki Tetouan',
    nameAr: 'Souk El Fouki Tetouan',
    nameFr: 'Souk El Fouki Tetouan',
    address: 'Medina, Tétouان',
    coordinates: { lat: 35.5785, lng: -5.3684 },
    openingHours: {
      monday: { open: '07:00', close: '19:00' },
      tuesday: { open: '07:00', close: '19:00' },
      wednesday: { open: '07:00', close: '19:00' },
      thursday: { open: '07:00', close: '19:00' },
      friday: { open: '07:00', close: '19:00' },
      saturday: { open: '07:00', close: '19:00' },
      sunday: { open: '08:00', close: '17:00' },
    },
    marketType: 'traditional',
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },

  // Khouribga Markets
  {
    id: '20',
    cityId: '48',
    name: 'Souk Es Sebt Khouribga',
    nameAr: 'Souk Es Sebt Khouribga',
    nameFr: 'Souk Es Sebt Khouribga',
    address: 'Centre Ville, Khouribga',
    coordinates: { lat: 32.8811, lng: -6.9063 },
    openingHours: {
      monday: { open: '07:00', close: '18:00' },
      tuesday: { open: '07:00', close: '18:00' },
      wednesday: { open: '07:00', close: '18:00' },
      thursday: { open: '07:00', close: '18:00' },
      friday: { open: '07:00', close: '18:00' },
      saturday: { open: '07:00', close: '18:00' },
      sunday: { open: '08:00', close: '16:00' },
    },
    marketType: 'modern',
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },

  // Additional Traditional Souks across Morocco - Comprehensive Coverage

  // Tangier-Tetouan-Al Hoceima Region
  {
    id: '21',
    cityId: '5', // Asilah
    name: 'Souk El Hadra Asilah',
    nameAr: 'سوق الخضرة أصيلة',
    nameFr: 'Souk El Hadra Asilah',
    address: 'Medina, Asilah',
    coordinates: { lat: 35.4650, lng: -6.0347 },
    openingHours: {
      monday: { open: '07:00', close: '18:00' },
      tuesday: { open: '07:00', close: '18:00' },
      wednesday: { open: '07:00', close: '18:00' },
      thursday: { open: '07:00', close: '18:00' },
      friday: { open: '07:00', close: '18:00' },
      saturday: { open: '07:00', close: '18:00' },
      sunday: { open: '08:00', close: '16:00' },
    },
    marketType: 'traditional',
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '22',
    cityId: '7', // Larache
    name: 'Souk El Khemis Larache',
    nameAr: 'سوق الخميس العرائش',
    nameFr: 'Souk El Khemis Larache',
    address: 'Centre Ville, Larache',
    coordinates: { lat: 35.1933, lng: -6.1561 },
    openingHours: {
      monday: { open: '07:00', close: '18:00' },
      tuesday: { open: '07:00', close: '18:00' },
      wednesday: { open: '07:00', close: '18:00' },
      thursday: { open: '07:00', close: '18:00' },
      friday: { open: '07:00', close: '18:00' },
      saturday: { open: '07:00', close: '18:00' },
      sunday: { open: '08:00', close: '16:00' },
    },
    marketType: 'traditional',
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '23',
    cityId: '8', // Ksar El Kebir
    name: 'Souk El Tleta Ksar El Kebir',
    nameAr: 'سوق الثلاثاء القصر الكبير',
    nameFr: 'Souk El Tleta Ksar El Kebir',
    address: 'Centre, Ksar El Kebir',
    coordinates: { lat: 35.0097, lng: -5.9056 },
    openingHours: {
      monday: { open: '07:00', close: '18:00' },
      tuesday: { open: '07:00', close: '18:00' },
      wednesday: { open: '07:00', close: '18:00' },
      thursday: { open: '07:00', close: '18:00' },
      friday: { open: '07:00', close: '18:00' },
      saturday: { open: '07:00', close: '18:00' },
      sunday: { open: '08:00', close: '16:00' },
    },
    marketType: 'traditional',
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '24',
    cityId: '9', // Chefchaouen
    name: 'Souk Chefchaouen',
    nameAr: 'سوق شفشاون',
    nameFr: 'Souk Chefchaouen',
    address: 'Medina, Chefchaouen',
    coordinates: { lat: 35.1689, lng: -5.2636 },
    openingHours: {
      monday: { open: '07:00', close: '19:00' },
      tuesday: { open: '07:00', close: '19:00' },
      wednesday: { open: '07:00', close: '19:00' },
      thursday: { open: '07:00', close: '19:00' },
      friday: { open: '07:00', close: '19:00' },
      saturday: { open: '07:00', close: '19:00' },
      sunday: { open: '08:00', close: '17:00' },
    },
    marketType: 'traditional',
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '25',
    cityId: '10', // Al Hoceima
    name: 'Souk Al Hoceima',
    nameAr: 'سوق الحسيمة',
    nameFr: 'Souk Al Hoceima',
    address: 'Centre Ville, Al Hoceima',
    coordinates: { lat: 35.2517, lng: -3.9317 },
    openingHours: {
      monday: { open: '07:00', close: '18:00' },
      tuesday: { open: '07:00', close: '18:00' },
      wednesday: { open: '07:00', close: '18:00' },
      thursday: { open: '07:00', close: '18:00' },
      friday: { open: '07:00', close: '18:00' },
      saturday: { open: '07:00', close: '18:00' },
      sunday: { open: '08:00', close: '16:00' },
    },
    marketType: 'traditional',
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },

  // Oriental Region
  {
    id: '26',
    cityId: '13', // Berkane
    name: 'Souk El Jemaa Berkane',
    nameAr: 'سوق الجمعة بركان',
    nameFr: 'Souk El Jemaa Berkane',
    address: 'Centre Ville, Berkane',
    coordinates: { lat: 34.9239, lng: -2.3222 },
    openingHours: {
      monday: { open: '07:00', close: '18:00' },
      tuesday: { open: '07:00', close: '18:00' },
      wednesday: { open: '07:00', close: '18:00' },
      thursday: { open: '07:00', close: '18:00' },
      friday: { open: '07:00', close: '18:00' },
      saturday: { open: '07:00', close: '18:00' },
      sunday: { open: '08:00', close: '16:00' },
    },
    marketType: 'traditional',
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '27',
    cityId: '14', // Taourirt
    name: 'Souk Taourirt',
    nameAr: 'سوق تاوريرت',
    nameFr: 'Souk Taourirt',
    address: 'Centre, Taourirt',
    coordinates: { lat: 34.4103, lng: -2.8906 },
    openingHours: {
      monday: { open: '07:00', close: '18:00' },
      tuesday: { open: '07:00', close: '18:00' },
      wednesday: { open: '07:00', close: '18:00' },
      thursday: { open: '07:00', close: '18:00' },
      friday: { open: '07:00', close: '18:00' },
      saturday: { open: '07:00', close: '18:00' },
      sunday: { open: '08:00', close: '16:00' },
    },
    marketType: 'traditional',
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '28',
    cityId: '15', // Jerada
    name: 'Souk Jerada',
    nameAr: 'سوق جرادة',
    nameFr: 'Souk Jerada',
    address: 'Centre Ville, Jerada',
    coordinates: { lat: 34.3125, lng: -2.1625 },
    openingHours: {
      monday: { open: '07:00', close: '18:00' },
      tuesday: { open: '07:00', close: '18:00' },
      wednesday: { open: '07:00', close: '18:00' },
      thursday: { open: '07:00', close: '18:00' },
      friday: { open: '07:00', close: '18:00' },
      saturday: { open: '07:00', close: '18:00' },
      sunday: { open: '08:00', close: '16:00' },
    },
    marketType: 'traditional',
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '29',
    cityId: '16', // Ain Bni Mathar
    name: 'Souk Ain Bni Mathar',
    nameAr: 'سوق عين بني مطهر',
    nameFr: 'Souk Ain Bni Mathar',
    address: 'Centre, Ain Bni Mathar',
    coordinates: { lat: 34.0206, lng: -1.8764 },
    openingHours: {
      monday: { open: '07:00', close: '18:00' },
      tuesday: { open: '07:00', close: '18:00' },
      wednesday: { open: '07:00', close: '18:00' },
      thursday: { open: '07:00', close: '18:00' },
      friday: { open: '07:00', close: '18:00' },
      saturday: { open: '07:00', close: '18:00' },
      sunday: { open: '08:00', close: '16:00' },
    },
    marketType: 'traditional',
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },

  // Fès-Meknès Region
  {
    id: '30',
    cityId: '20', // Moulay Yacoub
    name: 'Souk Moulay Yacoub',
    nameAr: 'سوق مولاي يعقوب',
    nameFr: 'Souk Moulay Yacoub',
    address: 'Centre, Moulay Yacoub',
    coordinates: { lat: 34.0889, lng: -5.1825 },
    openingHours: {
      monday: { open: '07:00', close: '18:00' },
      tuesday: { open: '07:00', close: '18:00' },
      wednesday: { open: '07:00', close: '18:00' },
      thursday: { open: '07:00', close: '18:00' },
      friday: { open: '07:00', close: '18:00' },
      saturday: { open: '07:00', close: '18:00' },
      sunday: { open: '08:00', close: '16:00' },
    },
    marketType: 'traditional',
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '31',
    cityId: '21', // Ouislane
    name: 'Souk Ouislane',
    nameAr: 'سوق ويسلان',
    nameFr: 'Souk Ouislane',
    address: 'Centre, Ouislane',
    coordinates: { lat: 33.8200, lng: -5.5100 },
    openingHours: {
      monday: { open: '07:00', close: '18:00' },
      tuesday: { open: '07:00', close: '18:00' },
      wednesday: { open: '07:00', close: '18:00' },
      thursday: { open: '07:00', close: '18:00' },
      friday: { open: '07:00', close: '18:00' },
      saturday: { open: '07:00', close: '18:00' },
      sunday: { open: '08:00', close: '16:00' },
    },
    marketType: 'traditional',
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '32',
    cityId: '22', // Azrou
    name: 'Souk Azrou',
    nameAr: 'سوق أزرو',
    nameFr: 'Souk Azrou',
    address: 'Centre Ville, Azrou',
    coordinates: { lat: 33.4343, lng: -5.2229 },
    openingHours: {
      monday: { open: '07:00', close: '18:00' },
      tuesday: { open: '07:00', close: '18:00' },
      wednesday: { open: '07:00', close: '18:00' },
      thursday: { open: '07:00', close: '18:00' },
      friday: { open: '07:00', close: '18:00' },
      saturday: { open: '07:00', close: '18:00' },
      sunday: { open: '08:00', close: '16:00' },
    },
    marketType: 'traditional',
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '33',
    cityId: '23', // Ain Chkef
    name: 'Souk Ain Chkef',
    nameAr: 'سوق عين شكف',
    nameFr: 'Souk Ain Chkef',
    address: 'Centre, Ain Chkef',
    coordinates: { lat: 34.0400, lng: -5.0200 },
    openingHours: {
      monday: { open: '07:00', close: '18:00' },
      tuesday: { open: '07:00', close: '18:00' },
      wednesday: { open: '07:00', close: '18:00' },
      thursday: { open: '07:00', close: '18:00' },
      friday: { open: '07:00', close: '18:00' },
      saturday: { open: '07:00', close: '18:00' },
      sunday: { open: '08:00', close: '16:00' },
    },
    marketType: 'traditional',
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '34',
    cityId: '24', // Sefrou
    name: 'Souk Sefrou',
    nameAr: 'سوق صفرو',
    nameFr: 'Souk Sefrou',
    address: 'Medina, Sefrou',
    coordinates: { lat: 33.8315, lng: -4.8372 },
    openingHours: {
      monday: { open: '07:00', close: '18:00' },
      tuesday: { open: '07:00', close: '18:00' },
      wednesday: { open: '07:00', close: '18:00' },
      thursday: { open: '07:00', close: '18:00' },
      friday: { open: '07:00', close: '18:00' },
      saturday: { open: '07:00', close: '18:00' },
      sunday: { open: '08:00', close: '16:00' },
    },
    marketType: 'traditional',
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '35',
    cityId: '25', // Taza
    name: 'Souk Taza',
    nameAr: 'سوق تازة',
    nameFr: 'Souk Taza',
    address: 'Medina, Taza',
    coordinates: { lat: 34.2133, lng: -4.0100 },
    openingHours: {
      monday: { open: '07:00', close: '18:00' },
      tuesday: { open: '07:00', close: '18:00' },
      wednesday: { open: '07:00', close: '18:00' },
      thursday: { open: '07:00', close: '18:00' },
      friday: { open: '07:00', close: '18:00' },
      saturday: { open: '07:00', close: '18:00' },
      sunday: { open: '08:00', close: '16:00' },
    },
    marketType: 'traditional',
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '36',
    cityId: '26', // Ifrane
    name: 'Souk Ifrane',
    nameAr: 'سوق إفران',
    nameFr: 'Souk Ifrane',
    address: 'Centre Ville, Ifrane',
    coordinates: { lat: 33.5228, lng: -5.1106 },
    openingHours: {
      monday: { open: '07:00', close: '18:00' },
      tuesday: { open: '07:00', close: '18:00' },
      wednesday: { open: '07:00', close: '18:00' },
      thursday: { open: '07:00', close: '18:00' },
      friday: { open: '07:00', close: '18:00' },
      saturday: { open: '07:00', close: '18:00' },
      sunday: { open: '08:00', close: '16:00' },
    },
    marketType: 'traditional',
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },

  // Casablanca-Settat Region
  {
    id: '37',
    cityId: '51', // Mohammedia
    name: 'Souk Mohammedia',
    nameAr: 'سوق المحمدية',
    nameFr: 'Souk Mohammedia',
    address: 'Centre Ville, Mohammedia',
    coordinates: { lat: 33.6863, lng: -7.3833 },
    openingHours: {
      monday: { open: '06:30', close: '18:30' },
      tuesday: { open: '06:30', close: '18:30' },
      wednesday: { open: '06:30', close: '18:30' },
      thursday: { open: '06:30', close: '18:30' },
      friday: { open: '06:30', close: '18:30' },
      saturday: { open: '06:30', close: '18:30' },
      sunday: { open: '08:00', close: '16:00' },
    },
    marketType: 'modern',
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '38',
    cityId: '52', // El Jadida
    name: 'Souk El Jadida',
    nameAr: 'سوق الجديدة',
    nameFr: 'Souk El Jadida',
    address: 'Medina, El Jadida',
    coordinates: { lat: 33.2316, lng: -8.5007 },
    openingHours: {
      monday: { open: '07:00', close: '18:00' },
      tuesday: { open: '07:00', close: '18:00' },
      wednesday: { open: '07:00', close: '18:00' },
      thursday: { open: '07:00', close: '18:00' },
      friday: { open: '07:00', close: '18:00' },
      saturday: { open: '07:00', close: '18:00' },
      sunday: { open: '08:00', close: '16:00' },
    },
    marketType: 'traditional',
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '39',
    cityId: '53', // Settat
    name: 'Souk Settat',
    nameAr: 'سوق سطات',
    nameFr: 'Souk Settat',
    address: 'Centre Ville, Settat',
    coordinates: { lat: 33.0019, lng: -7.6161 },
    openingHours: {
      monday: { open: '07:00', close: '18:00' },
      tuesday: { open: '07:00', close: '18:00' },
      wednesday: { open: '07:00', close: '18:00' },
      thursday: { open: '07:00', close: '18:00' },
      friday: { open: '07:00', close: '18:00' },
      saturday: { open: '07:00', close: '18:00' },
      sunday: { open: '08:00', close: '16:00' },
    },
    marketType: 'traditional',
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '40',
    cityId: '54', // Berrechid
    name: 'Souk Berrechid',
    nameAr: 'سوق برشيد',
    nameFr: 'Souk Berrechid',
    address: 'Centre Ville, Berrechid',
    coordinates: { lat: 33.2650, lng: -7.5864 },
    openingHours: {
      monday: { open: '07:00', close: '18:00' },
      tuesday: { open: '07:00', close: '18:00' },
      wednesday: { open: '07:00', close: '18:00' },
      thursday: { open: '07:00', close: '18:00' },
      friday: { open: '07:00', close: '18:00' },
      saturday: { open: '07:00', close: '18:00' },
      sunday: { open: '08:00', close: '16:00' },
    },
    marketType: 'traditional',
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },

  // Marrakech-Safi Region
  {
    id: '41',
    cityId: '73', // Safi
    name: 'Souk Safi',
    nameAr: 'سوق آسفي',
    nameFr: 'Souk Safi',
    address: 'Medina, Safi',
    coordinates: { lat: 32.2994, lng: -9.2372 },
    openingHours: {
      monday: { open: '07:00', close: '18:00' },
      tuesday: { open: '07:00', close: '18:00' },
      wednesday: { open: '07:00', close: '18:00' },
      thursday: { open: '07:00', close: '18:00' },
      friday: { open: '07:00', close: '18:00' },
      saturday: { open: '07:00', close: '18:00' },
      sunday: { open: '08:00', close: '16:00' },
    },
    marketType: 'traditional',
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '42',
    cityId: '74', // Youssoufia
    name: 'Souk Youssoufia',
    nameAr: 'سوق اليوسفية',
    nameFr: 'Souk Youssoufia',
    address: 'Centre Ville, Youssoufia',
    coordinates: { lat: 32.2544, lng: -8.5289 },
    openingHours: {
      monday: { open: '07:00', close: '18:00' },
      tuesday: { open: '07:00', close: '18:00' },
      wednesday: { open: '07:00', close: '18:00' },
      thursday: { open: '07:00', close: '18:00' },
      friday: { open: '07:00', close: '18:00' },
      saturday: { open: '07:00', close: '18:00' },
      sunday: { open: '08:00', close: '16:00' },
    },
    marketType: 'traditional',
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '43',
    cityId: '75', // Chichaoua
    name: 'Souk Chichaoua',
    nameAr: 'سوق شيشاوة',
    nameFr: 'Souk Chichaoua',
    address: 'Centre, Chichaoua',
    coordinates: { lat: 31.5389, lng: -8.7644 },
    openingHours: {
      monday: { open: '07:00', close: '18:00' },
      tuesday: { open: '07:00', close: '18:00' },
      wednesday: { open: '07:00', close: '18:00' },
      thursday: { open: '07:00', close: '18:00' },
      friday: { open: '07:00', close: '18:00' },
      saturday: { open: '07:00', close: '18:00' },
      sunday: { open: '08:00', close: '16:00' },
    },
    marketType: 'traditional',
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '44',
    cityId: '76', // Ben Guerir
    name: 'Souk Ben Guerir',
    nameAr: 'سوق بن جرير',
    nameFr: 'Souk Ben Guerir',
    address: 'Centre Ville, Ben Guerir',
    coordinates: { lat: 32.2364, lng: -7.9539 },
    openingHours: {
      monday: { open: '07:00', close: '18:00' },
      tuesday: { open: '07:00', close: '18:00' },
      wednesday: { open: '07:00', close: '18:00' },
      thursday: { open: '07:00', close: '18:00' },
      friday: { open: '07:00', close: '18:00' },
      saturday: { open: '07:00', close: '18:00' },
      sunday: { open: '08:00', close: '16:00' },
    },
    marketType: 'traditional',
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },

  // Souss-Massa Region
  {
    id: '45',
    cityId: '88', // Inezgane
    name: 'Souk Inezgane',
    nameAr: 'سوق إنزكان',
    nameFr: 'Souk Inezgane',
    address: 'Centre Ville, Inezgane',
    coordinates: { lat: 30.3550, lng: -9.5367 },
    openingHours: {
      monday: { open: '07:00', close: '18:00' },
      tuesday: { open: '07:00', close: '18:00' },
      wednesday: { open: '07:00', close: '18:00' },
      thursday: { open: '07:00', close: '18:00' },
      friday: { open: '07:00', close: '18:00' },
      saturday: { open: '07:00', close: '18:00' },
      sunday: { open: '08:00', close: '16:00' },
    },
    marketType: 'traditional',
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '46',
    cityId: '89', // Taroudant
    name: 'Souk Taroudant',
    nameAr: 'سوق تارودانت',
    nameFr: 'Souk Taroudant',
    address: 'Medina, Taroudant',
    coordinates: { lat: 30.4736, lng: -8.8778 },
    openingHours: {
      monday: { open: '07:00', close: '18:00' },
      tuesday: { open: '07:00', close: '18:00' },
      wednesday: { open: '07:00', close: '18:00' },
      thursday: { open: '07:00', close: '18:00' },
      friday: { open: '07:00', close: '18:00' },
      saturday: { open: '07:00', close: '18:00' },
      sunday: { open: '08:00', close: '16:00' },
    },
    marketType: 'traditional',
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '47',
    cityId: '90', // Ouled Teima
    name: 'Souk Ouled Teima',
    nameAr: 'سوق أولاد تيمة',
    nameFr: 'Souk Ouled Teima',
    address: 'Centre, Ouled Teima',
    coordinates: { lat: 30.3889, lng: -9.2069 },
    openingHours: {
      monday: { open: '07:00', close: '18:00' },
      tuesday: { open: '07:00', close: '18:00' },
      wednesday: { open: '07:00', close: '18:00' },
      thursday: { open: '07:00', close: '18:00' },
      friday: { open: '07:00', close: '18:00' },
      saturday: { open: '07:00', close: '18:00' },
      sunday: { open: '08:00', close: '16:00' },
    },
    marketType: 'traditional',
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },

  // Additional markets for major commercial centers
  {
    id: '48',
    cityId: '50', // Casablanca - Additional market
    name: 'Souk Ain Sebaa',
    nameAr: 'سوق عين السبع',
    nameFr: 'Souk Ain Sebaa',
    address: 'Ain Sebaa, Casablanca',
    coordinates: { lat: 33.6167, lng: -7.5167 },
    openingHours: {
      monday: { open: '06:00', close: '18:00' },
      tuesday: { open: '06:00', close: '18:00' },
      wednesday: { open: '06:00', close: '18:00' },
      thursday: { open: '06:00', close: '18:00' },
      friday: { open: '06:00', close: '18:00' },
      saturday: { open: '06:00', close: '18:00' },
      sunday: { open: '08:00', close: '16:00' },
    },
    marketType: 'traditional',
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '49',
    cityId: '72', // Marrakech - Additional market
    name: 'Souk Sidi Youssef Ben Ali',
    nameAr: 'سوق سيدي يوسف بن علي',
    nameFr: 'Souk Sidi Youssef Ben Ali',
    address: 'Sidi Youssef Ben Ali, Marrakech',
    coordinates: { lat: 31.5928, lng: -8.0164 },
    openingHours: {
      monday: { open: '07:00', close: '19:00' },
      tuesday: { open: '07:00', close: '19:00' },
      wednesday: { open: '07:00', close: '19:00' },
      thursday: { open: '07:00', close: '19:00' },
      friday: { open: '07:00', close: '19:00' },
      saturday: { open: '07:00', close: '19:00' },
      sunday: { open: '08:00', close: '17:00' },
    },
    marketType: 'traditional',
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '50',
    cityId: '17', // Fez - Additional market
    name: 'Souk Fes Jdid',
    nameAr: 'سوق فاس الجديد',
    nameFr: 'Souk Fes Jdid',
    address: 'Fes El Jdid, Fez',
    coordinates: { lat: 34.0431, lng: -4.9739 },
    openingHours: {
      monday: { open: '08:00', close: '19:00' },
      tuesday: { open: '08:00', close: '19:00' },
      wednesday: { open: '08:00', close: '19:00' },
      thursday: { open: '08:00', close: '19:00' },
      friday: { open: '08:00', close: '19:00' },
      saturday: { open: '08:00', close: '19:00' },
      sunday: { open: '09:00', close: '17:00' },
    },
    marketType: 'traditional',
    isActive: true,
    createdAt: new Date('2024-01-01'),
  },
];

// Mock Products
export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Tomatoes',
    nameAr: 'Tomatoes',
    nameFr: 'Tomatoes',
    category: 'vegetables',
    unit: 'kg',
    commonUnits: ['kg', 'piece'],
    imageUrl: '/images/products/tomatoes.jpg',
    isSeasonal: false,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    name: 'Potatoes',
    nameAr: 'Potatoes',
    nameFr: 'Potatoes',
    category: 'vegetables',
    unit: 'kg',
    commonUnits: ['kg', 'piece'],
    imageUrl: '/images/products/potatoes.jpg',
    isSeasonal: false,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '3',
    name: 'Oranges',
    nameAr: 'Oranges',
    nameFr: 'Oranges',
    category: 'fruits',
    unit: 'kg',
    commonUnits: ['kg', 'piece', 'bundle'],
    imageUrl: '/images/products/oranges.jpg',
    isSeasonal: true,
    seasonStart: 11,
    seasonEnd: 4,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '4',
    name: 'Bananas',
    nameAr: 'Bananas',
    nameFr: 'Bananas',
    category: 'fruits',
    unit: 'kg',
    commonUnits: ['kg', 'bundle'],
    imageUrl: '/images/products/bananas.jpg',
    isSeasonal: false,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '5',
    name: 'Onions',
    nameAr: 'Onions',
    nameFr: 'Onions',
    category: 'vegetables',
    unit: 'kg',
    commonUnits: ['kg', 'piece'],
    imageUrl: '/images/products/onions.jpg',
    isSeasonal: false,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '6',
    name: 'Carrots',
    nameAr: 'Carrots',
    nameFr: 'Carrots',
    category: 'vegetables',
    unit: 'kg',
    commonUnits: ['kg', 'bundle'],
    imageUrl: '/images/products/carrots.jpg',
    isSeasonal: false,
    createdAt: new Date('2024-01-01'),
  },
];

// Mock Badges
export const mockBadges: Badge[] = [
  {
    id: '1',
    type: 'reliable_reporter',
    name: 'Reliable Reporter',
    nameAr: 'Reliable Reporter',
    nameFr: 'Reliable Reporter',
    description: 'Consistently accurate price submissions',
    icon: '🏆',
    earnedAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    type: 'market_expert',
    name: 'Market Expert',
    nameAr: 'Market Expert',
    nameFr: 'Market Expert',
    description: 'Deep knowledge of market conditions',
    icon: '🎯',
    earnedAt: new Date('2024-02-01'),
  },
];

// Mock Users
export const mockUsers: User[] = [
  {
    id: '1',
    email: 'ahmed4star@gmail.com',
    username: 'ahmed4star',
    fullName: 'Ahmed El Morocci',
    avatarUrl: '/images/avatars/ahmed.jpg',
    phone: '+212612345678',
    city: 'Casablanca',
    badges: [mockBadges[0]],
    reputationScore: 850,
    totalSubmissions: 127,
    accurateSubmissions: 118,
    isVerified: true,
    isAdmin: true,
    isBanned: false,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-06-01'),
  },
  {
    id: '2',
    email: 'fatima@example.com',
    username: 'fatima_rbat',
    fullName: 'Fatima Zahra',
    avatarUrl: '/images/avatars/fatima.jpg',
    phone: '+212623456789',
    city: 'Rabat',
    badges: [mockBadges[1]],
    reputationScore: 920,
    totalSubmissions: 89,
    accurateSubmissions: 85,
    isVerified: true,
    isAdmin: false,
    isBanned: false,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-06-01'),
  },
  {
    id: '3',
    email: 'admin@sooqprice.ma',
    username: 'admin',
    fullName: 'SooqPrice Admin',
    avatarUrl: '/images/avatars/admin.jpg',
    city: 'Rabat',
    badges: [],
    reputationScore: 0,
    totalSubmissions: 0,
    accurateSubmissions: 0,
    isVerified: true,
    isAdmin: true,
    isBanned: false,
    createdAt: new Date('2024-01-01'),
    updatedAt: new Date('2024-06-01'),
  },
  {
    id: '4',
    email: 'youssef.fez@gmail.com',
    username: 'youssef_fez',
    fullName: 'Youssef Benali',
    avatarUrl: '/images/avatars/youssef.jpg',
    phone: '+212645123789',
    city: 'Fez',
    badges: [mockBadges[0]],
    reputationScore: 650,
    totalSubmissions: 45,
    accurateSubmissions: 42,
    isVerified: true,
    isAdmin: false,
    isBanned: false,
    createdAt: new Date('2024-02-01'),
    updatedAt: new Date('2024-06-01'),
  },
  {
    id: '5',
    email: 'aicha.marrakech@gmail.com',
    username: 'aicha_mkch',
    fullName: 'Aicha Bennani',
    avatarUrl: '/images/avatars/aicha.jpg',
    phone: '+212667234567',
    city: 'Marrakech',
    badges: [mockBadges[1]],
    reputationScore: 720,
    totalSubmissions: 67,
    accurateSubmissions: 61,
    isVerified: true,
    isAdmin: false,
    isBanned: false,
    createdAt: new Date('2024-01-20'),
    updatedAt: new Date('2024-06-01'),
  },
];

// Mock Price Submissions
export const mockPriceSubmissions: PriceSubmission[] = [
  {
    id: '1',
    userId: '1',
    marketId: '8', // Central Market Casablanca
    productId: '1',
    price: 8.5,
    unit: 'kg',
    quality: 'good',
    notes: 'Fresh tomatoes, good quality',
    verificationStatus: 'verified',
    verifiedBy: '3',
    verifiedAt: new Date('2024-06-10'),
    submissionDate: new Date('2024-06-10'),
    createdAt: new Date('2024-06-10'),
    user: mockUsers[0],
    market: mockMarkets[7], // Central Market Casablanca
    product: mockProducts[0],
  },
  {
    id: '2',
    userId: '2',
    marketId: '9', // Derb Ghallef Market
    productId: '1',
    price: 9.0,
    unit: 'kg',
    quality: 'excellent',
    notes: 'Premium quality tomatoes',
    verificationStatus: 'verified',
    verifiedBy: '3',
    verifiedAt: new Date('2024-06-10'),
    submissionDate: new Date('2024-06-10'),
    createdAt: new Date('2024-06-10'),
    user: mockUsers[1],
    market: mockMarkets[8], // Derb Ghallef Market
    product: mockProducts[0],
  },
  {
    id: '3',
    userId: '1',
    marketId: '8', // Central Market Casablanca
    productId: '2',
    price: 4.5,
    unit: 'kg',
    quality: 'good',
    notes: 'Regular potatoes',
    verificationStatus: 'pending',
    submissionDate: new Date('2024-06-11'),
    createdAt: new Date('2024-06-11'),
    user: mockUsers[0],
    market: mockMarkets[7], // Central Market Casablanca
    product: mockProducts[1],
  },
  {
    id: '4',
    userId: '2',
    marketId: '6', // Rabat Central Market
    productId: '3',
    price: 12.0,
    unit: 'kg',
    quality: 'excellent',
    notes: 'Sweet oranges, perfect for juice',
    verificationStatus: 'verified',
    verifiedBy: '3',
    verifiedAt: new Date('2024-06-09'),
    submissionDate: new Date('2024-06-09'),
    createdAt: new Date('2024-06-09'),
    user: mockUsers[1],
    market: mockMarkets[5], // Rabat Central Market
    product: mockProducts[2],
  },
  {
    id: '5',
    userId: '1',
    marketId: '9', // Derb Ghallef Market
    productId: '4',
    price: 15.0,
    unit: 'kg',
    quality: 'good',
    notes: 'Imported bananas',
    verificationStatus: 'verified',
    verifiedBy: '3',
    verifiedAt: new Date('2024-06-08'),
    submissionDate: new Date('2024-06-08'),
    createdAt: new Date('2024-06-08'),
    user: mockUsers[0],
    market: mockMarkets[8], // Derb Ghallef Market
    product: mockProducts[3],
  },
  {
    id: '6',
    userId: '2',
    marketId: '11', // Jemaa el-Fnaa Market Marrakech
    productId: '1',
    price: 7.5,
    unit: 'kg',
    quality: 'good',
    notes: 'Local tomatoes from the souk',
    verificationStatus: 'verified',
    verifiedBy: '3',
    verifiedAt: new Date('2024-06-12'),
    submissionDate: new Date('2024-06-12'),
    createdAt: new Date('2024-06-12'),
    user: mockUsers[1],
    market: mockMarkets[10], // Jemaa el-Fnaa Market
    product: mockProducts[0],
  },
  {
    id: '7',
    userId: '1',
    marketId: '4', // Souk El Attarine Fez
    productId: '5',
    price: 6.0,
    unit: 'kg',
    quality: 'excellent',
    notes: 'Fresh onions from Fez medina',
    verificationStatus: 'verified',
    verifiedBy: '3',
    verifiedAt: new Date('2024-06-11'),
    submissionDate: new Date('2024-06-11'),
    createdAt: new Date('2024-06-11'),
    user: mockUsers[0],
    market: mockMarkets[3], // Souk El Attarine Fez
    product: mockProducts[4],
  },
  {
    id: '8',
    userId: '2',
    marketId: '13', // Souk El Had Agadir
    productId: '6',
    price: 5.5,
    unit: 'kg',
    quality: 'good',
    notes: 'Carrots from Souss valley',
    verificationStatus: 'pending',
    submissionDate: new Date('2024-06-13'),
    createdAt: new Date('2024-06-13'),
    user: mockUsers[1],
    market: mockMarkets[12], // Souk El Had Agadir
    product: mockProducts[5],
  },
  {
    id: '9',
    userId: '1',
    marketId: '1', // Grand Socco Market Tangier
    productId: '3',
    price: 13.0,
    unit: 'kg',
    quality: 'excellent',
    notes: 'Fresh oranges from the north',
    verificationStatus: 'verified',
    verifiedBy: '3',
    verifiedAt: new Date('2024-06-12'),
    submissionDate: new Date('2024-06-12'),
    createdAt: new Date('2024-06-12'),
    user: mockUsers[0],
    market: mockMarkets[0], // Grand Socco Market
    product: mockProducts[2],
  },
  {
    id: '10',
    userId: '2',
    marketId: '14', // Souk Jdid Essaouira
    productId: '4',
    price: 16.0,
    unit: 'kg',
    quality: 'good',
    notes: 'Bananas from coastal market',
    verificationStatus: 'verified',
    verifiedBy: '3',
    verifiedAt: new Date('2024-06-10'),
    submissionDate: new Date('2024-06-10'),
    createdAt: new Date('2024-06-10'),
    user: mockUsers[1],
    market: mockMarkets[13], // Souk Jdid Essaouira
    product: mockProducts[3],
  },
];

// Helper functions for accessing mock data
export const getMockUserById = (id: string): User | undefined => 
  mockUsers.find(user => user.id === id);

export const getMockProductById = (id: string): Product | undefined => 
  mockProducts.find(product => product.id === id);

export const getMockCityById = (id: string): City | undefined => 
  mockCities.find(city => city.id === id);

export const getMockMarketById = (id: string): Market | undefined => 
  mockMarkets.find(market => market.id === id);

export const getMockMarketsByCity = (cityId: string): Market[] => 
  mockMarkets.filter(market => market.cityId === cityId);

export const getMockSubmissionsByMarket = (marketId: string): PriceSubmission[] => 
  mockPriceSubmissions.filter(submission => submission.marketId === marketId);

export const getMockSubmissionsByProduct = (productId: string): PriceSubmission[] => 
  mockPriceSubmissions.filter(submission => submission.productId === productId);

export const getMockSubmissionsByUser = (userId: string): PriceSubmission[] => 
  mockPriceSubmissions.filter(submission => submission.userId === userId);

// Get submissions by city
export const getMockSubmissionsByCity = (cityId: string): PriceSubmission[] => {
  const cityMarkets = getMockMarketsByCity(cityId);
  const marketIds = cityMarkets.map(m => m.id);
  return mockPriceSubmissions.filter(submission => 
    marketIds.includes(submission.marketId)
  );
};

// Search function for products
export const searchMockProducts = (query: string): Product[] => {
  const lowerQuery = query.toLowerCase();
  return mockProducts.filter(product => 
    product.name.toLowerCase().includes(lowerQuery) ||
    product.nameAr.toLowerCase().includes(lowerQuery) ||
    product.nameFr.toLowerCase().includes(lowerQuery)
  );
};

// Get latest prices for a product across markets
export const getMockLatestPrices = (productId: string): PriceSubmission[] => {
  const submissions = getMockSubmissionsByProduct(productId);
  const latestByMarket = new Map<string, PriceSubmission>();
  
  submissions.forEach(submission => {
    const existing = latestByMarket.get(submission.marketId);
    if (!existing || submission.submissionDate > existing.submissionDate) {
      latestByMarket.set(submission.marketId, submission);
    }
  });
  
  return Array.from(latestByMarket.values());
};

// Historical price data generation for charts
export interface PriceHistoryPoint {
  date: string;
  timestamp: number;
  marketId: string;
  marketName: string;
  price: number;
  quality: string;
  submissionDate: Date;
}

// Generate realistic historical price data for a product
export const generateMockPriceHistory = (productId: string, days: number = 90): PriceHistoryPoint[] => {
  const product = getMockProductById(productId);
  if (!product) return [];

  const history: PriceHistoryPoint[] = [];
  
  // Get top 3 most recent markets with price submissions for this product
  // This simulates selecting only the most active markets to avoid chart clutter
  const productSubmissions = getMockSubmissionsByProduct(productId);
  const marketSubmissionMap = new Map<string, Date>();
  
  // Find the most recent submission date for each market
  productSubmissions.forEach(submission => {
    const existingDate = marketSubmissionMap.get(submission.marketId);
    if (!existingDate || submission.submissionDate > existingDate) {
      marketSubmissionMap.set(submission.marketId, submission.submissionDate);
    }
  });
  
  // Sort markets by most recent submission date and take top 3
  const sortedMarkets = Array.from(marketSubmissionMap.entries())
    .sort(([, dateA], [, dateB]) => dateB.getTime() - dateA.getTime())
    .slice(0, 3)
    .map(([marketId]) => getMockMarketById(marketId))
    .filter(Boolean) as Market[];
  
  // If we don't have enough markets from submissions, add some default markets
  const relevantMarkets = sortedMarkets.length >= 3 
    ? sortedMarkets 
    : [...sortedMarkets, ...mockMarkets.slice(0, 3 - sortedMarkets.length)];
  
  // Base price ranges for different product categories
  const basePriceRanges: Record<string, { min: number, max: number, volatility: number }> = {
    'Vegetables': { min: 3, max: 15, volatility: 0.15 },
    'Fruits': { min: 5, max: 25, volatility: 0.20 },
    'Meat': { min: 40, max: 120, volatility: 0.10 },
    'Dairy': { min: 8, max: 35, volatility: 0.08 },
    'Grains': { min: 4, max: 18, volatility: 0.12 },
    'Spices': { min: 15, max: 80, volatility: 0.25 },
    'Seafood': { min: 30, max: 100, volatility: 0.18 },
    'Herbs': { min: 2, max: 12, volatility: 0.20 },
    'Nuts': { min: 20, max: 60, volatility: 0.15 },
    'Oils': { min: 25, max: 80, volatility: 0.12 },
  };

  const priceRange = basePriceRanges[product.category] || basePriceRanges['Vegetables'];
  const basePrice = (priceRange.min + priceRange.max) / 2;

  // Generate data for each day
  for (let i = days; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    const dateString = date.toISOString().split('T')[0];

    // Each market may have different prices and not all markets submit every day
    relevantMarkets.forEach((market, marketIndex) => {
      // Not every market submits every day (70% chance)
      if (Math.random() > 0.3) {
        // Market-specific price variations
        const marketMultiplier = 0.85 + (marketIndex * 0.05); // Different markets have different price levels
        
        // Seasonal trends (simulate seasonal price changes)
        const dayOfYear = Math.floor((date.getTime() - new Date(date.getFullYear(), 0, 0).getTime()) / (1000 * 60 * 60 * 24));
        const seasonalMultiplier = 1 + 0.1 * Math.sin((dayOfYear / 365) * 2 * Math.PI);
        
        // Weekly patterns (weekend prices might be different)
        const dayOfWeek = date.getDay();
        const weekendMultiplier = (dayOfWeek === 0 || dayOfWeek === 6) ? 1.05 : 1.0;
        
        // Random daily variation
        const randomVariation = 1 + (Math.random() - 0.5) * priceRange.volatility * 2;
        
        // Long-term trend (slight increase over time)
        const trendMultiplier = 1 + (days - i) * 0.001;
        
        const finalPrice = basePrice * marketMultiplier * seasonalMultiplier * weekendMultiplier * randomVariation * trendMultiplier;
        
        // Ensure price stays within reasonable bounds
        const clampedPrice = Math.max(priceRange.min, Math.min(priceRange.max, finalPrice));
        
        // Random quality distribution
        const qualityRandom = Math.random();
        let quality: string;
        if (qualityRandom > 0.7) quality = 'premium';
        else if (qualityRandom > 0.4) quality = 'good';
        else quality = 'fair';

        history.push({
          date: dateString,
          timestamp: date.getTime(),
          marketId: market.id,
          marketName: market.name,
          price: parseFloat(clampedPrice.toFixed(2)),
          quality,
          submissionDate: date,
        });
      }
    });
  }

  return history.sort((a, b) => a.timestamp - b.timestamp);
};

// Get price history for a specific product with caching simulation
const priceHistoryCache = new Map<string, PriceHistoryPoint[]>();

export const getMockPriceHistory = (productId: string, days: number = 90): PriceHistoryPoint[] => {
  const cacheKey = `${productId}-${days}`;
  
  if (!priceHistoryCache.has(cacheKey)) {
    priceHistoryCache.set(cacheKey, generateMockPriceHistory(productId, days));
  }
  
  return priceHistoryCache.get(cacheKey) || [];
};

// Get price statistics for a product
export const getMockPriceStatistics = (productId: string) => {
  const history = getMockPriceHistory(productId);
  const prices = history.map(h => h.price);
  
  if (prices.length === 0) {
    return {
      current: 0,
      average: 0,
      min: 0,
      max: 0,
      change: 0,
      changePercent: 0,
      trend: 'stable' as const,
    };
  }

  const current = prices[prices.length - 1];
  const previous = prices.length > 1 ? prices[prices.length - 2] : current;
  const average = prices.reduce((sum, price) => sum + price, 0) / prices.length;
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  const change = current - previous;
  const changePercent = previous ? (change / previous) * 100 : 0;
  
  const trend = changePercent > 1 ? 'up' : changePercent < -1 ? 'down' : 'stable';

  return {
    current: parseFloat(current.toFixed(2)),
    average: parseFloat(average.toFixed(2)),
    min: parseFloat(min.toFixed(2)),
    max: parseFloat(max.toFixed(2)),
    change: parseFloat(change.toFixed(2)),
    changePercent: parseFloat(changePercent.toFixed(2)),
    trend,
  };
};
