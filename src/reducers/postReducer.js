import constants from '../constants';

var initialState = {
    currentLocation: {
        lat: 37.4419,
        lng: -122.1430
    },
    list: null
}

export default (state = initialState, action) => {
    let updated = Object.assign({}, state);

    switch(action.type) {
        case constants.POST_CREATED:
            let updatedList = (updated['list'] == null) ? [] : Object.assign([], updated['list']);
            updatedList.unshift(action.post)
            updated['list'] = updatedList;
            return updated;

        case constants.POSTS_RECEIVED:
            updated['list'] = action.posts;
            return updated;

        case constants.CURRENT_LOCATION_CHANGED:
            updated['currentLocation'] = action.location;
            updated['list'] = null;
            return updated;

        default:
            return state;
    }
}