const router = require('express').Router();
const { Blog, User, Comment } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try {
       const dbBlogData = await  Blog.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: [
            'id',
            'title',
            'content',
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
    const blogs = dbBlogData.map(blog => blog.get({ plain: true }));
    res.render('dashboard', { blogs, logged_in: true });

    } catch (err) {
        console.log(err.message);
        res.status(500).json(err);
    }   
});

router.get('/edit/:id', withAuth, (req, res) => {
    Blog.findOne({
            where: {
                id: req.params.id
            },
            attributes: ['id',
                'title',
                'content',
                'created_at'
            ],
            include: [{
                    model: User,
                    attributes: ['name']
                },
                {
                    model: Comment,
                    attributes: ['id', 'comment_text', 'blog_id', 'user_id', 'created_at'],
                    include: {
                        model: User,
                        attributes: ['name']
                    }
                }
            ]
        })
        .then(dbBlogData => {
            if (!dbBlogData) {
                res.status(404).json({ message: 'No blog found with this id' });
                return;
            }

            const blog = dbBlogData.get({ plain: true });
            res.render('edit-post', { blog, logged_in: true });
        })
        .catch(err => {
            console.log(err.message);
            res.status(500).json(err).message;
        });
})

router.get('/:id', withAuth, async (req, res) => {
    try {
       const dbBlogData = await  Blog.findAll({
        where: {
            user_id: req.session.user_id
        },
        attributes: [
            'id',
            'title',
            'content',
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
    const blogs = dbBlogData.map(blog => blog.get({ plain: true }));
    res.render('dashboard', { blogs, logged_in: true });

    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }   
});

router.get('/new', (req, res) => {
    res.render('blog');
});

module.exports = router;
