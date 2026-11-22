import type {
  AvatarPose,
  CertificateItem,
  LeadershipItem,
  ProcessStage,
  ProjectCaseStudy,
  ResumeDocument,
  SkillGroup,
  TwinPrompt,
} from '../types.ts';

export const PROFILE = {
  name: 'ANU M.',
  fullName: 'Anu Muthuraman',
  role: 'BCA STUDENT | ASPIRING AI & MACHINE LEARNING PROFESSIONAL',
  shortRole: 'Aspiring AI & Machine Learning Professional',
  tagline: 'Turning data into insights and ideas into intelligent solutions.',
  location: 'Bengaluru, Karnataka, India',
  email: 'anumuthuraman29@gmail.com',
  phone: '+91 9916913919',
  linkedin: 'https://linkedin.com/in/anum-2904-bcagraduate',
  linkedinDisplay: 'linkedin.com/in/anum-2904-bcagraduate',
  github: 'https://github.com/anumuthuraman29-tech',
  githubDisplay: 'github.com/anumuthuraman29-tech',
  portraitUrl: '/assets/aistudio/ANU_M_eab67b4a.png',
  avatarMainUrl: '/assets/aistudio/anu_m_0da5985e.jpg',
  languages: ['English', 'Kannada', 'Tamil'],
  aboutIntro:
    'I am a Bachelor of Computer Applications student with a strong interest in Python, Data Science, Artificial Intelligence and Machine Learning. I enjoy exploring datasets, developing predictive models and transforming complex information into meaningful insights. Through academic projects and internship experience, I have developed practical skills in data preprocessing, exploratory data analysis, machine learning and technical problem-solving.',
  aboutExtended:
    'My academic work and one-year internship at Glowlogics Solutions have grounded me in structured data preparation, handling real-world constraints such as missing values and class imbalance, and evaluating predictive models with clear statistical discipline. Alongside core machine learning, I have completed structured coursework in Generative AI, Prompt Engineering, and AI-First Software Engineering.',
  focusAreas: [
    {
      index: '01',
      title: 'PYTHON',
      subtitle: 'Analytical Scripting & Pipelines',
    },
    {
      index: '02',
      title: 'DATA SCIENCE',
      subtitle: 'EDA, Preprocessing & Visual Insights',
    },
    {
      index: '03',
      title: 'MACHINE LEARNING',
      subtitle: 'Classification, Regression & Clustering',
    },
    {
      index: '04',
      title: 'ARTIFICIAL INTELLIGENCE',
      subtitle: 'Generative Models & Prompt Engineering',
    },
  ],
  strengths: [
    'Structured data preprocessing & missing-value strategy',
    'Handling imbalanced datasets & feature scaling',
    'Rigorous metric-based model evaluation',
    'Clear technical documentation & collaborative event leadership',
  ],
};

export const EDUCATION = {
  degree: 'Bachelor of Computer Applications (BCA)',
  institution: 'RNS First Grade College (Autonomous), Bengaluru',
  cgpa: '9.04 / 10.0',
  semester: 'Fifth Semester',
  expectedGraduation: 'April / May 2027',
  coreFoundations: [
    'Python Programming & Data Structures',
    'Database Management Systems (SQL)',
    'Linear Algebra, Probability & Statistics',
    'Web Technologies (HTML, CSS, JavaScript)',
  ],
};

export const INTERNSHIP = {
  role: 'Python & Data Science Intern',
  organization: 'Glowlogics Solutions',
  duration: 'November 2024 – November 2025',
  credentialId: 'DS25-GL03-C080',
  certificateId: 'cert-glowlogics-ds',
  highlights: [
    'Assisted in end-to-end development, data preparation, and training of predictive machine learning models using Python, Pandas, NumPy, and Scikit-learn.',
    'Constructed data preprocessing pipelines including missing value imputation, outlier management, categorical encoding, and StandardScaler / RobustScaler normalization.',
    'Evaluated model performance across cross-validation and standard classification and regression metrics (Precision, Recall, F1-Score, RMSE) to refine prediction quality.',
    'Maintained version control via Git, GitHub, and VS Code while documenting model evaluation summaries and analytical workflows.',
  ],
};

