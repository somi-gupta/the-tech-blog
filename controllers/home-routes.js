const { Blog, User, Comment } = require('../models');
const router = require('express').Router();
const withAuth = require('../utils/auth');

router.get('/', async (req, res) => {
    try {
      // Get all projects and JOIN with user data
      const blogData = await Blog.findAll({
        // include: [
        //   {
        //     model: User,
        //     attributes: ['name'],
        //   },
        //   {
        //     model: Comment,
        //     attributes: ['id', 'comment_text', 'blog_id', 'user_id', 'created_at'],
        //     include: {
        //         model: User,
        //         attributes: ['username']
        //     }
        // } 
        // ],
      });

    // Serialize data so the template can read it
    const blogs = blogData.map((blog) => blog.get({ plain: true }));

    // Pass serialized data and session flag into template
    res.render('homepage', { 
      blogs, 
      logged_in: req.session.logged_in 
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Login route
router.get('/login', (req, res) => {
  // If the user is already logged in, redirect to the homepage
  if (req.session.loggedIn) {
    res.redirect('/');
    return;
  }
  // Otherwise, render the 'login' template
  res.render('login');
});

module.exports = router;