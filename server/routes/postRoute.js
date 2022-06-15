const router = require('express').Router()
const postCtrl = require('../controllers/postCtrl')
const auth = require('../middleware/auth')

router.get('/', postCtrl.getPosts)

router.get('/:id', postCtrl.getPost)

router.get('/get/search', postCtrl.getPostsBySearch)

router.post('/create', auth, postCtrl.createPost)

router.patch('/:id', auth, postCtrl.updatePost)

router.delete('/:id', auth, postCtrl.deletePost)

router.patch('/:id/likePost', auth, postCtrl.likePost)

module.exports = router