export const SIMULATION_EXPERIENCE = {
  title: 'GenAI-Powered No-Code Analytics Job Simulation',
  organization: 'Tata iQ',
  status: 'In Progress',
  summary:
    'Practicing applied data quality assessment, predictive modeling with GenAI tools, clear business storytelling, recommendation design, and responsible automation concepts.',
};

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: 'Programming',
    skills: ['Python', 'SQL', 'C'],
  },
  {
    category: 'Data Science',
    skills: ['Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Missingno', 'Tableau'],
  },
  {
    category: 'Machine Learning',
    skills: [
      'Scikit-learn',
      'Naive Bayes',
      'Decision Trees',
      'Logistic Regression',
      'K-Means',
      'Regression Models',
      'LightGBM',
    ],
  },
  {
    category: 'Data Preprocessing',
    skills: [
      'Missing Value Imputation',
      'SMOTE',
      'Label Encoding',
      'One-Hot Encoding',
      'StandardScaler',
      'RobustScaler',
    ],
  },
  {
    category: 'Generative AI & NLP',
    skills: [
      'OpenAI GPT Models',
      'Prompt Engineering',
      'Generative Models',
      'AI-First Software Engineering',
    ],
  },
  {
    category: 'Web Development',
    skills: ['HTML', 'CSS', 'JavaScript'],
  },
  {
    category: 'Tools',
    skills: ['Git', 'GitHub', 'VS Code'],
  },
  {
    category: 'Model Evaluation',
    skills: [
      'Confusion Matrix',
      'Precision',
      'Recall',
      'F1-Score',
      'MAE',
      'MSE',
      'RMSE',
      'R² Score',
    ],
  },
];

