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
      .then(blogData => {
          if (!blogData) {
              res.status(404).json({ message: 'No blog found with this id' });
              return;
          }
          res.json(blogData);
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

router.put('/:id', async (req, res) => {
    try {
        const updateBlog = await Blog.update(req.body, {
            where: {
                id: req.params.id
            },
        })
        if (!updateBlog[0]) {
            res.status(404).json({ message: 'No blog with this id!' });
            return;
          }
          res.status(200).json(updateBlog);
    }catch (err) {
        res.status(500).json(err);
      }
})

router.delete('/:id', async(req, res) => {
    try {
      const deleteBlog = await Blog.destroy({
        where: {
          id: req.params.id,
        },
      });
  
      if (!deleteBlog) {
        res.status(404).json({ message: 'No blog found with that id!' });
        return;
      }
  
      res.status(200).json(deleteBlog);
    } catch (err) {
      res.status(500).json(err);
    }
  });
module.exports = router;  