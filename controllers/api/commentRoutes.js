const router = require('express').Router();
const {Comment} = require('../../models');

const withAuth = require('../../utils/auth');

router.get('/', (req, res) => {
    Comment.findAll({})
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

router.get('/:id', (req, res) => {
    Comment.findAll({
            where: {
                id: req.params.id
            }
        })
        .then(dbCommentData => res.json(dbCommentData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        })
});

router.post('/', withAuth, async (req, res) => {
try {
    const newComment = await Comment.create({
        comment_text: req.body.comment_text,
        blog_id: req.body.blog_id,
        user_id: req.session.user_id,
    })
    console.log(newComment);
    res.status(200).json(newComment);
} catch(err){
    console.log(err.message);
    res.status(400).json(err.message);
}
});


module.exports = router;  