export const PROJECTS: ProjectCaseStudy[] = [
  {
    id: 'airbnb-price-prediction',
    number: '01',
    title: 'AIRBNB PRICE PREDICTION',
    shortTitle: 'Airbnb Price Prediction',
    category: 'Major Academic Project · Regression Modelling',
    featuredLabel: 'Major Project',
    shortDescription:
      'Major academic project involving listing-price prediction, structured data preparation, missing-value handling, and regression-based modelling.',
    technologies: ['Python', 'Pandas', 'Scikit-learn', 'LightGBM', 'Regression Models'],
    visualType: 'airbnb',
    overview:
      'An end-to-end academic machine learning project designed to estimate Airbnb listing prices from structured property, location, and host-related attributes. Emphasis was placed on systematic preprocessing of sparse real-world records before training and benchmarking regression models.',
    problemStatement:
      'Short-term rental pricing varies sharply across neighbourhoods, room types, amenities, and seasonal availability. Raw listing datasets frequently contain missing entries, skewed price distributions, and mixed categorical variables that degrade naive price estimators.',
    dataset:
      'Structured Airbnb listings dataset containing property characteristics, categorical descriptors, availability indicators, and target nightly price values.',
    dataPreprocessing: [
      'Audited null distributions and sparse columns across the listing dataset.',
      'Applied targeted missing-value imputation strategies appropriate for numerical and categorical fields.',
      'Encoded categorical listing features using Label Encoding and One-Hot Encoding.',
      'Handled skewed numeric features and scaled inputs with StandardScaler / RobustScaler to stabilize model training.',
    ],
    methodology: [
      'Conducted exploratory data analysis (EDA) to inspect price distributions and feature correlations.',
      'Constructed a reproducible preprocessing pipeline separating training and validation splits.',
      'Trained baseline and gradient-boosted regression architectures to benchmark predictive consistency.',
      'Compared model residuals across regression error metrics to evaluate generalization.',
    ],
    algorithms: ['Linear & Multivariate Regression Models', 'LightGBM Regressor', 'Scikit-learn Pipelines'],
    evaluationMetrics: ['RMSE (Root Mean Squared Error)', 'MAE (Mean Absolute Error)', 'MSE', 'R² Score'],
    verifiedResults:
      'Delivered a complete, reproducible academic regression workflow demonstrating how disciplined sparse-feature imputation and categorical encoding stabilize listing-price predictions. Exact benchmark metrics are documented in the academic project workbooks and are intentionally not fabricated here.',
    githubUrl: 'https://github.com/anumuthuraman29-tech',
    githubNote: 'View Anu’s verified GitHub profile for code repositories and project updates.',
    whatILearned: [
      'Data cleaning and missing-value strategy often influence regression accuracy more than algorithm choice alone.',
      'Combining RMSE and R² gives a clearer picture of error magnitude and explained variance than any single metric.',
      'Structuring preprocessing steps cleanly prevents data leakage between training and evaluation folds.',
    ],
  },
  {
    id: 'credit-card-fraud-detection',
    number: '02',
    title: 'CREDIT CARD FRAUD DETECTION',
    shortTitle: 'Credit Card Fraud Detection',
    category: 'Machine Learning · Imbalanced Classification',
    shortDescription:
      'Machine-learning classification project comparing Naive Bayes, Decision Trees, and Logistic Regression on imbalanced transaction data.',
    technologies: ['Python', 'Scikit-learn', 'SMOTE', 'Naive Bayes', 'Decision Trees', 'Logistic Regression'],
    visualType: 'fraud',
    overview:
      'A supervised machine learning classification study focused on identifying fraudulent financial transactions within heavily skewed transaction datasets, evaluating multiple interpretable classifiers side by side.',
    problemStatement:
      'In real-world payment datasets, fraudulent transactions represent a tiny fraction of total activity. Standard accuracy scores become misleading because a trivial model predicting every transaction as legitimate appears deceptively accurate while missing actual fraud.',
    dataset:
      'Structured credit card transaction dataset containing numerical transaction attributes and a binary fraud classification target with severe class imbalance.',
    dataPreprocessing: [
      'Inspected target class distribution to quantify the degree of imbalance between legitimate and fraudulent records.',
      'Normalized numerical transaction variables using RobustScaler / StandardScaler to manage extreme transaction amounts.',
      'Applied SMOTE (Synthetic Minority Over-sampling Technique via imbalanced-learn) strictly on training data to address class imbalance.',
      'Verified clean train-test separation prior to oversampling to prevent synthetic leakage.',
    ],
    methodology: [
      'Framed fraud detection as a recall-sensitive binary classification problem.',
      'Trained and compared three distinct classifier families: Naive Bayes, Decision Trees, and Logistic Regression.',
      'Constructed confusion matrices for each model to examine false negatives (missed fraud) versus false positives.',
      'Evaluated trade-offs between Precision, Recall, and F1-Score to understand model suitability.',
    ],
    algorithms: ['Naive Bayes', 'Decision Trees', 'Logistic Regression', 'SMOTE (imbalanced-learn)'],
    evaluationMetrics: ['Confusion Matrix', 'Precision', 'Recall', 'F1-Score'],
    verifiedResults:
      'Successfully implemented a comparative three-model fraud classification pipeline demonstrating how SMOTE resampling and recall-focused evaluation surface fraudulent patterns far more effectively than raw accuracy alone.',
    githubUrl: 'https://github.com/anumuthuraman29-tech',
    githubNote: 'Explore Anu’s verified GitHub profile for machine learning coursework and experiments.',
    whatILearned: [
      'Why raw accuracy fails on imbalanced datasets and why Recall, Precision, and F1-Score are essential.',
      'How probabilistic (Naive Bayes), linear (Logistic Regression), and tree-based (Decision Trees) classifiers behave differently on minority classes.',
      'The importance of applying SMOTE strictly inside the training split to maintain trustworthy validation.',
    ],
  },
  {
    id: 'car-price-prediction',
    number: '03',
    title: 'CAR PRICE PREDICTION',
    shortTitle: 'Car Price Prediction',
    category: 'Supervised Learning · Vehicle Valuation',
    shortDescription:
      'Regression-based academic project focused on estimating vehicle market prices from structured automobile features.',
    technologies: ['Python', 'Pandas', 'NumPy', 'Scikit-learn', 'Regression Models'],
    visualType: 'car',
    overview:
      'A supervised regression modelling project built to estimate used and market vehicle prices from key technical and ownership attributes, translating raw automobile listings into structured predictive features.',
    problemStatement:
      'Vehicle resale valuation depends on non-trivial interactions across manufacturing year, mileage, fuel type, transmission, and brand segments. Estimating fair market value requires cleaning inconsistent tabular records and modelling multivariate relationships.',
    dataset:
      'Tabular automobile dataset containing vehicle specifications, categorical attributes, and historical market selling prices.',
    dataPreprocessing: [
      'Cleaned raw vehicle records, checked for duplicate entries, and addressed missing attribute values.',
      'Transformed categorical vehicle attributes (such as fuel and transmission categories) via Label and One-Hot Encoding.',
      'Examined numerical spread and outlier values across mileage and target selling prices.',
      'Applied feature scaling to keep numerical predictors aligned for regression fitting.',
    ],
    methodology: [
      'Performed univariate and bivariate exploratory analysis to identify strong price drivers.',
      'Engineered and selected clean predictive feature matrices using Pandas and NumPy.',
      'Trained multivariate regression models in Scikit-learn to forecast vehicle prices.',
      'Assessed prediction error distributions using MAE, MSE, RMSE, and R² Score.',
    ],
    algorithms: ['Multivariate Regression Models', 'Scikit-learn Regression Pipeline'],
    evaluationMetrics: ['MAE', 'MSE', 'RMSE', 'R² Score'],
    verifiedResults:
      'Built a structured end-to-end vehicle valuation workflow capable of transforming raw automobile feature tables into consistent regression estimates evaluated across standard error metrics.',
    githubUrl: 'https://github.com/anumuthuraman29-tech',
    githubNote: 'Visit Anu’s verified GitHub profile to follow ongoing repository publications.',
    whatILearned: [
      'How categorical encoding choices directly shape linear and multivariate regression feature spaces.',
      'Inspecting error residuals reveals where outlier vehicles distort predictions.',
      'Disciplined exploratory visualization speeds up feature selection and sanity checking.',
    ],
  },
  {
    id: 'covid-19-data-analysis',
    number: '04',
    title: 'COVID-19 DATA ANALYSIS',
    shortTitle: 'COVID-19 Data Analysis',
    category: 'Exploratory Data Analysis · Public Health Data',
    shortDescription:
      'Academic data-analysis project exploring COVID-19 dataset information, trends, and meaningful statistical patterns.',
    technologies: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn'],
    visualType: 'covid',
    overview:
      'An exploratory data analysis (EDA) project focused on inspecting, cleaning, and visually interpreting COVID-19 public dataset records to uncover clear temporal patterns and comparative insights.',
    problemStatement:
      'Large public health datasets contain date-indexed fluctuations, missing reporting intervals, and regional disparities that are difficult to interpret directly from raw spreadsheets without structured aggregation and visual storytelling.',
    dataset:
      'Academic COVID-19 structured dataset containing reported case counts, temporal records, and regional breakdown columns.',
    dataPreprocessing: [
      'Loaded and inspected dataset schema, column data types, and missing-value completeness.',
      'Standardized date fields and handled missing or inconsistent reporting entries cleanly.',
      'Aggregated records across time periods and geographic groupings using Pandas groupby operations.',
      'Verified summary statistics to ensure accurate chart scaling and unbiased comparisons.',
    ],
    methodology: [
      'Structured analytical questions around trend progression, distribution comparisons, and peak periods.',
      'Computed descriptive statistics and rolling summaries using Pandas and NumPy.',
      'Designed clear, readable charts with Matplotlib and Seaborn to communicate key dataset patterns.',
      'Synthesized analytical findings into concise written interpretations.',
    ],
    algorithms: ['Descriptive Statistical Aggregation', 'Time-Series Trend Exploration', 'Exploratory Data Visualization'],
    evaluationMetrics: ['Data Completeness Checks', 'Descriptive Summary Statistics', 'Visual Trend Clarity'],
    verifiedResults:
      'Produced an organized exploratory analysis notebook translating raw COVID-19 tabular records into interpretable visual summaries and grounded observations.',
    githubUrl: 'https://github.com/anumuthuraman29-tech',
    githubNote: 'Visit Anu’s verified GitHub profile for Python data analysis work.',
    whatILearned: [
      'Thoughtful chart selection and clear axis framing turn raw public datasets into understandable stories.',
      'Validating missing dates and reporting gaps early prevents misleading trend conclusions.',
      'Combining Pandas aggregation with Seaborn visual inspection creates a fast analytical feedback loop.',
    ],
  },
];

