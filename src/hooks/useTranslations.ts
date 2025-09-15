import { useLanguage } from '@/contexts/LanguageContext';

const translations = {
  English: {
    // Navigation
    home: 'Home',
    about: 'About',
    services: 'Services',
    bookEquipment: 'Book Equipment',
    hireFarmers: 'Hire Farmers',
    contact: 'Contact',
    login: 'Login',
    
    // Home Page
    connectingFarmer: 'Connecting',
    farmer: 'Farmer',
    withAgricultural: 'with Agricultural',
    solutions: 'Solutions',
    heroDescription: 'Rent tractors, hire skilled farmers, and access agricultural equipment across India. Making farming efficient and profitable for everyone.',
    builtBy: 'Built by student entrepreneurs from IIT Madras who understand farming communities',
    findServices: 'Find Services Near You',
    serviceType: 'Service Type',
    selectService: 'Select Service',
    tractorRental: 'Tractor Rental',
    harvesterRental: 'Harvester Rental',
    hireFarmersOption: 'Hire Farmers',
    otherEquipment: 'Other Equipment',
    location: 'Location',
    enterLocation: 'Enter city or pin code',
    search: 'Search',
    
    // Services
    equipmentRental: 'Equipment Rental',
    equipmentRentalDesc: 'Rent tractors, harvesters, and other agricultural machinery from verified owners',
    farmerHiring: 'Farmer Hiring',
    farmerHiringDesc: 'Connect with skilled farmers and agricultural workers for your farming needs',
    locationSearch: 'Location-Based Search',
    locationSearchDesc: 'Find equipment and services near your location with GPS integration',
    verifiedUsers: 'Verified Users',
    verifiedUsersDesc: 'All users are KYC verified for safe and secure transactions',
    
    // Booking
    bookNow: 'Book Now',
    calendar: 'Calendar',
    rating: 'Rating',
    perHour: 'per hour',
    perDay: 'per day',
    available: 'Available',
    unavailable: 'Unavailable'
  },
  
  Hindi: {
    // Navigation
    home: 'होम',
    about: 'हमारे बारे में',
    services: 'सेवाएं',
    bookEquipment: 'उपकरण बुक करें',
    hireFarmers: 'किसान भर्ती करें',
    contact: 'संपर्क',
    login: 'लॉगिन',
    
    // Home Page
    connectingFarmer: 'किसानों को जोड़ना',
    farmer: 'किसान',
    withAgricultural: 'कृषि समाधानों से',
    solutions: 'समाधान',
    heroDescription: 'भारत भर में ट्रैक्टर किराए पर लें, कुशल किसान भर्ती करें और कृषि उपकरण प्राप्त करें। खेती को सभी के लिए कुशल और लाभदायक बनाना।',
    builtBy: 'IIT मद्रास के छात्र उद्यमियों द्वारा निर्मित जो कृषि समुदायों को समझते हैं',
    findServices: 'अपने पास सेवाएं खोजें',
    serviceType: 'सेवा प्रकार',
    selectService: 'सेवा चुनें',
    tractorRental: 'ट्रैक्टर किराया',
    harvesterRental: 'हार्वेस्टर किराया',
    hireFarmersOption: 'किसान भर्ती',
    otherEquipment: 'अन्य उपकरण',
    location: 'स्थान',
    enterLocation: 'शहर या पिन कोड दर्ज करें',
    search: 'खोजें',
    
    // Services
    equipmentRental: 'उपकरण किराया',
    equipmentRentalDesc: 'सत्यापित मालिकों से ट्रैक्टर, हार्वेस्टर और अन्य कृषि मशीनरी किराए पर लें',
    farmerHiring: 'किसान भर्ती',
    farmerHiringDesc: 'अपनी खेती की जरूरतों के लिए कुशल किसानों और कृषि श्रमिकों से जुड़ें',
    locationSearch: 'स्थान आधारित खोज',
    locationSearchDesc: 'GPS एकीकरण के साथ अपने स्थान के पास उपकरण और सेवाएं खोजें',
    verifiedUsers: 'सत्यापित उपयोगकर्ता',
    verifiedUsersDesc: 'सुरक्षित लेनदेन के लिए सभी उपयोगकर्ता KYC सत्यापित हैं',
    
    // Booking
    bookNow: 'अभी बुक करें',
    calendar: 'कैलेंडर',
    rating: 'रेटिंग',
    perHour: 'प्रति घंटा',
    perDay: 'प्रति दिन',
    available: 'उपलब्ध',
    unavailable: 'अनुपलब्ध'
  },
  
  Marathi: {
    // Navigation
    home: 'मुख्यपृष्ठ',
    about: 'आमच्याबद्दल',
    services: 'सेवा',
    bookEquipment: 'उपकरणे बुक करा',
    hireFarmers: 'शेतकरी नेमा',
    contact: 'संपर्क',
    login: 'लॉगिन',
    
    // Home Page
    connectingFarmer: 'शेतकऱ्यांना जोडणे',
    farmer: 'शेतकरी',
    withAgricultural: 'कृषी समाधानांशी',
    solutions: 'समाधाने',
    heroDescription: 'भारतभर ट्रॅक्टर भाड्याने घ्या, कुशल शेतकरी नेमा आणि कृषी उपकरणे मिळवा। शेती सगळ्यांसाठी कुशल आणि फायदेशीर बनवणे.',
    builtBy: 'IIT मद्रास च्या विद्यार्थी उद्योजकांनी तयार केले जे शेतकरी समुदायांना समजतात',
    findServices: 'आपल्या जवळची सेवा शोधा',
    serviceType: 'सेवा प्रकार',
    selectService: 'सेवा निवडा',
    tractorRental: 'ट्रॅक्टर भाडे',
    harvesterRental: 'हार्वेस्टर भाडे',
    hireFarmersOption: 'शेतकरी नेमणूक',
    otherEquipment: 'इतर उपकरणे',
    location: 'ठिकाण',
    enterLocation: 'शहर किंवा पिन कोड प्रविष्ट करा',
    search: 'शोधा',
    
    // Services
    equipmentRental: 'उपकरणे भाडे',
    equipmentRentalDesc: 'सत्यापित मालकांकडून ट्रॅक्टर, हार्वेस्टर आणि इतर कृषी यंत्रसामग्री भाड्याने घ्या',
    farmerHiring: 'शेतकरी भरती',
    farmerHiringDesc: 'तुमच्या शेतीच्या गरजांसाठी कुशल शेतकरी आणि कृषी कामगारांशी जुळवून घ्या',
    locationSearch: 'स्थान आधारित शोध',
    locationSearchDesc: 'GPS एकीकरणासह आपल्या स्थानाजवळील उपकरणे आणि सेवा शोधा',
    verifiedUsers: 'सत्यापित वापरकर्ते',
    verifiedUsersDesc: 'सुरक्षित व्यवहारांसाठी सर्व वापरकर्ते KYC सत्यापित आहेत',
    
    // Booking
    bookNow: 'आता बुक करा',
    calendar: 'कॅलेंडर',
    rating: 'रेटिंग',
    perHour: 'प्रति तास',
    perDay: 'प्रति दिवस',
    available: 'उपलब्ध',
    unavailable: 'अनुपलब्ध'
  },
  
  Punjabi: {
    // Navigation
    home: 'ਘਰ',
    about: 'ਸਾਡے ਬਾਰੇ',
    services: 'ਸੇਵਾਵਾਂ',
    bookEquipment: 'ਸਾਜ਼ੋ-ਸਾਮਾਨ ਬੁੱਕ ਕਰੋ',
    hireFarmers: 'ਕਿਸਾਨ ਭਰਤੀ ਕਰੋ',
    contact: 'ਸੰਪਰਕ',
    login: 'ਲਾਗਇਨ',
    
    // Home Page
    connectingFarmer: 'ਕਿਸਾਨਾਂ ਨੂੰ ਜੋੜਨਾ',
    farmer: 'ਕਿਸਾਨ',
    withAgricultural: 'ਖੇਤੀਬਾੜੀ ਹੱਲਾਂ ਨਾਲ',
    solutions: 'ਹੱਲ',
    heroDescription: 'ਪੂਰੇ ਭਾਰਤ ਵਿੱਚ ਟਰੈਕਟਰ ਕਿਰਾਏ ਤੇ ਲਓ, ਹੁਨਰਮੰਦ ਕਿਸਾਨ ਭਰਤੀ ਕਰੋ ਅਤੇ ਖੇਤੀਬਾੜੀ ਸਾਜ਼ੋ-ਸਾਮਾਨ ਪ੍ਰਾਪਤ ਕਰੋ। ਸਾਰਿਆਂ ਲਈ ਖੇਤੀ ਨੂੰ ਕੁਸ਼ਲ ਅਤੇ ਲਾਭਕਾਰੀ ਬਣਾਉਣਾ।',
    builtBy: 'IIT ਮਦਰਾਸ ਦੇ ਵਿਦਿਆਰਥੀ ਉੱਦਮੀਆਂ ਦੁਆਰਾ ਬਣਾਇਆ ਗਿਆ ਜੋ ਖੇਤੀਬਾੜੀ ਭਾਈਚਾਰਿਆਂ ਨੂੰ ਸਮਝਦੇ ਹਨ',
    findServices: 'ਆਪਣੇ ਨੇੜੇ ਸੇਵਾਵਾਂ ਖੋਜੋ',
    serviceType: 'ਸੇਵਾ ਕਿਸਮ',
    selectService: 'ਸੇਵਾ ਚੁਣੋ',
    tractorRental: 'ਟਰੈਕਟਰ ਕਿਰਾਇਆ',
    harvesterRental: 'ਹਾਰਵੈਸਟਰ ਕਿਰਾਇਆ',
    hireFarmersOption: 'ਕਿਸਾਨ ਭਰਤੀ',
    otherEquipment: 'ਹੋਰ ਉਪਕਰਣ',
    location: 'ਸਥਾਨ',
    enterLocation: 'ਸ਼ਹਿਰ ਜਾਂ ਪਿੰਨ ਕੋਡ ਦਾਖਲ ਕਰੋ',
    search: 'ਖੋਜ',
    
    // Services
    equipmentRental: 'ਸਾਜ਼ੋ-ਸਾਮਾਨ ਕਿਰਾਇਆ',
    equipmentRentalDesc: 'ਪ੍ਰਮਾਣਿਤ ਮਾਲਕਾਂ ਤੋਂ ਟਰੈਕਟਰ, ਹਾਰਵੈਸਟਰ ਅਤੇ ਹੋਰ ਖੇਤੀਬਾੜੀ ਮਸ਼ੀਨਰੀ ਕਿਰਾਏ ਤੇ ਲਓ',
    farmerHiring: 'ਕਿਸਾਨ ਭਰਤੀ',
    farmerHiringDesc: 'ਆਪਣੀ ਖੇਤੀ ਦੀਆਂ ਲੋੜਾਂ ਲਈ ਹੁਨਰਮੰਦ ਕਿਸਾਨਾਂ ਅਤੇ ਖੇਤੀਬਾੜੀ ਮਜ਼ਦੂਰਾਂ ਨਾਲ ਜੁੜੋ',
    locationSearch: 'ਸਥਾਨ ਅਧਾਰਿਤ ਖੋਜ',
    locationSearchDesc: 'GPS ਏਕੀਕਰਣ ਨਾਲ ਆਪਣੇ ਸਥਾਨ ਦੇ ਨੇੜੇ ਸਾਜ਼ੋ-ਸਾਮਾਨ ਅਤੇ ਸੇਵਾਵਾਂ ਖੋਜੋ',
    verifiedUsers: 'ਪ੍ਰਮਾਣਿਤ ਉਪਭੋਗਤਾ',
    verifiedUsersDesc: 'ਸੁਰੱਖਿਅਤ ਲੈਣ-ਦੇਣ ਲਈ ਸਾਰੇ ਉਪਭੋਗਤਾ KYC ਪ੍ਰਮਾਣਿਤ ਹਨ',
    
    // Booking
    bookNow: 'ਹੁਣੇ ਬੁੱਕ ਕਰੋ',
    calendar: 'ਕੈਲੰਡਰ',
    rating: 'ਰੇਟਿੰਗ',
    perHour: 'ਪ੍ਰਤੀ ਘੰਟਾ',
    perDay: 'ਪ੍ਰਤੀ ਦਿਨ',
    available: 'ਉਪਲਬਧ',
    unavailable: 'ਅਣਉਪਲਬਧ'
  },
  
  Tamil: {
    // Navigation
    home: 'முகப்பு',
    about: 'எங்களை பற்றி',
    services: 'சேவைகள்',
    bookEquipment: 'கருவிகள் பதிவு',
    hireFarmers: 'விவசாயிகள் நியமனம்',
    contact: 'தொடர்பு',
    login: 'உள்நுழைய',
    
    // Home Page
    connectingFarmer: 'விவசாயிகளை இணைக்கிறது',
    farmer: 'விவசாயி',
    withAgricultural: 'வேளாண் தீர்வுகளுடன்',
    solutions: 'தீர்வுகள்',
    heroDescription: 'இந்தியா முழுவதும் டிராக்டர்கள் வாடகைக்கு எடுங்கள், திறமையான விவசாயிகளை நியமிக்கவும் மற்றும் வேளாண் கருவிகளை அணுகவும். அனைவருக்கும் விவசாயத்தை திறமையான மற்றும் லாபகரமான ஆக்குதல்.',
    builtBy: 'விவசாய சமூகங்களை புரிந்துகொள்ளும் IIT மெட்ராஸ் மாணவர் தொழில்முனைவோர்களால் உருவாக்கப்பட்டது',
    findServices: 'உங்கள் அருகில் சேவைகளைக் கண்டறியவும்',
    serviceType: 'சேவை வகை',
    selectService: 'சேவையைத் தேர்வுசெய்க',
    tractorRental: 'டிராக்டர் வாடகை',
    harvesterRental: 'அறுவடை இயந்திர வாடகை',
    hireFarmersOption: 'விவசாயிகள் நியமனம்',
    otherEquipment: 'மற்ற கருவிகள்',
    location: 'இடம்',
    enterLocation: 'நகரம் அல்லது பின் குறியீட்டை உள்ளிடவும்',
    search: 'தேடல்',
    
    // Services
    equipmentRental: 'கருவி வாடகை',
    equipmentRentalDesc: 'சரிபார்க்கப்பட்ட உரிமையாளர்களிடமிருந்து டிராக்டர்கள், அறுவடை இயந்திரங்கள் மற்றும் பிற வேளாண் இயந்திரங்களை வாடகைக்கு எடுங்கள்',
    farmerHiring: 'விவசாயி நியமனம்',
    farmerHiringDesc: 'உங்கள் விவசாய தேவைகளுக்காக திறமையான விவசாயிகள் மற்றும் வேளாண் தொழிலாளர்களுடன் இணைக்கவும்',
    locationSearch: 'இடம் அடிப்படையிலான தேடல்',
    locationSearchDesc: 'GPS ஒருங்கிணைப்புடன் உங்கள் இடத்திற்கு அருகில் கருவிகள் மற்றும் சேவைகளைக் கண்டறியவும்',
    verifiedUsers: 'சரிபார்க்கப்பட்ட பயனர்கள்',
    verifiedUsersDesc: 'பாதுகாப்பான மற்றும் பாதுகாப்பான பரிவர்த்தனைகளுக்காக அனைத்து பயனர்களும் KYC சரிபார்க்கப்பட்டுள்ளனர்',
    
    // Booking
    bookNow: 'இப்போது பதிவு செய்யவும்',
    calendar: 'காலெண்டர்',
    rating: 'மதிப்பீடு',
    perHour: 'ஒரு மணி நேரத்திற்கு',
    perDay: 'ஒரு நாளைக்கு',
    available: 'கிடைக்கிறது',
    unavailable: 'கிடைக்கவில்லை'
  },
  
  Telugu: {
    // Navigation
    home: 'మొదటి పేజీ',
    about: 'మా గురించి',
    services: 'సేవలు',
    bookEquipment: 'పరికరాలు బుక్ చేయండి',
    hireFarmers: 'రైతుల నియామకం',
    contact: 'సంప్రదించండి',
    login: 'లాగిన్',
    
    // Booking
    bookNow: 'ఇప్పుడే బుక్ చేయండి',
    calendar: 'క్యాలెండర్',
    rating: 'రేటింగ్',
    perHour: 'గంటకు',
    perDay: 'రోజుకు',
    available: 'అందుబాటులో ఉంది',
    unavailable: 'అందుబాటులో లేదు'
  },
  
  Gujarati: {
    // Navigation
    home: 'ઘર',
    about: 'અમારા વિશે',
    services: 'સેવાઓ',
    bookEquipment: 'સાધનો બુક કરો',
    hireFarmers: 'ખેડૂતો રાખો',
    contact: 'સંપર્ક',
    login: 'લૉગિન',
    
    // Booking
    bookNow: 'હવે બુક કરો',
    calendar: 'કૅલેન્ડર',
    rating: 'રેટિંગ',
    perHour: 'પ્રતિ કલાક',
    perDay: 'પ્રતિ દિવસ',
    available: 'ઉપલબ્ધ',
    unavailable: 'અનુપલબ્ધ'
  },
  
  Bengali: {
    // Navigation
    home: 'হোম',
    about: 'আমাদের সম্পর্কে',
    services: 'সেবাসমূহ',
    bookEquipment: 'যন্ত্রপাতি বুক করুন',
    hireFarmers: 'কৃষক নিয়োগ',
    contact: 'যোগাযোগ',
    login: 'লগিন',
    
    // Booking
    bookNow: 'এখনই বুক করুন',
    calendar: 'ক্যালেন্ডার',
    rating: 'রেটিং',
    perHour: 'প্রতি ঘন্টায়',
    perDay: 'প্রতি দিনে',
    available: 'উপলব্ধ',
    unavailable: 'অনুপলব্ধ'
  }
};

export const useTranslations = () => {
  const { language } = useLanguage();
  
  const t = (key: string): string => {
    const keys = key.split('.');
    let value: any = translations[language];
    
    for (const k of keys) {
      if (value && typeof value === 'object') {
        value = value[k];
      } else {
        return key; // Return key if translation not found
      }
    }
    
    return typeof value === 'string' ? value : key;
  };
  
  return { t, language };
};