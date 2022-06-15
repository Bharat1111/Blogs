import axios from 'axios'

const API = axios.create({ baseURL: 'http://localhost:3001/api'})

API.interceptors.request.use((req) => {
    if (localStorage.getItem('profile')) {
      req.headers.Authorization = `Bearer ${JSON.parse(localStorage.getItem('profile')).token}`;
    }

    return req;
});

export const fetchPosts = (page) => API.get(`/posts?page=${page}`)

export const fetchPost = (id) => API.get(`/posts/${id}`)

export const fetchPostsBySearch = (searchQuery) => API.get(`/posts/get/search?searchQuery=${searchQuery.search || 'none'}&tags=${searchQuery.tags}`)

export const createPost = (newPost) => API.post(`/posts/create`, newPost)

export const updatePost = (id, post) => API.patch(`/posts/${id}`, post)

export const deletePost = (id) => API.delete(`/posts/${id}`)

export const likePost = (id) => API.patch(`/posts/${id}/likePost`)

export const signIn = (formData) => API.post('/user/signIn', formData)

export const signUp = (formData) => API.post('/user/signUp', formData)