export const PROCESS_STAGES: ProcessStage[] = [
  {
    number: '01',
    title: 'DISCOVER',
    summary: 'Understand problems, requirements and objectives.',
    detail:
      'Define the real analytical question, clarify domain constraints, and map what constitutes a meaningful, verifiable outcome before writing a single line of code.',
  },
  {
    number: '02',
    title: 'ANALYZE',
    summary: 'Explore datasets, identify patterns and understand information.',
    detail:
      'Audit schema quality, visualize distributions, surface missing values or class imbalance, and examine feature relationships through exploratory data analysis.',
  },
  {
    number: '03',
    title: 'DEVELOP',
    summary: 'Apply programming, data preprocessing and analytical techniques.',
    detail:
      'Build clean Python pipelines for imputation, encoding, scaling, resampling, and training appropriate classification, regression, or clustering models.',
  },
  {
    number: '04',
    title: 'EVALUATE',
    summary: 'Assess models, validate outputs and interpret results.',
    detail:
      'Inspect Confusion Matrices, Precision, Recall, F1-Score, MAE, RMSE, and R² Score honestly to understand strengths, error patterns, and trade-offs.',
  },
  {
    number: '05',
    title: 'IMPROVE',
    summary: 'Refine solutions and document learning.',
    detail:
      'Iterate on feature engineering, address model bottlenecks, version work via Git/GitHub, and document takeaways clearly for teammates and reviewers.',
  },
];

