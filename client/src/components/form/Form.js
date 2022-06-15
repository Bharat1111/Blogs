import React, { useEffect, useState } from 'react'
import useStyles from './styles'
import { Typography, Button, Paper, TextField } from '@material-ui/core'
// import FileBase from 'react-file-base64'
import { useDispatch } from 'react-redux'
import { createPost, updatePost } from '../../actions/posts'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

const Form = ({ currentId, setCurrentId }) => {
    const post  = useSelector(state => currentId ? state.posts.posts.find(p => p._id === currentId) : null)
    const classes = useStyles()

    const dispatch = useDispatch()
    const history = useHistory()

    const user = JSON.parse(localStorage.getItem('profile'))
    
    const [postData, setPostData] = useState({
        title: '',
        message: '',
        tags: '',
        selectedFile: ''
    })

    useEffect(() => {
        if(post) setPostData(post)
    }, [post])

    const handleSubmit = (e) => {
        e.preventDefault()

        if(currentId) {
            dispatch(updatePost(currentId, { ...postData, username: user?.result?.username }))
        } else {
            dispatch(createPost({ ...postData, username: user?.result?.username }, history))
        }
        clear()
    }

    if(!user?.result?.username) {
        return (
            <Paper className={classes.paper}>
                <Typography variant='h6' align='center'>
                    Please Sign in to create posts
                </Typography>
            </Paper>
        )
    }

    const clear = () => {
        setCurrentId(null)
        setPostData({
            title: '',
            message: '',
            tags: '',
            selectedFile: ''
        })
    }

    return (
        <Paper elevation={6} className={classes.paper}>
            <form className={`${classes.root} ${classes.form}`} autoComplete='off' noValidate onSubmit={handleSubmit}>

                <Typography variant='h6'>{currentId ? 'Editing' : 'Creating'} Post</Typography>

                <TextField name='title' variant='outlined' label='Title' fullWidth value={postData.title} onChange={(e) => {setPostData({...postData, title: e.target.value})}} />

                <TextField name='message' variant='outlined' label='Message' fullWidth value={postData.message} onChange={(e) => {setPostData({...postData, message: e.target.value})}} />

                <TextField name='tags' variant='outlined' label='Tags' fullWidth value={postData.tags} onChange={(e) => {setPostData({...postData, tags: e.target.value.split(',')})}} />

                {/* <div className="classes.fileInput">
                    <FileBase 
                    type='file' multiple={false}
                    onDone={({base64}) => {setPostData({...postData, selectedFile: base64})}} />
                </div> */}

                <div className="avatar">
                    <span>
                        <p></p>
                        <input type="file" name="file" id="file_up" onChange={(e) => setPostData({ ...postData, selectedFile: e.target.value })} />
                        <p></p>
                    </span>
                </div>

                <Button className={classes.buttonSubmit} variant='contained' color='primary' size='large' type='submit' fullWidth>Submit</Button>

                <Button variant='contained' color='secondary' size='small' onClick={clear} fullWidth>Clear</Button>
            </form>
        </Paper>
    )
}

export default Form
