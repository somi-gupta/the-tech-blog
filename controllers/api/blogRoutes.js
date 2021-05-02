const router = require('express').Router();
const { Blog, User, Comment } = require('../../models');

const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
  console.log('======================');
  Blog.findAll({
          attributes: ['id',
              'title',
              'content',
              'created_at'
          ],
          order: [
              ['created_at', 'DESC']
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
      .then(dbPostData => res.json(dbPostData.reverse()))
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });

});
router.get('/:id', (req, res) => {
  Blog.findOne({
          where: {
              id: req.params.id
          },
          attributes: ['id',
              'content',
              'title',
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
      .then(dbPostData => {
          if (!dbPostData) {
              res.status(404).json({ message: 'No post found with this id' });
              return;
          }
          res.json(dbPostData);
      })
      .catch(err => {
          console.log(err);
          res.status(500).json(err);
      });
});

  router.post('/', withAuth, (req, res) => {
    Blog.create({
            title: req.body.title,
            content: req.body.content,
            user_id: req.session.user_id
        })
        .then(dbBlogData => res.json(dbBlogData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;  