export const INITIAL_CERTIFICATES: CertificateItem[] = [
  {
    id: 'cert-glowlogics-ds',
    title: 'Python & Data Science Internship (Advanced Certification in Data Science)',
    issuer: 'Glowlogics Solutions',
    issueDate: '27 Nov 2025',
    credentialId: 'DS25-GL03-C080',
    category: 'Data Science',
    fileUrl: '/assets/aistudio/Data_Science_43d9aa10.pdf',
    previewUrl: '/assets/previews/Data_Science_43d9aa10.png',
    fileType: 'pdf',
    fileName: 'Anu_M_Glowlogics_Data_Science_Certificate.pdf',
  },
  {
    id: 'cert-infosys-gen-models',
    title: 'Generative Models for Developers',
    issuer: 'Infosys Springboard',
    issueDate: 'February 2, 2025',
    verifyUrl: 'https://verify.onwingspan.com',
    category: 'Generative AI',
    fileUrl: '/assets/aistudio/Generative_models_for_developers_0531392f.pdf',
    previewUrl: '/assets/previews/Generative_models_for_developers_0531392f.png',
    fileType: 'pdf',
    fileName: 'Anu_M_Generative_Models_for_Developers.pdf',
  },
  {
    id: 'cert-infosys-prompt-eng',
    title: 'Prompt Engineering',
    issuer: 'Infosys Springboard',
    issueDate: 'January 30, 2025',
    verifyUrl: 'https://verify.onwingspan.com',
    category: 'Generative AI',
    fileUrl: '/assets/aistudio/Prompt_Engineering_fb894e3e.pdf',
    previewUrl: '/assets/previews/Prompt_Engineering_fb894e3e.png',
    fileType: 'pdf',
    fileName: 'Anu_M_Prompt_Engineering.pdf',
  },
  {
    id: 'cert-infosys-ai-first-se',
    title: 'AI-First Software Engineering',
    issuer: 'Infosys Springboard',
    issueDate: 'January 30, 2025',
    verifyUrl: 'https://verify.onwingspan.com',
    category: 'AI & Engineering',
    fileUrl: '/assets/aistudio/AI-first_Software_Engineering_21304d53.pdf',
    previewUrl: '/assets/previews/AI-first_Software_Engineering_21304d53.png',
    fileType: 'pdf',
    fileName: 'Anu_M_AI_First_Software_Engineering.pdf',
  },
  {
    id: 'cert-infosys-openai-gpt',
    title: 'Introduction to OpenAI GPT Models',
    issuer: 'Infosys Springboard',
    issueDate: 'January 29, 2025',
    verifyUrl: 'https://verify.onwingspan.com',
    category: 'Generative AI',
    fileUrl: '/assets/aistudio/Introduction_to_OpenAI_GPT_Models_24d0b223.pdf',
    previewUrl: '/assets/previews/Introduction_to_OpenAI_GPT_Models_24d0b223.png',
    fileType: 'pdf',
    fileName: 'Anu_M_Introduction_to_OpenAI_GPT_Models.pdf',
  },
  {
    id: 'cert-ibm-ai-literacy',
    title: 'AI Literacy',
    issuer: 'IBM SkillsBuild',
    issueDate: '30 Sep 2026',
    verifyUrl: 'https://www.credly.com/go/PTXAmiQc',
    category: 'AI & Engineering',
    fileUrl: '/assets/aistudio/AILiteracy_a2b3db63.pdf',
    previewUrl: '/assets/previews/AILiteracy_a2b3db63.png',
    fileType: 'pdf',
    fileName: 'Anu_M_IBM_AI_Literacy.pdf',
  },
  {
    id: 'cert-ibm-data-fundamentals',
    title: 'Data Fundamentals',
    issuer: 'IBM SkillsBuild',
    issueDate: 'Sep 29, 2026',
    verifyUrl: 'https://www.credly.com/badges/146ee1d0-60d8-49cb-96e7-1a13600a741a',
    category: 'Data Science',
    fileUrl: '/assets/aistudio/Data_Fundamentals_f27a360e.pdf',
    previewUrl: '/assets/previews/Data_Fundamentals_f27a360e.png',
    fileType: 'pdf',
    fileName: 'Anu_M_IBM_Data_Fundamentals.pdf',
  },
  {
    id: 'cert-coursera-excel',
    title: 'Introduction to Data Analysis using Microsoft Excel',
    issuer: 'Coursera Project Network',
    issueDate: '13 Jun 2025',
    credentialId: 'QZ123S337X98',
    verifyUrl: 'https://coursera.org/verify/QZ123S337X98',
    category: 'Data Analytics',
    fileUrl: '/assets/aistudio/Coursera_QZ123S337X98_04fdbff4.pdf',
    previewUrl: '/assets/previews/Coursera_QZ123S337X98_04fdbff4.png',
    fileType: 'pdf',
    fileName: 'Anu_M_Coursera_Excel_Data_Analysis.pdf',
  },
];

