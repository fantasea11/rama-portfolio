import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { ArrowRight, Mail, Phone, Instagram, FileText, Briefcase, GraduationCap, Award, Layers, MessageCircle, X, ChevronRight, ExternalLink, ChevronLeft } from 'lucide-react';
import { PROJECTS, Project } from './constants';

// --- Components ---

function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Portfolio', href: '#portfolio' },
    { name: 'Contact', href: '#contact' }
  ];

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 px-6 py-3 rounded-full transition-all duration-300 ${
        isScrolled ? 'glass' : 'bg-transparent'
      }`}
    >
      <ul className="flex items-center gap-4 md:gap-8">
        {navItems.map((item) => (
          <li key={item.name}>
            <a
              href={item.href}
              onClick={(e) => scrollToSection(e, item.href)}
              className="text-sm font-medium text-gray-400 hover:text-white transition-colors"
            >
              {item.name}
            </a>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
}

function Hero() {
  return (
    <section className="relative min-h-[85vh] md:min-h-screen flex flex-col items-center justify-center pt-20 md:pt-28 px-6">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[500px] aspect-square bg-blue-600/10 rounded-full blur-[80px] md:blur-[120px] pointer-events-none" />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center z-10 flex flex-col items-center"
      >
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="relative w-32 h-32 md:w-44 md:h-44 mb-8 p-1.5 glass rounded-full"
        >
          <img 
            src="https://i.postimg.cc/W1vzp65s/Gemini-Generated-Image-vr34qqvr34qqvr34-removebg-preview.png" 
            alt="Galuh Rama Ismaya" 
            className="w-full h-full object-cover rounded-full"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 rounded-full border-2 border-blue-500/30 animate-pulse pointer-events-none" />
        </motion.div>

        <span className="inline-block px-4 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold tracking-wider uppercase mb-6 border border-blue-500/20">
          Informatics Graduate
        </span>
        <h1 className="text-4xl sm:text-5xl md:text-8xl font-black mb-8 tracking-tighter leading-tight uppercase overflow-hidden">
          HAI! I'M <br className="md:hidden" /> <span className="text-gradient">GALUH RAMA ISMAYA</span>
        </h1>
        <p className="text-base md:text-xl text-gray-400 max-w-2xl mx-auto mb-8 md:mb-10 leading-relaxed font-medium">
          An Informatics graduate with Cum Laude honors (GPA 3.82), 
          offering a unique blend of technical IT expertise and digital creativity.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('portfolio')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-6 py-3.5 md:px-8 md:py-4 bg-white text-black font-bold rounded-full flex items-center gap-2 hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-all text-sm md:text-base"
          >
            Explore My Work <ArrowRight className="w-4 h-4" />
          </motion.button>
          
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => window.open('https://drive.google.com/file/d/18pYa8wwQd35SJasW857gdXY6RhDiwR3x/view?usp=sharing', '_blank')}
            className="px-6 py-3.5 md:px-8 md:py-4 glass text-white font-bold rounded-full hover:bg-white/10 transition-all border border-white/20 flex items-center gap-2 text-sm md:text-base"
          >
            <FileText className="w-4 h-4" /> Download CV
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            className="px-6 py-3.5 md:px-8 md:py-4 glass text-white font-bold rounded-full hover:bg-white/10 transition-all border border-white/20 flex items-center gap-2 text-sm md:text-base"
          >
            <Mail className="w-4 h-4" /> Contact Me
          </motion.button>
        </div>
      </motion.div>

      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-gray-500"
      >
        <div className="w-[1px] h-12 bg-gradient-to-b from-blue-500 to-transparent" />
      </motion.div>
    </section>
  );
}

function SectionHeading({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <div className="mb-8 md:mb-12">
      <motion.h2 
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        className="text-2xl sm:text-4xl md:text-5xl font-black mb-3 md:mb-4 uppercase tracking-tighter"
      >
        {title}
      </motion.h2>
      {subtitle && <p className="text-sm md:text-lg text-gray-400 font-medium tracking-tight max-w-xl">{subtitle}</p>}
    </div>
  );
}

function About() {
  const [activeTab, setActiveTab] = useState('education');

  const tabs = [
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'experience', label: 'Work Experiences', icon: Briefcase },
    { id: 'certification', label: 'Certificates', icon: Award },
    { id: 'seminars', label: 'Seminars & Workshops', icon: Layers }
  ];

  return (
    <section id="about" className="py-16 md:py-24 px-6 max-w-6xl mx-auto">
      <SectionHeading 
        title="About Me" 
        subtitle="Bridging the gap between operational management and technical automation. With a highly versatile skill set spanning Informatics, Office Administration, and Creative Production, I quickly adapt to new environments and master emerging tools. I thrive on identifying process gaps and solving them through high-efficiency AI workflows, always driven by a fast-paced eagerness to learn, innovate, and deliver impactful results."
      />
      
      <div className="flex flex-col md:flex-row gap-6 md:gap-12 mt-10 md:mt-16">
        <div className="grid grid-cols-2 md:flex md:flex-col gap-2 md:gap-3 md:w-1/3">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 md:gap-4 px-3 md:px-6 py-3 md:py-5 rounded-[16px] md:rounded-[24px] transition-all duration-300 text-left relative overflow-hidden group ${
                activeTab === tab.id 
                  ? 'bg-blue-600/10 text-blue-400 border border-blue-500/30' 
                  : 'bg-slate-900/40 border border-transparent hover:border-white/10 text-gray-500 hover:text-gray-300'
              }`}
            >
              {activeTab === tab.id && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-transparent pointer-events-none" 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              )}
              <tab.icon className={`w-4 h-4 md:w-5 md:h-5 z-10 transition-transform duration-300 ${activeTab === tab.id ? 'scale-110' : 'group-hover:scale-110 group-hover:text-gray-400'}`} />
              <span className="text-[10px] md:text-sm font-bold z-10 tracking-wide">{tab.label}</span>
            </button>
          ))}
        </div>
        
        <div className="md:w-2/3 bg-slate-900/40 p-5 md:p-12 rounded-[28px] md:rounded-[40px] min-h-[350px] md:min-h-[400px] border border-white/5 hover:border-blue-500/30 transition-all duration-500 relative overflow-hidden group hover:shadow-2xl hover:shadow-blue-900/20">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="relative z-10 h-full">
            <AnimatePresence mode="wait">
            {activeTab === 'education' && (
              <motion.div
                key="edu"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="bg-slate-900/60 border border-white/10 rounded-[24px] p-6 hover:border-blue-500/30 transition-all duration-300 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative z-10">
                    <div className="flex flex-col md:flex-row md:justify-between tracking-tight mb-2 gap-1 md:gap-4">
                      <h3 className="text-lg md:text-2xl font-black text-white uppercase group-hover:text-blue-400 transition-colors break-words">Universitas Nusa Mandiri</h3>
                      <span className="text-[9px] md:text-[10px] font-black text-gray-500 tracking-[0.1em] md:tracking-[0.2em] uppercase whitespace-nowrap">2021 — 2025</span>
                    </div>
                    <p className="text-blue-400 text-xs font-bold mb-4 tracking-widest uppercase">Informatics (GPA 3.82) • Cum Laude</p>
                    <p className="text-gray-400 leading-relaxed text-sm font-medium">
                      Focused on a multi-disciplinary approach to technology, specializing in Web Development, complex Networking infrastructure, and advanced AI-Powered Workflow Automation. I dedicated my academic journey to mastering the bridge between software architecture and automated intelligence, developing self-sustaining systems through technical rigor.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-6">
                       <span className="px-3 py-1 bg-white/5 border border-white/5 rounded-lg text-[10px] font-bold text-gray-400 uppercase tracking-widest">Web Development</span>
                       <span className="px-3 py-1 bg-white/5 border border-white/5 rounded-lg text-[10px] font-bold text-gray-400 uppercase tracking-widest">Networking</span>
                       <span className="px-3 py-1 bg-white/5 border border-white/5 rounded-lg text-[10px] font-bold text-gray-400 uppercase tracking-widest">AI Workflow Automation</span>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900/60 border border-white/10 rounded-[24px] p-6 hover:border-blue-500/30 transition-all duration-300 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative z-10">
                    <div className="flex flex-col md:flex-row md:justify-between tracking-tight mb-2 gap-1 md:gap-4">
                      <h3 className="text-lg md:text-2xl font-black text-white uppercase group-hover:text-blue-400 transition-colors break-words">SMK Setia Negara</h3>
                      <span className="text-[9px] md:text-[10px] font-black text-gray-500 tracking-[0.1em] md:tracking-[0.2em] uppercase whitespace-nowrap">2018 — 2021</span>
                    </div>
                    <p className="text-gray-500 mb-4 font-bold uppercase text-xs tracking-widest">Office Administration & Management</p>
                    <p className="text-gray-400 leading-relaxed text-sm font-medium">
                      Mastered the core principles of organizational management, providing the essential domain knowledge of how enterprises function. Developed strong foundations in secretarial procedures, financial document processing, correspondence scheduling, and ERP system fundamentals, bridging the theoretical gap for my later technical automation pursuits.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-4 mt-6">
                       <span className="px-3 py-1 bg-white/5 border border-white/5 rounded-lg text-[10px] font-bold text-gray-400 uppercase tracking-widest">Business Administration</span>
                       <span className="px-3 py-1 bg-white/5 border border-white/5 rounded-lg text-[10px] font-bold text-gray-400 uppercase tracking-widest">Secretarial Operations</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'certification' && (
              <motion.div
                key="cert"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="bg-slate-900/60 border border-white/10 rounded-[24px] p-6 hover:border-blue-500/30 transition-all duration-300 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative z-10">
                    <div className="flex flex-col md:flex-row md:justify-between tracking-tight mb-2">
                      <h3 className="text-xl md:text-2xl font-black text-white uppercase group-hover:text-blue-400 transition-colors">MikroTik Certified Network Associate (MTCNA)</h3>
                    </div>
                    <p className="text-blue-400 text-xs font-bold mb-6 tracking-widest uppercase">Credential ID: 2205NA2894</p>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-400 text-sm font-medium">
                      <li className="flex items-center gap-3">
                         <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" /> Routing & Firewall
                      </li>
                      <li className="flex items-center gap-3">
                         <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" /> NAT Configuration
                      </li>
                      <li className="flex items-center gap-3">
                         <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" /> Wireless Networking
                      </li>
                      <li className="flex items-center gap-3">
                         <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" /> Valid until May 2028
                      </li>
                    </ul>
                  </div>
                </div>
              </motion.div>
            )}

            {activeTab === 'seminars' && (
              <motion.div
                key="seminars"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="relative p-8 overflow-hidden bg-slate-900/40 rounded-[24px] border border-white/5 mb-8 group">
                  <div className="absolute top-0 right-0 p-6 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Layers className="w-16 h-16 text-blue-400" />
                  </div>
                  <div className="relative z-10">
                    <p className="text-blue-400 font-black mb-3 flex items-center gap-3 uppercase tracking-widest text-[10px]">
                      <span className="w-8 h-[2px] bg-blue-500/40 rounded-full"></span>
                      Continuous Growth & Innovation
                    </p>
                    <p className="text-gray-400 text-sm font-medium leading-relaxed max-w-2xl">
                      A curated collection of specialized certificates and academic training focused on 
                      <span className="text-white"> AI-driven automation</span>, <span className="text-white">Applied Machine Learning</span>, 
                      and <span className="text-white">Strategic Creative Direction</span>. These represent my ongoing journey 
                      into the future of technical efficiency.
                    </p>
                  </div>
                </div>
                {[
                  {
                    title: "Smart Business: Memprediksi Risiko Dengan Machine Learning",
                    issuer: "Nusa Mandiri University",
                    date: "June 2025",
                    summary: "Implementing risk prediction models for data-driven business optimization.",
                    details: "Learned to build predictive models that identify financial risks and market volatility using advanced ML algorithms."
                  },
                  {
                    title: "Implementation Of Machine Learning Prediction Algorithms",
                    issuer: "Nusa Mandiri University",
                    date: "Nov 2024",
                    summary: "Practical application of predictive analytics in technical workflows.",
                    details: "Focused on supervised learning techniques, including regression and classification models, to solve complex data challenges."
                  },
                  {
                    title: "Building Smart Campus With IoT Technology",
                    issuer: "Nusa Mandiri University",
                    date: "June 2023",
                    summary: "Architecting automated solutions using sensor networks and smart infrastructure.",
                    details: "Explored the integration of hardware and software to enhance organizational efficiency through real-time data monitoring."
                  },
                  {
                    title: "Workshop UI/UX Design For Mobile App Development",
                    issuer: "Nusa Mandiri University",
                    date: "Dec 2022",
                    summary: "Human-centric digital design focused on mobile usability and aesthetic flow.",
                    details: "Practical training in wireframing, user-flow mapping, and high-fidelity prototyping for modern mobile applications."
                  }
                ].map((item, idx) => (
                  <div key={idx} className="bg-slate-900/60 border border-white/10 rounded-[24px] p-6 hover:border-blue-500/30 transition-all duration-300 relative overflow-hidden group">
                    <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div className="relative z-10">
                      <div className="flex flex-col md:flex-row md:justify-between items-start mb-3">
                        <div className="space-y-1">
                          <h4 className="font-black text-white text-base md:text-lg uppercase leading-tight group-hover:text-blue-400 transition-colors pr-4">{item.title}</h4>
                          <p className="text-[10px] text-blue-500 font-bold uppercase tracking-widest">{item.issuer}</p>
                        </div>
                        <span className="text-[10px] font-black text-gray-500 bg-white/5 px-3 py-1 rounded-full uppercase tracking-widest whitespace-nowrap mt-2 md:mt-0 border border-white/10">{item.date}</span>
                      </div>
                      <p className="text-sm font-medium text-gray-300 mb-3 italic">"{item.summary}"</p>
                      <p className="text-xs text-gray-500 leading-relaxed border-t border-white/5 pt-3 group-hover:border-blue-500/30 transition-colors">{item.details}</p>
                    </div>
                  </div>
                ))}
              </motion.div>
            )}

            {activeTab === 'experience' && (
              <motion.div
                key="exp"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="space-y-6"
              >
                <div className="bg-slate-900/60 border border-white/10 rounded-[24px] p-6 hover:border-blue-500/30 transition-all duration-300 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative z-10">
                    <div className="flex flex-col md:flex-row md:justify-between tracking-tight mb-2">
                      <h3 className="text-xl md:text-2xl font-black text-white uppercase group-hover:text-blue-400 transition-colors">Creative Director & Host</h3>
                      <span className="text-[10px] font-black text-gray-500 tracking-[0.2em] uppercase mt-1 md:mt-0">2022 — 2025</span>
                    </div>
                    <p className="text-blue-400 text-xs font-bold mb-4 tracking-widest uppercase">UniPin (Work From Home)</p>
                    <p className="text-gray-400 leading-relaxed text-sm font-medium">
                      Directed end-to-end concepts for virtual international events, managing remote teams and professional broadcast flows. Developed engaging scripts, oversaw visual asset production, and acted as a front-facing host for major esports events. Leveraged remote collaboration tools to coordinate multi-regional teams efficiently.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-6">
                      {['Creative Direction', 'Esports Casting', 'Audio Engineering', 'Live Performance', 'Remote Management'].map(s => (
                        <span key={s} className="px-3 py-1 bg-white/5 border border-white/5 rounded-lg text-[10px] font-bold text-gray-400 uppercase tracking-widest">{s}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900/60 border border-white/10 rounded-[24px] p-6 hover:border-blue-500/30 transition-all duration-300 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative z-10">
                    <div className="flex flex-col md:flex-row md:justify-between tracking-tight mb-2">
                      <h3 className="text-xl md:text-2xl font-black text-white uppercase group-hover:text-blue-400 transition-colors">Multimedia & IT Support Intern</h3>
                      <span className="text-[10px] font-black text-gray-500 tracking-[0.2em] uppercase mt-1 md:mt-0">2024</span>
                    </div>
                    <p className="text-blue-400 text-xs font-bold mb-4 tracking-widest uppercase">PT VEGA Instruments Indonesia</p>
                    <p className="text-gray-400 leading-relaxed text-sm font-medium">
                      Applied <span className="text-white">AI for financial data efficiency</span>, streamlining corporate finance workflows and reducing manual data entry overhead. Designed high-quality visual assets and managed multimedia production for corporate events, including comprehensive HSE (Health, Safety, and Environment) documentation and promotional materials.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-6">
                      {['IT Support', 'AI Data Efficiency', 'Visual Asset Design', 'HSE Documentation'].map(s => (
                        <span key={s} className="px-3 py-1 bg-white/5 border border-white/5 rounded-lg text-[10px] font-bold text-gray-400 uppercase tracking-widest">{s}</span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-slate-900/60 border border-white/10 rounded-[24px] p-6 hover:border-blue-500/30 transition-all duration-300 relative overflow-hidden group">
                  <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="relative z-10">
                    <div className="flex flex-col md:flex-row md:justify-between tracking-tight mb-2">
                      <h3 className="text-xl md:text-2xl font-black text-white uppercase group-hover:text-blue-400 transition-colors">Library System Management</h3>
                      <span className="text-[10px] font-black text-gray-500 tracking-[0.2em] uppercase mt-1 md:mt-0">2019</span>
                    </div>
                    <p className="text-blue-400 text-xs font-bold mb-4 tracking-widest uppercase">Internship at IISIP Jakarta</p>
                    <p className="text-gray-400 leading-relaxed text-sm font-medium">
                      Managed and optimized library lending systems, ensuring accurate tracking of assets and user records. Provided critical on-site technical support for library IT infrastructure, performing routine maintenance and troubleshooting hardware and software issues to maintain high availability.
                    </p>
                    <div className="flex flex-wrap gap-2 mt-6">
                      {['System Administration', 'Database Management', 'IT Support'].map(s => (
                        <span key={s} className="px-3 py-1 bg-white/5 border border-white/5 rounded-lg text-[10px] font-bold text-gray-400 uppercase tracking-widest">{s}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillRadar({ data }: { data: any[] }) {
  return (
    <div className="h-[280px] md:h-[320px] w-full flex items-center justify-center overflow-hidden">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
          <PolarGrid stroke="#ffffff10" />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 600, letterSpacing: '0.05em' }}
          />
          <Radar
            name="Skills"
            dataKey="value"
            stroke="#3b82f6"
            fill="#3b82f6"
            fillOpacity={0.2}
            isAnimationActive={false}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}

function SkillBar({ skill, level, color }: { skill: string; level: number; color: string; key?: React.Key }) {
  return (
    <div className="group">
      <div className="flex justify-between items-end mb-2">
        <span className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">{skill}</span>
        <span className="text-[10px] font-mono text-blue-400/80">{level}%</span>
      </div>
      <div className="h-1 w-full bg-slate-800/50 rounded-full overflow-hidden">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${level}%` }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true }}
          className={`h-full ${color} rounded-full`}
        />
      </div>
    </div>
  );
}

function Skills() {
  const skillGroups = [
    {
      title: "Technical IT",
      skills: ["IT Support Infrastructure", "System Administration", "Database Management", "MikroTik Networking", "Hardware & PC Optimization"]
    },
    {
      title: "Automation & Dev",
      skills: ["n8n Workflow Automation", "AI & ML Implementation", "Laravel (PHP)", "Node.js (JavaScript/TS)", "PostgreSQL/MySQL", "Proxmox Virtualization"]
    },
    {
      title: "Strategic Administration",
      skills: ["Office Management", "SAP & ERP Operations", "Strategic Planning", "Advanced MS Office & Google Workspace", "Secretarial Procedures", "Correspondence & Filing"]
    },
    {
      title: "Creative Production",
      skills: ["Creative Direction", "Video Editing (Premiere/CapCut)", "Audio Engineering (FL Studio)", "Mixing & Mastering", "UI/UX Design (Figma/Canva)", "Fluent in English"]
    }
  ];

  const proficiencies = [
    { skill: "Automation", level: 98, color: "bg-blue-500" },
    { skill: "IT Support", level: 95, color: "bg-blue-400" },
    { skill: "Web Dev", level: 90, color: "bg-blue-600" },
    { skill: "Administration", level: 94, color: "bg-cyan-500" },
    { skill: "Multimedia", level: 88, color: "bg-indigo-400" },
    { skill: "English", level: 100, color: "bg-sky-500" }
  ];

  const radarData = proficiencies.map(p => ({
    subject: p.skill,
    value: p.level,
    fullMark: 100
  }));

  return (
    <section id="skills" className="py-20 md:py-32 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 md:gap-6 mb-10 md:mb-16">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
        >
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase mb-4">
            SKILLS & <span className="text-gradient">PROFICIENCY</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl font-medium tracking-tight">
            A cross-disciplinary toolkit combining technical infrastructure with high-end creative output.
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-6">
        {/* Radar Map - Large Feature */}
        <motion.div 
          whileHover={{ y: -8, transition: { duration: 0.3 } }}
          className="lg:col-span-2 lg:row-span-2 bg-slate-900/40 border border-white/5 rounded-[32px] md:rounded-[40px] p-6 md:p-8 flex flex-col items-center justify-center min-h-[350px] md:min-h-[400px] hover:border-blue-500/30 hover:bg-slate-900/60 transition-all duration-300 group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="text-center mb-4 relative z-10">
            <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] group-hover:tracking-[0.4em] transition-all">Competency Radar</span>
            <h3 className="text-lg font-bold text-white mt-1 uppercase">Skill Mapping</h3>
          </div>
          <div className="relative z-10 w-full">
            <SkillRadar data={radarData} />
          </div>
        </motion.div>

        {/* Proficiency Matrix - Vertical List */}
        <motion.div 
          whileHover={{ y: -8, transition: { duration: 0.3 } }}
          className="lg:col-span-2 bg-slate-900/40 border border-white/5 rounded-[32px] md:rounded-[40px] p-6 md:p-10 hover:border-blue-500/30 hover:bg-slate-900/60 transition-all duration-300 group relative overflow-hidden"
        >
          <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-10">
              <h3 className="text-xs font-black text-white uppercase tracking-[0.3em]">Proficiency Matrix</h3>
              <div className="h-[1px] flex-1 bg-white/10 group-hover:bg-blue-500/20 transition-colors" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 md:gap-y-8">
              {proficiencies.map((p) => (
                <SkillBar key={p.skill} skill={p.skill} level={p.level} color={p.color} />
              ))}
            </div>
          </div>
        </motion.div>

        {/* Categorical Breakdown - Bento Items */}
        {skillGroups.map((group, i) => (
          <motion.div 
            key={group.title}
            whileHover={{ y: -8, transition: { duration: 0.3 } }}
            className={`p-8 bg-slate-900/40 border border-white/5 rounded-[32px] flex flex-col justify-between hover:border-blue-500/30 hover:bg-slate-900/60 transition-all duration-300 group relative overflow-hidden ${
              i >= 2 ? 'lg:col-span-2' : ''
            }`}
          >
            <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
            <div className="relative z-10">
              <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-6 group-hover:text-blue-400 transition-colors">{group.title}</h3>
              <div className="flex flex-wrap gap-2">
                {group.skills.map(skill => (
                  <span key={skill} className="px-3 py-1.5 rounded-lg bg-white/5 text-[11px] font-bold text-slate-300 border border-white/5 group-hover:border-blue-500/20 group-hover:bg-blue-500/5 transition-all">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function ProjectModal({ project, isOpen, onClose }: { project: Project | null; isOpen: boolean; onClose: () => void }) {
  if (!project) return null;

  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleScroll = () => {
    if (scrollRef.current) {
      const index = Math.round(scrollRef.current.scrollLeft / scrollRef.current.clientWidth);
      if (index !== currentIndex) {
        setCurrentIndex(index);
      }
    }
  };

  const nextImage = () => {
    if (project.images.length > 1 && scrollRef.current) {
      const next = (currentIndex + 1) % project.images.length;
      scrollRef.current.scrollTo({
        left: scrollRef.current.clientWidth * next,
        behavior: 'smooth'
      });
      setCurrentIndex(next);
    }
  };

  const prevImage = () => {
    if (project.images.length > 1 && scrollRef.current) {
      const prev = (currentIndex - 1 + project.images.length) % project.images.length;
      scrollRef.current.scrollTo({
        left: scrollRef.current.clientWidth * prev,
        behavior: 'smooth'
      });
      setCurrentIndex(prev);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
        >
          {/* Overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/95 backdrop-blur-xl cursor-pointer" 
          />
          
          {/* Modal Container */}
          <motion.div
            layoutId={`project-${project.id}`}
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="relative w-full max-w-6xl max-h-[90vh] glass rounded-[32px] md:rounded-[40px] overflow-hidden flex flex-col border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.8)]"
          >
            {/* Close Button */}
            <button 
              onClick={onClose}
              className="absolute top-6 right-6 z-50 p-3 rounded-full bg-black/40 text-white backdrop-blur-md border border-white/10 hover:bg-black/60 transition-all hover:scale-110 active:scale-95"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Content Scroller */}
            <div className="w-full h-full overflow-y-auto no-scrollbar flex flex-col">
              {/* Image Gallery Header */}
              <div className="w-full bg-slate-950/40 relative min-h-[300px] md:min-h-[450px] flex items-center justify-center p-6 md:p-12 overflow-hidden border-b border-white/5 group/gallery">
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-slate-950/20" />
                
                <div 
                  ref={scrollRef}
                  onScroll={handleScroll}
                  className="w-full h-full flex overflow-x-auto snap-x snap-mandatory no-scrollbar gap-8 items-center"
                >
                  {project.images.map((img, idx) => (
                    <div key={idx} className="flex-none w-full snap-center flex items-center justify-center py-4">
                      <div className="relative max-w-full">
                        <img 
                          src={img} 
                          alt={`${project.title} documentation ${idx + 1}`}
                          className="max-w-full max-h-[40vh] md:max-h-[55vh] object-contain rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.6)] border border-white/10"
                          referrerPolicy="no-referrer"
                        />
                        <div className="absolute top-4 left-4 px-3 py-1.5 rounded-xl bg-black/60 backdrop-blur-xl border border-white/10 text-[9px] font-black text-white/50 uppercase tracking-[0.2em] shadow-lg">
                          Asset 0{idx + 1}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Indicator Bar */}
              {project.images.length > 1 && (
                <div className="flex items-center justify-center py-4 bg-slate-950/20 border-b border-white/5 gap-8">
                  <button 
                    onClick={prevImage}
                    className="p-2 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-all active:scale-95"
                    title="Previous Image"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <div className="flex items-center gap-4 opacity-50">
                    <div className="flex gap-1.5">
                      {project.images.map((_, i) => (
                        <div 
                          key={i} 
                          className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${i === currentIndex ? 'bg-blue-500 w-4' : 'bg-white/20'}`} 
                        />
                      ))}
                    </div>
                    <span className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] whitespace-nowrap">
                      {currentIndex + 1} / {project.images.length}
                    </span>
                  </div>

                  <button 
                    onClick={nextImage}
                    className="p-2 rounded-full hover:bg-white/10 text-white/50 hover:text-white transition-all active:scale-95"
                    title="Next Image"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}

              {/* Information Section */}
              <div className="p-8 md:p-16 flex flex-col md:flex-row gap-12 bg-slate-900/10">
                <div className="md:w-1/2">
                   <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em] mb-4 block">Portfolio Showcase</span>
                   <h2 className="text-2xl sm:text-3xl md:text-5xl font-black text-white uppercase tracking-tighter leading-[0.95] mb-6">
                     {project.title}
                   </h2>
                   <div className="flex flex-wrap gap-2">
                     <span className="px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-[10px] font-bold text-blue-400 uppercase tracking-widest leading-none">
                       {project.category}
                     </span>
                   </div>
                </div>

                <div className="md:w-1/2 space-y-12">
                  <section>
                    <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-5">Strategic Perspective</h3>
                    <p className="text-gray-400 text-base leading-relaxed font-medium">
                      {project.longDescription}
                    </p>
                  </section>

                  <section>
                    <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-5">Applied Technologies</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="text-[10px] uppercase tracking-widest font-black px-3 py-1.5 rounded bg-white/5 text-gray-500 border border-white/10 hover:border-blue-500/30 hover:text-blue-400 hover:bg-blue-500/5 transition-all cursor-default">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </section>

                  <div className="pt-8 border-t border-white/5 text-center md:text-left">
                    <button 
                      onClick={onClose}
                      className="px-10 py-5 rounded-full bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] hover:scale-105 active:scale-95 transition-all shadow-xl shadow-white/5 w-full md:w-auto"
                    >
                      Exit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function ProjectCard({ project, onClick }: { project: Project; onClick: () => void }) {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      whileHover={{ y: -10 }}
      onClick={onClick}
      className="group relative glass rounded-[32px] md:rounded-[40px] overflow-hidden cursor-pointer interactive border border-white/5 hover:border-blue-500/30 transition-all duration-500 h-full flex flex-col"
    >
      <div className="aspect-[4/3] relative overflow-hidden bg-slate-900">
        <img 
          src={project.images[0]} 
          alt={project.title}
          className="w-full h-full object-cover opacity-60 group-hover:opacity-40 group-hover:scale-110 transition-all duration-700"
          referrerPolicy="no-referrer"
        />
        
        {/* Overlay Decoration */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
        
        {/* Hover Icon */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <div className="w-14 h-14 rounded-full bg-blue-600 flex items-center justify-center text-white shadow-2xl shadow-blue-600/50 scale-50 group-hover:scale-100 transition-transform duration-500">
            <ChevronRight className="w-8 h-8" />
          </div>
        </div>

        {/* Category Badge */}
        <div className="absolute top-6 left-6">
          <span className="px-3 py-1 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-[9px] font-black text-white/70 uppercase tracking-[0.2em]">
            {project.category}
          </span>
        </div>
      </div>
      
      <div className="p-8 flex flex-col flex-1">
        <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tighter leading-tight mb-4 group-hover:text-blue-400 transition-colors">
          {project.title}
        </h3>
        <p className="text-gray-400 text-sm font-medium leading-relaxed mb-6 line-clamp-2">
          {project.description}
        </p>
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.technologies.slice(0, 3).map(tech => (
            <span key={tech} className="text-[9px] uppercase tracking-widest font-black px-2 py-1 rounded bg-white/5 text-gray-500 border border-white/5 group-hover:border-blue-500/20 group-hover:text-blue-400 group-hover:bg-blue-500/5 transition-all">
              {tech}
            </span>
          ))}
          {project.technologies.length > 3 && (
            <span className="text-[9px] font-black text-gray-600 px-2 py-1">+ {project.technologies.length - 3} MORE</span>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function Portfolio() {
  const [filter, setFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const categories = ['All', 'Web Dev', 'Automation', 'Creative', 'Hardware', 'Administration'];

  const filteredProjects = filter === 'All' 
    ? PROJECTS 
    : PROJECTS.filter(p => p.category === filter);

  return (
    <section id="portfolio" className="py-16 md:py-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div className="space-y-4">
          <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em]">Showcase</span>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter uppercase">
            SELECTED <span className="text-gradient">WORKS</span>
          </h2>
          <p className="text-gray-400 text-lg max-w-xl font-medium tracking-tight">
            A curated selection of technical systems, high-end design, and process automation.
          </p>
        </div>
        
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all ${
                filter === cat 
                  ? 'bg-blue-600 text-white shadow-xl shadow-blue-600/30' 
                  : 'glass text-gray-500 hover:text-white border border-white/5'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      <motion.div 
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-8"
      >
        <AnimatePresence mode="popLayout">
          {filteredProjects.map((project) => (
            <motion.div key={project.id}> 
              <ProjectCard project={project} onClick={() => setSelectedProject(project)} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      <ProjectModal 
        project={selectedProject} 
        isOpen={!!selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="py-16 md:py-24 px-6 max-w-4xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="glass p-8 md:p-20 rounded-[32px] md:rounded-[40px] relative overflow-hidden"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
        
        <h2 className="text-3xl sm:text-4xl md:text-6xl font-black mb-8 leading-tight">READY TO <span className="text-gradient">COLLABORATE?</span></h2>
        <p className="text-gray-400 text-base md:text-lg mb-12 max-w-xl mx-auto font-medium">
          Feel free to reach out for projects, collaborations, or just a digital handshake.
        </p>
        
        <div className="flex flex-col items-center justify-center gap-10 md:gap-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 w-full max-w-2xl">
            <div className="flex flex-col items-center gap-4 p-6 md:p-8 glass rounded-3xl">
              <div className="p-3 md:p-4 rounded-full bg-blue-500/10 text-blue-400">
                <Mail className="w-6 h-6 md:w-8 md:h-8" />
              </div>
              <div className="text-center w-full overflow-hidden">
                <p className="text-[10px] md:text-xs font-black text-gray-500 uppercase tracking-widest mb-2">Email Me</p>
                <p className="text-sm sm:text-base md:text-xl font-black select-all cursor-text text-white break-all">fantaseaindo@gmail.com</p>
              </div>
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=fantaseaindo@gmail.com" target="_blank" rel="noreferrer" className="text-xs md:text-sm font-bold text-blue-500 hover:text-blue-400 transition-colors">Direct Mail (Gmail) →</a>
            </div>
            
            <div className="flex flex-col items-center gap-4 p-6 md:p-8 glass rounded-3xl">
              <div className="p-3 md:p-4 rounded-full bg-blue-500/10 text-blue-400">
                <MessageCircle className="w-6 h-6 md:w-8 md:h-8" />
              </div>
              <div className="text-center w-full overflow-hidden">
                <p className="text-[10px] md:text-xs font-black text-gray-500 uppercase tracking-widest mb-2">WhatsApp Me</p>
                <p className="text-sm sm:text-base md:text-xl font-black select-all cursor-text text-white">+62 895 365 146160</p>
              </div>
              <a href="https://wa.me/62895365146160" target="_blank" rel="noreferrer" className="text-xs md:text-sm font-bold text-blue-500 hover:text-blue-400 transition-colors">Chat on WhatsApp →</a>
            </div>
          </div>

          <div className="flex flex-col items-center gap-6">
            <div className="flex items-center gap-3">
              <h4 className="text-sm font-bold text-gray-600 uppercase tracking-widest">Connect</h4>
              <div className="w-12 h-[1px] bg-white/10" />
            </div>
            <a 
              href="https://instagram.com/rama_ismaya" 
              target="_blank" 
              rel="noreferrer"
              className="flex items-center gap-3 px-8 py-4 glass rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-all group"
            >
              <Instagram className="w-6 h-6" />
              <span className="font-bold pr-2 tracking-tight">@rama_ismaya</span>
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <p className="text-gray-500 font-medium">© 2026 • GALUH RAMA ISMAYA</p>
        <div className="flex items-center gap-8 text-sm text-gray-500">
           <a href="#about" className="hover:text-white transition-colors">About</a>
           <a href="#portfolio" className="hover:text-white transition-colors">Projects</a>
           <a href="mailto:fantaseaindo@gmail.com" className="hover:text-white transition-colors">Contact</a>
        </div>
      </div>
    </footer>
  );
}

// --- Main App ---

export default function App() {
  // Smooth scroll logic is handled by standard HTML href + scroll-behavior: smooth in CSS
  // but we can ensure a nice entry animation for the whole page
  
  return (
    <div className="relative font-sans antialiased text-white selection:bg-blue-500/30 selection:text-blue-200">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Skills />
        <Portfolio />
        <Contact />
      </main>
      <Footer />
      
      {/* Decorative background elements */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none -z-10 bg-[#0a0a0b]">
        {/* Garis-garis abstract pattern (Tech Grid) */}
        <div 
          className="absolute inset-0 opacity-[0.05]"
          style={{
             backgroundImage: `
               linear-gradient(to right, #ffffff 1px, transparent 1px),
               linear-gradient(to bottom, #ffffff 1px, transparent 1px)
             `,
             backgroundSize: '4rem 4rem',
             backgroundPosition: 'center center'
          }}
        />
        
        {/* Diagonal abstract lines */}
        <div 
          className="absolute inset-0 opacity-[0.03]"
          style={{
             backgroundImage: `
               repeating-linear-gradient(45deg, transparent, transparent 60px, #3b82f6 60px, #3b82f6 61px),
               repeating-linear-gradient(-45deg, transparent, transparent 60px, #8b5cf6 60px, #8b5cf6 61px)
             `,
             backgroundPosition: 'center center'
          }}
        />

        {/* Radial gradient mask to fade the lines at the edges */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_1000px_at_50%_40%,transparent_0%,#0a0a0b_80%)]" />

        {/* Cinematic noise texture */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.06] mix-blend-overlay" />
      </div>
    </div>
  );
}
