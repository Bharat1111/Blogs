import React, { useEffect } from 'react'
import { Grid, Paper, Typography, Divider, CircularProgress } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useParams } from 'react-router-dom'
import moment from 'moment'

import useStyles from './styles'
import { getPost, getPostsBySearch } from '../../actions/posts'

const PostDetails = () => {
    const classes = useStyles()

    const { post, posts, isLoading } = useSelector(state => state.posts)
    const dispatch = useDispatch()
    const history = useHistory()
    const { id } = useParams()

    useEffect(() => {
        dispatch(getPost(id));
    }, [id]);
    
    useEffect(() => {
        if (post) {
          dispatch(getPostsBySearch({ search: 'none', tags: post?.tags.join(',') }));
        }
    }, [post]);
    
      if (!post) return null;
    
      const openPost = (_id) => history.push(`/posts/${_id}`);
    
      if (isLoading) {
        return (
          <Paper elevation={6} className={classes.loadingPaper}>
            <CircularProgress size="7em" />
          </Paper>
        );
      }
    
      const recommendedPosts = posts.filter(({ _id }) => _id !== post._id);

      if(!post) return null

      if(isLoading) {
          return <Paper elevation={6} className={classes.loadingPaper}>
              <CircularProgress size='7em' />
          </Paper>
      }

    return (
        <Paper style={{ padding: '20px', borderRadius: '15px' }} elevation={6}>
            <div className={classes.card}>
                <div className={classes.section}>
                    <Typography variant="h3" component="h2">{post.title}</Typography>
                    <Typography gutterBottom variant="h6" color="textSecondary" component="h2">{post.tags.map((tag) => `#${tag} `)}</Typography>
                    <Typography gutterBottom variant="body1" component="p">{post.message}</Typography>
                    <Typography variant="h6">Created by: {post.username}</Typography>
                    <Typography variant="body1">{moment(post.createdAt).fromNow()}</Typography>
                    <Divider style={{ margin: '20px 0' }} />
                    {/* <Typography variant="body1"><strong>Realtime Chat - coming soon!</strong></Typography>
                    <Divider style={{ margin: '20px 0' }} />
                    <Typography variant="body1"><strong>Comments - coming soon!</strong></Typography> */}
                    <Divider style={{ margin: '20px 0' }} />
                </div>
                <div className={classes.imageSection}>
                    <img className={classes.media} style={{width: '500px'}} src='https://res.cloudinary.com/bharatadya/image/upload/v1618041178/grcmk8iws3arrtd2aik3.jpg' alt={post.title} />
                </div>
            </div>
            {!!recommendedPosts.length && (
            <div className={classes.section}>
                <Typography gutterBottom variant="h5">You might also like:</Typography>
                <Divider />
                <div className={classes.recommendedPosts}>
                    {recommendedPosts.map(({ title, name, message, likes, selectedFile, _id }) => (
                    <div style={{ margin: '20px', cursor: 'pointer' }} onClick={() => openPost(_id)} key={_id}>
                        <Typography gutterBottom variant="h6">{title}</Typography>
                        <Typography gutterBottom variant="subtitle2">{name}</Typography>
                        <Typography gutterBottom variant="subtitle2">{message}</Typography>
                        <Typography gutterBottom variant="subtitle1">Likes: {likes.length}</Typography>
                        <img src='https://res.cloudinary.com/bharatadya/image/upload/v1618041178/grcmk8iws3arrtd2aik3.jpg' width="200px" />
                    </div>
                    ))}
                </div>
            </div>
            )}
        </Paper>
    )
}

export default PostDetails