export const RESUME_DOCUMENTS: ResumeDocument[] = [
  {
    id: 'ai-ml',
    title: 'AI & Machine Learning Resume',
    subtitle: 'Primary Resume · Python, ML Pipelines, Predictive Modelling & GenAI Certifications',
    downloadName: 'Anu_M_Resume.pdf',
    fileUrl: '/assets/aistudio/Anu_M_RESUME_AI_3b1b51e1.pdf',
    previewUrl: '/assets/previews/Anu_M_RESUME_AI_3b1b51e1.png',
    badge: 'Primary',
  },
  {
    id: 'applied-science',
    title: 'Python & Data Science Resume',
    subtitle: 'Applied Science & Data Preprocessing Focus · All 4 Academic Projects',
    downloadName: 'Anu_M_Data_Science_Resume.pdf',
    fileUrl: '/assets/aistudio/Anu_M_RESUME_88f1a52e.pdf',
    previewUrl: '/assets/previews/Anu_M_RESUME_88f1a52e.png',
    badge: 'Data Science',
  },
  {
    id: 'genai-analytics',
    title: 'GenAI-Powered Data Analytics Resume',
    subtitle: 'Tableau, GenAI Analytics & Tata iQ Simulation Profile',
    downloadName: 'Anu_M_GenAI_Analytics_Resume.pdf',
    fileUrl: '/assets/aistudio/Anu_M_GenAI_Data_Analytics_Resume_b61c6df6.pdf',
    previewUrl: '/assets/previews/Anu_M_GenAI_Data_Analytics_Resume_b61c6df6.png',
    badge: 'GenAI Analytics',
  },
  {
    id: 'cover-letter',
    title: 'GenAI Data Analytics Cover Letter',
    subtitle: 'Formal Application Statement & Analytical Learning Perspective',
    downloadName: 'Anu_M_Cover_Letter.pdf',
    fileUrl: '/assets/aistudio/Anu_M_GenAI_Data_Analytics_Cover_Letter_2e1e2ea9.pdf',
    previewUrl: '/assets/previews/Anu_M_GenAI_Data_Analytics_Cover_Letter_2e1e2ea9.png',
    badge: 'Cover Letter',
  },
];

