import axios from 'axios';


//Action Types
export const LOAD_MAIN = 'gottabekittenme/main/LOAD_MAIN';
export const LOAD_MAIN_SUCCESS = 'gottabekittenme/main/LOAD_MAIN_SUCCESS';
export const LOAD_MAIN_FAILURE = 'gottabekittenme/main/LOAD_MAIN_FAILURE';


const INITIAL_STATE = {
    error_message: "",
    title: "Gotta Be Kitten Me",
    loading: false,
};

//Reducers
export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type){
        case LOAD_MAIN:
        case LOAD_MAIN_SUCCESS:
            console.log("What's up man");
            return {
                ...state,
            }
        case LOAD_MAIN_FAILURE:
            return {
                ...state,
                error_message: action.payload
            }
        default:
            return {
                ...state
            }
    }
}

// Thunk
export function thunk_load_main () {
    return (dispatch, getState) => {
        dispatch({type: LOAD_MAIN});
        const url = 'http://localhost:5000/chat';
        return axios.get(url)
        .then((response) => {
            dispatch({
                type: LOAD_MAIN_SUCCESS,
                payload: response.data.response
            })
        })
        .catch((error) => {
            dispatch({
                type: LOAD_MAIN_SUCCESS,
                payload: "Error. Try reopening the app"
            })
        })
    }
}
