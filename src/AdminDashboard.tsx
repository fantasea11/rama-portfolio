import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LogIn, Settings, FolderKanban, Plus, Edit2, Trash2, LogOut, Upload, X, Save, ArrowLeft, GraduationCap, Briefcase, Award, Layers, Activity, LayoutGrid } from 'lucide-react';
import { Project } from './constants';

const API_URL = '/api';

export default function AdminDashboard() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem('adminLoggedIn') === 'true';
  });
  const [adminUser, setAdminUser] = useState<any>(() => {
    const saved = localStorage.getItem('adminUser');
    return saved ? JSON.parse(saved) : null;
  });
  
  // Login State
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  // Dashboard State
  const [activeTab, setActiveTab] = useState<'projects' | 'education' | 'experience' | 'certification' | 'seminars' | 'settings'>('projects');
  
  // Settings Data
  const [projectCategories, setProjectCategories] = useState<string[]>(['Web Dev', 'Automation', 'Creative', 'Hardware', 'Administration', 'Other']);
  const [newCategory, setNewCategory] = useState('');

  // Collections State
  const [dataStore, setDataStore] = useState<Record<string, any[]>>({
    projects: [],
    education: [],
    experience: [],
    certification: [],
    seminars: [],
    proficiencies: [],
    skillGroups: []
  });
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<any | null>(null);
  const [itemToDelete, setItemToDelete] = useState<{ id: string, collection: string } | null>(null);
  
  // Custom Modal/Alert State
  const [alertConfig, setAlertConfig] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  const [confirmConfig, setConfirmConfig] = useState<{ message: string; onConfirm: () => void } | null>(null);

  // Form State
  const [formData, setFormData] = useState<any>({});
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  
  const [editingTechIndex, setEditingTechIndex] = useState<number | null>(null);
  const [techEditValue, setTechEditValue] = useState<string>('');

  const handleTechEditStart = (index: number, val: string) => {
    setEditingTechIndex(index);
    setTechEditValue(val);
  };

  const handleTechEditCommit = (index: number) => {
    // Determine which array to edit based on activeTab
    const arrayKey = (activeTab === 'education' || activeTab === 'experience') ? 'tags' : (activeTab === 'certification' ? 'features' : (activeTab === 'skillGroups' ? 'skills' : 'technologies'));
    const newItems = [...(formData[arrayKey] || [])];
    const val = techEditValue.trim();
    if (val === '') {
      newItems.splice(index, 1);
    } else {
      newItems[index] = val;
    }
    setFormData({ ...formData, [arrayKey]: newItems });
    setEditingTechIndex(null);
  };

  const handleAddTech = () => {
    const arrayKey = (activeTab === 'education' || activeTab === 'experience') ? 'tags' : (activeTab === 'certification' ? 'features' : (activeTab === 'skillGroups' ? 'skills' : 'technologies'));
    const currentItems = formData[arrayKey] || [];
    setFormData({ ...formData, [arrayKey]: [...currentItems, ''] });
    setEditingTechIndex(currentItems.length);
    setTechEditValue('');
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchData();
      fetchSettings();
    }
  }, [isLoggedIn]);

  const fetchData = async () => {
    ['projects', 'education', 'experience', 'certification', 'seminars', 'proficiencies', 'skillGroups'].forEach(async (collection) => {
      try {
        const res = await fetch(`${API_URL}/${collection}`);
        const data = await res.json();
        setDataStore(prev => ({ ...prev, [collection]: data }));
      } catch (err) {
        console.error(`Failed to fetch ${collection}`, err);
      }
    });
  };

  const fetchSettings = async () => {
    try {
      const res = await fetch(`${API_URL}/settings`);
      const data = await res.json();
      if (data.profilePicture) setProfilePicture(data.profilePicture);
      if (data.projectCategories && data.projectCategories.length > 0) {
        setProjectCategories(data.projectCategories);
      }
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
    } catch (err) {
      console.error("Failed to fetch settings", err);
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (data.success) {
        localStorage.setItem('adminToken', data.token);
        localStorage.setItem('adminLoggedIn', 'true');
        localStorage.setItem('adminUser', JSON.stringify(data.user));
        setIsLoggedIn(true);
        setAdminUser(data.user);
        setLoginError('');
      } else {
        setLoginError(data.message || 'Login failed');
      }
    } catch (err) {
      setLoginError('Server error. Is the backend running?');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminLoggedIn');
    localStorage.removeItem('adminUser');
    setIsLoggedIn(false);
    setAdminUser(null);
  };

  // --- CRUD Operations ---

  const handleOpenModal = (item?: any) => {
    if (item) {
      setEditingItem(item);
      setFormData(item);
    } else {
      setEditingItem(null);
      if (activeTab === 'projects') setFormData({ id: `proj-${Date.now()}`, title: '', category: 'Web Dev', description: '', longDescription: '', technologies: [], images: [] });
      else if (activeTab === 'education') setFormData({ id: `edu-${Date.now()}`, title: '', date: '', subtitle: '', description: '', tags: [] });
      else if (activeTab === 'experience') setFormData({ id: `exp-${Date.now()}`, title: '', date: '', subtitle: '', description: '', tags: [] });
      else if (activeTab === 'certification') setFormData({ id: `cert-${Date.now()}`, title: '', subtitle: '', features: [], image: '' });
      else if (activeTab === 'seminars') setFormData({ id: `sem-${Date.now()}`, title: '', issuer: '', date: '', summary: '', details: '', image: '' });
      else if (activeTab === 'proficiencies') setFormData({ id: `prof-${Date.now()}`, skill: '', level: 50, color: 'bg-blue-500' });
      else if (activeTab === 'skillGroups') setFormData({ id: `sg-${Date.now()}`, title: '', skills: [] });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setFormData({});
    setEditingItem(null);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formDataObj = new FormData();
    formDataObj.append('image', file);

    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formDataObj
      });
      const data = await res.json();
      if (data.success) {
        if (activeTab === 'projects') {
          setFormData((prev: any) => ({ ...prev, images: [...(prev.images || []), data.url] }));
        } else {
          setFormData((prev: any) => ({ ...prev, image: data.url }));
        }
        setAlertConfig({ message: 'Image uploaded successfully!', type: 'success' });
      }
    } catch (err) {
      console.error('Upload failed', err);
      setAlertConfig({ message: 'Failed to upload image', type: 'error' });
    } finally {
      setUploading(false);
    }
  };

  const handleRemoveImage = (index: number) => {
    setFormData((prev: any) => {
      const newImages = [...(prev.images || [])];
      newImages.splice(index, 1);
      return { ...prev, images: newImages };
    });
  };

  const handleSaveItem = async () => {
    // For proficiencies, we might be checking 'title' which doesn't exist (it's 'skill')
    const titleField = activeTab === 'proficiencies' ? 'skill' : 'title';
    if (!formData[titleField]) {
      setAlertConfig({ message: `${titleField.charAt(0).toUpperCase() + titleField.slice(1)} is required.`, type: 'error' });
      return;
    }

    try {
      const token = localStorage.getItem('adminToken');
      // Ensure the payload has 'title' if it's not proficiencies, or handle accordingly
      const payload = { ...formData };
      
      if (editingItem) {
        const res = await fetch(`${API_URL}/${activeTab}/${editingItem.id}`, {
          method: 'PUT',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        });
        if (res.ok) fetchData();
      } else {
        const res = await fetch(`${API_URL}/${activeTab}`, {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify(payload)
        });
        if (res.ok) fetchData();
      }
      handleCloseModal();
    } catch (err) {
      console.error("Save failed", err);
      setAlertConfig({ message: "Failed to save item.", type: 'error' });
    }
  };

  const confirmDeleteItem = async () => {
    if (!itemToDelete) return;
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`${API_URL}/${itemToDelete.collection}/${itemToDelete.id}`, { 
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        fetchData();
        setAlertConfig({ message: "Item deleted successfully", type: 'success' });
      }
    } catch (err) {
      console.error("Delete failed", err);
      setAlertConfig({ message: "Delete failed", type: 'error' });
    } finally {
      setItemToDelete(null);
    }
  };

  // --- Settings Tab ---
  const [settingForm, setSettingForm] = useState({ oldUsername: '', oldPassword: '', newUsername: '', newPassword: '' });
  const [profilePicture, setProfilePicture] = useState<string>('');
  const profileInputRef = useRef<HTMLInputElement>(null);
  const [uploadingProfile, setUploadingProfile] = useState(false);
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
  
  const handleUpdateCredentials = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`${API_URL}/admin`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(settingForm)
      });
      const data = await res.json();
      if (data.success) {
        setAlertConfig({ message: 'Credentials updated successfully! Please login again.', type: 'success' });
        setTimeout(handleLogout, 2000);
      } else {
        setAlertConfig({ message: data.message || 'Update failed. Check your old credentials.', type: 'error' });
      }
    } catch (err) {
      setAlertConfig({ message: 'Server error.', type: 'error' });
    }
  };

  const handleProfilePictureChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingProfile(true);
    const formDataObj = new FormData();
    formDataObj.append('image', file);

    try {
      const token = localStorage.getItem('adminToken');
      // 1. Upload the image
      const uploadRes = await fetch(`${API_URL}/upload`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formDataObj
      });
      const uploadData = await uploadRes.json();
      
      if (uploadData.success) {
        // 2. Save to settings
        const settingsRes = await fetch(`${API_URL}/settings`, {
          method: 'PUT',
          headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ profilePicture: uploadData.url })
        });
        const settingsData = await settingsRes.json();
        
        if (settingsData.success) {
          setProfilePicture(uploadData.url);
          setAlertConfig({ message: 'Profile picture updated!', type: 'success' });
        }
      }
    } catch (err) {
      console.error('Upload failed', err);
      setAlertConfig({ message: 'Failed to update profile picture', type: 'error' });
    } finally {
      setUploadingProfile(false);
    }
  };

  const handleAddCategory = async () => {
    if (!newCategory.trim()) return;
    const updatedCategories = [...projectCategories, newCategory.trim()];
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`${API_URL}/settings`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ projectCategories: updatedCategories })
      });
      if (res.ok) {
        setProjectCategories(updatedCategories);
        setNewCategory('');
        setAlertConfig({ message: 'Category added!', type: 'success' });
      }
    } catch (err) {
      setAlertConfig({ message: 'Failed to add category', type: 'error' });
    }
  };

  const handleRemoveCategory = async (catToRemove: string) => {
    const updatedCategories = projectCategories.filter(cat => cat !== catToRemove);
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`${API_URL}/settings`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ projectCategories: updatedCategories })
      });
      if (res.ok) {
        setProjectCategories(updatedCategories);
        setAlertConfig({ message: 'Category removed!', type: 'success' });
      }
    } catch (err) {
      setAlertConfig({ message: 'Failed to remove category', type: 'error' });
    }
  };

  const handleSaveSocialLinks = async () => {
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(`${API_URL}/settings`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(socialLinks)
      });
      if (res.ok) {
        setAlertConfig({ message: 'Social links saved!', type: 'success' });
      }
    } catch (err) {
      setAlertConfig({ message: 'Failed to save social links', type: 'error' });
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-[#0a0a0b] flex items-center justify-center p-6 relative overflow-hidden">
        {/* Same background styling as main app for consistency */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.06] mix-blend-overlay pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[500px] aspect-square bg-blue-600/10 rounded-full blur-[100px] pointer-events-none animate-breathing-glow" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md glass p-10 rounded-[32px] relative z-10 border border-white/10 shadow-2xl"
        >
          <a href="/" className="absolute top-6 left-6 text-gray-500 hover:text-white transition-colors flex items-center gap-2 text-sm font-bold">
            <ArrowLeft className="w-4 h-4" /> Back to Site
          </a>
          
          <div className="text-center mb-10 mt-6">
            <div className="w-16 h-16 mx-auto bg-blue-500/10 text-blue-400 rounded-full flex items-center justify-center mb-6 border border-blue-500/20">
              <LogIn className="w-8 h-8" />
            </div>
            <h1 className="text-2xl font-black text-white uppercase tracking-tighter font-display mb-2">Admin Access</h1>
            <p className="text-gray-400 text-sm font-medium">Authorized personnel only.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {loginError && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-bold text-center">
                {loginError}
              </div>
            )}
            
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Username</label>
              <input 
                type="text" 
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 focus:bg-slate-900/80 transition-all font-medium"
                placeholder="admin"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Password</label>
              <input 
                type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-blue-500/50 focus:bg-slate-900/80 transition-all font-medium"
                placeholder="••••••••"
                required
              />
            </div>
            <button 
              type="submit"
              className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white font-black uppercase tracking-widest rounded-xl transition-colors shadow-lg shadow-blue-600/20 text-sm"
            >
              Secure Login
            </button>
          </form>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0b] flex flex-col md:flex-row relative">
      {/* Sidebar */}
      <aside className="w-full md:w-64 glass border-r border-white/5 p-6 flex flex-col h-auto md:h-screen sticky top-0 z-40">
        <div className="mb-12">
          <h1 className="text-xl font-black text-white uppercase tracking-tighter font-display mb-1">Dashboard</h1>
          <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">v1.0.0 Admin</p>
        </div>

        <nav className="flex flex-col gap-2 flex-1">
          <button 
            onClick={() => setActiveTab('projects')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all text-sm ${activeTab === 'projects' ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20' : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'}`}
          >
            <FolderKanban className="w-5 h-5" /> Projects
          </button>
          <button 
            onClick={() => setActiveTab('education')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all text-sm ${activeTab === 'education' ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20' : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'}`}
          >
            <GraduationCap className="w-5 h-5" /> Education
          </button>
          <button 
            onClick={() => setActiveTab('experience')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all text-sm ${activeTab === 'experience' ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20' : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'}`}
          >
            <Briefcase className="w-5 h-5" /> Experience
          </button>
          <button 
            onClick={() => setActiveTab('certification')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all text-sm ${activeTab === 'certification' ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20' : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'}`}
          >
            <Award className="w-5 h-5" /> Certificates
          </button>
          <button 
            onClick={() => setActiveTab('seminars')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all text-sm ${activeTab === 'seminars' ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20' : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'}`}
          >
            <Layers className="w-5 h-5" /> Seminars
          </button>
          <button 
            onClick={() => setActiveTab('proficiencies')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all text-sm ${activeTab === 'proficiencies' ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20' : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'}`}
          >
            <Activity className="w-5 h-5" /> Proficiencies
          </button>
          <button 
            onClick={() => setActiveTab('skillGroups')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all text-sm ${activeTab === 'skillGroups' ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20' : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'}`}
          >
            <LayoutGrid className="w-5 h-5" /> Skill Groups
          </button>
          <button 
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all text-sm ${activeTab === 'settings' ? 'bg-blue-600/10 text-blue-400 border border-blue-500/20' : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'}`}
          >
            <Settings className="w-5 h-5" /> Settings
          </button>
        </nav>

        <div className="mt-auto pt-8 border-t border-white/5 flex flex-col gap-4">
          <a href="/" className="flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all text-sm text-gray-400 hover:text-white hover:bg-white/5">
            <ArrowLeft className="w-5 h-5" /> Back to Site
          </a>
          <button 
            onClick={handleLogout}
            className="flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10"
          >
            <LogOut className="w-5 h-5" /> Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-6 md:p-12 overflow-y-auto z-10">
        <AnimatePresence mode="wait">
          {['projects', 'education', 'experience', 'certification', 'seminars', 'proficiencies', 'skillGroups'].includes(activeTab) && (
            <motion.div
              key="collection-view"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
                <div>
                  <h2 className="text-3xl font-black uppercase tracking-tighter font-display mb-2">{activeTab}</h2>
                  <p className="text-gray-400 font-medium">Manage your {activeTab} entries.</p>
                </div>
                <button 
                  onClick={() => handleOpenModal()}
                  className="flex items-center gap-2 px-6 py-3 bg-white text-black font-black uppercase tracking-widest text-xs rounded-xl hover:scale-105 transition-transform"
                >
                  <Plus className="w-4 h-4" /> Add New
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {dataStore[activeTab]?.map((p: any) => (
                  <div key={p.id} className="glass p-6 rounded-[24px] border border-white/5 group hover:border-blue-500/30 transition-colors flex flex-col h-full">
                    {(p.images?.[0] || p.image) && (
                      <div className="w-full h-48 bg-slate-900 rounded-xl mb-6 overflow-hidden border border-white/5 flex-shrink-0">
                        <img src={p.images?.[0] || p.image} alt={p.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                      </div>
                    )}
                    <div className="mb-4">
                      <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest bg-blue-500/10 px-2 py-1 rounded border border-blue-500/20">{p.category || activeTab}</span>
                    </div>
                    <h3 className="text-lg font-black uppercase tracking-tight mb-2 font-display">{p.title || p.skill}</h3>
                    <p className="text-sm text-gray-400 line-clamp-2 mb-6 flex-1">{p.description || p.summary || p.subtitle || (p.level ? `Level: ${p.level}%` : '')}</p>
                    
                    <div className="flex gap-3 mt-auto pt-6 border-t border-white/5">
                      <button 
                        onClick={() => handleOpenModal(p)}
                        className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg bg-white/5 hover:bg-white/10 text-white text-xs font-bold transition-colors border border-white/5"
                      >
                        <Edit2 className="w-3.5 h-3.5" /> Edit
                      </button>
                      <button 
                        onClick={() => setItemToDelete({ id: p.id, collection: activeTab })}
                        className="flex items-center justify-center p-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 transition-colors"
                        title="Delete"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === 'settings' && (
            <motion.div
              key="settings"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="max-w-2xl space-y-12"
            >
              <div>
                <h2 className="text-3xl font-black uppercase tracking-tighter font-display mb-2">Profile Settings</h2>
                <p className="text-gray-400 font-medium mb-6">Update your public profile image.</p>
                
                <div className="glass p-8 rounded-[32px] border border-white/5 flex items-center gap-8">
                  <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-blue-500/30 bg-slate-900 shrink-0 relative group">
                    <img src={profilePicture || '/images/profile-picture-default.png'} alt="Profile" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <Upload className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <button 
                      onClick={() => profileInputRef.current?.click()} 
                      disabled={uploadingProfile}
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-sm transition-colors mb-2 disabled:opacity-50"
                    >
                      {uploadingProfile ? 'Uploading...' : 'Change Picture'}
                    </button>
                    <p className="text-xs text-gray-500">Recommended size: 500x500px (JPG/PNG).</p>
                    <input type="file" ref={profileInputRef} onChange={handleProfilePictureChange} accept="image/*" className="hidden" />
                  </div>
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-black uppercase tracking-tighter font-display mb-2">Account Settings</h2>
                <p className="text-gray-400 font-medium mb-6">Update your admin credentials securely.</p>

                <form onSubmit={handleUpdateCredentials} className="glass p-8 rounded-[32px] border border-white/5 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Current Username</label>
                    <input 
                      type="text" 
                      value={settingForm.oldUsername}
                      onChange={e => setSettingForm(prev => ({...prev, oldUsername: e.target.value}))}
                      className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm" required 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Current Password</label>
                    <input 
                      type="password" 
                      value={settingForm.oldPassword}
                      onChange={e => setSettingForm(prev => ({...prev, oldPassword: e.target.value}))}
                      className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm" required 
                    />
                  </div>
                </div>

                <div className="h-[1px] bg-white/5 w-full my-4" />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-blue-400 uppercase tracking-widest">New Username</label>
                    <input 
                      type="text" 
                      value={settingForm.newUsername}
                      onChange={e => setSettingForm(prev => ({...prev, newUsername: e.target.value}))}
                      className="w-full bg-blue-900/10 border border-blue-500/20 rounded-xl px-4 py-3 text-white text-sm" placeholder="Leave empty to keep current" 
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-blue-400 uppercase tracking-widest">New Password</label>
                    <input 
                      type="password" 
                      value={settingForm.newPassword}
                      onChange={e => setSettingForm(prev => ({...prev, newPassword: e.target.value}))}
                      className="w-full bg-blue-900/10 border border-blue-500/20 rounded-xl px-4 py-3 text-white text-sm" placeholder="Leave empty to keep current" 
                    />
                  </div>
                </div>

                <button type="submit" className="w-full py-4 bg-white text-black font-black uppercase tracking-widest rounded-xl hover:bg-gray-200 transition-colors text-sm mt-4">
                  Update Credentials
                </button>
              </form>
              </div>

              <div>
                <h2 className="text-3xl font-black uppercase tracking-tighter font-display mb-2">Social Media Links</h2>
                <p className="text-gray-400 font-medium mb-6">Manage your social media links. Leave empty to hide the button.</p>
                
                <div className="glass p-8 rounded-[32px] border border-white/5 space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Instagram URL</label>
                      <input 
                        type="url" 
                        value={socialLinks.instagram}
                        onChange={e => setSocialLinks(prev => ({...prev, instagram: e.target.value}))}
                        placeholder="https://instagram.com/..."
                        className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Instagram Display Name</label>
                      <input 
                        type="text" 
                        value={socialLinks.instagramName}
                        onChange={e => setSocialLinks(prev => ({...prev, instagramName: e.target.value}))}
                        placeholder="@username"
                        className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">LinkedIn URL</label>
                      <input 
                        type="url" 
                        value={socialLinks.linkedin}
                        onChange={e => setSocialLinks(prev => ({...prev, linkedin: e.target.value}))}
                        placeholder="https://linkedin.com/in/..."
                        className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">LinkedIn Display Name</label>
                      <input 
                        type="text" 
                        value={socialLinks.linkedinName}
                        onChange={e => setSocialLinks(prev => ({...prev, linkedinName: e.target.value}))}
                        placeholder="Name"
                        className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">GitHub URL</label>
                      <input 
                        type="url" 
                        value={socialLinks.github}
                        onChange={e => setSocialLinks(prev => ({...prev, github: e.target.value}))}
                        placeholder="https://github.com/..."
                        className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">GitHub Display Name</label>
                      <input 
                        type="text" 
                        value={socialLinks.githubName}
                        onChange={e => setSocialLinks(prev => ({...prev, githubName: e.target.value}))}
                        placeholder="@username"
                        className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Discord URL</label>
                      <input 
                        type="url" 
                        value={socialLinks.discord}
                        onChange={e => setSocialLinks(prev => ({...prev, discord: e.target.value}))}
                        placeholder="https://discord.gg/..."
                        className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Discord Display Name</label>
                      <input 
                        type="text" 
                        value={socialLinks.discordName}
                        onChange={e => setSocialLinks(prev => ({...prev, discordName: e.target.value}))}
                        placeholder="Discord"
                        className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">TikTok URL</label>
                      <input 
                        type="url" 
                        value={socialLinks.tiktok}
                        onChange={e => setSocialLinks(prev => ({...prev, tiktok: e.target.value}))}
                        placeholder="https://tiktok.com/@..."
                        className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">TikTok Display Name</label>
                      <input 
                        type="text" 
                        value={socialLinks.tiktokName}
                        onChange={e => setSocialLinks(prev => ({...prev, tiktokName: e.target.value}))}
                        placeholder="@username"
                        className="w-full bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm"
                      />
                    </div>
                  </div>
                  <button 
                    onClick={handleSaveSocialLinks}
                    className="w-full py-4 bg-white text-black font-black uppercase tracking-widest rounded-xl hover:bg-gray-200 transition-colors text-sm"
                  >
                    Save Social Links
                  </button>
                </div>
              </div>

              <div>
                <h2 className="text-3xl font-black uppercase tracking-tighter font-display mb-2">Project Categories</h2>
                <p className="text-gray-400 font-medium mb-6">Manage categories for your projects.</p>
                
                <div className="glass p-8 rounded-[32px] border border-white/5 space-y-6">
                  <div className="flex gap-4">
                    <input 
                      type="text" 
                      value={newCategory}
                      onChange={e => setNewCategory(e.target.value)}
                      placeholder="New category name..."
                      className="flex-1 bg-slate-900/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm"
                      onKeyDown={e => e.key === 'Enter' && handleAddCategory()}
                    />
                    <button 
                      onClick={handleAddCategory}
                      className="px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl text-sm transition-colors flex items-center gap-2"
                    >
                      <Plus className="w-4 h-4" /> Add
                    </button>
                  </div>

                  <div className="flex flex-wrap gap-3">
                    {projectCategories.map(cat => (
                      <div key={cat} className="flex items-center gap-2 bg-slate-900/60 border border-white/10 px-4 py-2 rounded-xl group hover:border-blue-500/30 transition-colors">
                        <span className="text-sm font-bold text-gray-300">{cat}</span>
                        <button 
                          onClick={() => handleRemoveCategory(cat)}
                          className="p-1 rounded-full hover:bg-red-500/20 text-gray-500 hover:text-red-400 transition-colors"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Project Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={handleCloseModal}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-4xl max-h-[90vh] glass rounded-[32px] overflow-hidden flex flex-col border border-white/10 shadow-2xl z-10"
            >
              <div className="p-6 border-b border-white/5 flex justify-between items-center bg-slate-950/50 sticky top-0 z-20">
                <h3 className="text-xl font-black uppercase tracking-tighter font-display">{editingItem ? `Edit ${activeTab}` : `New ${activeTab}`}</h3>
                <button onClick={handleCloseModal} className="p-2 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-6 md:p-8 overflow-y-auto space-y-6 flex-1 bg-slate-900/50">
                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {activeTab !== 'proficiencies' && (
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Title *</label>
                      <input type="text" value={formData.title || ''} onChange={e => setFormData({...formData, title: e.target.value})} className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm" required />
                    </div>
                  )}

                  {activeTab === 'proficiencies' && (
                    <>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Skill Name *</label>
                        <input type="text" value={formData.skill || ''} onChange={e => setFormData({...formData, skill: e.target.value})} className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm" required />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Level (0-100) *</label>
                        <input type="number" min="0" max="100" value={formData.level || 0} onChange={e => setFormData({...formData, level: parseInt(e.target.value)})} className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm" required />
                      </div>
                      <div className="space-y-2 md:col-span-2">
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Color Theme</label>
                        <select value={formData.color || 'bg-blue-500'} onChange={e => setFormData({...formData, color: e.target.value})} className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm appearance-none cursor-pointer">
                          <option value="bg-blue-500">Blue (Default)</option>
                          <option value="bg-cyan-500">Cyan</option>
                          <option value="bg-indigo-400">Indigo</option>
                          <option value="bg-sky-500">Sky</option>
                          <option value="bg-purple-500">Purple</option>
                          <option value="bg-rose-500">Rose</option>
                          <option value="bg-emerald-500">Emerald</option>
                          <option value="bg-amber-500">Amber</option>
                        </select>
                      </div>
                    </>
                  )}
                  
                  {activeTab === 'projects' && (
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Category</label>
                      <select value={formData.category || (projectCategories[0] || 'Other')} onChange={e => setFormData({...formData, category: e.target.value as any})} className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm appearance-none cursor-pointer">
                        {projectCategories.map(cat => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                    </div>
                  )}

                  {['education', 'experience'].includes(activeTab) && (
                    <>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Date / Year</label>
                        <input type="text" value={formData.date || ''} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Subtitle / Details</label>
                        <input type="text" value={formData.subtitle || ''} onChange={e => setFormData({...formData, subtitle: e.target.value})} className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm" />
                      </div>
                    </>
                  )}

                  {activeTab === 'certification' && (
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Credential ID / Subtitle</label>
                      <input type="text" value={formData.subtitle || ''} onChange={e => setFormData({...formData, subtitle: e.target.value})} className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm" />
                    </div>
                  )}

                  {activeTab === 'seminars' && (
                    <>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Issuer</label>
                        <input type="text" value={formData.issuer || ''} onChange={e => setFormData({...formData, issuer: e.target.value})} className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Date</label>
                        <input type="text" value={formData.date || ''} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm" />
                      </div>
                    </>
                  )}
                </div>

                {['projects', 'education', 'experience'].includes(activeTab) && (
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Short Description *</label>
                    <textarea value={formData.description || ''} onChange={e => setFormData({...formData, description: e.target.value})} className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm h-24 resize-none" required />
                  </div>
                )}

                {activeTab === 'projects' && (
                  <div className="space-y-2">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Long Description</label>
                    <textarea value={formData.longDescription || ''} onChange={e => setFormData({...formData, longDescription: e.target.value})} className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm h-40 resize-none" />
                  </div>
                )}

                {activeTab === 'seminars' && (
                  <>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Summary</label>
                      <textarea value={formData.summary || ''} onChange={e => setFormData({...formData, summary: e.target.value})} className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm h-24 resize-none" />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Details</label>
                      <textarea value={formData.details || ''} onChange={e => setFormData({...formData, details: e.target.value})} className="w-full bg-slate-950/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm h-32 resize-none" />
                    </div>
                  </>
                )}

                {['projects', 'education', 'experience', 'certification', 'skillGroups'].includes(activeTab) && (
                  <div className="space-y-3">
                    <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">
                      {activeTab === 'certification' ? 'Features' : (activeTab === 'projects' ? 'Technologies / Skills' : (activeTab === 'skillGroups' ? 'Skills' : 'Tags'))}
                    </label>
                    <div className="flex flex-wrap gap-2 items-center min-h-[48px] bg-slate-950/50 border border-white/10 rounded-xl p-3">
                      {(() => {
                        const arrayKey = (activeTab === 'education' || activeTab === 'experience') ? 'tags' : (activeTab === 'certification' ? 'features' : (activeTab === 'skillGroups' ? 'skills' : 'technologies'));
                        return (formData[arrayKey] || []).map((tech: string, idx: number) => (
                          <div key={idx} className="relative">
                            {editingTechIndex === idx ? (
                              <input
                                autoFocus
                                className="px-3 py-1 bg-blue-500/20 text-white font-bold text-xs rounded-full border border-blue-500/50 outline-none w-28 text-center"
                                value={techEditValue}
                                onChange={(e) => setTechEditValue(e.target.value)}
                                onBlur={() => handleTechEditCommit(idx)}
                                onKeyDown={(e) => { if(e.key === 'Enter') { e.preventDefault(); handleTechEditCommit(idx); } }}
                              />
                            ) : (
                              <button
                                type="button"
                                onClick={() => handleTechEditStart(idx, tech)}
                                className="px-3 py-1 bg-blue-500/10 text-blue-400 font-bold text-xs rounded-full border border-blue-500/20 hover:bg-blue-500/30 transition-colors"
                              >
                                {tech || 'Empty'}
                              </button>
                            )}
                          </div>
                        ));
                      })()}
                    <button 
                      type="button"
                      onClick={handleAddTech}
                      className="w-7 h-7 flex items-center justify-center rounded-full bg-white/5 text-gray-400 hover:text-white hover:bg-white/10 transition-colors border border-dashed border-white/20"
                      title="Add Technology"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                )}

                {['projects', 'certification', 'seminars'].includes(activeTab) && (
                  <div className="space-y-4 pt-4 border-t border-white/5">
                    <div className="flex justify-between items-end">
                      <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest">Images</label>
                      <button onClick={() => fileInputRef.current?.click()} disabled={uploading} className="flex items-center gap-2 px-4 py-2 bg-blue-500/10 text-blue-400 border border-blue-500/20 rounded-lg text-xs font-bold hover:bg-blue-500/20 transition-colors disabled:opacity-50">
                        <Upload className="w-3.5 h-3.5" /> {uploading ? 'Uploading...' : 'Upload Photo'}
                      </button>
                      <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" className="hidden" />
                    </div>
                    
                    {activeTab === 'projects' ? (
                      formData.images && formData.images.length > 0 ? (
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                          {formData.images.map((img: string, idx: number) => (
                            <div key={idx} className="relative aspect-video rounded-lg overflow-hidden border border-white/10 group bg-black/50">
                              <img src={img} alt={`Asset ${idx}`} className="w-full h-full object-cover" />
                              <button onClick={() => handleRemoveImage(idx)} className="absolute top-2 right-2 p-1.5 bg-black/60 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/80">
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="w-full py-8 border-2 border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center text-gray-500">
                          <Upload className="w-8 h-8 mb-2 opacity-50" />
                          <p className="text-xs font-bold">No images uploaded yet</p>
                        </div>
                      )
                    ) : (
                      formData.image ? (
                        <div className="relative aspect-video rounded-lg overflow-hidden border border-white/10 group bg-black/50 max-w-sm">
                          <img src={formData.image} alt="Asset" className="w-full h-full object-cover" />
                          <button onClick={() => setFormData((prev: any) => ({ ...prev, image: '' }))} className="absolute top-2 right-2 p-1.5 bg-black/60 rounded-full text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-500/80">
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ) : (
                        <div className="w-full max-w-sm py-8 border-2 border-dashed border-white/10 rounded-xl flex flex-col items-center justify-center text-gray-500">
                          <Upload className="w-8 h-8 mb-2 opacity-50" />
                          <p className="text-xs font-bold">No image uploaded yet</p>
                        </div>
                      )
                    )}
                  </div>
                )}
              </div>

              <div className="p-6 border-t border-white/5 bg-slate-950/50 flex justify-end gap-4 sticky bottom-0 z-20">
                <button onClick={handleCloseModal} className="px-6 py-3 rounded-xl font-bold text-sm text-gray-400 hover:text-white transition-colors">Cancel</button>
                <button onClick={handleSaveItem} className="flex items-center gap-2 px-8 py-3 bg-white text-black font-black uppercase tracking-widest text-xs rounded-xl hover:scale-105 transition-transform shadow-lg shadow-white/10">
                  <Save className="w-4 h-4" /> Save {activeTab}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {itemToDelete && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setItemToDelete(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-sm"
            />
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="relative w-full max-w-md glass p-8 rounded-[32px] overflow-hidden flex flex-col border border-red-500/20 shadow-2xl z-10 text-center"
            >
              <div className="w-16 h-16 mx-auto bg-red-500/10 text-red-400 rounded-full flex items-center justify-center mb-6 border border-red-500/20">
                <Trash2 className="w-8 h-8" />
              </div>
              <h3 className="text-2xl font-black uppercase tracking-tighter font-display mb-2">Delete Item?</h3>
              <p className="text-gray-400 text-sm mb-8">This action cannot be undone. Are you sure you want to permanently delete this content?</p>
              
              <div className="flex gap-4">
                <button onClick={() => setItemToDelete(null)} className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-white font-bold rounded-xl transition-colors">
                  Cancel
                </button>
                <button onClick={confirmDeleteItem} className="flex-1 py-3 bg-red-600 hover:bg-red-500 text-white font-black uppercase tracking-widest rounded-xl transition-colors shadow-lg shadow-red-600/20 text-sm">
                  Yes, Delete
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Custom Alert Modal */}
      <AnimatePresence>
        {alertConfig && (
          <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 pointer-events-none">
            <motion.div
              initial={{ opacity: 0, y: -20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className={`pointer-events-auto min-w-[300px] glass p-6 rounded-[24px] border shadow-2xl flex flex-col items-center text-center ${
                alertConfig.type === 'error' ? 'border-red-500/30' : 'border-blue-500/30'
              }`}
            >
              <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-4 ${
                alertConfig.type === 'error' ? 'bg-red-500/10 text-red-400' : 'bg-blue-500/10 text-blue-400'
              }`}>
                {alertConfig.type === 'error' ? <X className="w-6 h-6" /> : <Activity className="w-6 h-6" />}
              </div>
              <p className="text-white font-bold mb-6">{alertConfig.message}</p>
              <button 
                onClick={() => setAlertConfig(null)}
                className="px-8 py-2 bg-white text-black font-black uppercase tracking-widest text-[10px] rounded-lg hover:scale-105 transition-transform"
              >
                Dismiss
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