export const LEADERSHIP_ITEMS: LeadershipItem[] = [
  {
    id: 'lead-coord',
    number: '01',
    title: 'College Activity Organization & Technical Event Coordination',
    category: 'Leadership & Execution',
    description:
      'Actively organized campus technical activities and coordinated student participation, ensuring smooth scheduling, clear participant communication, and structured execution from planning through wrap-up.',
    skillsDemonstrated: ['Event Coordination', 'Leadership', 'Team Collaboration'],
  },
  {
    id: 'lead-cyber-bingo',
    number: '02',
    title: 'Cybersecurity Bingo',
    category: 'Interactive Technical Event',
    description:
      'Helped design and facilitate Cybersecurity Bingo sessions that transformed foundational security concepts into an engaging, fast-paced learning format for student peers.',
    skillsDemonstrated: ['Concept Simplification', 'Facilitation', 'Technical Engagement'],
  },
  {
    id: 'lead-jeopardy',
    number: '03',
    title: 'Technical Jeopardy',
    category: 'Knowledge Challenge Format',
    description:
      'Coordinated and ran quiz-style Jeopardy rounds encouraging rapid analytical recall, fair team scoring, and energetic technical collaboration across participants.',
    skillsDemonstrated: ['Structured Planning', 'Communication', 'Problem-Solving'],
  },
  {
    id: 'lead-escape-room',
    number: '04',
    title: 'Escape Room Activities',
    category: 'Collaborative Problem-Solving',
    description:
      'Contributed to multi-stage Escape Room technical challenges built around sequential clues, logical deduction, and high-trust team collaboration under time constraints.',
    skillsDemonstrated: ['Logical Puzzle Design', 'Teamwork', 'Time Management'],
  },
];

export const AVATAR_POSE_IMAGES: Record<AvatarPose, string> = {
  idle: '/assets/avatars/idle.png',
  waving: '/assets/avatars/waving.png',
  presenting: '/assets/avatars/presenting.png',
  thinking: '/assets/avatars/thinking.png',
  excited: '/assets/avatars/excited.png',
  celebrating: '/assets/avatars/celebrating.png',
};

