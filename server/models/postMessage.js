const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
    title: String,
    message: String,
    username: String,
    creator: String,
    tags: [String],
    selectedFile: {
        type: String,
        default: 'https://res.cloudinary.com/bharatadya/image/upload/v1617998123/samples/cloudinary-logo-vector.svg'
    },
    likes: {
        type: [String],
        default: []
    },
}, {
    timestamps: true
})

module.exports = mongoose.model("postMessage", postSchema)