import * as api from '../api/index'

export const signIn = (formData, history) => async (dispatch) => {
    try {
        // login
        const { data } = await api.signIn(formData)
        dispatch({ type: 'AUTH', data})

        history.push('/')
    } catch (error) {
        console.log(error)
    }
}
export const signUp = (formData, history) => async (dispatch) => {
    try {
        // signup
        const { data } = await api.signUp(formData)
        dispatch({ type: 'AUTH', data})

        history.push('/')
    } catch (error) {
        console.log(error)
    }
}