const express = require('express');
const { Pool } = require('pg');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

// Database connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});

// Middleware
app.use(cors());
app.use(express.json());

// Test database connection (non-blocking)
pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.warn('⚠️  Database connection warning:', err.message);
    console.log('   (Server will continue to run; API endpoints will gracefully handle DB unavailability)');
  } else {
    console.log('✓ Database connected successfully');
  }
});


// Create appointment
app.post('/api/appointments', async (req, res) => {
  const { name, email, phone, sessionType, date, description } = req.body;
  
  try {
    const result = await pool.query(
      `INSERT INTO appointments (name, email, phone, session_type, appointment_date, description, status)
       VALUES ($1, $2, $3, $4, $5, $6, 'pending')
       RETURNING *`,
      [name, email, phone, sessionType, date, description]
    );
    
    // Update stats
    await pool.query(
      `INSERT INTO platform_stats (stat_date, total_appointments)
       VALUES (CURRENT_DATE, 1)
       ON CONFLICT (stat_date) 
       DO UPDATE SET total_appointments = platform_stats.total_appointments + 1`
    );
    
    res.json({ success: true, appointment: result.rows[0] });
  } catch (error) {
    console.error('Error creating appointment:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get appointments by email
app.get('/api/appointments/:email', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM appointments WHERE email = $1 ORDER BY appointment_date DESC',
      [req.params.email]
    );
    res.json({ success: true, appointments: result.rows });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});


// Get all community posts
app.get('/api/community/posts', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM community_posts ORDER BY created_at DESC LIMIT 50'
    );
    res.json({ success: true, posts: result.rows });
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Create community post
app.post('/api/community/posts', async (req, res) => {
  const { content, author_name } = req.body;
  
  try {
    const result = await pool.query(
      `INSERT INTO community_posts (content, author_name, likes)
       VALUES ($1, $2, 0)
       RETURNING *`,
      [content, author_name || 'Anonymous User']
    );
    
    // Update stats
    await pool.query(
      `INSERT INTO platform_stats (stat_date, community_posts, active_users)
       VALUES (CURRENT_DATE, 1, 1)
       ON CONFLICT (stat_date) 
       DO UPDATE SET 
         community_posts = platform_stats.community_posts + 1,
         active_users = platform_stats.active_users + 1`
    );
    
    res.json({ success: true, post: result.rows[0] });
  } catch (error) {
    console.error('Error creating post:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Like a post
app.post('/api/community/posts/:id/like', async (req, res) => {
  try {
    const result = await pool.query(
      `UPDATE community_posts 
       SET likes = likes + 1 
       WHERE id = $1 
       RETURNING *`,
      [req.params.id]
    );
    res.json({ success: true, post: result.rows[0] });
  } catch (error) {
    console.error('Error liking post:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get all blog posts
app.get('/api/blog/posts', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM blog_posts ORDER BY published_date DESC'
    );
    res.json({ success: true, posts: result.rows });
  } catch (error) {
    console.error('Error fetching blog posts:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get single blog post
app.get('/api/blog/posts/:id', async (req, res) => {
  try {
    // Increment view count
    await pool.query(
      'UPDATE blog_posts SET views = views + 1 WHERE id = $1',
      [req.params.id]
    );
    
    const result = await pool.query(
      'SELECT * FROM blog_posts WHERE id = $1',
      [req.params.id]
    );
    
    res.json({ success: true, post: result.rows[0] });
  } catch (error) {
    console.error('Error fetching blog post:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get all resources
app.get('/api/resources', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM resources ORDER BY is_crisis DESC, name ASC'
    );
    res.json({ success: true, resources: result.rows });
  } catch (error) {
    console.error('Error fetching resources:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Get platform statistics
app.get('/api/stats', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM platform_stats WHERE stat_date = CURRENT_DATE'
    );
    
    if (result.rows.length === 0) {
      // Initialize today's stats if not exist
      await pool.query(
        `INSERT INTO platform_stats (stat_date, total_appointments, active_users, community_posts)
         VALUES (CURRENT_DATE, 0, 0, 0)`
      );
      res.json({ 
        success: true, 
        stats: { total_appointments: 0, active_users: 0, community_posts: 0 } 
      });
    } else {
      res.json({ success: true, stats: result.rows[0] });
    }
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});


// Get available counselor slots
app.get('/api/counselors/available', async (req, res) => {
  try {
    const result = await pool.query(
      `SELECT * FROM counselor_availability 
       WHERE is_booked = FALSE 
       AND available_date >= CURRENT_DATE 
       ORDER BY available_date, start_time 
       LIMIT 20`
    );
    res.json({ success: true, slots: result.rows });
  } catch (error) {
    console.error('Error fetching availability:', error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Root route
app.get('/', (req, res) => {
  res.json({ success: true, message: 'Backend server is running' });
});

// Simple health check
app.get('/api/ping', (req, res) => {
  res.json({ success: true, message: 'pong' });
});

// Get recent appointments (open endpoint)
app.get('/api/appointments', async (req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM appointments ORDER BY appointment_date DESC LIMIT 50'
    );
    res.json({ success: true, appointments: result.rows });
  } catch (error) {
    console.error('Error fetching appointments:', error);
    // If DB isn't available or table missing, return an empty list instead of 500
    res.json({ success: true, appointments: [] });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});