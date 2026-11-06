import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useLanguage } from '../../hooks/useLanguage';
import { HOSPITAL_INFO } from '../../utils/constants';

interface RouteSEOConfig {
  title: string;
  hindiTitle: string;
  description: string;
  hindiDescription: string;
  type?: 'website' | 'article' | 'profile';
  image?: string;
  schemaType?: 'Hospital' | 'Physician' | 'MedicalSpecialty' | 'Article' | 'FAQPage';
}

const ROUTE_CONFIGS: Record<string, RouteSEOConfig> = {
  '/': {
    title: 'Janhit Hospital | Super Speciality Healthcare & Research Centre',
    hindiTitle: 'जनहित हॉस्पिटल | सुपर स्पेशलिटी स्वास्थ्य एवं अनुसंधान केंद्र',
    description: 'NABH-accredited super speciality hospital in New Delhi providing 24/7 emergency response, cardiac cath lab, robotic joint replacement, and multi-speciality clinical excellence.',
    hindiDescription: 'नई दिल्ली में एनएबीएच-प्रमाणित सुपर स्पेशलिटी अस्पताल। 24/7 आपातकालीन सेवा, आधुनिक कैथ लैब, रोबोटिक जोड़ प्रत्यारोपण व विशिष्ट स्वास्थ्य सेवाएं।',
    schemaType: 'Hospital',
    image: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1200&q=80',
  },
  '/about': {
    title: 'About Hospital | Vision, Leadership & Journey | Janhit Hospital',
    hindiTitle: 'अस्पताल परिचय | दृष्टि, नेतृत्व एवं यात्रा | जनहित हॉस्पिटल',
    description: 'Learn about the legacy, ethical clinical governance, medical leadership, and state-of-the-art infrastructure of Janhit Hospital.',
    hindiDescription: 'जनहित हॉस्पिटल की चिकित्सा यात्रा, नैतिक स्वास्थ्य मूल्य, वरिष्ठ नेतृत्व और विश्वस्तरीय सुविधाओं के बारे में जानें।',
    schemaType: 'Hospital',
  },
  '/doctors': {
    title: 'Specialist Doctors Directory | Book OPD Appointment | Janhit Hospital',
    hindiTitle: 'विशेषज्ञ डॉक्टर सूची | ओपीडी अपॉइंटमेंट बुक करें | जनहित हॉस्पिटल',
    description: 'Find verified specialist surgeons and consultants across cardiology, neurology, orthopaedics, oncology, and paediatrics. Book appointments online.',
    hindiDescription: 'कार्डियोलॉजी, न्यूरोलॉजी, ऑर्थोपेडिक्स और बाल रोग विशेषज्ञों की सत्यापित सूची। ऑनलाइन ओपीडी परामर्श बुक करें।',
    schemaType: 'Physician',
  },
  '/departments': {
    title: 'Clinical Departments & Centres of Excellence | Janhit Hospital',
    hindiTitle: 'चिकित्सा विभाग एवं उत्कृष्टता केंद्र | जनहित हॉस्पिटल',
    description: 'Explore comprehensive clinical divisions including Cardiac Sciences, Neurosciences, Joint Replacement, and Critical Care with laminar OTs.',
    hindiDescription: 'हृदय विज्ञान, न्यूरोसाइंसेज, जोड़ प्रत्यारोपण और गहन चिकित्सा सहित प्रमुख चिकित्सा विभागों की विस्तृत जानकारी।',
    schemaType: 'MedicalSpecialty',
  },
  '/treatments': {
    title: 'Advanced Treatments & Surgeries | Janhit Hospital',
    hindiTitle: 'उन्नत चिकित्सा एवं सर्जरी उपचार | जनहित हॉस्पिटल',
    description: 'Evidence-based clinical treatments, minimally invasive laparoscopic surgeries, coronary angioplasty, and robotic knee replacements.',
    hindiDescription: 'मिनिमली इनवेसिव लेप्रोस्कोपिक सर्जरी, कोरोनरी एंजियोप्लास्टी और रोबोटिक नी रिप्लेसमेंट सहित आधुनिक उपचार प्रक्रियाएं।',
  },
  '/facilities': {
    title: 'Hospital Infrastructure & Patient Facilities | Janhit Hospital',
    hindiTitle: 'अस्पताल बुनियादी ढांचा एवं सुविधाएं | जनहित हॉस्पिटल',
    description: 'Level-3 NICU, 24/7 Mobile ICU ambulances, modular operation theatres, and 3T Silent MRI diagnostic suite.',
    hindiDescription: 'लेवल-3 एनआईसीयू, 24/7 मोबाइल आईसीयू एम्बुलेंस, मॉड्यूलर ओटी और 3T साइलेंट एमआरआई डायग्नोस्टिक सुविधाएं।',
  },
  '/appointment': {
    title: 'Book Doctor Appointment Online | Quick OPD Scheduling | Janhit Hospital',
    hindiTitle: 'डॉक्टर अपॉइंटमेंट ऑनलाइन बुक करें | त्वरित ओपीडी परामर्श | जनहित हॉस्पिटल',
    description: 'Book outpatient consultations with specialist physicians in 4 simple steps. Instant booking reference and SMS confirmation.',
    hindiDescription: '4 आसान चरणों में विशेषज्ञ डॉक्टरों के साथ ओपीडी परामर्श बुक करें। त्वरित पुष्टि और परामर्श स्लॉट।',
  },
  '/patient-corner': {
    title: 'Patient Corner, Guidelines & FAQs | Janhit Hospital',
    hindiTitle: 'मरीज सहायता केंद्र, नियम व अक्सर पूछे जाने वाले प्रश्न | जनहित हॉस्पिटल',
    description: 'Patient rights, visitor guidelines, admission and discharge protocols, cashless TPA insurance information, and health FAQs.',
    hindiDescription: 'मरीज अधिकार, आगंतुक नियम, भर्ती व डिस्चार्ज प्रक्रिया, कैशलेस स्वास्थ्य बीमा टीपीए जानकारी और एफएक्यू।',
    schemaType: 'FAQPage',
  },
  '/blog': {
    title: 'Health Blog & Patient Education Resources | Janhit Hospital',
    hindiTitle: 'स्वास्थ्य ब्लॉग एवं शिक्षा संसाधन | जनहित हॉस्पिटल',
    description: 'Doctor-verified medical articles, disease prevention tips, cardiovascular wellness guides, and healthy lifestyle habits.',
    hindiDescription: 'विशेषज्ञ डॉक्टरों द्वारा सत्यापित स्वास्थ्य लेख, रोग रोकथाम के उपाय और जीवनशैली सुधार संबंधी उपयोगी जानकारी।',
    schemaType: 'Article',
  },
  '/gallery': {
    title: 'Hospital Visual Tour & Media Gallery | Janhit Hospital',
    hindiTitle: 'अस्पताल फोटो एवं वीडियो गैलरी | जनहित हॉस्पिटल',
    description: 'Explore high-resolution photography of our campus, modular operation theatres, diagnostic suites, and patient rooms.',
    hindiDescription: 'हमारे आधुनिक परिसर, मॉड्यूलर ऑपरेशन थिएटर, गहन चिकित्सा इकाइयों और मरीज कमरों का विजुअल टूर।',
  },
  '/contact': {
    title: 'Contact Us, Emergency Hotline & Campus Map | Janhit Hospital',
    hindiTitle: 'संपर्क करें, आपातकालीन नंबर एवं अस्पताल का पता | जनहित हॉस्पिटल',
    description: '24/7 emergency dispatch 1800-123-9999, Sector 14 New Delhi campus directions, Google Maps location, and patient inquiry desk.',
    hindiDescription: '24/7 इमरजेंसी हेल्पलाइन 1800-123-9999, सेक्टर 14 नई दिल्ली परिसर का पता, लाइव गूगल मैप्स और पूछताछ फॉर्म।',
    schemaType: 'Hospital',
  },
};

