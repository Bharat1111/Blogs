import React, { useState } from 'react'
import { Container, Grid, Grow, Paper, AppBar, TextField, Button } from '@material-ui/core'
import Posts from '../posts/Posts';
import Form from '../form/Form';
import { useHistory, useLocation } from 'react-router-dom'
import ChipInput from 'material-ui-chip-input'
import { useDispatch } from 'react-redux'
import { getPosts, getPostsBySearch } from '../../actions/posts'
import Pagination from '../Pagination'
import useStyles from './styles';

function useQuery() {
    return new URLSearchParams(useLocation().search)
}


const Home = () => {
    const classes = useStyles();

    const [currentId, setCurrentId] = useState(null)
    const [search, setSearch] = useState('')
    const [tags, setTags] = useState([])

    const dispatch = useDispatch()
    const query = useQuery()
    const history = useHistory()
    const page = query.get('page') || 1
    const searchQuery = query.get('searchQuery')


    const handleKeyPress = (e) => {
        if(e.keyCode === 13) {
            // search post
            searchPost()
        }
    }

    const handleAdd = (tag) => {
        // Add tags
        setTags([...tags, tag])
    }

    const handleDelete = (tagToDelete) => {
        setTags(tags.filter(tag => tag !== tagToDelete))
    }

    const searchPost = () => {
        if(search.trim() || tags ) {
            // dispatch to fetch search posts
            dispatch(getPostsBySearch({ search, tags: tags.join(',') }))
            history.push(`/posts/search?searchQuery=${search || 'none' }${tags.join(',')}`)
        } else {
            history.push('/')
        }
    }

    return (
        <div>
            <Grow in>
                <Container maxWidth='xl'>
                    <Grid className={classes.gridContainer} container justify='space-between' alignItems='stretch' spacing={3}>
                        <Grid item xs={12} sm={6} md={9}>
                            <Posts setCurrentId={setCurrentId} />
                        </Grid>

                        <Grid item xs={12} sm={6} md={3}>

                            <AppBar className={classes.appBarSearch} position='static' color='inherit'>
                                <TextField name='search' onKeyPress={handleKeyPress} variant='outlined' label='Search Posts' fullWidth value={search} onChange={(e) => {setSearch(e.target.value)}} />

                                <ChipInput style={{ margin: '10px 0'}} value={tags} onAdd={handleAdd} onDelete={handleDelete} variant='outlined' label='Search Tags' />

                                <Button variant='contained' onClick={searchPost} className={classes.searchButton} color='primary'>Search</Button>
                            </AppBar>
                            <Form currentId={currentId} setCurrentId={setCurrentId} />

                            { (!searchQuery && !tags.length) && 
                                (<Paper className={classes.pagination} elevation={6}>
                                <Pagination page={page} />
                                </Paper>)
                            }
                        </Grid>
                    </Grid>
                    </Container>
            </Grow>
        </div>
    )
}

export default Home
