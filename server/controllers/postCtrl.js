const mongoose = require('mongoose')
const postMessage = require('../models/postMessage')


const postCtrl = {
    getPosts: async (req, res) => {
        const { page } = req.query
        try {

            const LIMIT = 8;
            const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page
        // console.log(page)
            const total = await postMessage.countDocuments({});
            const posts = await postMessage.find().sort({ _id: -1 }).limit(LIMIT).skip(startIndex);
        // console.log(posts)

            res.json({ data: posts, currentPage: Number(page), numberOfPages: Math.ceil(total / LIMIT)});

        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    
    getPostsBySearch: async (req, res) => {
        // console.log('ihgvds')
        const { searchQuery, tags } = req.query;
        // console.log(searchQuery)
        // console.log(tags)
    
        try {
            const title = new RegExp(searchQuery, "i");

            const posts = await postMessage.find({ $or: [ { title }, { tags: { $in: tags.split(',') } } ]});
    
            res.json({ data: posts });
        } catch (error) {    
            res.status(404).json({ msg: error.message });
        }
    },
    
    getPost: async (req, res) => {
        const { id } = req.params
        try {

            // console.log(id)
            const post = await postMessage.findById(id);
        // console.log(post)
            res.status(200).json(post);

        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },
    

    createPost: async (req, res) => {
        const post = req.body
        const newPost = new postMessage({ ...post, creator: req.userId , createdAt: new Date().toISOString()})
        // console.log(newPost)
        try {
            await newPost.save();
            // console.log(newPost)

            res.json(newPost)
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },

    updatePost: async (req, res) => {
        const { id } = req.params

        const post = req.body
        
        try {
            // if(!mongoose.Types.objectId.isValid(id)) return res.status(404).json({ msg: 'No post with that id '}) username

            const updatedPost = await postMessage.findByIdAndUpdate(id, {...post, id}, { new: true })

            res.json(updatedPost)
        } catch (error) {
            return res.status(500).json({ msg: error.message })
        }
    },

    deletePost: async (req, res) => {
        const { id } = req.params

        await postMessage.findByIdAndDelete(id);

        res.json({msg: 'Post Deleted Successfully'})
    },

    likePost: async (req, res) => {
        const { id } = req.params

        if(!req.userId) return res.status(400).json({ msg: 'Unauthenticated' })

        const post = await postMessage.findById(id)

        const index = post.likes.findIndex(id => id === String(req.userId));

        if(index === -1){
            post.likes.push(req.userId)
        } else {
            // delete like from post
            post.likes = post.likes.filter(id => id !== String(req.userId))
        }

        const updatedPost = await postMessage.findByIdAndUpdate(id, post, {new: true})

        res.json(updatedPost)
    }
}


module.exports = postCtrl