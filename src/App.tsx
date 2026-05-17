import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { ArrowRight, Mail, Phone, Instagram, FileText, Briefcase, GraduationCap, Award, Layers, MessageCircle, X, ChevronRight, ExternalLink, ChevronLeft, Linkedin, Github, Music2 } from 'lucide-react';
import { PROJECTS, Project } from './constants';

function TikTokIcon({ className = "" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M12.5 4c1.5 0 2.8.8 3.5 2 1 1.7 1 3.7 0 5.4-.7 1.2-1.8 2.1-3.2 2.5v-6c0-2.2 1.8-4 4-4v2c-1.1 0-2 .9-2 2v6c-1.9-.4-3.4-2-3.4-4v-8"/>
    </svg>
  );
}

function DiscordIcon({ className = "" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 -28.5 256 256" 
      fill="currentColor" 
      className={className}
    >
      <path d="M216.856339,16.5966031 C200.285002,8.84328665 182.566144,3.2084988 164.041564,0 C161.766523,4.11318106 159.108624,9.64549908 157.276099,14.0464379 C137.583995,11.0849896 118.072967,11.0849896 98.7430163,14.0464379 C96.9108417,9.64549908 94.1925838,4.11318106 91.8971895,0 C73.3526068,3.2084988 55.6133949,8.86399117 39.0420583,16.6376612 C5.61752293,67.146514 -3.4433191,116.400813 1.08711069,164.955721 C23.2560196,181.510915 44.7403634,191.567697 65.8621325,198.148576 C71.0772151,190.971126 75.7283628,183.341335 79.7352139,175.300261 C72.104019,172.400575 64.7949724,168.822202 57.8887866,164.667963 C59.7209612,163.310589 61.5131304,161.891452 63.2445898,160.431257 C105.36741,180.133187 151.134928,180.133187 192.754523,160.431257 C194.506336,161.891452 196.298154,163.310589 198.110326,164.667963 C191.183787,168.842556 183.854737,172.420929 176.223542,175.320965 C180.230393,183.341335 184.861538,190.991831 190.096624,198.16893 C211.238746,191.588051 232.743023,181.531619 254.911949,164.955721 C260.227747,108.668201 245.831087,59.8662432 216.856339,16.5966031 Z M85.4738752,135.09489 C72.8290281,135.09489 62.4592217,123.290155 62.4592217,108.914901 C62.4592217,94.5396472 72.607595,82.7145587 85.4738752,82.7145587 C98.3405064,82.7145587 108.709962,94.5189427 108.488529,108.914901 C108.508531,123.290155 98.3405064,135.09489 85.4738752,135.09489 Z M170.525237,135.09489 C157.88039,135.09489 147.510584,123.290155 147.510584,108.914901 C147.510584,94.5396472 157.658606,82.7145587 170.525237,82.7145587 C183.391518,82.7145587 193.761324,94.5189427 193.539891,108.914901 C193.539891,123.290155 183.391518,135.09489 170.525237,135.09489 Z"></path>
    </svg>
  );
}

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
              className="text-sm font-bold text-gray-400 hover:text-white transition-colors tracking-tight font-display"
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
  const [profilePicture, setProfilePicture] = useState('/images/profile-picture-default.png');

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data.profilePicture) setProfilePicture(data.profilePicture);
      })
      .catch(err => console.error("Failed to fetch settings", err));
  }, []);

  return (
    <section className="relative min-h-[85vh] md:min-h-screen flex flex-col items-center justify-center pt-20 md:pt-28 px-6 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 w-full max-w-[500px] aspect-square bg-blue-600/15 rounded-full blur-[80px] md:blur-[120px] pointer-events-none animate-breathing-glow" />
      
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center z-10 flex flex-col items-center w-full max-w-4xl mx-auto"
      >
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="relative w-32 h-32 md:w-44 md:h-44 mb-8 p-1.5 glass rounded-full mx-auto"
        >
          <img 
            src={profilePicture} 
            alt="Galuh Rama Ismaya" 
            className="w-full h-full object-cover rounded-full select-none"
            referrerPolicy="no-referrer"
            draggable={false}
          />
          <div className="absolute inset-0 rounded-full border-2 border-blue-500/30 animate-pulse pointer-events-none" />
        </motion.div>

        <span className="inline-block px-4 py-1 rounded-full bg-blue-500/10 text-blue-400 text-xs font-semibold tracking-wider uppercase mb-6 border border-blue-500/20">
          Informatics Graduate
        </span>
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-black mb-8 tracking-tighter leading-tight uppercase overflow-hidden font-display">
          HAI! I'M <span className="text-gradient">GALUH RAMA ISMAYA</span>
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
        className="text-2xl sm:text-3xl md:text-4xl font-black mb-3 md:mb-4 uppercase tracking-tighter font-display"
      >
        {title}
      </motion.h2>
      {subtitle && <p className="text-sm md:text-lg text-gray-400 font-medium tracking-tight max-w-xl">{subtitle}</p>}
    </div>
  );
}

