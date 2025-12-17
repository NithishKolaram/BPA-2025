import React, { useState, useEffect } from 'react';
import { Heart, Phone, Calendar, MessageCircle, BookOpen, Users, Menu, X, ChevronRight, ExternalLink, Brain, Smile, Shield, Activity, TrendingUp, Clock, CheckCircle, AlertCircle, ThumbsUp } from 'lucide-react';

const MentalHealthHub = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedDisorder, setSelectedDisorder] = useState(null);
  const [bookingFormData, setBookingFormData] = useState({
    name: '',
    email: '',
    phone: '',
    sessionType: 'Video Call',
    date: '',
    description: ''
  });
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [blogPosts] = useState([
    {
      id: 1,
      title: 'Understanding the Mind-Body Connection',
      excerpt: 'Explore how physical health impacts mental wellbeing and vice versa.',
      date: 'Dec 10, 2025',
      author: 'Dr. Sarah Johnson',
      readTime: '5 min'
    },
    {
      id: 2,
      title: '5 Daily Habits for Better Mental Health',
      excerpt: 'Simple, evidence-based practices you can incorporate into your routine.',
      date: 'Dec 8, 2025',
      author: 'Michael Chen, LCSW',
      readTime: '4 min'
    },
    {
      id: 3,
      title: 'Breaking the Stigma: Why We Need to Talk',
      excerpt: 'The importance of open conversations about mental health in our communities.',
      date: 'Dec 5, 2025',
      author: 'Dr. Emily Rodriguez',
      readTime: '6 min'
    }
  ]);
  const [communityPosts, setCommunityPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [stats, setStats] = useState({ totalAppointments: 0, activeCommunityMembers: 0, resourcesAccessed: 0 });

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';
    try {
      const [postsRes, statsRes, appointmentsRes] = await Promise.all([
        fetch(`${API_BASE}/api/community/posts`).then(r => r.json()).catch(() => ({ success: false })),
        fetch(`${API_BASE}/api/stats`).then(r => r.json()).catch(() => ({ success: false })),
        fetch(`${API_BASE}/api/appointments`).then(r => r.json()).catch(() => ({ success: false }))
      ]);

      if (postsRes && postsRes.success) setCommunityPosts(postsRes.posts || []);
      if (statsRes && statsRes.success) setStats({ totalAppointments: statsRes.stats?.total_appointments || 0, activeCommunityMembers: statsRes.stats?.active_users || 0, resourcesAccessed: 0 });
      if (appointmentsRes && appointmentsRes.success) setAppointments(appointmentsRes.appointments || []);
    } catch (error) {
      console.log('Initializing new data (fetch failed)', error);
    }
  };

  const disorders = [
    {
      id: 'anxiety',
      name: 'Anxiety Disorders',
      description: 'Characterized by excessive worry, fear, or nervousness that interferes with daily activities.',
      symptoms: ['Restlessness', 'Rapid heartbeat', 'Difficulty concentrating', 'Sleep problems'],
      color: 'bg-blue-50 border-blue-200',
      icon: Brain,
      stats: '40M adults affected in US'
    },
    {
      id: 'depression',
      name: 'Depression',
      description: 'A mood disorder causing persistent feelings of sadness and loss of interest.',
      symptoms: ['Persistent sadness', 'Loss of interest', 'Fatigue', 'Changes in appetite'],
      color: 'bg-purple-50 border-purple-200',
      icon: Heart,
      stats: '21M adults experienced episode'
    },
    {
      id: 'ptsd',
      name: 'PTSD',
      description: 'Post-Traumatic Stress Disorder develops after experiencing or witnessing traumatic events.',
      symptoms: ['Flashbacks', 'Nightmares', 'Severe anxiety', 'Avoidance behaviors'],
      color: 'bg-green-50 border-green-200',
      icon: Shield,
      stats: '13M Americans affected'
    },
    {
      id: 'bipolar',
      name: 'Bipolar Disorder',
      description: 'Characterized by extreme mood swings including emotional highs and lows.',
      symptoms: ['Mood swings', 'Energy changes', 'Sleep pattern changes', 'Impulsive behavior'],
      color: 'bg-orange-50 border-orange-200',
      icon: Activity,
      stats: '2.8% of US adults diagnosed'
    }
  ];

  const resources = [
    { name: 'National Suicide Prevention Lifeline', phone: '988', available: '24/7', url: 'https://988lifeline.org' },
    { name: 'Crisis Text Line', phone: 'Text HOME to 741741', available: '24/7', url: 'https://www.crisistextline.org' },
    { name: 'SAMHSA National Helpline', phone: '1-800-662-4357', available: '24/7', url: 'https://www.samhsa.gov/find-help/national-helpline' },
    { name: 'NAMI Helpline', phone: '1-800-950-6264', available: 'Mon-Fri, 10am-10pm ET', url: 'https://www.nami.org/help' }
  ];

  const testimonials = [
    {
      name: 'Sarah M.',
      story: 'After years of struggling with anxiety, I finally sought help. Therapy and support groups changed my life.',
      condition: 'Anxiety',
      avatar: '👩'
    },
    {
      name: 'James T.',
      story: 'Depression made me feel isolated. Through counseling and medication, I found my way back.',
      condition: 'Depression',
      avatar: '👨'
    },
    {
      name: 'Maria L.',
      story: 'PTSD nearly destroyed my relationships. With professional help, I learned coping strategies.',
      condition: 'PTSD',
      avatar: '👩‍🦱'
    }
  ];

  const handleBookingSubmit = async () => {
    if (!bookingFormData.name || !bookingFormData.email || !bookingFormData.date) {
      alert('Please fill in all required fields');
      return;
    }

    const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';

    const payload = { ...bookingFormData };

    try {
      const res = await fetch(`${API_BASE}/api/appointments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        setAppointments(prev => [data.appointment, ...prev]);
        setStats(prev => ({ ...prev, totalAppointments: prev.totalAppointments + 1 }));
      } else {
        // fallback - add locally
        const newAppointment = { id: Date.now(), ...bookingFormData, status: 'pending', createdAt: new Date().toISOString() };
        setAppointments(prev => [newAppointment, ...prev]);
        setStats(prev => ({ ...prev, totalAppointments: prev.totalAppointments + 1 }));
      }
    } catch (error) {
      console.error('Error saving appointment to backend:', error);
      const newAppointment = { id: Date.now(), ...bookingFormData, status: 'pending', createdAt: new Date().toISOString() };
      setAppointments(prev => [newAppointment, ...prev]);
      setStats(prev => ({ ...prev, totalAppointments: prev.totalAppointments + 1 }));
    }

    setBookingSubmitted(true);
    setBookingFormData({ name: '', email: '', phone: '', sessionType: 'Video Call', date: '', description: '' });
    setTimeout(() => setBookingSubmitted(false), 3000);
  };

  const handleCommunityPost = async () => {
    if (!newPost.trim()) return;

    const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';
    try {
      const res = await fetch(`${API_BASE}/api/community/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newPost, author_name: 'Anonymous User' })
      });
      const data = await res.json();
      if (data.success) {
        setCommunityPosts(prev => [data.post, ...prev]);
        setStats(prev => ({ ...prev, activeCommunityMembers: prev.activeCommunityMembers + 1 }));
      } else {
        const post = { id: Date.now(), content: newPost, author: 'Anonymous User', timestamp: new Date().toISOString(), likes: 0 };
        setCommunityPosts(prev => [post, ...prev]);
        setStats(prev => ({ ...prev, activeCommunityMembers: prev.activeCommunityMembers + 1 }));
      }
    } catch (error) {
      console.error('Error posting to backend:', error);
      const post = { id: Date.now(), content: newPost, author: 'Anonymous User', timestamp: new Date().toISOString(), likes: 0 };
      setCommunityPosts(prev => [post, ...prev]);
      setStats(prev => ({ ...prev, activeCommunityMembers: prev.activeCommunityMembers + 1 }));
    }

    setNewPost('');
  };

  const handleLikePost = async (postId) => {
    const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';
    try {
      const res = await fetch(`${API_BASE}/api/community/posts/${postId}/like`, { method: 'POST' });
      const data = await res.json();
      if (data.success) {
        const updated = communityPosts.map(p => p.id === postId ? data.post : p);
        setCommunityPosts(updated);
      } else {
        const updated = communityPosts.map(p => p.id === postId ? { ...p, likes: p.likes + 1 } : p);
        setCommunityPosts(updated);
      }
    } catch (error) {
      console.error('Error liking post:', error);
      const updated = communityPosts.map(p => p.id === postId ? { ...p, likes: p.likes + 1 } : p);
      setCommunityPosts(updated);
    }
  };

  const renderHome = () => (
    <div className="space-y-12">
      <section className="relative bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 text-white rounded-2xl p-12 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-10 left-10 w-32 h-32 bg-white rounded-full"></div>
          <div className="absolute bottom-10 right-10 w-40 h-40 bg-white rounded-full"></div>
        </div>
        <div className="relative z-10">
          <Heart className="w-16 h-16 mx-auto mb-6 animate-pulse" />
          <h1 className="text-5xl font-bold mb-4">You Are Not Alone</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">Mental health matters. We're here to help with resources, information, and community support.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button onClick={() => setActiveTab('resources')} className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold hover:bg-gray-100 transition shadow-lg">Get Help Now</button>
            <button onClick={() => setActiveTab('info')} className="border-2 border-white px-8 py-3 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition">Learn More</button>
          </div>
        </div>
      </section>

      <section className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-2xl p-8">
        <h2 className="text-3xl font-bold mb-6 text-center">Platform Statistics</h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 text-center shadow-sm border-2 border-blue-100">
            <Calendar className="w-12 h-12 mx-auto mb-3 text-blue-600" />
            <div className="text-4xl font-bold text-blue-600 mb-2">{stats.totalAppointments}</div>
            <div className="text-gray-600">Sessions Booked</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-sm border-2 border-purple-100">
            <Users className="w-12 h-12 mx-auto mb-3 text-purple-600" />
            <div className="text-4xl font-bold text-purple-600 mb-2">{stats.activeCommunityMembers}</div>
            <div className="text-gray-600">Community Members</div>
          </div>
          <div className="bg-white rounded-xl p-6 text-center shadow-sm border-2 border-green-100">
            <BookOpen className="w-12 h-12 mx-auto mb-3 text-green-600" />
            <div className="text-4xl font-bold text-green-600 mb-2">{blogPosts.length}</div>
            <div className="text-gray-600">Resources Available</div>
          </div>
        </div>
      </section>

      <section>
        <h2 className="text-3xl font-bold mb-6 text-center">Quick Access</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {[
            { icon: Phone, label: 'Crisis Support', tab: 'resources', color: 'bg-red-50 border-red-200 text-red-600' },
            { icon: Calendar, label: 'Book Counseling', tab: 'booking', color: 'bg-blue-50 border-blue-200 text-blue-600' },
            { icon: MessageCircle, label: 'Community', tab: 'community', color: 'bg-green-50 border-green-200 text-green-600' },
            { icon: BookOpen, label: 'Resources', tab: 'blog', color: 'bg-purple-50 border-purple-200 text-purple-600' }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <button key={idx} onClick={() => setActiveTab(item.tab)} className={`${item.color} border-2 p-6 rounded-xl hover:shadow-lg transition text-center group`}>
                <Icon className="w-12 h-12 mx-auto mb-3 group-hover:scale-110 transition" />
                <h3 className="font-semibold text-lg">{item.label}</h3>
              </button>
            );
          })}
        </div>
      </section>

      <section className="bg-gradient-to-r from-green-50 to-blue-50 p-8 rounded-xl border-2 border-green-200">
        <div className="flex items-center gap-3 mb-6">
          <Smile className="w-8 h-8 text-green-600" />
          <h2 className="text-3xl font-bold">Stories of Hope</h2>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div key={idx} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition">
              <div className="text-5xl mb-3">{t.avatar}</div>
              <div className="text-sm font-semibold text-blue-600 mb-2">{t.condition}</div>
              <p className="text-gray-700 mb-4 italic">&quot;{t.story}&quot;</p>
              <p className="font-semibold">— {t.name}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );

  const renderInfo = () => (
    <div className="space-y-8">
      <div className="text-center bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl p-8">
        <Brain className="w-16 h-16 mx-auto mb-4" />
        <h2 className="text-4xl font-bold mb-4">Understanding Mental Health</h2>
        <p className="text-xl max-w-2xl mx-auto">Learn about common mental health conditions below.</p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        {disorders.map((disorder) => {
          const Icon = disorder.icon;
          return (
            <div key={disorder.id} className={`${disorder.color} border-2 rounded-xl p-6 cursor-pointer hover:shadow-lg transition`} onClick={() => setSelectedDisorder(disorder.id === selectedDisorder ? null : disorder.id)}>
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-xl font-bold mb-2">{disorder.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                    <TrendingUp className="w-4 h-4" />
                    <span>{disorder.stats}</span>
                  </div>
                </div>
                <Icon className="w-10 h-10" />
              </div>
              <p className="text-gray-700 mb-4">{disorder.description}</p>
              {selectedDisorder === disorder.id && (
                <div className="mt-4 pt-4 border-t border-gray-300">
                  <h4 className="font-semibold mb-3 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5" />
                    Common Symptoms:
                  </h4>
                  <ul className="space-y-2">
                    {disorder.symptoms.map((symptom, idx) => (
                      <li key={idx} className="flex items-center gap-2">
                        <CheckCircle className="w-4 h-4 text-green-600" />
                        <span>{symptom}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl p-8 text-center">
        <Shield className="w-16 h-16 mx-auto mb-4" />
        <h3 className="text-2xl font-bold mb-4">Remember</h3>
        <p className="text-lg">Mental health conditions are real, common, and treatable. Reaching out for help is the first step.</p>
      </div>
    </div>
  );

  const renderResources = () => (
    <div className="space-y-8">
      <div className="bg-gradient-to-r from-red-500 to-pink-600 text-white rounded-xl p-8 text-center">
        <Phone className="w-16 h-16 mx-auto mb-4 animate-pulse" />
        <h2 className="text-3xl font-bold mb-4">Crisis Support Available 24/7</h2>
        <p className="text-lg">If you're in crisis, please reach out now.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {resources.map((resource, idx) => (
          <div key={idx} className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:shadow-lg transition">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-2">{resource.name}</h3>
                <p className="text-2xl font-bold text-blue-600 mb-2">{resource.phone}</p>
                <div className="flex items-center gap-2 text-gray-600 mb-3">
                  <Clock className="w-4 h-4" />
                  <span>{resource.available}</span>
                </div>
              </div>
              <Phone className="w-8 h-8 text-blue-600" />
            </div>
            <a href={resource.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-blue-600 hover:underline font-semibold">
              Visit Website <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        ))}
      </div>

      <div className="bg-gradient-to-r from-purple-50 to-blue-50 border-2 border-purple-200 rounded-xl p-8">
        <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
          <BookOpen className="w-8 h-8 text-purple-600" />
          Additional Resources
        </h3>
        <div className="space-y-4">
          {[
            { name: 'Mental Health America', desc: 'Free screening tools and resources', url: 'https://www.mhanational.org' },
            { name: 'NAMI', desc: 'Education, support groups, and advocacy', url: 'https://www.nami.org' },
            { name: 'Psychology Today', desc: 'Find therapists and support groups', url: 'https://www.psychologytoday.com' }
          ].map((r, i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow-sm hover:shadow-md transition">
              <h4 className="font-semibold mb-2 text-lg">{r.name}</h4>
              <p className="text-gray-600 mb-3">{r.desc}</p>
              <a href={r.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline flex items-center gap-1 font-semibold">
                Visit Website <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderBooking = () => (
    <div className="max-w-2xl mx-auto space-y-8">
      <div className="text-center bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-2xl p-8">
        <Calendar className="w-16 h-16 mx-auto mb-4" />
        <h2 className="text-3xl font-bold mb-4">Schedule a Counseling Session</h2>
        <p className="text-lg">Connect with licensed professionals</p>
      </div>

      {bookingSubmitted && (
        <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 text-center">
          <CheckCircle className="w-12 h-12 mx-auto mb-3 text-green-600" />
          <p className="text-green-800 font-semibold text-lg">Request submitted! We'll contact you within 24 hours.</p>
        </div>
      )}

      <div className="bg-white border-2 border-gray-200 rounded-xl p-8 space-y-6">
        <div>
          <label className="block font-semibold mb-2">Full Name <span className="text-red-500">*</span></label>
          <input type="text" value={bookingFormData.name} onChange={(e) => setBookingFormData({...bookingFormData, name: e.target.value})} className="w-full border-2 border-gray-300 rounded-lg p-3" placeholder="Enter your name" />
        </div>
        
        <div>
          <label className="block font-semibold mb-2">Email <span className="text-red-500">*</span></label>
          <input type="email" value={bookingFormData.email} onChange={(e) => setBookingFormData({...bookingFormData, email: e.target.value})} className="w-full border-2 border-gray-300 rounded-lg p-3" placeholder="your.email@example.com" />
        </div>

        <div>
          <label className="block font-semibold mb-2">Phone</label>
          <input type="tel" value={bookingFormData.phone} onChange={(e) => setBookingFormData({...bookingFormData, phone: e.target.value})} className="w-full border-2 border-gray-300 rounded-lg p-3" placeholder="(555) 123-4567" />
        </div>

        <div>
          <label className="block font-semibold mb-2">Session Type</label>
          <select value={bookingFormData.sessionType} onChange={(e) => setBookingFormData({...bookingFormData, sessionType: e.target.value})} className="w-full border-2 border-gray-300 rounded-lg p-3">
            <option>Video Call</option>
            <option>Phone Call</option>
            <option>In-Person</option>
          </select>
        </div>

        <div>
          <label className="block font-semibold mb-2">Preferred Date <span className="text-red-500">*</span></label>
          <input type="date" value={bookingFormData.date} onChange={(e) => setBookingFormData({...bookingFormData, date: e.target.value})} className="w-full border-2 border-gray-300 rounded-lg p-3" />
        </div>

        <div>
          <label className="block font-semibold mb-2">Description (Optional)</label>
          <textarea value={bookingFormData.description} onChange={(e) => setBookingFormData({...bookingFormData, description: e.target.value})} className="w-full border-2 border-gray-300 rounded-lg p-3" rows={4} placeholder="What brings you to counseling?" />
        </div>

        <button onClick={handleBookingSubmit} className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-4 rounded-lg font-semibold hover:opacity-90 transition">
          Request Appointment
        </button>
      </div>

      {appointments.length > 0 && (
        <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
          <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-blue-600" />
            Your Appointments
          </h3>
          <div className="space-y-3">
            {appointments.slice(0, 3).map((apt) => (
              <div key={apt.id} className="border-2 border-gray-200 rounded-lg p-4 flex justify-between">
                <div>
                  <p className="font-semibold">{apt.sessionType}</p>
                  <p className="text-sm text-gray-600">{apt.date}</p>
                </div>
                <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-semibold h-fit">{apt.status}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderCommunity = () => (
    <div className="space-y-8">
      <div className="text-center bg-gradient-to-r from-green-500 to-blue-600 text-white rounded-2xl p-8">
        <Users className="w-16 h-16 mx-auto mb-4" />
        <h2 className="text-3xl font-bold mb-4">Community Support</h2>
        <p className="text-lg">Connect with others who understand</p>
      </div>

      <div className="bg-white border-2 border-gray-200 rounded-xl p-6">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
          <MessageCircle className="w-6 h-6 text-green-600" />
          Share Your Thoughts
        </h3>
        <textarea value={newPost} onChange={(e) => setNewPost(e.target.value)} className="w-full border-2 border-gray-300 rounded-lg p-3 mb-4" rows={4} placeholder="Share your story or offer support..." />
        <button onClick={handleCommunityPost} className="bg-gradient-to-r from-green-600 to-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90">
          Post to Community
        </button>
      </div>

      <div className="space-y-4">
        {communityPosts.map((post) => (
          <div key={post.id} className="bg-white border-2 border-gray-200 rounded-xl p-6">
            <div className="flex items-start justify-between mb-3">
              <div>
                <p className="font-semibold text-blue-600 mb-1">{post.author}</p>
                <p className="text-sm text-gray-500">{new Date(post.timestamp).toLocaleString()}</p>
              </div>
            </div>
            <p className="text-gray-700 mb-4">{post.content}</p>
            <button onClick={() => handleLikePost(post.id)} className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition">
              <ThumbsUp className="w-5 h-5" />
              <span>{post.likes} Likes</span>
            </button>
          </div>
        ))}
        {communityPosts.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <MessageCircle className="w-16 h-16 mx-auto mb-4 opacity-30" />
            <p>No posts yet. Be the first to share!</p>
          </div>
        )}
      </div>
    </div>
  );

  const renderBlog = () => (
    <div className="space-y-8">
      <div className="text-center bg-gradient-to-r from-purple-500 to-blue-600 text-white rounded-2xl p-8">
        <BookOpen className="w-16 h-16 mx-auto mb-4" />
        <h2 className="text-3xl font-bold mb-4">Mental Health Resources</h2>
        <p className="text-lg">Evidence-based information</p>
      </div>

      <div className="space-y-6">
        {blogPosts.map((post) => (
          <div key={post.id} className="bg-white border-2 border-gray-200 rounded-xl p-6 hover:shadow-lg transition">
            <h3 className="text-xl font-bold mb-2">{post.title}</h3>
            <p className="text-gray-600 mb-3">{post.excerpt}</p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span>{post.author}</span>
              <span>•</span>
              <span>{post.date}</span>
              <span>•</span>
              <span>{post.readTime}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b-2 border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Heart className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-bold">MindCare Hub</span>
            </div>
            
            <div className="hidden md:flex items-center gap-1">
              {['home', 'info', 'resources', 'booking', 'community', 'blog'].map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-lg font-medium transition ${activeTab === tab ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}>
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t-2 border-gray-200 py-2">
            {['home', 'info', 'resources', 'booking', 'community', 'blog'].map(tab => (
              <button key={tab} onClick={() => { setActiveTab(tab); setMobileMenuOpen(false); }} className={`w-full text-left px-4 py-3 font-medium transition ${activeTab === tab ? 'bg-blue-100 text-blue-600' : 'text-gray-600 hover:bg-gray-100'}`}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        )}
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'home' && renderHome()}
        {activeTab === 'info' && renderInfo()}
        {activeTab === 'resources' && renderResources()}
        {activeTab === 'booking' && renderBooking()}
        {activeTab === 'community' && renderCommunity()}
        {activeTab === 'blog' && renderBlog()}
      </main>

      <footer className="bg-gray-800 text-white mt-16 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Heart className="w-6 h-6" />
                <span className="font-bold text-lg">MindCare Hub</span>
              </div>
              <p className="text-gray-400">Supporting mental health awareness</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition">About Us</a></li>
                <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Crisis Support</h4>
              <p className="text-gray-400 mb-2">If you're in crisis:</p>
              <p className="text-xl font-bold">Call 988</p>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-gray-400">
            <p>© 2025 MindCare Hub. Not a substitute for professional medical advice.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MentalHealthHub;