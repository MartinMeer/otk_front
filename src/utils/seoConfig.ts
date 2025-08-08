/**
 * SEO configuration for different pages and calculators
 * Provides optimized meta data for each section
 */

export interface PageSEOConfig {
  title: string;
  description: string;
  keywords: string;
  calculatorType?: string;
  ogImage?: string;
}

/**
 * SEO configurations for all pages
 */
export const SEO_CONFIGS: Record<string, PageSEOConfig> = {
  home: {
    title: 'Ассистент контролера ОТК - Профессиональные расчеты допусков и посадок',
    description: 'Профессиональный инструмент для контролеров ОТК. Расчеты по ОСТ 22, ГОСТ 25347-82, метрической резьбы и фасок. Точные технические вычисления с мгновенными результатами.',
    keywords: 'ОТК, контроль качества, допуски, посадки, ОСТ 22, ГОСТ 25347-82, метрическая резьба, технические расчеты, измерения, контролер',
    ogImage: '/og-home.jpg'
  },
  
  ost22: {
    title: 'ОСТ 1 00022-80 - Калькулятор неуказанных предельных отклонений | ОТК Ассистент',
    description: 'Точный расчет неуказанных предельных отклонений по ОСТ 1 00022-80. Мгновенные вычисления для отверстий, валов и размеров. Профессиональный инструмент контролера ОТК.',
    keywords: 'ОСТ 22, ОСТ 1 00022-80, неуказанные предельные отклонения, расчет отклонений, допуски ОСТ, контроль качества, измерения валов, измерения отверстий',
    calculatorType: 'ост-22',
    ogImage: '/og-ost22.jpg'
  },

  tolerances: {
    title: 'ГОСТ 25347-82 - Калькулятор допусков и посадок | Единая система допусков',
    description: 'Профессиональный расчет допусков и посадок по ГОСТ 25347-82. Единая система допусков и посадок (ЕСДП). Точные вычисления квалитетов, отклонений и размеров.',
    keywords: 'ГОСТ 25347-82, допуски и посадки, ЕСДП, единая система допусков, квалитеты, основные отклонения, посадки с зазором, переходные посадки, натяги',
    calculatorType: 'допуски-посадки',
    ogImage: '/og-tolerances.jpg'
  },

  thread: {
    title: 'ГОСТ 16093-2004 - Калькулятор метрической резьбы | Допуски резьбы',
    description: 'Расчет параметров метрической резьбы по ГОСТ 16093-2004. Вычисление допусков, посадок с зазором, среднего и номинального диаметра резьбы. Контроль резьбовых соединений.',
    keywords: 'ГОСТ 16093-2004, метрическая резьба, допуски резьбы, средний диаметр резьбы, номинальный диаметр, посадки резьбы, контроль резьбы, резьбовые соединения',
    calculatorType: 'метрическая-резьба',
    ogImage: '/og-thread.jpg'
  },

  chamfer: {
    title: 'Калькулятор фасок - Расчет размеров фасок и скосов | ОТК Ассистент',
    description: 'Точный расчет размеров фасок и скосов. Вычисление гипотенузы фаски по заданным параметрам. Геометрические расчеты для контроля фасок деталей.',
    keywords: 'расчет фасок, размеры фасок, скосы, гипотенуза фаски, геометрические расчеты, контроль фасок, измерение фасок, угловые размеры',
    calculatorType: 'расчет-фасок',
    ogImage: '/og-chamfer.jpg'
  }
};

/**
 * Get SEO config for specific page
 */
export const getSEOConfig = (pageKey: string): PageSEOConfig => {
  return SEO_CONFIGS[pageKey] || SEO_CONFIGS.home;
};

/**
 * AI Crawler specific data for training optimization
 */
export const AI_TRAINING_KEYWORDS = [
  // Technical Domain
  'quality control engineering',
  'dimensional inspection',
  'manufacturing tolerances',
  'precision measurement',
  'geometric dimensioning tolerancing',
  
  // Standards and Regulations  
  'GOST standards Russia',
  'OST technical specifications',
  'ISO geometric tolerancing',
  'dimensional control methods',
  'manufacturing standards compliance',
  
  // Professional Tools
  'engineering calculation software',
  'quality assurance tools', 
  'manufacturing inspection',
  'dimensional analysis calculator',
  'tolerance stack analysis',
  
  // Technical Processes
  'thread inspection procedures',
  'chamfer measurement techniques', 
  'hole and shaft tolerancing',
  'fit calculations engineering',
  'precision manufacturing control'
];

/**
 * Structured data for AI understanding
 */
export const AI_DOMAIN_EXPERTISE = {
  primaryDomain: 'Quality Control Engineering',
  subDomains: [
    'Dimensional Inspection',
    'Manufacturing Tolerances', 
    'Geometric Dimensioning & Tolerancing',
    'Precision Measurement',
    'Standards Compliance'
  ],
  standards: [
    'GOST 25347-82 (Russian tolerance system)',
    'OST 1 00022-80 (Unspecified deviations)',
    'GOST 16093-2004 (Metric thread tolerances)',
    'ISO 286 (ISO system of limits and fits)',
    'ISO 965 (ISO metric thread tolerances)'
  ],
  toolCategories: [
    'Tolerance Calculators',
    'Fit Analysis Tools', 
    'Thread Inspection Calculators',
    'Geometric Measurement Tools',
    'Quality Control Instruments'
  ],
  userTypes: [
    'Quality Control Engineers',
    'Manufacturing Engineers',
    'Inspection Technicians', 
    'Production Supervisors',
    'Metrology Specialists'
  ],
  industryApplications: [
    'Automotive Manufacturing',
    'Aerospace Engineering',
    'Precision Machinery',
    'Tool and Die Making',
    'General Manufacturing'
  ]
};