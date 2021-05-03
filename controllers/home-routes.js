const { Blog, User, Comment } = require('../models');
const router = require('express').Router();
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
      // Get all blogs and JOIN with user data
      const blogData = await Blog.findAll({
        attributes: [
          'id',
          'title',
          'content',
          'created_at'
      ],
        include: [
          {
            model: Comment,
            attributes: ['id', 'comment_text', 'blog_id', 'user_id', 'created_at'],
            include: {
                model: User,
                attributes: ['name']
            }
        },
        {
          model: User,
          attributes: ['name'],
        }, 
        ],
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
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }
  // Otherwise, render the 'login' template
  res.render('login');
});

router.get('/blog/:id',  async(req, res) => {
  const singleBlog = await Blog.findOne({
    where: {
      id: req.params.id
  },
  attributes: [
      'id',
      'content',
      'title',
      'created_at'
  ],
  include: [{
          model: Comment,
          attributes: ['id', 'comment_text', 'blog_id', 'user_id', 'created_at'],
          include: {
              model: User,
              attributes: ['name']
          }
      },
      {
          model: User,
          attributes: ['name']
      }
  ]
  })
  const blog = singleBlog.get({ plain: true });
  console.log(blog);
  res.render('blog-id', { blog, logged_in: req.session.logged_in });
  
});

//Route to post comments on the blog
router.get('/addcomments', async(req,res) => {
  const singleComment = Blog.findOne({
    where: {
        id: req.params.id
    },
    attributes: [
        'id',
        'content',
        'title',
        'created_at'
    ],
    include: [{
            model: Comment,
            attributes: ['id', 'comment_text', 'blog_id', 'user_id', 'created_at'],
            include: {
                model: User,
                attributes: ['name']
            }
        },
        {
            model: User,
            attributes: ['name']
        }
    ]
})
if(!singleComment){
  res.status(404).json({ message: 'No blog found with this id' });
  return;
}
const blogComment = (await singleComment).get({plain:true});
res.render('blog.comments', { blogComment, logged_in: req.session.logged_in });

});

module.exports = router;