function About() {
  const [activeTab, setActiveTab] = useState('education');
  const [selectedCert, setSelectedCert] = useState<string | null>(null);

  const [educationData, setEducationData] = useState<any[]>([]);
  const [experienceData, setExperienceData] = useState<any[]>([]);
  const [certificationData, setCertificationData] = useState<any[]>([]);
  const [seminarsData, setSeminarsData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      fetch('/api/education').then(res => res.json()),
      fetch('/api/experience').then(res => res.json()),
      fetch('/api/certification').then(res => res.json()),
      fetch('/api/seminars').then(res => res.json())
    ]).then(([edu, exp, cert, sem]) => {
      if(Array.isArray(edu)) setEducationData(edu);
      if(Array.isArray(exp)) setExperienceData(exp);
      if(Array.isArray(cert)) setCertificationData(cert);
      if(Array.isArray(sem)) setSeminarsData(sem);
    }).catch(console.error)
    .finally(() => setIsLoading(false));
  }, []);

  const tabs = [
    { id: 'education', label: 'Education', icon: GraduationCap },
    { id: 'experience', label: 'Work Experiences', icon: Briefcase },
    { id: 'certification', label: 'Certificates', icon: Award },
    { id: 'seminars', label: 'Seminars & Workshops', icon: Layers }
  ];

  return (
    <section id="about" className="py-16 md:py-24 px-6 max-w-6xl mx-auto">
      <SectionHeading 
        title="ABOUT ME" 
        subtitle="Bridging the gap between operational management and technical automation. With a highly versatile skill set spanning Informatics, Office Administration, and Creative Production, I quickly adapt to new environments and master emerging tools. I thrive on identifying process gaps and solving them through high-efficiency AI workflows, always driven by a fast-paced eagerness to learn, innovate, and deliver impactful results."
      />
      
      <div className="flex flex-col md:flex-row gap-6 md:gap-12 mt-10 md:mt-16">
        {/* Navigation Tabs */}
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
            {isLoading ? (
              <div className="flex items-center justify-center h-full min-h-[300px]">
                <div className="w-8 h-8 border-2 border-blue-500/30 border-t-blue-500 rounded-full animate-spin" />
              </div>
            ) : (
              <AnimatePresence mode="wait">
              {activeTab === 'education' && (
                <motion.div
                  key="edu"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="space-y-6"
                >
                  {educationData.length > 0 ? educationData.map((item, idx) => (
                    <div key={idx} className="bg-slate-900/60 border border-white/10 rounded-[24px] p-6 hover:border-blue-500/30 transition-all duration-300 relative overflow-hidden group">
                      <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="relative z-10">
                        <div className="flex flex-col md:flex-row md:justify-between tracking-tight mb-2 gap-1 md:gap-4">
                          <h3 className="text-lg md:text-2xl font-black text-white uppercase group-hover:text-blue-400 transition-colors break-words font-display">{item.title}</h3>
                          <span className="text-[9px] md:text-[10px] font-black text-gray-500 tracking-[0.1em] md:tracking-[0.2em] uppercase whitespace-nowrap">{item.date}</span>
                        </div>
                        <p className="text-blue-400 text-xs font-bold mb-4 tracking-widest uppercase">{item.subtitle}</p>
                        <p className="text-gray-400 leading-relaxed text-sm font-medium">{item.description}</p>
                        <div className="flex flex-wrap gap-2 mt-6">
                           {item.tags?.map((tag: string) => (
                             <span key={tag} className="px-3 py-1 bg-white/5 border border-white/5 rounded-lg text-[10px] font-bold text-gray-400 uppercase tracking-widest">{tag}</span>
                           ))}
                        </div>
                      </div>
                    </div>
                  )) : (
                    <div className="flex items-center justify-center py-20 text-gray-500 uppercase font-black tracking-widest text-xs">No entries found</div>
                  )}
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
                  {certificationData.length > 0 ? certificationData.map((cert, idx) => (
                    <div key={idx} className="bg-slate-900/60 border border-white/10 rounded-[24px] p-6 hover:border-blue-500/30 transition-all duration-300 relative overflow-hidden group flex flex-col">
                      <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="relative z-10 flex-1">
                        <div className="flex flex-col md:flex-row md:justify-between tracking-tight mb-2">
                          <h3 className="text-xl md:text-2xl font-black text-white uppercase group-hover:text-blue-400 transition-colors font-display">{cert.title}</h3>
                        </div>
                        <p className="text-blue-400 text-xs font-bold mb-6 tracking-widest uppercase">{cert.subtitle}</p>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-400 text-sm font-medium mb-5">
                          {cert.features?.map((feature: string, fIdx: number) => (
                            <li key={fIdx} className="flex items-center gap-3">
                               <div className="w-1.5 h-1.5 bg-blue-500 rounded-full" /> {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                      {cert.image && (
                        <div className="relative z-10 mt-auto pt-2">
                          <button 
                            onClick={() => setSelectedCert(cert.image)}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-blue-500/20 hover:text-white transition-colors w-max"
                          >
                            <Award className="w-3.5 h-3.5" /> View Certificate
                          </button>
                        </div>
                      )}
                    </div>
                  )) : (
                    <div className="flex items-center justify-center py-20 text-gray-500 uppercase font-black tracking-widest text-xs">No entries found</div>
                  )}
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
                  {seminarsData.length > 0 ? seminarsData.map((item, idx) => (
                    <div key={idx} className="bg-slate-900/60 border border-white/10 rounded-[24px] p-6 hover:border-blue-500/30 transition-all duration-300 relative overflow-hidden group flex flex-col">
                      <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="relative z-10 flex-1">
                        <div className="flex flex-col md:flex-row md:justify-between items-start mb-3">
                          <div className="space-y-1">
                            <h4 className="font-black text-white text-base md:text-lg uppercase leading-tight group-hover:text-blue-400 transition-colors pr-4">{item.title}</h4>
                            <p className="text-[10px] text-blue-500 font-bold uppercase tracking-widest">{item.issuer}</p>
                          </div>
                          <span className="text-[10px] font-black text-gray-500 bg-white/5 px-3 py-1 rounded-full uppercase tracking-widest whitespace-nowrap mt-2 md:mt-0 border border-white/10">{item.date}</span>
                        </div>
                        <p className="text-sm font-medium text-gray-300 mb-3 italic">"{item.summary}"</p>
                        <p className="text-xs text-gray-500 leading-relaxed border-t border-white/5 pt-3 group-hover:border-blue-500/30 transition-colors mb-5">{item.details}</p>
                      </div>
                      {item.image && (
                        <div className="relative z-10 mt-auto pt-2">
                          <button 
                            onClick={() => setSelectedCert(item.image)}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-xl text-[10px] font-bold uppercase tracking-widest hover:bg-blue-500/20 hover:text-white transition-colors"
                          >
                            <Award className="w-3.5 h-3.5" /> View Certificate
                          </button>
                        </div>
                      )}
                    </div>
                  )) : (
                    <div className="flex items-center justify-center py-20 text-gray-500 uppercase font-black tracking-widest text-xs">No entries found</div>
                  )}
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
                  {experienceData.length > 0 ? experienceData.map((item, idx) => (
                    <div key={idx} className="bg-slate-900/60 border border-white/10 rounded-[24px] p-6 hover:border-blue-500/30 transition-all duration-300 relative overflow-hidden group">
                      <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="relative z-10">
                        <div className="flex flex-col md:flex-row md:justify-between tracking-tight mb-2">
                          <h3 className="text-xl md:text-2xl font-black text-white uppercase group-hover:text-blue-400 transition-colors font-display">{item.title}</h3>
                          <span className="text-[10px] font-black text-gray-500 tracking-[0.2em] uppercase mt-1 md:mt-0">{item.date}</span>
                        </div>
                        <p className="text-blue-400 text-xs font-bold mb-4 tracking-widest uppercase">{item.subtitle}</p>
                        <p className="text-gray-400 leading-relaxed text-sm font-medium">{item.description}</p>
                        <div className="flex flex-wrap gap-2 mt-6">
                          {item.tags?.map((s: string) => (
                            <span key={s} className="px-3 py-1 bg-white/5 border border-white/5 rounded-lg text-[10px] font-bold text-gray-400 uppercase tracking-widest">{s}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )) : (
                    <div className="flex items-center justify-center py-20 text-gray-500 uppercase font-black tracking-widest text-xs">No entries found</div>
                  )}
                </motion.div>
              )}
              </AnimatePresence>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedCert && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedCert(null)}
              className="absolute inset-0 bg-black/95 backdrop-blur-xl cursor-pointer" 
            />
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="relative w-full max-w-4xl max-h-[90vh] glass rounded-[32px] md:rounded-[40px] overflow-hidden flex flex-col border border-white/10 shadow-[0_0_100px_rgba(0,0,0,0.8)] z-10"
            >
              <button 
                onClick={() => setSelectedCert(null)}
                className="absolute top-4 right-4 md:top-6 md:right-6 z-50 p-2 md:p-3 rounded-full bg-black/40 text-white backdrop-blur-md border border-white/10 hover:bg-black/60 transition-all hover:scale-110 active:scale-95"
              >
                <X className="w-5 h-5" />
              </button>
              <div className="w-full h-full overflow-y-auto no-scrollbar p-4 md:p-12 flex items-center justify-center bg-slate-950/40">
                <img 
                  src={selectedCert} 
                  alt="Certificate" 
                  className="max-w-full max-h-[80vh] object-contain rounded-xl border border-white/10 shadow-2xl" 
                />
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
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
  const [skillGroups, setSkillGroups] = useState<any[]>([]);
  const [proficiencies, setProficiencies] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    Promise.all([
      fetch('/api/skillGroups').then(res => res.json()),
      fetch('/api/proficiencies').then(res => res.json())
    ]).then(([groups, profs]) => {
      if (Array.isArray(groups)) setSkillGroups(groups);
      if (Array.isArray(profs)) setProficiencies(profs);
    }).catch(console.error)
    .finally(() => setIsLoading(false));
  }, []);

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
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase mb-4 font-display">
            SKILLS & <span className="text-gradient">PROFICIENCIES</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-xl font-medium tracking-tight">
            A cross-disciplinary toolkit combining technical infrastructure with high-end creative output.
          </p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 md:gap-6">
        {isLoading ? (
          <>
            <div className="lg:col-span-2 lg:row-span-2 glass animate-pulse min-h-[400px] rounded-[40px]" />
            <div className="lg:col-span-2 glass animate-pulse h-[200px] rounded-[40px]" />
            <div className="lg:col-span-1 glass animate-pulse h-[150px] rounded-[32px]" />
            <div className="lg:col-span-1 glass animate-pulse h-[150px] rounded-[32px]" />
          </>
        ) : (
          <>
            {/* Radar Map - Large Feature */}
            <motion.div 
              whileHover={{ y: -8, transition: { duration: 0.3 } }}
              className="lg:col-span-2 lg:row-span-2 bg-slate-900/40 border border-white/5 rounded-[32px] md:rounded-[40px] p-6 md:p-8 flex flex-col items-center justify-center min-h-[350px] md:min-h-[400px] hover:border-blue-500/30 hover:bg-slate-900/60 transition-all duration-300 group relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="text-center mb-4 relative z-10">
                <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] group-hover:tracking-[0.4em] transition-all">Competency Radar</span>
                <h3 className="text-lg font-bold text-white mt-1 uppercase font-display">Skill Mapping</h3>
              </div>
              <div className="relative z-10 w-full">
                {radarData.length > 0 ? <SkillRadar data={radarData} /> : <div className="h-[200px] flex items-center justify-center text-gray-600 text-[10px] font-black uppercase tracking-[0.2em]">No Data</div>}
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
                  <h3 className="text-xs font-black text-white uppercase tracking-[0.3em] font-display">Proficiency Matrix</h3>
                  <div className="h-[1px] flex-1 bg-white/10 group-hover:bg-blue-500/20 transition-colors" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 md:gap-y-8">
                  {proficiencies.length > 0 ? proficiencies.map((p) => (
                    <SkillBar key={p.skill} skill={p.skill} level={p.level} color={p.color} />
                  )) : <div className="col-span-2 text-center text-gray-600 text-[10px] font-black uppercase tracking-[0.2em] py-10">No Data</div>}
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
                  <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-6 group-hover:text-blue-400 transition-colors font-display">{group.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {group.skills?.map((skill: string) => (
                      <span key={skill} className="px-3 py-1.5 rounded-lg bg-white/5 text-[11px] font-bold text-slate-300 border border-white/5 group-hover:border-blue-500/20 group-hover:bg-blue-500/5 transition-all">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </>
        )}
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
                          className="max-w-full max-h-[40vh] md:max-h-[55vh] object-contain rounded-2xl shadow-[0_30px_60px_rgba(0,0,0,0.6)] border border-white/10 select-none"
                          referrerPolicy="no-referrer"
                          draggable={false}
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
                   <h2 className="text-xl sm:text-2xl md:text-3xl font-black text-white uppercase tracking-tighter leading-[0.95] mb-6 font-display">
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
                    <h3 className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] mb-5">Applied Technologies / Skills</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="text-[10px] uppercase tracking-widest font-black px-3 py-1.5 rounded bg-white/5 text-gray-500 border border-white/10 hover:border-blue-500/30 hover:text-blue-400 hover:bg-blue-500/5 transition-all cursor-default">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </section>

                  <div className="pt-8 border-t border-white/5 flex justify-center w-full mt-4">
                    <button 
                      onClick={onClose}
                      className="group flex items-center justify-center gap-3 px-10 py-4 rounded-full bg-blue-600 text-white text-[10px] font-black uppercase tracking-[0.2em] shadow-[0_0_20px_rgba(59,130,246,0.4)] hover:shadow-[0_0_40px_rgba(59,130,246,0.8)] hover:bg-blue-500 hover:-translate-y-1 transition-all w-full md:w-auto"
                    >
                      Exit Preview <X className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" />
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
          className="w-full h-full object-cover opacity-60 group-hover:opacity-40 group-hover:scale-110 transition-all duration-700 select-none"
          referrerPolicy="no-referrer"
          draggable={false}
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
        <h3 className="text-lg md:text-xl font-black text-white uppercase tracking-tighter leading-tight mb-4 group-hover:text-blue-400 transition-colors font-display">
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
  const [projects, setProjects] = useState<Project[]>(PROJECTS);
  const [categories, setCategories] = useState<string[]>(['All', 'Web Dev', 'Automation', 'Creative', 'Hardware', 'Administration', 'Other']);

  useEffect(() => {
    // Fetch Projects
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => {
        if(data && data.length > 0) setProjects(data);
      })
      .catch(err => console.error("Failed to load backend projects:", err));

    // Fetch Dynamic Categories from Settings
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        if (data.projectCategories && data.projectCategories.length > 0) {
          setCategories(['All', ...data.projectCategories]);
        }
      })
      .catch(err => console.error("Failed to load dynamic categories:", err));
  }, []);

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(p => p.category === filter);

  return (
    <section id="portfolio" className="py-16 md:py-24 px-6 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
        <div className="space-y-4">
          <span className="text-[10px] font-black text-blue-500 uppercase tracking-[0.3em] font-display">Showcase</span>
          <h2 className="text-3xl md:text-5xl font-black tracking-tighter uppercase font-display">
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
  const [socialLinks, setSocialLinks] = useState({
    instagram: '',
    instagramName: '',
    linkedin: '',
    linkedinName: '',
    github: '',
    githubName: '',
    discord: '',
    discordName: '',
    tiktok: '',
    tiktokName: ''
  });

  useEffect(() => {
    fetch('/api/settings')
      .then(res => res.json())
      .then(data => {
        setSocialLinks({
          instagram: data.instagram || '',
          instagramName: data.instagramName || '',
          linkedin: data.linkedin || '',
          linkedinName: data.linkedinName || '',
          github: data.github || '',
          githubName: data.githubName || '',
          discord: data.discord || '',
          discordName: data.discordName || '',
          tiktok: data.tiktok || '',
          tiktokName: data.tiktokName || ''
        });
      })
      .catch(err => console.error("Failed to fetch social links", err));
  }, []);

  const socialButtons = [
    { icon: Instagram, href: socialLinks.instagram, name: socialLinks.instagramName || 'Instagram' },
    { icon: Linkedin, href: socialLinks.linkedin, name: socialLinks.linkedinName || 'LinkedIn' },
    { icon: Github, href: socialLinks.github, name: socialLinks.githubName || 'GitHub' },
    { icon: DiscordIcon, href: socialLinks.discord, name: socialLinks.discordName || 'Discord' },
    { icon: Music2, href: socialLinks.tiktok, name: socialLinks.tiktokName || 'TikTok' }
  ];

  const activeSocialButtons = socialButtons.filter(btn => btn.href);

  return (
    <section id="contact" className="py-16 md:py-24 px-6 max-w-4xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="glass p-8 md:p-20 rounded-[32px] md:rounded-[40px] relative overflow-hidden"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-1 bg-gradient-to-r from-transparent via-blue-500 to-transparent" />
        
        <h2 className="text-2xl sm:text-4xl md:text-5xl font-black mb-8 leading-tight font-display">READY TO <span className="text-gradient">COLLABORATE?</span></h2>
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
                <p className="text-[10px] md:text-xs font-black text-gray-500 uppercase tracking-widest mb-2 font-display">Email Me</p>
                <p className="text-sm sm:text-base md:text-xl font-black select-all cursor-text text-white break-all">fantaseaindo@gmail.com</p>
              </div>
              <a href="https://mail.google.com/mail/?view=cm&fs=1&to=fantaseaindo@gmail.com" target="_blank" rel="noreferrer" className="text-xs md:text-sm font-bold text-blue-500 hover:text-blue-400 transition-colors">Direct Mail (Gmail) →</a>
            </div>
            
            <div className="flex flex-col items-center gap-4 p-6 md:p-8 glass rounded-3xl">
              <div className="p-3 md:p-4 rounded-full bg-blue-500/10 text-blue-400">
                <MessageCircle className="w-6 h-6 md:w-8 md:h-8" />
              </div>
              <div className="text-center w-full overflow-hidden">
                <p className="text-[10px] md:text-xs font-black text-gray-500 uppercase tracking-widest mb-2 font-display">WhatsApp Me</p>
                <p className="text-sm sm:text-base md:text-xl font-black select-all cursor-text text-white">+62 895 365 146160</p>
              </div>
              <a href="https://wa.me/62895365146160" target="_blank" rel="noreferrer" className="text-xs md:text-sm font-bold text-blue-500 hover:text-blue-400 transition-colors">Chat on WhatsApp →</a>
            </div>
          </div>

          {activeSocialButtons.length > 0 && (
            <div className="flex flex-col items-center gap-6">
              <div className="flex items-center gap-3">
                <h4 className="text-sm font-bold text-gray-600 uppercase tracking-widest font-display">Connect</h4>
                <div className="w-12 h-[1px] bg-white/10" />
              </div>
              <div className="flex flex-wrap items-center justify-center gap-3">
                {activeSocialButtons.map((btn, idx) => (
                  <a
                    key={idx}
                    href={btn.href}
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 px-6 py-3 glass rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-all group"
                  >
                    <btn.icon className="w-5 h-5" />
                    <span className="font-bold tracking-tight">{btn.name}</span>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="py-12 px-6 border-t border-white/5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <p className="text-gray-500 font-bold font-display tracking-tight">© 2026 • GALUH RAMA ISMAYA</p>
        <div className="flex items-center gap-8 text-sm text-gray-500">
           <a href="#about" className="hover:text-white transition-colors">About</a>
           <a href="#portfolio" className="hover:text-white transition-colors">Projects</a>
           <a href="mailto:fantaseaindo@gmail.com" className="hover:text-white transition-colors">Contact</a>
           <a href="/admin" className="hover:text-blue-400 text-blue-500/50 transition-colors" title="Admin Login">Admin</a>
        </div>
      </div>
    </footer>
  );
}

// --- Main App ---

export default function App() {
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      if ((e.target as HTMLElement).tagName === 'IMG') {
        e.preventDefault();
      }
    };
    
    const handleDragStart = (e: DragEvent) => {
      if ((e.target as HTMLElement).tagName === 'IMG') {
        e.preventDefault();
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('dragstart', handleDragStart);
    
    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('dragstart', handleDragStart);
    };
  }, []);

  return (
    <div className="relative font-sans antialiased text-white selection:bg-blue-500/30 selection:text-blue-200">
      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 z-[100] origin-left"
        style={{ scaleX: scrollYProgress }}
      />
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
        {/* Organic Abstract Curves (Latte Art / Wood Grain style) */}
        <div 
          className="absolute inset-0 opacity-[0.15]"
          style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg width='1000' height='1000' viewBox='0 0 1000 1000' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 500 C 250 400, 450 600, 650 400 C 850 200, 1000 400, 1200 500' stroke='white' fill='none' stroke-width='1' opacity='0.5'/%3E%3Cpath d='M0 600 C 250 500, 450 700, 650 500 C 850 300, 1000 500, 1200 600' stroke='white' fill='none' stroke-width='1' opacity='0.3'/%3E%3Cpath d='M0 400 C 250 300, 450 500, 650 300 C 850 100, 1000 300, 1200 400' stroke='white' fill='none' stroke-width='1' opacity='0.3'/%3E%3Cpath d='M0 700 C 250 600, 450 800, 650 600 C 850 400, 1000 600, 1200 700' stroke='white' fill='none' stroke-width='1' opacity='0.2'/%3E%3Cpath d='M0 300 C 250 200, 450 400, 650 200 C 850 0, 1000 200, 1200 300' stroke='white' fill='none' stroke-width='1' opacity='0.2'/%3E%3C/svg%3E")`,
             backgroundSize: '100% 100%',
             backgroundPosition: 'center center'
          }}
        />
        
        {/* Fluid Accent Curves (Blue & Cyan) */}
        <div 
          className="absolute inset-0 opacity-[0.1]"
          style={{
             backgroundImage: `url("data:image/svg+xml,%3Csvg width='1000' height='1000' viewBox='0 0 1000 1000' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M-200 300 C 100 200, 300 400, 500 200 C 700 0, 900 200, 1100 300' stroke='%233b82f6' fill='none' stroke-width='2' opacity='0.6'/%3E%3Cpath d='M-100 850 C 200 750, 400 950, 600 750 C 800 550, 1000 750, 1200 850' stroke='%2322d3ee' fill='none' stroke-width='2' opacity='0.6'/%3E%3Cpath d='M200 -100 C 400 100, 600 -100, 800 100 C 1000 300, 1200 100, 1400 -100' stroke='%233b82f6' fill='none' stroke-width='1' opacity='0.4'/%3E%3C/svg%3E")`,
             backgroundSize: '100% 100%',
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
