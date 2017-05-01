import constants from '../constants';
import { APIManager } from '../utils';

export default {

    createPost: (params) => {
        return(dispatch) => {
            APIManager
            .post('/api/post', params)
            .then(response => {
                console.log('RESPONSE: ' + JSON.stringify(response));
                dispatch({
                    type: constants.POST_CREATED,
                    post: response.result
                });
            })
            .catch(err => {
                console.log('ERROR: ' + err);
            });
        }
    },

    fetchPosts: (params) => {
        return(dispatch) => {
            APIManager
            .get('/api/post', params)
            .then(response => {
                console.log('RESPONSE: ' + JSON.stringify(response));
                dispatch({
                    type: constants.POSTS_RECEIVED,
                    posts: response.results
                });
            })
            .catch(err => {
                console.log('ERROR: ' + err);
            });
        }
    },

    updateCurrentLocation: (location) => {
        return(dispatch) => {
            dispatch({
                type: constants.CURRENT_LOCATION_CHANGED,
                location: location
            });
        }
    },

    login: (params) => {
        return(dispatch) => {
            APIManager
            .post('/account/login', params)
            .then(response => {
                console.log('RESPONSE: ' + JSON.stringify(response));
                dispatch({
                    type: constants.CURRENT_USER_RECEIVED,
                    user: response.user
                });
            })
            .catch((err) => {
                console.log('ERROR: ' + err);
            });
        }
    },

    register: (params) => {
        return(dispatch) => {
            APIManager
            .post('/account/register', params)
            .then(response => {
                console.log('RESPONSE: ' + JSON.stringify(response));
                dispatch({
                    type: constants.CURRENT_USER_RECEIVED,
                    user: response.user
                })
            })
            .catch(err => {
                console.log('ERROR: ' + err);
            });
        }
    },

    checkCurrentUser: (user) => {
        return(dispatch) => {
            APIManager
            .get('/account/currentuser', user)
            .then(response => {
                console.log('RESPONSE ' + JSON.stringify(response));
                dispatch({
                    type: constants.CURRENT_USER_RECEIVED,
                    user: response.user
                });
            })
            .catch(err => {
                console.log('ERROR: ' + err);
            });
        }
    }
}