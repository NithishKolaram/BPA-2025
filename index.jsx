// Mental disorder summaries in this file were generated with the help of ChatGPT.
import React, { useState, useEffect } from 'react';
import { Heart, Phone, Calendar, MessageCircle, BookOpen, Users, Menu, X, ChevronRight, ExternalLink, Brain, Shield, Activity, TrendingUp, Clock, CheckCircle, AlertCircle, ThumbsUp, Search, MapPin, Star, Lock, Eye, EyeOff, Zap, Music, PenTool, BarChart3, Filter, Download } from 'lucide-react';

const MentalHealthHub = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDisorder, setSelectedDisorder] = useState(null);
  const [journalEntries, setJournalEntries] = useState([]);
  const [newJournalEntry, setNewJournalEntry] = useState('');
  const [journalMood, setJournalMood] = useState('neutral');
  const [meditationTime, setMeditationTime] = useState(0);
  const [progressTracking, setProgressTracking] = useState({ entries: [], streaks: 0 });
  const [symptomInput, setSymptomInput] = useState('');
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [matchedDisorders, setMatchedDisorders] = useState([]);
  const [showSymptomButtons, setShowSymptomButtons] = useState(false);
  const [bookingFormData, setBookingFormData] = useState({
    name: '',
    email: '',
    phone: '',
    sessionType: 'Video Call',
    date: '',
    preferredCounselor: '',
    description: ''
  });
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [communityPosts, setCommunityPosts] = useState([]);
  const [newPost, setNewPost] = useState('');
  const [postFilter, setPostFilter] = useState('all');
  const [blogCategoryFilter, setBlogCategoryFilter] = useState('all');
  const [showResourcesPanel, setShowResourcesPanel] = useState(false);
  const [stats, setStats] = useState({ totalAppointments: 6, activeCommunityMembers: 7, resourcesAccessed: 9 });
  const [blogPosts] = useState([
    {
      id: 1,
      title: 'Understanding the Mind-Body Connection',
      excerpt: 'Explore how physical health impacts mental wellbeing and vice versa.',
      date: 'Dec 10, 2026',
      author: 'Dr. Sarah Johnson',
      readTime: '5 min',
      category: 'Self-Care',
      content: 'Physical exercise, nutrition, and sleep are foundational pillars of mental health. Research shows that regular physical activity can reduce anxiety by up to 20% and improve mood through endorphin release.'
    },
    {
      id: 2,
      title: '5 Daily Habits for Better Mental Health',
      excerpt: 'Simple, evidence-based practices you can incorporate into your routine.',
      date: 'Dec 8, 2026',
      author: 'Michael Chen, LCSW',
      readTime: '4 min',
      category: 'Self-Care',
      content: '1. Practice gratitude journaling (5 min daily)\n2. Mindfulness meditation (10 min)\n3. Social connection (daily interaction)\n4. Physical movement (30 min)\n5. Sleep hygiene (consistent schedule)'
    },
    {
      id: 3,
      title: 'Breaking the Stigma: Why We Need to Talk',
      excerpt: 'The importance of open conversations about mental health in our communities.',
      date: 'Dec 5, 2026',
      author: 'Dr. Emily Rodriguez',
      readTime: '6 min',
      category: 'Awareness',
      content: 'Mental health is just as important as physical health. By normalizing conversations about mental wellness, we create safe spaces for people to seek help without shame or judgment.'
    },
    {
      id: 4,
      title: 'Stress Management Techniques for Busy Professionals',
      excerpt: 'Practical strategies to manage stress in your workplace and personal life.',
      date: 'Dec 1, 2026',
      author: 'Dr. James Wilson',
      readTime: '7 min',
      category: 'Stress Management',
      content: 'Time management, setting boundaries, deep breathing exercises, and regular breaks are essential for managing workplace stress.'
    },
    {
      id: 5,
      title: 'Anxiety Coping Strategies That Work',
      excerpt: 'Evidence-based techniques to help manage anxiety symptoms in the moment.',
      date: 'Nov 28, 2026',
      author: 'Dr. Linda Martinez',
      readTime: '5 min',
      category: 'Anxiety',
      content: 'CBT techniques, grounding exercises (5-4-3-2-1 method), and progressive muscle relaxation are proven strategies for anxiety relief.'
    },
    {
      id: 6,
      title: 'Building Resilience: A Path to Mental Strength',
      excerpt: 'Learn how to develop emotional resilience and bounce back from challenges.',
      date: 'Nov 25, 2026',
      author: 'Dr. Robert Chen',
      readTime: '8 min',
      category: 'Resilience',
      content: 'Resilience is a skill that can be developed through practice. It involves accepting challenges, maintaining perspective, and building strong support networks.'
    }
  ]);

  useEffect(() => {
    loadData();
  }, []);

  const saveToLocalStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
  };

  const loadFromLocalStorage = (key, defaultValue = []) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  };

  const loadData = async () => {
    const API_BASE = '';
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
      // Load from localStorage
      setCommunityPosts(loadFromLocalStorage('communityPosts', []));
      setStats(loadFromLocalStorage('stats', { totalAppointments: 0, activeCommunityMembers: 0, resourcesAccessed: 0 }));
      setAppointments(loadFromLocalStorage('appointments', []));
      setJournalEntries(loadFromLocalStorage('journalEntries', []));
      setProgressTracking(loadFromLocalStorage('progressTracking', { entries: [], streaks: 0 }));
    }
  };

  // Save to localStorage when data changes
  useEffect(() => {
    saveToLocalStorage('appointments', appointments);
  }, [appointments]);

  useEffect(() => {
    saveToLocalStorage('communityPosts', communityPosts);
  }, [communityPosts]);

  useEffect(() => {
    saveToLocalStorage('stats', stats);
  }, [stats]);

  useEffect(() => {
    saveToLocalStorage('journalEntries', journalEntries);
  }, [journalEntries]);

  useEffect(() => {
    saveToLocalStorage('progressTracking', progressTracking);
  }, [progressTracking]);

  const fetchStats = async () => {
    const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:5000';
    try {
      const statsRes = await fetch(`${API_BASE}/api/stats`).then(r => r.json()).catch(() => ({ success: false }));
      if (statsRes && statsRes.success) setStats({ totalAppointments: statsRes.stats?.total_appointments || 0, activeCommunityMembers: statsRes.stats?.active_users || 0, resourcesAccessed: 0 });
    } catch (error) {
      console.log('Error fetching stats', error);
    }
  };

  const commonSymptoms = [
    'Anxiety', 'Depression', 'Insomnia', 'Fatigue', 'Irritability',
    'Difficulty Concentrating', 'Panic Attacks', 'Flashbacks', 'Nightmares',
    'Mood Swings', 'Restlessness', 'Sadness', 'Racing Thoughts', 'Avoidance',
    'Obsessive Thoughts', 'Compulsive Behaviors', 'Fear of Judgment',
    'Social Withdrawal', 'Loss of Interest', 'Sleep Problems', 'Muscle Tension',
    'Rapid Heartbeat', 'Shortness of Breath', 'Dizziness', 'Emotional Numbness'
  ];

  const matchSymptomsToDisorders = (symptomsArray) => {
    if (!symptomsArray || symptomsArray.length === 0) {
      setMatchedDisorders([]);
      return;
    }

    const userSymptoms = symptomsArray.map(s => s.toLowerCase());
    const scoredDisorders = disorders.map(disorder => {
      const disorderSymptoms = disorder.symptoms.map(s => s.toLowerCase());
      let matchScore = 0;
      
      userSymptoms.forEach(userSymptom => {
        disorderSymptoms.forEach(disorderSymptom => {
          if (disorderSymptom.includes(userSymptom) || userSymptom.includes(disorderSymptom)) {
            matchScore += 10;
          }
          const userWords = userSymptom.split(' ');
          const disorderWords = disorderSymptom.split(' ');
          userWords.forEach(userWord => {
            if (disorderWords.some(dWord => dWord === userWord)) {
              matchScore += 5;
            }
          });
        });
      });
      
      return { disorder, matchScore };
    }).filter(item => item.matchScore > 0)
      .sort((a, b) => b.matchScore - a.matchScore)
      .slice(0, 3);

    setMatchedDisorders(scoredDisorders);
  };

  const disorders = [
    {
      id: 'anxiety',
      name: 'Anxiety Disorders',
      description: 'Characterized by excessive worry, fear, or nervousness that interferes with daily activities.',
      symptoms: ['Restlessness', 'Rapid heartbeat', 'Difficulty concentrating', 'Sleep problems', 'Muscle tension', 'Irritability'],
      treatments: ['Cognitive Behavioral Therapy', 'Medication (SSRIs)', 'Exposure therapy', 'Relaxation techniques'],
      copingStrategies: ['Deep breathing exercises', 'Progressive muscle relaxation', 'Mindfulness meditation', 'Regular exercise'],
      whenToSeekHelp: 'If anxiety symptoms persist for more than 2 weeks or interfere with work, relationships, or daily functioning.',
      color: 'bg-blue-50 border-blue-200',
      icon: Brain,
      stats: '40M adults affected in US'
    },
    {
      id: 'depression',
      name: 'Depression',
      description: 'A mood disorder causing persistent feelings of sadness and loss of interest.',
      symptoms: ['Persistent sadness', 'Loss of interest', 'Fatigue', 'Changes in appetite', 'Difficulty sleeping', 'Feelings of worthlessness'],
      treatments: ['Psychotherapy', 'Antidepressant medication', 'Lifestyle changes', 'Brain stimulation therapies'],
      copingStrategies: ['Social support', 'Physical exercise', 'Maintaining routine', 'Engaging in enjoyable activities'],
      whenToSeekHelp: 'Seek help immediately if you experience suicidal thoughts. Also seek help if symptoms last 2+ weeks.',
      color: 'bg-blue-50 border-blue-200',
      icon: Heart,
      stats: '21M adults experienced episode'
    },
    {
      id: 'ptsd',
      name: 'PTSD',
      description: 'Post-Traumatic Stress Disorder develops after experiencing or witnessing traumatic events.',
      symptoms: ['Flashbacks', 'Nightmares', 'Severe anxiety', 'Avoidance behaviors', 'Hypervigilance', 'Emotional numbness'],
      treatments: ['Trauma-focused CBT', 'EMDR therapy', 'Medication', 'Exposure therapy'],
      copingStrategies: ['Grounding techniques', 'Journaling', 'Social connection', 'Professional support groups'],
      whenToSeekHelp: 'Seek professional help if symptoms persist 1+ month after trauma exposure.',
      color: 'bg-teal-50 border-teal-200',
      icon: Shield,
      stats: '13M Americans affected'
    },
    {
      id: 'bipolar',
      name: 'Bipolar Disorder',
      description: 'Characterized by extreme mood swings including emotional highs and lows.',
      symptoms: ['Mood swings', 'Energy changes', 'Sleep pattern changes', 'Impulsive behavior', 'Racing thoughts', 'Grandiosity'],
      treatments: ['Mood stabilizers', 'Antipsychotics', 'Psychotherapy', 'Lifestyle management'],
      copingStrategies: ['Consistent sleep schedule', 'Stress management', 'Medication adherence', 'Support groups'],
      whenToSeekHelp: 'Seek immediate help if experiencing manic or depressive episodes affecting safety or functioning.',
      color: 'bg-indigo-50 border-indigo-200',
      icon: Activity,
      stats: '2.8% of US adults diagnosed'
    },
    {
      id: 'ocd',
      name: 'Obsessive-Compulsive Disorder',
      description: 'Characterized by intrusive obsessive thoughts and repetitive compulsive behaviors.',
      symptoms: ['Intrusive thoughts', 'Compulsive behaviors', 'Severe anxiety', 'Fear of contamination', 'Need for order'],
      treatments: ['Exposure & Response Prevention', 'Cognitive Behavioral Therapy', 'Medication', 'Acceptance & Commitment Therapy'],
      copingStrategies: ['Mindfulness', 'Resisting compulsions gradually', 'Support groups', 'Stress reduction'],
      whenToSeekHelp: 'Seek help if obsessions/compulsions consume significant time or interfere with daily life.',
      color: 'bg-purple-50 border-purple-200',
      icon: Brain,
      stats: '1.2% of US population diagnosed'
    },
    {
      id: 'adhd',
      name: 'ADHD',
      description: 'Attention-Deficit/Hyperactivity Disorder affects focus, impulse control, and organization.',
      symptoms: ['Difficulty concentrating', 'Impulsivity', 'Restlessness', 'Disorganization', 'Time management issues'],
      treatments: ['Stimulant medication', 'Behavioral therapy', 'Organizational coaching', 'Lifestyle modifications'],
      copingStrategies: ['Breaking tasks into smaller steps', 'Using timers and reminders', 'Regular exercise', 'Creating structured routines'],
      whenToSeekHelp: 'Seek evaluation if symptoms significantly impact work, school, or relationships.',
      color: 'bg-green-50 border-green-200',
      icon: TrendingUp,
      stats: '5.3% of children, 2.5% of adults diagnosed'
    },
    {
      id: 'generalizedAnxiety',
      name: 'Generalized Anxiety Disorder',
      description: 'Persistent, excessive worry about various aspects of daily life for at least 6 months.',
      symptoms: ['Excessive worry', 'Restlessness', 'Fatigue', 'Difficulty concentrating', 'Muscle tension', 'Sleep disturbances'],
      treatments: ['Cognitive Behavioral Therapy', 'Medication (SSRIs)', 'Mindfulness-based stress reduction', 'Relaxation therapy'],
      copingStrategies: ['Worry time scheduling', 'Exercise', 'Sleep hygiene', 'Social support'],
      whenToSeekHelp: 'When worry interferes with daily functioning or lasts 6+ months.',
      color: 'bg-cyan-50 border-cyan-200',
      icon: Brain,
      stats: '6.8M adults in US'
    },
    {
      id: 'socialAnxiety',
      name: 'Social Anxiety Disorder',
      description: 'Intense fear of social situations and being judged or embarrassed by others.',
      symptoms: ['Fear of judgment', 'Avoidance of social situations', 'Physical symptoms in social settings', 'Self-consciousness', 'Intense anxiety'],
      treatments: ['Cognitive Behavioral Therapy', 'Exposure therapy', 'Medication (SSRIs)', 'Social skills training'],
      copingStrategies: ['Gradual exposure', 'Deep breathing', 'Positive self-talk', 'Support groups'],
      whenToSeekHelp: 'If social anxiety prevents you from work, school, or relationships.',
      color: 'bg-rose-50 border-rose-200',
      icon: Users,
      stats: '7.1% of adults at some point'
    },
    {
      id: 'panicDisorder',
      name: 'Panic Disorder',
      description: 'Sudden, recurring episodes of intense fear accompanied by physical symptoms.',
      symptoms: ['Panic attacks', 'Heart palpitations', 'Shortness of breath', 'Dizziness', 'Sweating', 'Fear of dying'],
      treatments: ['Cognitive Behavioral Therapy', 'Medication (SSRIs)', 'Interoceptive exposure', 'Breathing exercises'],
      copingStrategies: ['Breathing techniques', 'Grounding exercises', 'Regular exercise', 'Stress management'],
      whenToSeekHelp: 'If you experience recurrent panic attacks.',
      color: 'bg-orange-50 border-orange-200',
      icon: AlertCircle,
      stats: '3.7% of adults experience'
    },
    {
      id: 'specificPhobia',
      name: 'Specific Phobia',
      description: 'Intense, irrational fear of specific objects or situations.',
      symptoms: ['Intense fear', 'Panic attacks', 'Avoidance behaviors', 'Anticipatory anxiety', 'Physical symptoms'],
      treatments: ['Exposure therapy', 'Cognitive Behavioral Therapy', 'Medication for anxiety', 'Relaxation techniques'],
      copingStrategies: ['Gradual exposure', 'Breathing exercises', 'Visualization', 'Support'],
      whenToSeekHelp: 'When phobia interferes with daily activities or quality of life.',
      color: 'bg-amber-50 border-amber-200',
      icon: Shield,
      stats: '12% of adults in lifetime'
    },
    {
      id: 'agoraphobia',
      name: 'Agoraphobia',
      description: 'Anxiety disorder where situations that might cause panic and help is unavailable seem dangerous.',
      symptoms: ['Fear of leaving home', 'Fear of crowds', 'Fear of open spaces', 'Panic attacks', 'Avoidance'],
      treatments: ['Cognitive Behavioral Therapy', 'Exposure therapy', 'Medication', 'Lifestyle changes'],
      copingStrategies: ['Gradual exposure', 'Support person', 'Breathing exercises', 'Positive self-talk'],
      whenToSeekHelp: 'If you feel trapped or unable to leave certain places safely.',
      color: 'bg-lime-50 border-lime-200',
      icon: MapPin,
      stats: '1.7% of adults'
    },
    {
      id: 'persistentDepressiveDis',
      name: 'Persistent Depressive Disorder',
      description: 'Chronic depression lasting at least 2 years with consistent low mood.',
      symptoms: ['Persistent sadness', 'Loss of interest', 'Fatigue', 'Low self-esteem', 'Difficulty concentrating', 'Hopelessness'],
      treatments: ['Antidepressant medication', 'Psychotherapy', 'Lifestyle changes', 'Combination therapy'],
      copingStrategies: ['Physical activity', 'Social engagement', 'Routine building', 'Mindfulness'],
      whenToSeekHelp: 'If depressed mood persists for 2+ years or significantly impacts life.',
      color: 'bg-slate-100 border-slate-300',
      icon: Heart,
      stats: '1.5% of adults'
    },
    {
      id: 'bipolarII',
      name: 'Bipolar II Disorder',
      description: 'Less severe mood swings than Bipolar I, with hypomanic and depressive episodes.',
      symptoms: ['Hypomanic episodes', 'Major depressive episodes', 'Irritability', 'Racing thoughts', 'Increased goal-directed activity'],
      treatments: ['Mood stabilizers', 'Antidepressants', 'Psychotherapy', 'Lifestyle management'],
      copingStrategies: ['Sleep schedule', 'Stress management', 'Medication adherence', 'Therapy'],
      whenToSeekHelp: 'If experiencing mood episodes affecting functioning.',
      color: 'bg-indigo-100 border-indigo-300',
      icon: Activity,
      stats: '1.1% of adults'
    },
    {
      id: 'cyclothymia',
      name: 'Cyclothymia',
      description: 'Chronic mood cycling with less severe highs and lows than Bipolar disorder.',
      symptoms: ['Mood cycles', 'Mild hypomanic periods', 'Mild depressive periods', 'Pattern persistence', 'Mood instability'],
      treatments: ['Mood stabilizers', 'Psychotherapy', 'Lifestyle management', 'Regular monitoring'],
      copingStrategies: ['Mood tracking', 'Routine building', 'Stress reduction', 'Support groups'],
      whenToSeekHelp: 'If mood cycling significantly impacts relationships or work.',
      color: 'bg-violet-50 border-violet-200',
      icon: Activity,
      stats: '0.4-1% of population'
    },
    {
      id: 'bpd',
      name: 'Borderline Personality Disorder',
      description: 'Pattern of unstable relationships, self-image, and intense fear of abandonment.',
      symptoms: ['Unstable relationships', 'Identity disturbance', 'Impulsive behaviors', 'Emotional instability', 'Intense anger'],
      treatments: ['Dialectical Behavior Therapy', 'Psychotherapy', 'Medication for symptoms', 'Schema therapy'],
      copingStrategies: ['Emotion regulation', 'Mindfulness', 'Self-harm alternatives', 'Support groups'],
      whenToSeekHelp: 'If experiencing self-harm urges or unstable relationships.',
      color: 'bg-pink-50 border-pink-200',
      icon: Brain,
      stats: '1.4% of adults'
    },
    {
      id: 'npd',
      name: 'Narcissistic Personality Disorder',
      description: 'Pattern of grandiosity, need for admiration, and lack of empathy for others.',
      symptoms: ['Grandiosity', 'Need for admiration', 'Lack of empathy', 'Envy', 'Interpersonal exploitation'],
      treatments: ['Individual psychotherapy', 'Cognitive therapy', 'Long-term treatment', 'Family therapy'],
      copingStrategies: ['Self-awareness development', 'Empathy building', 'Relationship focus', 'Professional help'],
      whenToSeekHelp: 'When recognized through conflict or feedback from others.',
      color: 'bg-red-50 border-red-200',
      icon: Brain,
      stats: '1% of population'
    },
    {
      id: 'aspd',
      name: 'Antisocial Personality Disorder',
      description: 'Pattern of violating others\' rights and lack of remorse for harmful behavior.',
      symptoms: ['Lack of remorse', 'Manipulation', 'Deceitfulness', 'Aggression', 'Recklessness'],
      treatments: ['Cognitive therapy', 'Psychotherapy', 'Medication for co-occurring issues', 'Behavioral approaches'],
      copingStrategies: ['Professional intervention', 'Structured environment', 'Accountability', 'Therapy'],
      whenToSeekHelp: 'Through legal system or family intervention.',
      color: 'bg-gray-50 border-gray-300',
      icon: Shield,
      stats: '1% of population'
    },
    {
      id: 'schizophrenia',
      name: 'Schizophrenia',
      description: 'Psychotic disorder involving delusions, hallucinations, and cognitive difficulties.',
      symptoms: ['Hallucinations', 'Delusions', 'Disorganized speech', 'Negative symptoms', 'Cognitive difficulties'],
      treatments: ['Antipsychotic medication', 'Psychosocial therapy', 'Family support', 'Community resources'],
      copingStrategies: ['Medication adherence', 'Routine', 'Social support', 'Stress management'],
      whenToSeekHelp: 'Immediately if experiencing psychotic symptoms.',
      color: 'bg-purple-100 border-purple-300',
      icon: Brain,
      stats: '0.3-0.7% of population'
    },
    {
      id: 'schizoaffective',
      name: 'Schizoaffective Disorder',
      description: 'Combination of schizophrenia symptoms with mood disorder symptoms.',
      symptoms: ['Hallucinations/delusions', 'Mood episodes', 'Disorganized behavior', 'Cognitive difficulties', 'Social withdrawal'],
      treatments: ['Mood stabilizers', 'Antipsychotics', 'Psychotherapy', 'Support services'],
      copingStrategies: ['Medication management', 'Structure', 'Social support', 'Regular care'],
      whenToSeekHelp: 'If experiencing psychotic and mood symptoms together.',
      color: 'bg-indigo-50 border-indigo-200',
      icon: Brain,
      stats: '0.3% of population'
    },
    {
      id: 'adjustment',
      name: 'Adjustment Disorder',
      description: 'Emotional or behavioral response to identifiable stressors.',
      symptoms: ['Anxiety', 'Sadness', 'Worry', 'Difficulty functioning', 'Emotional distress'],
      treatments: ['Psychotherapy', 'Stress management', 'Coping skills training', 'Support'],
      copingStrategies: ['Stress reduction', 'Social support', 'Problem-solving', 'Mindfulness'],
      whenToSeekHelp: 'If unable to cope with major life changes or stressors.',
      color: 'bg-yellow-50 border-yellow-200',
      icon: AlertCircle,
      stats: '5-20% experience in lifetime'
    },
    {
      id: 'acutestress',
      name: 'Acute Stress Disorder',
      description: 'Severe stress response to traumatic events occurring within 4 weeks.',
      symptoms: ['Intrusive memories', 'Avoidance', 'Negative mood', 'Arousal symptoms', 'Dissociation'],
      treatments: ['Trauma-focused CBT', 'Cognitive processing therapy', 'Medication', 'Support'],
      copingStrategies: ['Grounding techniques', 'Social support', 'Self-care', 'Professional help'],
      whenToSeekHelp: 'In first month following trauma exposure.',
      color: 'bg-red-100 border-red-300',
      icon: AlertCircle,
      stats: '50% of trauma survivors'
    },
    {
      id: 'complexptsd',
      name: 'Complex PTSD',
      description: 'PTSD resulting from repeated or prolonged traumatic exposure.',
      symptoms: ['PTSD symptoms', 'Emotional regulation difficulties', 'Self-perception changes', 'Relationship difficulties', 'Negative beliefs'],
      treatments: ['Trauma-focused therapy', 'EMDR', 'Medication', 'Support groups'],
      copingStrategies: ['Trauma processing', 'Emotional regulation', 'Self-compassion', 'Therapy'],
      whenToSeekHelp: 'Following repeated or prolonged trauma.',
      color: 'bg-teal-100 border-teal-300',
      icon: Shield,
      stats: 'Higher in abuse survivors'
    },
    {
      id: 'ocpd',
      name: 'Obsessive-Compulsive Personality Disorder',
      description: 'Preoccupation with perfectionism, order, and control at expense of relationships.',
      symptoms: ['Perfectionism', 'Excessive devotion to work', 'Rigidity', 'Difficulty expressing emotions', 'Hoarding behaviors'],
      treatments: ['Cognitive therapy', 'Psychotherapy', 'Acceptance therapy', 'Behavioral approaches'],
      copingStrategies: ['Flexibility practice', 'Emotional awareness', 'Relaxation', 'Therapy'],
      whenToSeekHelp: 'If rigidity interferes with relationships and happiness.',
      color: 'bg-purple-50 border-purple-200',
      icon: Brain,
      stats: '1% of population'
    },
    {
      id: 'anorexia',
      name: 'Anorexia Nervosa',
      description: 'Eating disorder characterized by restrictive eating and intense fear of weight gain.',
      symptoms: ['Severe food restriction', 'Intense fear of weight gain', 'Distorted body image', 'Excessive exercise', 'Social withdrawal'],
      treatments: ['Nutritional counseling', 'Psychotherapy', 'Medical monitoring', 'Family therapy'],
      copingStrategies: ['Meal planning', 'Support groups', 'Therapy', 'Medical care'],
      whenToSeekHelp: 'Seek immediate professional help for eating disorders.',
      color: 'bg-fuchsia-50 border-fuchsia-200',
      icon: Heart,
      stats: '1% of women, 0.1% of men'
    },
    {
      id: 'bulimia',
      name: 'Bulimia Nervosa',
      description: 'Eating disorder with binge eating followed by compensatory behaviors.',
      symptoms: ['Binge eating', 'Purging behaviors', 'Self-induced vomiting', 'Laxative abuse', 'Body image disturbance'],
      treatments: ['Cognitive Behavioral Therapy', 'Nutritional counseling', 'Medication', 'Support groups'],
      copingStrategies: ['Regular meals', 'Stress management', 'Therapy', 'Support'],
      whenToSeekHelp: 'If experiencing binge-purge cycles regularly.',
      color: 'bg-pink-100 border-pink-300',
      icon: Heart,
      stats: '1-2% prevalence'
    },
    {
      id: 'binge',
      name: 'Binge Eating Disorder',
      description: 'Eating disorder characterized by recurrent episodes of eating large amounts of food.',
      symptoms: ['Recurrent binge episodes', 'Loss of control', 'Emotional distress', 'Shame', 'Weight gain'],
      treatments: ['Cognitive Behavioral Therapy', 'Dietary counseling', 'Medication', 'Support groups'],
      copingStrategies: ['Meal structure', 'Emotional regulation', 'Support', 'Healthy coping'],
      whenToSeekHelp: 'If binge eating significantly affects quality of life.',
      color: 'bg-rose-100 border-rose-300',
      icon: Heart,
      stats: '1.6% of women, 0.8% of men'
    },
    {
      id: 'insomnia',
      name: 'Insomnia Disorder',
      description: 'Persistent difficulty falling or staying asleep despite adequate opportunity.',
      symptoms: ['Difficulty falling asleep', 'Frequent nighttime awakenings', 'Early morning awakening', 'Daytime fatigue', 'Irritability'],
      treatments: ['Cognitive Behavioral Therapy for Insomnia', 'Sleep medication', 'Sleep hygiene', 'Relaxation techniques'],
      copingStrategies: ['Sleep hygiene', 'Relaxation', 'Meditation', 'Consistent schedule'],
      whenToSeekHelp: 'If sleep problems persist 3+ months and affect daytime functioning.',
      color: 'bg-indigo-50 border-indigo-200',
      icon: Clock,
      stats: '10% of population'
    },
    {
      id: 'sleepapnea',
      name: 'Obstructive Sleep Apnea',
      description: 'Sleep disorder with repeated breathing interruptions during sleep.',
      symptoms: ['Loud snoring', 'Breathing pauses', 'Gasping for air', 'Daytime sleepiness', 'Headaches'],
      treatments: ['CPAP therapy', 'Oral appliances', 'Lifestyle changes', 'Surgery'],
      copingStrategies: ['Weight management', 'Sleep position changes', 'Medication', 'Device use'],
      whenToSeekHelp: 'If experiencing snoring with daytime fatigue or witnessed apneas.',
      color: 'bg-blue-100 border-blue-300',
      icon: Clock,
      stats: '2-9% of population'
    }
  ];

  const resources = [
    { name: 'National Suicide Prevention Lifeline', phone: '988', available: '24/7', url: 'https://988lifeline.org', type: 'Crisis' },
    { name: 'Crisis Text Line', phone: 'Text HOME to 741741', available: '24/7', url: 'https://www.crisistextline.org', type: 'Crisis' },
    { name: 'SAMHSA National Helpline', phone: '1-800-662-4357', available: '24/7', url: 'https://www.samhsa.gov/find-help/national-helpline', type: 'Support' },
    { name: 'NAMI Helpline', phone: '1-800-950-6264', available: 'Mon-Fri, 10am-10pm ET', url: 'https://www.nami.org/help', type: 'Support' },
    { name: 'The Trevor Project', phone: '1-866-488-7386', available: '24/7', url: 'https://www.thetrevorproject.org', type: 'Crisis' },
    { name: 'LGBTQ+ Hotline', phone: '1-888-843-4564', available: '24/7', url: 'https://www.lgbtqiahealingfoundation.org', type: 'Support' }
  ];

  const counselors = [
    { id: 1, name: 'Dr. Sarah Johnson', specialization: 'Anxiety & Stress', availability: 'Mon-Thu 9am-5pm', sessionRate: '$90', bio: 'Licensed Clinical Psychologist with 12+ years experience' },
    { id: 2, name: 'Michael Chen, LCSW', specialization: 'Depression & Life Transitions', availability: 'Tue-Sat 10am-6pm', sessionRate: '$85', bio: 'Clinical Social Worker specializing in talk therapy' },
    { id: 3, name: 'Dr. Emily Rodriguez', specialization: 'PTSD & Trauma', availability: 'Mon-Fri 1pm-7pm', sessionRate: '$100', bio: 'Trauma-focused therapist with certification in EMDR' },
    { id: 4, name: 'Dr. James Wilson', specialization: 'Grief & Loss', availability: 'Wed-Sun 11am-6pm', sessionRate: '$95', bio: 'Grief counselor and bereavement specialist' }
  ];

  const testimonials = [
    {
      name: 'Sarah M.',
      story: 'After years of struggling with anxiety, therapy gave me tools to manage my thoughts. I now live with confidence and joy.',
      condition: 'Anxiety',
      rating: 5,
      timeToRecovery: '6 months',
      impact: 'Able to return to work and social activities'
    },
    {
      name: 'James T.',
      story: 'Depression nearly destroyed my relationships. With counseling and medication, I reconnected with loved ones and found purpose again.',
      condition: 'Depression',
      rating: 5,
      timeToRecovery: '8 months',
      impact: 'Improved family relationships and career progress'
    },
    {
      name: 'Maria L.',
      story: 'PTSD made everyday activities terrifying. EMDR therapy helped me process trauma and reclaim my life. I feel safe again.',
      condition: 'PTSD',
      rating: 5,
      timeToRecovery: '12 months',
      impact: 'Reduced nightmares and increased emotional stability'
    },
    {
      name: 'David K.',
      story: 'I thought I had to suffer alone. The community forums showed me others understood. Therapy combined with support made all the difference.',
      condition: 'Anxiety & Depression',
      rating: 5,
      timeToRecovery: '5 months',
      impact: 'Built supportive relationships and coping skills'
    },
    {
      name: 'Jessica R.',
      story: 'ADHD made me feel broken until I got proper support. Now with treatment and strategies, I\'m thriving academically and professionally.',
      condition: 'ADHD',
      rating: 5,
      timeToRecovery: '3 months',
      impact: 'Academic success and improved self-esteem'
    },
    {
      name: 'Robert H.',
      story: 'Grief counseling helped me honor my loss while rebuilding my life. I learned that healing doesn\'t mean forgetting.',
      condition: 'Grief & Bereavement',
      rating: 5,
      timeToRecovery: '10 months',
      impact: 'Renewed sense of meaning and connection'
    }
  ];

  const handleBookingSubmit = async () => {
    if (!bookingFormData.name || !bookingFormData.email || !bookingFormData.date) {
      alert('Please fill in all required fields');
      return;
    }

    const API_BASE = '';

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
        fetchStats();
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

    const API_BASE = '';
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
    const API_BASE = '';
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
    <div className="space-y-16">
      {/* Hero Section - Welcoming and Modern */}
      <section className="relative bg-gradient-to-br from-slate-600 via-slate-700 to-slate-800 text-white rounded-3xl p-12 md:p-16 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-40 h-40 bg-blue-300 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-50 h-50 bg-teal-300 rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10">
          <Heart className="w-14 h-14 mx-auto mb-6 text-blue-300" />
          <h1 className="text-5xl md:text-6xl font-light mb-4 text-white">You Deserve Support</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto text-slate-200 font-light">Your mental health matters. Find resources, connect with professionals, and join a supportive community.</p>
          <div className="flex flex-wrap gap-4 justify-center">
            <button onClick={() => setActiveTab('library')} className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-lg font-medium transition shadow-lg">Explore Resources</button>
            <button onClick={() => setActiveTab('booking')} className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-slate-700 transition">Book a Session</button>
          </div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="grid md:grid-cols-3 gap-8">
        <div className="bg-white rounded-2xl p-8 shadow-sm border-l-4 border-blue-500">
          <div className="text-4xl font-bold text-blue-600 mb-2">{stats.totalAppointments}</div>
          <div className="text-gray-700 font-medium">Sessions Booked</div>
          <div className="text-sm text-gray-500 mt-2">People getting help</div>
        </div>
        <div className="bg-white rounded-2xl p-8 shadow-sm border-l-4 border-teal-500">
          <div className="text-4xl font-bold text-teal-600 mb-2">{stats.activeCommunityMembers}</div>
          <div className="text-gray-700 font-medium">Community Members</div>
          <div className="text-sm text-gray-500 mt-2">Sharing support & stories</div>
        </div>
        <div className="bg-white rounded-2xl p-8 shadow-sm border-l-4 border-indigo-500">
          <div className="text-4xl font-bold text-indigo-600 mb-2">{blogPosts.length}</div>
          <div className="text-gray-700 font-medium">Resources Available</div>
          <div className="text-sm text-gray-500 mt-2">Evidence-based articles</div>
        </div>
      </section>

      {/* Quick Access Grid */}
      <section>
        <h2 className="text-3xl font-bold mb-8 text-gray-900">Quick Access</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: Phone, label: 'Crisis Support', tab: 'resources', color: 'from-red-500 to-red-600' },
            { icon: Brain, label: 'Mental Health Library', tab: 'library', color: 'from-blue-500 to-blue-600' },
            { icon: Calendar, label: 'Book Counseling', tab: 'booking', color: 'from-green-500 to-green-600' },
            { icon: Users, label: 'Community', tab: 'community', color: 'from-teal-500 to-teal-600' }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <button key={idx} onClick={() => setActiveTab(item.tab)} className={`bg-gradient-to-br ${item.color} text-white p-8 rounded-2xl hover:shadow-lg transition group`}>
                <Icon className="w-10 h-10 mx-auto mb-4 group-hover:scale-110 transition" />
                <h3 className="font-semibold text-lg">{item.label}</h3>
              </button>
            );
          })}
        </div>
      </section>

      {/* Stories of Hope */}
      <section className="bg-gradient-to-br from-blue-50 to-teal-50 p-12 rounded-3xl border-2 border-blue-100">
        <h2 className="text-3xl font-bold mb-2 text-gray-900">Stories of Hope</h2>
        <p className="text-gray-600 mb-8">Real people sharing their recovery journeys</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.slice(0, 3).map((t, idx) => (
            <div key={idx} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-md transition">
              <div className="flex items-center mb-4">
                {[...Array(t.rating)].map((_, i) => <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />)}
              </div>
              <p className="text-gray-700 mb-6 italic leading-relaxed">&quot;{t.story}&quot;</p>
              <div className="border-t pt-4">
                <p className="font-semibold text-gray-900">{t.name}</p>
                <p className="text-sm text-blue-600">{t.condition}</p>
                <p className="text-xs text-gray-500 mt-2">{t.impact}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );

  const renderInfo = () => (
    <div className="space-y-8">
      <div className="text-center bg-gradient-to-br from-blue-600 to-teal-600 text-white rounded-3xl p-12 shadow-3d">
        <div className="inline-block mb-4">
          <Brain className="w-16 h-16 mx-auto text-blue-100" />
        </div>
        <h2 className="text-4xl font-bold mb-4">Mental Health Information Library</h2>
        <p className="text-lg text-blue-100 max-w-2xl mx-auto">Comprehensive, reliable information about mental health conditions, treatments, and coping strategies.</p>
      </div>

      {/* Symptom-Based Matching Section */}
      <div className="relative ring-gradient rounded-3xl">
        <div className="bg-gradient-to-br from-indigo-50 to-blue-50 border-2 border-indigo-200 rounded-3xl p-8 shadow-3d">
          <h3 className="text-2xl font-bold mb-2 text-gray-900 flex items-center gap-2">
            <Zap className="w-6 h-6 text-indigo-600" />
            Find Conditions by Symptoms
          </h3>
          <p className="text-gray-600 mb-6">Click symptoms or type to discover matching mental health conditions</p>
          
          <div className="space-y-4">
            {/* Selected Symptoms Tags */}
            {selectedSymptoms.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedSymptoms.map((symptom) => (
                  <div
                    key={symptom}
                    className="bg-gradient-to-br from-indigo-600 to-indigo-700 text-white px-4 py-2 rounded-full flex items-center gap-2 hover:shadow-lg hover:opacity-90 transition-all cursor-pointer shadow-3d"
                  >
                    <span className="font-medium">{symptom}</span>
                    <button
                      onClick={() => {
                        const updated = selectedSymptoms.filter(s => s !== symptom);
                        setSelectedSymptoms(updated);
                        matchSymptomsToDisorders(updated);
                      }}
                      className="text-white hover:text-indigo-100 transition ml-1 font-bold"
                    >
                      ✕
                    </button>
                  </div>
                ))}
                <button
                  onClick={() => {
                    setSelectedSymptoms([]);
                    setMatchedDisorders([]);
                  }}
                  className="text-red-600 hover:text-red-700 font-medium text-sm underline transition-colors"
                >
                  Clear All
                </button>
              </div>
            )}

            {/* Text Input for Symptoms - Main Focus */}
            <div className="bg-white rounded-2xl p-6 border-2 border-indigo-100 shadow-3d">
              <label className="text-sm font-semibold text-gray-700 mb-3 block flex items-center gap-2">
                <span className="inline-block w-2 h-2 bg-blue-600 rounded-full"></span>
                Type or Click to Add Symptoms
              </label>
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  placeholder="e.g., anxiety, sleep issues..."
                  value={symptomInput}
                  onChange={(e) => setSymptomInput(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && symptomInput.trim()) {
                      const symptom = symptomInput.trim().charAt(0).toUpperCase() + symptomInput.trim().slice(1);
                      if (!selectedSymptoms.includes(symptom)) {
                        const updated = [...selectedSymptoms, symptom];
                        setSelectedSymptoms(updated);
                        matchSymptomsToDisorders(updated);
                      }
                      setSymptomInput('');
                    }
                  }}
                  className="flex-1 px-4 py-2 rounded-lg border-2 border-gray-300 focus:border-blue-600 focus:outline-none transition-colors text-gray-900 placeholder-gray-500 text-sm"
                />
                <button
                  onClick={() => setShowSymptomButtons(!showSymptomButtons)}
                  className="px-4 py-2 bg-gradient-to-br from-indigo-500 to-blue-500 text-white rounded-lg hover:shadow-md transition-all font-medium text-sm"
                >
                  {showSymptomButtons ? 'Hide' : 'Show'} Suggestions
                </button>
              </div>

              {/* Collapsible Symptoms Grid */}
              {showSymptomButtons && (
                <div className="space-y-3">
                  <p className="text-xs text-gray-600">Click any suggestion to add it</p>
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                    {commonSymptoms
                      .filter(symptom => !selectedSymptoms.includes(symptom))
                      .slice(0, 12)
                      .map((symptom) => (
                        <button
                          key={symptom}
                          onClick={() => {
                            const updated = [...selectedSymptoms, symptom];
                            setSelectedSymptoms(updated);
                            matchSymptomsToDisorders(updated);
                          }}
                          className="p-2 rounded-lg bg-indigo-50 hover:bg-indigo-100 text-indigo-900 text-xs font-medium transition-colors border border-indigo-200 hover:border-indigo-400"
                        >
                          {symptom}
                        </button>
                      ))}
                  </div>
                </div>
              )}
            </div>
            
            {/* Results with 3D Cards */}
            {matchedDisorders.length > 0 && (
              <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-2xl p-6 border-2 border-green-300 shadow-3d">
                <h4 className="font-bold text-gray-900 mb-6 text-lg flex items-center gap-3">
                  <div className="inline-flex items-center justify-center w-8 h-8 bg-green-600 rounded-full">
                    <CheckCircle className="w-5 h-5 text-white" />
                  </div>
                  Most Likely Conditions ({matchedDisorders.length})
                </h4>
                
                <div className="space-y-4">
                  {matchedDisorders.map((item, idx) => {
                    const matchPercentage = Math.min(100, Math.round((item.matchScore / 50) * 100));
                    return (
                      <div 
                        key={item.disorder.id}
                        className="bg-white rounded-xl p-4 border-l-4 border-indigo-600 hover:shadow-md hover:bg-indigo-50 transition-all cursor-pointer card-3d shadow-md"
                        onClick={() => setSelectedDisorder(item.disorder.id)}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <div className="flex items-center gap-2 mb-1">
                              <span className="inline-flex items-center justify-center w-6 h-6 bg-indigo-600 text-white text-xs font-bold rounded-full">#{idx + 1}</span>
                              <p className="font-bold text-gray-900 text-lg">{item.disorder.name}</p>
                            </div>
                            <p className="text-sm text-gray-600">{item.disorder.stats}</p>
                          </div>
                          <div className="text-right">
                            <div className="text-3xl font-bold bg-gradient-to-br from-indigo-600 to-blue-600 bg-clip-text text-transparent">{matchPercentage}%</div>
                            <div className="text-xs text-gray-500 font-semibold">Match</div>
                          </div>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                          <div 
                            className="bg-gradient-to-r from-indigo-600 to-blue-600 h-3 rounded-full transition-all"
                            style={{ width: `${matchPercentage}%` }}
                          ></div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search mental health conditions..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:border-blue-500"
        />
      </div>

      {/* Disorder Cards */}
      <div className="grid md:grid-cols-2 gap-6">
        {disorders.filter(d => 
          d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          d.description.toLowerCase().includes(searchQuery.toLowerCase())
        ).slice(0, searchQuery ? 30 : 6).map((disorder) => {
          const Icon = disorder.icon;
          const isSelected = selectedDisorder === disorder.id;
          return (
            <div 
              key={disorder.id} 
              className={`${disorder.color} border-2 rounded-2xl p-6 cursor-pointer transition-all duration-300 shadow-3d hover:shadow-lg ${isSelected ? 'ring-2 ring-blue-500' : ''}`}
              onClick={() => setSelectedDisorder(disorder.id === selectedDisorder ? null : disorder.id)}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-2xl font-bold mb-2 text-gray-900">{disorder.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                    <TrendingUp className="w-4 h-4" />
                    <span className="font-medium">{disorder.stats}</span>
                  </div>
                </div>
                <Icon className="w-10 h-10 text-gray-600 flex-shrink-0" />
              </div>
              <p className="text-gray-700 mb-4 leading-relaxed">{disorder.description}</p>
              
              {isSelected && (
                <div className="mt-6 pt-6 border-t-2 border-gray-300 space-y-4">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                      <AlertCircle className="w-5 h-5 text-red-500" />
                      Common Symptoms
                    </h4>
                    <ul className="space-y-2">
                      {disorder.symptoms.map((symptom, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-700">
                          <CheckCircle className="w-4 h-4 text-teal-600 flex-shrink-0 mt-0.5" />
                          <span>{symptom}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold text-gray-900 mb-3">Treatment Options</h4>
                    <ul className="space-y-2">
                      {disorder.treatments.map((treatment, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-700">
                          <div className="w-2 h-2 bg-blue-600 rounded-full mt-2"></div>
                          <span>{treatment}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-bold text-gray-900 mb-3">Coping Strategies</h4>
                    <ul className="space-y-2">
                      {disorder.copingStrategies.map((strategy, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-gray-700">
                          <div className="w-2 h-2 bg-teal-600 rounded-full mt-2"></div>
                          <span>{strategy}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
                    <p className="text-sm text-gray-700"><strong>When to Seek Help:</strong> {disorder.whenToSeekHelp}</p>
                  </div>
                </div>
              )}

              {!isSelected && (
                <button className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center gap-1 mt-4">
                  Learn More <ChevronRight className="w-4 h-4" />
                </button>
              )}
            </div>
          );
        })}
      </div>

      {!searchQuery && disorders.length > 6 && (
        <div className="text-center py-8">
          <p className="text-gray-600">Showing 6 of {disorders.length} conditions</p>
          <p className="text-gray-500 text-sm mt-2">Use the search bar or symptom matcher above to explore more</p>
        </div>
      )}

      {searchQuery && disorders.filter(d => 
        d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.description.toLowerCase().includes(searchQuery.toLowerCase())
      ).length === 0 && (
        <div className="text-center py-12">
          <Search className="w-16 h-16 mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 text-lg">No conditions found matching &quot;{searchQuery}&quot;</p>
          <p className="text-gray-400 mt-2">Try searching for anxiety, depression, PTSD, bipolar, OCD, or ADHD</p>
        </div>
      )}

      {/* Important Notice */}
      <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-8 text-center">
        <Shield className="w-12 h-12 mx-auto mb-4 text-blue-600" />
        <h3 className="text-xl font-bold mb-3 text-gray-900">Important</h3>
        <p className="text-gray-700">This information is for educational purposes. Mental health conditions are real, common, and treatable. If you believe you have a mental health condition, please consult a qualified healthcare professional for proper diagnosis and treatment.</p>
      </div>
    </div>
  );

  const renderResources = () => (
    <div className="space-y-8">
      <div className="text-center bg-gradient-to-br from-red-600 to-red-700 text-white rounded-3xl p-12">
        <Phone className="w-16 h-16 mx-auto mb-4" />
        <h2 className="text-4xl font-bold mb-4">Crisis Support Available 24/7</h2>
        <p className="text-lg text-red-100">If you're in crisis or having thoughts of self-harm, please reach out immediately. Help is available.</p>
      </div>

      {/* Crisis Resources - Prominent */}
      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-red-50 to-red-100 border-2 border-red-300 rounded-2xl p-8 shadow-md">
          <div className="flex items-start gap-4">
            <Phone className="w-10 h-10 text-red-600 flex-shrink-0" />
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">National Suicide Prevention Lifeline</h3>
              <p className="text-4xl font-bold text-red-600 mb-3">988</p>
              <p className="text-sm text-gray-700 mb-4">Available 24/7 for anyone in suicidal crisis or emotional distress</p>
              <a href="https://988lifeline.org" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-red-600 hover:text-red-700 font-semibold">
                Learn More <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-300 rounded-2xl p-8 shadow-md">
          <div className="flex items-start gap-4">
            <MessageCircle className="w-10 h-10 text-blue-600 flex-shrink-0" />
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Crisis Text Line</h3>
              <p className="text-2xl font-bold text-blue-600 mb-3">Text HOME to 741741</p>
              <p className="text-sm text-gray-700 mb-4">Text-based crisis support available 24/7</p>
              <a href="https://www.crisistextline.org" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold">
                Learn More <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* All Resources */}
      <div className="bg-gray-50 rounded-3xl p-12">
        <h3 className="text-3xl font-bold mb-8 text-gray-900">All Support Resources</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {resources.map((resource, idx) => (
            <div key={idx} className={`bg-white border-l-4 rounded-xl p-6 hover:shadow-md transition ${resource.type === 'Crisis' ? 'border-l-red-500' : 'border-l-teal-500'}`}>
              <div className="mb-4">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-lg font-bold text-gray-900">{resource.name}</h4>
                  <span className={`text-xs font-semibold px-3 py-1 rounded-full ${resource.type === 'Crisis' ? 'bg-red-100 text-red-700' : 'bg-teal-100 text-teal-700'}`}>
                    {resource.type}
                  </span>
                </div>
                <p className="text-2xl font-bold text-gray-900 mb-2">{resource.phone}</p>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Clock className="w-4 h-4" />
                  <span>{resource.available}</span>
                </div>
              </div>
              <a href={resource.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold text-sm">
                Visit Website <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Additional Resources */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 border-2 border-indigo-200 rounded-3xl p-12">
        <h3 className="text-2xl font-bold mb-8 flex items-center gap-2 text-gray-900">
          <BookOpen className="w-8 h-8 text-indigo-600" />
          Additional Mental Health Resources
        </h3>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: 'Mental Health America', desc: 'Free screening tools, resources, and information', url: 'https://www.mhanational.org', icon: Brain },
            { name: 'NAMI', desc: 'Education, support groups, and advocacy initiatives', url: 'https://www.nami.org', icon: Users },
            { name: 'Psychology Today', desc: 'Therapist finder, support groups, and articles', url: 'https://www.psychologytoday.com', icon: BookOpen }
          ].map((r, i) => {
            const Icon = r.icon;
            return (
              <div key={i} className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-md transition">
                <Icon className="w-8 h-8 text-indigo-600 mb-3" />
                <h4 className="font-bold text-lg mb-2 text-gray-900">{r.name}</h4>
                <p className="text-gray-600 mb-4 text-sm">{r.desc}</p>
                <a href={r.url} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-700 flex items-center gap-1 font-semibold text-sm">
                  Visit Website <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );

  const renderBooking = () => (
    <div className="space-y-8">
      <div className="text-center bg-gradient-to-br from-green-600 to-teal-600 text-white rounded-3xl p-12">
        <Calendar className="w-16 h-16 mx-auto mb-4" />
        <h2 className="text-4xl font-bold mb-4">Schedule a Counseling Session</h2>
        <p className="text-lg text-green-100">Connect with licensed professionals at your convenience</p>
      </div>

      {/* Counselor Availability */}
      <div>
        <h3 className="text-2xl font-bold mb-6 text-gray-900">Available Counselors</h3>
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {counselors.map((counselor) => (
            <div key={counselor.id} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition border-2 border-gray-100">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h4 className="text-xl font-bold text-gray-900 mb-1">{counselor.name}</h4>
                  <p className="text-sm text-teal-600 font-semibold mb-2">{counselor.specialization}</p>
                  <p className="text-sm text-gray-600">{counselor.bio}</p>
                </div>
                <Star className="w-6 h-6 fill-yellow-400 text-yellow-400 flex-shrink-0" />
              </div>
              <div className="space-y-3 pt-4 border-t border-gray-200">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-700">{counselor.availability}</span>
                </div>
                <div className="text-sm">
                  <span className="font-semibold text-gray-900">{counselor.sessionRate}</span>
                  <span className="text-gray-600"> per session</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Form */}
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white border-2 border-gray-200 rounded-2xl p-8">
          <h3 className="text-2xl font-bold mb-6 text-gray-900">Book Your Session</h3>
          
          {bookingSubmitted && (
            <div className="bg-green-50 border-2 border-green-200 rounded-xl p-6 text-center mb-6">
              <CheckCircle className="w-12 h-12 mx-auto mb-3 text-green-600" />
              <p className="text-green-800 font-semibold">Request submitted! We'll contact you within 24 hours.</p>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block font-semibold mb-2 text-gray-900">Full Name <span className="text-red-500">*</span></label>
              <input 
                type="text" 
                value={bookingFormData.name} 
                onChange={(e) => setBookingFormData({...bookingFormData, name: e.target.value})} 
                className="w-full border-2 border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:outline-none"
                placeholder="Enter your name"
              />
            </div>
            
            <div>
              <label className="block font-semibold mb-2 text-gray-900">Email <span className="text-red-500">*</span></label>
              <input 
                type="email" 
                value={bookingFormData.email} 
                onChange={(e) => setBookingFormData({...bookingFormData, email: e.target.value})} 
                className="w-full border-2 border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:outline-none"
                placeholder="your.email@example.com"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2 text-gray-900">Phone</label>
              <input 
                type="tel" 
                value={bookingFormData.phone} 
                onChange={(e) => setBookingFormData({...bookingFormData, phone: e.target.value})} 
                className="w-full border-2 border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:outline-none"
                placeholder="(555) 123-4567"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2 text-gray-900">Preferred Counselor</label>
              <select 
                value={bookingFormData.preferredCounselor} 
                onChange={(e) => setBookingFormData({...bookingFormData, preferredCounselor: e.target.value})} 
                className="w-full border-2 border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:outline-none"
              >
                <option value="">No preference (we'll match you)</option>
                {counselors.map(c => (
                  <option key={c.id} value={c.id}>{c.name} - {c.specialization}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-2 text-gray-900">Session Type</label>
              <select 
                value={bookingFormData.sessionType} 
                onChange={(e) => setBookingFormData({...bookingFormData, sessionType: e.target.value})} 
                className="w-full border-2 border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:outline-none"
              >
                <option>Video Call</option>
                <option>Phone Call</option>
                <option>In-Person</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-2 text-gray-900">Preferred Date <span className="text-red-500">*</span></label>
              <input 
                type="date" 
                value={bookingFormData.date} 
                onChange={(e) => setBookingFormData({...bookingFormData, date: e.target.value})} 
                className="w-full border-2 border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block font-semibold mb-2 text-gray-900">Description (Optional)</label>
              <textarea 
                value={bookingFormData.description} 
                onChange={(e) => setBookingFormData({...bookingFormData, description: e.target.value})} 
                className="w-full border-2 border-gray-300 rounded-lg p-3 focus:border-blue-500 focus:outline-none"
                rows={4}
                placeholder="Brief description of what you'd like to discuss..."
              />
            </div>

            <button 
              onClick={handleBookingSubmit} 
              className="w-full bg-gradient-to-r from-green-600 to-teal-600 text-white py-4 rounded-lg font-semibold hover:opacity-90 transition"
            >
              Request Appointment
            </button>
          </div>
        </div>

        {/* Booking Info */}
        <div className="space-y-6">
          <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-6">
            <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-blue-600" />
              What to Expect
            </h4>
            <ul className="space-y-3 text-sm text-gray-700">
              <li className="flex gap-2">
                <span className="text-blue-600 font-bold">1.</span>
                <span>Submit your appointment request below</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-600 font-bold">2.</span>
                <span>Receive confirmation via email within 24 hours</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-600 font-bold">3.</span>
                <span>Get virtual session link or details before appointment</span>
              </li>
              <li className="flex gap-2">
                <span className="text-blue-600 font-bold">4.</span>
                <span>Connect with your counselor at the scheduled time</span>
              </li>
            </ul>
          </div>

          <div className="bg-teal-50 border-2 border-teal-200 rounded-2xl p-6">
            <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
              <Lock className="w-5 h-5 text-teal-600" />
              Your Privacy
            </h4>
            <ul className="space-y-2 text-sm text-gray-700">
              <li>✓ All conversations are confidential</li>
              <li>✓ HIPAA compliant sessions</li>
              <li>✓ Secure video platform</li>
              <li>✓ Your data is never shared</li>
            </ul>
          </div>

          <div className="bg-purple-50 border-2 border-purple-200 rounded-2xl p-6">
            <h4 className="font-bold text-gray-900 mb-3">Session Pricing</h4>
            <p className="text-sm text-gray-700 mb-3">Standard session rates:</p>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-700">Single Session</span>
                <span className="font-semibold">$85-$100</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700">Package (4 sessions)</span>
                <span className="font-semibold">$320-$380</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Your Appointments */}
      {appointments.length > 0 && (
        <div className="bg-white border-2 border-gray-200 rounded-2xl p-8">
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2 text-gray-900">
            <Calendar className="w-6 h-6 text-green-600" />
            Your Appointments
          </h3>
          <div className="space-y-3">
            {appointments.slice(0, 5).map((apt) => (
              <div key={apt.id} className="border-2 border-gray-200 rounded-lg p-4 flex justify-between items-center hover:bg-gray-50 transition">
                <div>
                  <p className="font-semibold text-gray-900">{apt.sessionType}</p>
                  <p className="text-sm text-gray-600">{apt.date}</p>
                  {apt.description && <p className="text-sm text-gray-500 mt-1">{apt.description}</p>}
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-semibold h-fit ${apt.status === 'confirmed' ? 'bg-green-100 text-green-800' : apt.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}`}>
                  {apt.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  const renderCommunity = () => (
    <div className="space-y-8">
      <div className="text-center bg-gradient-to-br from-teal-600 to-green-600 text-white rounded-3xl p-12">
        <Users className="w-16 h-16 mx-auto mb-4" />
        <h2 className="text-4xl font-bold mb-4">Community Support</h2>
        <p className="text-lg text-teal-100">Connect with others, share experiences, and find support in a safe, moderated space</p>
      </div>

      {/* Community Guidelines */}
      <div className="bg-indigo-50 border-2 border-indigo-200 rounded-2xl p-6">
        <h3 className="font-bold mb-4 text-gray-900 flex items-center gap-2">
          <Shield className="w-5 h-5 text-indigo-600" />
          Community Guidelines
        </h3>
        <div className="grid md:grid-cols-3 gap-4 text-sm text-gray-700">
          <div>• Be respectful and kind to all members</div>
          <div>• Maintain confidentiality and privacy</div>
          <div>• Avoid giving medical advice</div>
          <div>• Share experiences, not judgments</div>
          <div>• All posts are moderated for safety</div>
          <div>• Report inappropriate content immediately</div>
        </div>
      </div>

      {/* Post Filters */}
      <div className="flex gap-3 overflow-x-auto pb-2">
        {['all', 'support', 'questions', 'stories', 'resources'].map(filter => (
          <button
            key={filter}
            onClick={() => setPostFilter(filter)}
            className={`px-4 py-2 rounded-full font-medium whitespace-nowrap transition ${
              postFilter === filter
                ? 'bg-teal-600 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            {filter.charAt(0).toUpperCase() + filter.slice(1)}
          </button>
        ))}
      </div>

      {/* Share Your Thoughts */}
      <div className="bg-white border-2 border-gray-200 rounded-2xl p-8">
        <h3 className="text-xl font-bold mb-4 flex items-center gap-2 text-gray-900">
          <MessageCircle className="w-6 h-6 text-teal-600" />
          Share Your Thoughts
        </h3>
        <div className="space-y-4">
          <textarea
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            className="w-full border-2 border-gray-300 rounded-lg p-4 focus:border-teal-500 focus:outline-none"
            rows={4}
            placeholder="Share your story, ask a question, or offer support. Please keep posts respectful and constructive..."
          />
          <div className="flex gap-3">
            <button
              onClick={handleCommunityPost}
              className="bg-gradient-to-r from-teal-600 to-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition"
              disabled={!newPost.trim()}
            >
              Post to Community
            </button>
            <p className="text-xs text-gray-500 flex items-center">✓ All posts are moderated before appearing</p>
          </div>
        </div>
      </div>

      {/* Community Posts */}
      <div className="space-y-4">
        {communityPosts.length === 0 ? (
          <div className="text-center py-16 bg-gray-50 rounded-2xl">
            <MessageCircle className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 text-lg font-medium">No posts yet. Be the first to share!</p>
            <p className="text-gray-400 mt-2">Your story could inspire and help others</p>
          </div>
        ) : (
          communityPosts.map((post) => (
            <div key={post.id} className="bg-white border-2 border-gray-200 rounded-2xl p-6 hover:shadow-md transition">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <p className="font-semibold text-teal-600 mb-1 flex items-center gap-2">
                    {post.author}
                    {post.verified && <CheckCircle className="w-4 h-4 text-green-600" />}
                  </p>
                  <p className="text-sm text-gray-500">{new Date(post.timestamp).toLocaleString()}</p>
                </div>
                <span className="text-xs font-semibold px-3 py-1 bg-teal-100 text-teal-700 rounded-full">Community</span>
              </div>
              <p className="text-gray-700 mb-4 leading-relaxed">{post.content}</p>
              <div className="flex items-center gap-6 pt-4 border-t border-gray-200">
                <button
                  onClick={() => handleLikePost(post.id)}
                  className="flex items-center gap-2 text-gray-600 hover:text-teal-600 transition font-medium"
                >
                  <ThumbsUp className="w-5 h-5" />
                  <span>{post.likes} Likes</span>
                </button>
                <button className="flex items-center gap-2 text-gray-600 hover:text-teal-600 transition font-medium">
                  <MessageCircle className="w-5 h-5" />
                  <span>Reply</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );

  const renderBlog = () => (
    <div className="space-y-8">
      <div className="text-center bg-gradient-to-br from-purple-600 to-indigo-600 text-white rounded-3xl p-12">
        <BookOpen className="w-16 h-16 mx-auto mb-4" />
        <h2 className="text-4xl font-bold mb-4">Mental Health Resources & Articles</h2>
        <p className="text-lg text-purple-100">Evidence-based information written in a supportive and approachable tone</p>
      </div>

      {/* Featured Article */}
      {blogPosts.length > 0 && (
        <div className="bg-gradient-to-br from-purple-50 to-indigo-50 border-2 border-purple-200 rounded-3xl overflow-hidden">
          <div className="p-8">
            <div className="mb-4">
              <span className="text-sm font-bold px-3 py-1 bg-purple-600 text-white rounded-full">{blogPosts[0].category}</span>
            </div>
            <h3 className="text-3xl font-bold mb-3 text-gray-900">{blogPosts[0].title}</h3>
            <p className="text-lg text-gray-700 mb-6">{blogPosts[0].excerpt}</p>
            <div className="flex items-center gap-6 text-sm text-gray-600">
              <span className="flex items-center gap-1"><Star className="w-4 h-4 text-yellow-500 fill-yellow-500" /> {blogPosts[0].author}</span>
              <span>{blogPosts[0].date}</span>
              <span>{blogPosts[0].readTime} read</span>
            </div>
          </div>
        </div>
      )}

      {/* Article Categories */}
      <div>
        <h3 className="text-2xl font-bold mb-6 text-gray-900">Browse by Category</h3>
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <button 
            onClick={() => setBlogCategoryFilter('all')}
            className={`px-4 py-2 rounded-lg font-semibold transition ${blogCategoryFilter === 'all' ? 'bg-indigo-600 text-white shadow-lg' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}>
            All Articles
          </button>
          {[
            { name: 'Self-Care', color: 'bg-blue-100 text-blue-700' },
            { name: 'Awareness', color: 'bg-pink-100 text-pink-700' },
            { name: 'Stress Management', color: 'bg-yellow-100 text-yellow-700' },
            { name: 'Anxiety', color: 'bg-purple-100 text-purple-700' },
            { name: 'Resilience', color: 'bg-teal-100 text-teal-700' }
          ].map(cat => (
            <button 
              key={cat.name} 
              onClick={() => setBlogCategoryFilter(cat.name)}
              className={`px-4 py-2 rounded-lg font-semibold transition ${blogCategoryFilter === cat.name ? 'bg-indigo-600 text-white shadow-lg' : cat.color + ' hover:opacity-80'}`}>
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* All Articles */}
      <div>
        <h3 className="text-2xl font-bold mb-6 text-gray-900">Latest Articles</h3>
        <div className="grid md:grid-cols-2 gap-6">
          {blogPosts.slice(1).filter(post => blogCategoryFilter === 'all' || post.category === blogCategoryFilter).map((post) => (
            <div key={post.id} className="bg-white border-2 border-gray-200 rounded-2xl overflow-hidden hover:shadow-md transition">
              <div className="p-6">
                <div className="mb-3">
                  <span className="text-xs font-bold px-3 py-1 bg-gray-200 text-gray-700 rounded-full">{post.category}</span>
                </div>
                <h4 className="text-xl font-bold mb-3 text-gray-900 leading-tight">{post.title}</h4>
                <p className="text-gray-600 mb-4 leading-relaxed">{post.excerpt}</p>
                <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-200">
                  <span>{post.author}</span>
                  <div className="flex items-center gap-3">
                    <span>{post.date}</span>
                    <span>{post.readTime}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Subscribe Section */}
      <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-3xl p-12 text-center">
        <h3 className="text-2xl font-bold mb-4">Stay Updated</h3>
        <p className="text-lg text-indigo-100 mb-6 max-w-2xl mx-auto">Subscribe to our newsletter for weekly articles on mental health, coping strategies, and wellness tips delivered to your inbox.</p>
        <div className="flex gap-3 max-w-md mx-auto">
          <input
            type="email"
            placeholder="your.email@example.com"
            className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none"
          />
          <button className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );

  const renderWellness = () => {
    return (
      <div className="space-y-8">
        <div className="text-center bg-gradient-to-br from-green-600 to-blue-600 text-white rounded-3xl p-12">
          <Heart className="w-16 h-16 mx-auto mb-4" />
          <h2 className="text-4xl font-bold mb-4">Wellness Resources</h2>
          <p className="text-lg text-green-100">Explore tips and strategies for maintaining mental and physical wellbeing.</p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {blogPosts.filter(post => post.category === 'Wellness').map(post => (
            <div key={post.id} className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-2">{post.title}</h3>
              <p className="text-gray-600 mb-4">{post.excerpt}</p>
              <p className="text-sm text-gray-500">By {post.author} on {post.date}</p>
              <a href="#" className="text-blue-600 hover:underline">Read More</a>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Added a new section to include Assessment content
  const renderAssessmentFeature = () => {
    return (
      <div className="space-y-8">
        <div className="text-center bg-gradient-to-br from-yellow-600 to-orange-600 text-white rounded-3xl p-12">
          <Brain className="w-16 h-16 mx-auto mb-4" />
          <h2 className="text-4xl font-bold mb-4">Mental Health Assessment</h2>
          <p className="text-lg text-yellow-100">Take a quick self-assessment to understand your mental wellbeing. This is not a diagnostic tool.</p>
          <button className="mt-6 bg-white text-yellow-600 hover:bg-yellow-100 py-3 px-6 rounded-lg font-semibold transition">
            Start Assessment
          </button>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky Quick Help Button */}
      <div className="fixed bottom-8 right-8 z-40 space-y-4">
        <button
          onClick={() => setShowResourcesPanel(!showResourcesPanel)}
          className="w-16 h-16 rounded-full bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg hover:shadow-xl transition flex items-center justify-center hover:scale-110"
          title="Quick Access Resources"
        >
          <Phone className="w-7 h-7" />
        </button>
      </div>

      {/* Sticky Resources Panel */}
      {showResourcesPanel && (
        <div className="fixed bottom-28 right-8 z-40 bg-white rounded-2xl shadow-2xl border-2 border-gray-200 w-80 max-h-96 overflow-y-auto">
          <div className="p-6 border-b border-gray-200 sticky top-0 bg-white">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-gray-900">Crisis Resources</h3>
              <button onClick={() => setShowResourcesPanel(false)} className="text-gray-500 hover:text-gray-700">
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>
          <div className="p-6 space-y-4">
            {resources.filter(r => r.type === 'Crisis').map((r, i) => (
              <div key={i} className="border-l-4 border-red-500 pl-4 pb-4 border-b border-gray-200 last:border-b-0">
                <p className="font-semibold text-gray-900 text-sm">{r.name}</p>
                <p className="text-lg font-bold text-red-600 mt-1">{r.phone}</p>
                <p className="text-xs text-gray-600 mt-1">{r.available}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <nav className="bg-white border-b-2 border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Heart className="w-8 h-8 text-blue-600" />
              <span className="text-xl font-bold text-gray-900">MindCare</span>
            </div>
            
            <div className="hidden md:flex items-center gap-1">
              {['home', 'library', 'resources', 'booking', 'community', 'blog'].map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-lg font-medium transition ${activeTab === tab ? 'bg-blue-100 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}>
                  {tab === 'library' ? 'Library' : tab === 'assessment' ? 'Assessment' : tab === 'journal' ? 'Journal' : tab === 'meditation' ? 'Wellness' : tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>

            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden p-2 hover:bg-gray-100 rounded-lg">
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden border-t-2 border-gray-200 py-2 bg-white">
            {['home', 'library', 'resources', 'booking', 'community', 'blog'].map(tab => (
              <button key={tab} onClick={() => { setActiveTab(tab); setMobileMenuOpen(false); }} className={`w-full text-left px-4 py-3 font-medium transition ${activeTab === tab ? 'bg-blue-100 text-blue-600' : 'text-gray-700 hover:bg-gray-100'}`}>
                {tab === 'library' ? 'Library' : tab === 'assessment' ? 'Assessment' : tab === 'journal' ? 'Journal' : tab === 'meditation' ? 'Wellness' : tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        )}
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-8">
        {activeTab === 'home' && renderHome()}
        {activeTab === 'library' && renderInfo()}
        {activeTab === 'resources' && renderResources()}
        {activeTab === 'booking' && renderBooking()}
        {activeTab === 'community' && renderCommunity()}
        {activeTab === 'blog' && renderBlog()}
        {activeTab === 'wellness' && renderWellness()}
        {activeTab === 'assessment' && renderAssessmentFeature()}
      </main>

      <footer className="bg-slate-800 text-white mt-20 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Heart className="w-6 h-6 text-blue-400" />
                <span className="font-bold text-lg">MindCare Hub</span>
              </div>
              <p className="text-slate-300 leading-relaxed">Supporting mental health awareness and providing compassionate resources for everyone.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-white">Quick Links</h4>
              <ul className="space-y-2 text-slate-300">
                <li><a href="#" className="hover:text-white transition">About Us</a></li>
                <li><a href="#" className="hover:text-white transition">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-white">Resources</h4>
              <ul className="space-y-2 text-slate-300">
                <li><a href="#" className="hover:text-white transition">Mental Health Library</a></li>
                <li><a href="#" className="hover:text-white transition">Blog & Articles</a></li>
                <li><a href="#" className="hover:text-white transition">Find a Counselor</a></li>
                <li><a href="#" className="hover:text-white transition">Community</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-white">Crisis Support</h4>
              <div className="space-y-3 text-slate-300">
                <div>
                  <p className="text-sm">National Suicide Prevention Lifeline:</p>
                  <p className="text-xl font-bold text-blue-400 mt-1">988</p>
                </div>
                <div>
                  <p className="text-sm">Crisis Text Line:</p>
                  <p className="font-semibold text-blue-400">Text HOME to 741741</p>
                </div>
              </div>
            </div>
          </div>
          <div className="border-t border-slate-700 pt-8 text-center text-slate-400">
            <p>© 2026 MindCare Hub. All rights reserved. | Disclaimer: Not a substitute for professional medical advice.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default MentalHealthHub;