export const TWIN_PROMPTS: TwinPrompt[] = [
  {
    id: 'who-is-anu',
    question: 'Who is Anu?',
    pose: 'waving',
    response:
      'Anu M. is a Bachelor of Computer Applications (BCA) student at RNS First Grade College (Autonomous), Bengaluru with a 9.04/10 CGPA (5th Semester), specializing in Python, Data Science, AI, and Machine Learning.',
    fact: 'She speaks English, Kannada, and Tamil, and combines academic rigor with campus technical event leadership.',
    actionLabel: 'READ ABOUT ANU',
    actionType: 'scroll',
    targetId: 'about',
  },
  {
    id: 'skills',
    question: 'What are her technical skills?',
    pose: 'presenting',
    response:
      'Her core stack includes Python, SQL, and C; Data Science tools like Pandas, NumPy, Matplotlib, Seaborn, and Tableau; plus Machine Learning with Scikit-learn (Naive Bayes, Decision Trees, Logistic Regression, K-Means, Regression, LightGBM) and preprocessing workflows including SMOTE and scaling.',
    fact: 'She evaluates every model systematically using Confusion Matrices, Precision, Recall, F1-Score, MAE, MSE, RMSE, and R².',
    actionLabel: 'VIEW SKILLS MATRIX',
    actionType: 'scroll',
    targetId: 'skills',
  },
  {
    id: 'projects',
    question: 'Show me her projects.',
    pose: 'excited',
    response:
      "Let's explore Anu's academic projects in Machine Learning, price prediction, fraud classification, and exploratory data analysis — including her major Airbnb Price Prediction project and Credit Card Fraud Detection study!",
    fact: 'Click any project card to open its full 11-part technical case study.',
    actionLabel: 'EXPLORE PROJECTS',
    actionType: 'scroll',
    targetId: 'projects',
  },
  {
    id: 'internship',
    question: 'Tell me about her internship.',
    pose: 'celebrating',
    response:
      'Anu completed a one-year Python & Data Science Internship at Glowlogics Solutions (November 2024 – November 2025, Credential ID: DS25-GL03-C080), building preprocessing pipelines and training predictive models in Python and Scikit-learn.',
    fact: 'She is also progressing through the Tata iQ GenAI-Powered No-Code Analytics Job Simulation.',
    actionLabel: 'VIEW EXPERIENCE',
    actionType: 'scroll',
    targetId: 'experience',
  },
  {
    id: 'certificates',
    question: 'Show her certificates.',
    pose: 'presenting',
    response:
      'All 8 of Anu’s verified credentials are uploaded and viewable right here — including Glowlogics Solutions, four Infosys Springboard Generative AI courses, two IBM SkillsBuild badges, and Coursera Project Network.',
    fact: 'You can zoom into any certificate or download the original PDF directly.',
    actionLabel: 'VIEW CERTIFICATES',
    actionType: 'certificates',
    targetId: 'certificates',
  },
  {
    id: 'resume',
    question: 'Where can I download her resume?',
    pose: 'celebrating',
    response:
      'Of course! You can preview and download her official resume (Anu_M_Resume.pdf) immediately — no login or registration required.',
    fact: 'Her Document Centre also includes her Data Science resume, GenAI Analytics resume, and Cover Letter.',
    actionLabel: 'VIEW RESUME',
    actionType: 'resume',
    targetId: 'documents',
  },
  {
    id: 'contact',
    question: 'How can I contact her?',
    pose: 'waving',
    response:
      'You can reach Anu directly at anumuthuraman29@gmail.com, by phone, or connect via LinkedIn and GitHub in the closing Thank You section at the bottom of the page.',
    fact: 'Based in Bengaluru, Karnataka, India — open to AI, ML, and Data Science internships and collaborations.',
    actionLabel: 'VIEW CONTACT LINKS',
    actionType: 'scroll',
    targetId: 'contact',
  },
  {
    id: 'recruiter',
    question: 'Give me the fast recruiter overview.',
    pose: 'excited',
    response:
      'Opening Recruiter Mode gives you a concise, scannable one-page executive summary of Anu’s CGPA, Glowlogics internship, technical stack, projects, verified certificates, and instant resume download.',
    actionLabel: 'OPEN RECRUITER MODE',
    actionType: 'recruiter',
  },
];