export const SEOHead: React.FC = () => {
  const location = useLocation();
  const { language } = useLanguage();
  const isHindi = language === 'hi';

  useEffect(() => {
    // 1. Strip language prefixes to determine logical path
    const rawPath = location.pathname;
    let logicalPath = rawPath;
    if (logicalPath.startsWith('/hi/') || logicalPath === '/hi') {
      logicalPath = logicalPath.replace(/^\/hi/, '') || '/';
    } else if (logicalPath.startsWith('/en/') || logicalPath === '/en') {
      logicalPath = logicalPath.replace(/^\/en/, '') || '/';
    }

    // Match root configuration or detail routes
    let config = ROUTE_CONFIGS[logicalPath];

    if (!config) {
      if (logicalPath.startsWith('/doctors/')) {
        config = {
          title: 'Doctor Specialist Profile | Janhit Hospital',
          hindiTitle: 'विशेषज्ञ डॉक्टर प्रोफाइल | जनहित हॉस्पिटल',
          description: 'Consultation profile, qualifications, and OPD schedule for specialist doctor at Janhit Hospital.',
          hindiDescription: 'जनहित हॉस्पिटल में विशेषज्ञ डॉक्टर की प्रोफाइल, योग्यताएं और परामर्श समय।',
          schemaType: 'Physician',
        };
      } else if (logicalPath.startsWith('/departments/')) {
        config = {
          title: 'Clinical Department & Specialists | Janhit Hospital',
          hindiTitle: 'चिकित्सा विभाग एवं विशेषज्ञ | जनहित हॉस्पिटल',
          description: 'Comprehensive medical department facilities, team of specialists, and treated conditions.',
          hindiDescription: 'विशिष्ट चिकित्सा विभाग, डॉक्टरों की टीम और उपचार सुविधाओं की संपूर्ण जानकारी।',
          schemaType: 'MedicalSpecialty',
        };
      } else if (logicalPath.startsWith('/blog/')) {
        config = {
          title: 'Healthcare Article & Clinical Insights | Janhit Hospital',
          hindiTitle: 'स्वास्थ्य लेख एवं परामर्श | जनहित हॉस्पिटल',
          description: 'Evidence-based healthcare article reviewed by qualified medical professionals at Janhit Hospital.',
          hindiDescription: 'जनहित हॉस्पिटल के डॉक्टरों द्वारा प्रमाणित स्वास्थ्य मार्गदर्शिका।',
          schemaType: 'Article',
          type: 'article',
        };
      } else {
        config = ROUTE_CONFIGS['/'];
      }
    }

    const title = isHindi ? config.hindiTitle : config.title;
    const description = isHindi ? config.hindiDescription : config.description;
    const canonicalUrl = `https://www.janhithospital.com${rawPath === '/' ? '' : rawPath}`;
    const cleanPath = logicalPath === '/' ? '' : logicalPath;
    const hiUrl = `https://www.janhithospital.com/hi${cleanPath}`;
    const enUrl = `https://www.janhithospital.com/en${cleanPath}`;
    const defaultUrl = `https://www.janhithospital.com${cleanPath}`;
    const defaultImage = config.image || 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=1200&q=80';

    // 2. Update Document Title
    document.title = title;

    // 3. Helper to update or create meta tags
    const setMetaTag = (attr: string, key: string, content: string) => {
      let el = document.querySelector(`meta[${attr}="${key}"]`);
      if (!el) {
        el = document.createElement('meta');
        el.setAttribute(attr, key);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    // 4. Helper to update or create link tags
    const setLinkTag = (rel: string, href: string, extraAttrs: Record<string, string> = {}) => {
      let selector = `link[rel="${rel}"]`;
      if (extraAttrs.hreflang) {
        selector += `[hreflang="${extraAttrs.hreflang}"]`;
      }
      let el = document.querySelector(selector);
      if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        Object.entries(extraAttrs).forEach(([k, v]) => el!.setAttribute(k, v));
        document.head.appendChild(el);
      }
      el.setAttribute('href', href);
    };

    // Meta descriptions & Canonical
    setMetaTag('name', 'description', description);
    setLinkTag('canonical', canonicalUrl);

    // Hreflang alternates
    setLinkTag('alternate', hiUrl, { hreflang: 'hi-IN' });
    setLinkTag('alternate', enUrl, { hreflang: 'en-IN' });
    setLinkTag('alternate', defaultUrl, { hreflang: 'x-default' });

    // Open Graph Metadata
    setMetaTag('property', 'og:title', title);
    setMetaTag('property', 'og:description', description);
    setMetaTag('property', 'og:url', canonicalUrl);
    setMetaTag('property', 'og:type', config.type || 'website');
    setMetaTag('property', 'og:image', defaultImage);
    setMetaTag('property', 'og:site_name', isHindi ? HOSPITAL_INFO.hindiName : HOSPITAL_INFO.name);
    setMetaTag('property', 'og:locale', isHindi ? 'hi_IN' : 'en_IN');
    setMetaTag('property', 'og:locale:alternate', isHindi ? 'en_IN' : 'hi_IN');

    // Twitter Card Metadata
    setMetaTag('name', 'twitter:card', 'summary_large_image');
    setMetaTag('name', 'twitter:title', title);
    setMetaTag('name', 'twitter:description', description);
    setMetaTag('name', 'twitter:image', defaultImage);

    // 5. Inject Structured Data JSON-LD
    const jsonLdId = 'janhit-structured-data';
    let scriptEl = document.getElementById(jsonLdId) as HTMLScriptElement | null;
    if (!scriptEl) {
      scriptEl = document.createElement('script');
      scriptEl.id = jsonLdId;
      scriptEl.type = 'application/ld+json';
      document.head.appendChild(scriptEl);
    }

    const structuredData: any = {
      '@context': 'https://schema.org',
      '@graph': [
        // Organization / Hospital Schema
        {
          '@type': 'Hospital',
          '@id': 'https://www.janhithospital.com/#hospital',
          name: isHindi ? HOSPITAL_INFO.hindiName : HOSPITAL_INFO.name,
          alternateName: 'Janhit Hospital',
          url: 'https://www.janhithospital.com/',
          logo: 'https://www.janhithospital.com/hospital-cross.svg',
          image: defaultImage,
          telephone: HOSPITAL_INFO.emergencyPhone,
          emergencyTelephone: HOSPITAL_INFO.emergencyPhone,
          email: HOSPITAL_INFO.email,
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Sector 14, Institutional Area',
            addressLocality: 'New Delhi',
            addressRegion: 'Delhi',
            postalCode: '110001',
            addressCountry: 'IN',
          },
          geo: {
            '@type': 'GeoCoordinates',
            latitude: 28.6139,
            longitude: 77.2090,
          },
          openingHoursSpecification: [
            {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
              opens: '00:00',
              closes: '23:59',
            },
          ],
          medicalSpecialty: [
            'Cardiovascular',
            'Neurology',
            'Orthopedic',
            'Pediatric',
            'Oncologic',
            'Gastroenterologic',
          ],
          availableService: [
            { '@type': 'MedicalProcedure', name: '24/7 Emergency & Mobile ICU' },
            { '@type': 'MedicalProcedure', name: 'Digital Cardiac Cath Lab' },
            { '@type': 'MedicalProcedure', name: 'Robotic Joint Replacement' },
          ],
        },
        // BreadcrumbList Schema
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: isHindi ? 'होम' : 'Home',
              item: 'https://www.janhithospital.com/',
            },
            ...(logicalPath !== '/'
              ? [
                  {
                    '@type': 'ListItem',
                    position: 2,
                    name: title.split('|')[0].trim(),
                    item: canonicalUrl,
                  },
                ]
              : []),
          ],
        },
      ],
    };

    // Add FAQPage Schema if on Patient Corner or FAQs
    if (config.schemaType === 'FAQPage' || logicalPath === '/patient-corner') {
      structuredData['@graph'].push({
        '@type': 'FAQPage',
        mainEntity: [
          {
            '@type': 'Question',
            name: isHindi ? 'क्या अस्पताल में 24/7 आपातकालीन और एम्बुलेंस सेवा उपलब्ध है?' : 'Is 24/7 emergency and mobile ICU service available?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: isHindi
                ? 'हाँ, जनहित हॉस्पिटल में 24/7 आपातकालीन सेवा और आईसीयू एम्बुलेंस उपलब्ध है (हेल्पलाइन: 1800-123-9999)।'
                : 'Yes, Janhit Hospital provides 24/7 emergency care and advanced cardiac life-support mobile ICU ambulances (Toll-Free: 1800-123-9999).',
            },
          },
          {
            '@type': 'Question',
            name: isHindi ? 'क्या स्वास्थ्य बीमा में कैशलेस भर्ती सुविधा उपलब्ध है?' : 'Is cashless TPA hospital admission available?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: isHindi
                ? 'हाँ, अस्पताल में सभी प्रमुख बीमा कंपनियों और टीपीए के माध्यम से कैशलेस भर्ती की सुविधा उपलब्ध है।'
                : 'Yes, our central TPA desk supports cashless inpatient hospitalization with leading government and private health insurance providers.',
            },
          },
        ],
      });
    }

    scriptEl.textContent = JSON.stringify(structuredData);
  }, [location.pathname, language, isHindi]);

  return null;
};
export default SEOHead;

