export interface Project {
  id: string;
  title: string;
  category: 'Web Dev' | 'Automation' | 'Creative' | 'Hardware' | 'Administration' | 'Other';
  description: string;
  longDescription: string;
  technologies: string[];
  images: string[];
}

export const PROJECTS: Project[] = [
  {
    id: 'receipt-extraction',
    title: 'AI-Powered Receipt Extraction System',
    category: 'Automation',
    description: 'An end-to-end automation system that uses OCR and AI to instantly extract financial data from receipts.',
    longDescription: 'This project eliminates manual data entry for financial tracking. Using n8n as the orchestrator, it processes incoming photos from a Telegram Bot, applies OCR to read the text, uses AI to parse the specific items and prices, and automatically syncs the data to Google Sheets. It includes validation layers to ensure data accuracy and instant notification to the user.',
    technologies: ['n8n', 'Telegram Bot API', 'OpenAI API/OCR', 'Google Sheets', 'Workflow Automation'],
    images: ['/images/receipt-extraction-1.png', '/images/receipt-extraction-2.png']
  },
  {
    id: 'tirta-sayaga',
    title: 'Tirta Sayaga: E-Ticketing & Reservation System',
    category: 'Web Dev',
    description: 'A robust digital transformation project for Tirta Sayaga, replacing legacy manual systems with a modern online booking architecture.',
    longDescription: 'Developed as my final university thesis project in partnership with BUMD Kabupaten Bogor, this platform serves as a full-stack digital solution for the Tirta Sayaga hot springs. The system effectively migrated a traditional manual ticketing process into a high-performance digital ecosystem. Key features include real-time ticket availability, a secure and encrypted database, and a professional payment gateway integration using Midtrans to ensure seamless, secure transactions for thousands of visitors.',
    technologies: ['Laravel', 'MySQL', 'Bootstrap', 'Midtrans Payment Gateway', 'BUMD Partnership', 'Digital Transformation'],
    images: ['/images/tirta-sayaga.png']
  },
  {
    id: 'techtive',
    title: 'Techtive: No-Code Marketplace Experiment',
    category: 'Web Dev',
    description: 'An experimental tech marketplace built to explore the rapid deployment capabilities of Low-Code/No-Code technologies.',
    longDescription: 'Initiated as a university course challenge, Techtive served as an experimental sandbox to test the limits of modern web development paradigms. I conceptualized and deployed a fully functional tech hardware marketplace using Low-Code/No-Code platforms. This project demonstrated how visual-native website builders can drastically accelerate development lifecycles while still delivering highly polished, functional e-commerce architectures.',
    technologies: ['No-Code Platforms', 'Low-Code Architecture', 'Rapid Prototyping', 'Web Builders', 'Visual Development'],
    images: ['/images/techtive-marketplace.png']
  },
  {
    id: 'pc-troubleshoot',
    title: 'IT Support & PC Optimization',
    category: 'Hardware',
    description: 'Mastering hardware intricacies, troubleshooting, and overclocking techniques for IT stability.',
    longDescription: 'A series of enterprise-level IT support interventions. This includes hardware troubleshooting across large-scale infrastructure, implementing server virtualization using Proxmox, and optimizing network performance using MikroTik routers. It also covers custom-built PC optimization for creative production environments.',
    technologies: ['Hardware Diagnosis', 'Proxmox', 'MikroTik', 'System Performance Tuning'],
    images: ['/images/pc-troubleshoot-1.jpg', '/images/pc-troubleshoot-2.jpg']
  },
  {
    id: 'video-production',
    title: 'Video Production',
    category: 'Creative',
    description: 'High-quality video editing and creative direction for various programs.',
    longDescription: 'During my internship at PT VEGA Instruments, I was responsible for end-to-end documentation including photography and video editing. This involved storyboarding, multi-camera filming, and post-production to create compelling narratives for corporate events and promotional materials.',
    technologies: ['Premiere Pro', 'CapCut', 'Videography', 'Color Grading'],
    images: ['/images/video-production.jpg']
  },
  {
    id: 'jersey-design',
    title: 'Jersey Design',
    category: 'Creative',
    description: 'Bespoke corporate sports apparel bridging company identity with modern aesthetics.',
    longDescription: 'During my internship at PT VEGA Instruments, I was entrusted as the primary creative force for the company\'s apparel needs. I conceptualized and finalized these striking, modern jerseys to outfit the entire workforce for the 17th of August Independence Day competitions. To ensure inclusivity and maximize team spirit, I designed both standard athletic cuts and specialized long-sleeve variants for female employees, uniting the whole office under one bold, high-performance visual identity.',
    technologies: ['Adobe Illustrator', 'Photoshop', 'Apparel Design', 'Vector Illustration'],
    images: ['/images/jersey-design-1.png', '/images/jersey-design-2.png']
  },
  {
    id: 'poster-design',
    title: 'Poster Design',
    category: 'Creative',
    description: 'Impactful visual communication, event branding, and corporate asset design.',
    longDescription: 'During my internship at PT VEGA Instruments Indonesia, I was entrusted to elevate the visual identity of key corporate events. I engineered high-impact poster mockups, exclusive event lanyards, and a comprehensive suite of polished promotional materials. Utilizing a versatile creative stack including Adobe Photoshop and Canva, I delivered striking assets that amplified the company\'s brand presence and transformed the corporate event experience.',
    technologies: ['Photoshop', 'Canva', 'Event Branding', 'Graphic Design'],
    images: ['/images/poster-design-1.png', '/images/poster-design-2.png']
  },
  {
    id: 'audio-engineering',
    title: 'Audio Production & Vocals',
    category: 'Creative',
    description: 'Professional audio production, mixing, and live performance vocals using FL Studio and BandLab.',
    longDescription: 'A collection of audio engineering projects focusing on clarity and impact. Projects range from vocal recording and processing to full track mixing and mastering for live broadcast events. Utilizing a versatile toolset including FL Studio and BandLab, I specialize in creating immersive soundscapes and managing high-pressure live audio environments with professional-grade vocal delivery.',
    technologies: ['FL Studio', 'BandLab', 'Audio Synthesis', 'Mixing & Mastering', 'Vocal Processing'],
    images: ['/images/audio-production.png']
  },
  {
    id: 'unipin-creative',
    title: 'UniPin: Creative Direction & Event Hosting',
    category: 'Creative',
    description: 'End-to-end creative direction, scriptwriting, and front-facing hosting for international esports events.',
    longDescription: 'As a Creative Director and Host at UniPin, I spearheaded the conceptualization and execution of major virtual international esports events. This high-stakes role involved managing cross-regional remote teams, developing impactful scripts for multi-camera broadcasts, and overseeing the production of all visual assets. I served as the primary interface for thousands of viewers, ensuring professional delivery and seamless event flow while utilizing a modern collaboration tech stack to unify global teams.',
    technologies: ['Creative Direction', 'Esports Casting', 'Scriptwriting', 'Broadcast Production', 'Remote Team Management'],
    images: ['/images/unipin-event-1.png', '/images/unipin-event-2.png']
  },
  {
    id: 'office-administration',
    title: 'Professional Office Administration & Strategic Management',
    category: 'Administration',
    description: 'Orchestrating high-level corporate operations through advanced administrative systems and strategic management.',
    longDescription: 'Leveraging my solid academic foundation in Office Management, I’ve mastered the core pillars of corporate structure. This workspace encompasses professional secretarial procedures, executive documentation lifecycle, and strategic resource allocation. My expertise includes streamlining high-volume correspondence, managing complex scheduling, and implementing optimized digital filing systems that bridge traditional administration with modern technical efficiency. I specialize in ensuring operational stability through meticulous financial record-keeping and database management.',
    technologies: ['Strategic Management', 'SAP ERP Fundamentals', 'Advanced MS Office', 'Document Archiving', 'Executive Correspondence', 'Business Workflow'],
    images: ['/images/office-admin.png']
  }
];
