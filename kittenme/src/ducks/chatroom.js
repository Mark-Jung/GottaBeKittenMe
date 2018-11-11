
//Action Types
export const LOAD_ROOM = 'gottabekittenme/chatroom/LOAD_ROOM';
export const GOT_NEW_MESSAGE = "gottabekittenme/chatroom/GOT_NEW_MESSAGE";
export const JOIN_ROOM = 'gottabekittenme/chatroom/JOIN_ROOM';
export const JOINED_ROOM = 'gottabekittenme/chatroom/JOINED_ROOM';
export const SEND_MESSAGE = 'gottabekittenme/chatroom/SEND_MESSAGE';


const INITIAL_STATE = {
    error_message: "",
    title: "Gotta Be Kitten Me",
    loading: false,
    messages: [],
    send_text: "",
    username: "",
};

// Reducers
export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type){
        case GOT_NEW_MESSAGE:
            if (state.messages) {
                var new_messages = state.messages.slice()
                new_messages.push(action.payload)
            }
            else {
                var new_messages = [action.payload]
            }
            return {
                ...state,
                messages: new_messages
            }
        case JOIN_ROOM:
            return {
                ...state,
                username: action.payload
            }
        case JOINED_ROOM:
            return {
                ...state,
                messages: action.payload,
            }
        default:
            return state;
    }
}

export const join_room = (socket) => {
	return (dispatch, getState) => {
        var generateName = require('sillyname');
        var username = generateName();
        const state = getState()
        const chatroom = state['chatroom'];
        const room = chatroom['title'];
        dispatch({ 
            type: JOIN_ROOM,
            payload: username
        })
        socket.emit('join', {username, room})
	}	
}

export const joined_room = (messages) => {
    return (dispatch) => {
        dispatch({
            type: JOINED_ROOM,
            payload: messages
        })
    }
}

export const got_new_message = (message) => {
    return (dispatch) => {
        dispatch({
            type: GOT_NEW_MESSAGE,
            payload: message
        })
    }
}

export const send_message = (socket, message) => {
    return (dispatch, getState) => {
        const state = getState()
        const chatroom = state['chatroom'];
        const username = chatroom['username']
        const room = chatroom['title']
        dispatch({
            type: SEND_MESSAGE,
        })
        socket.emit('new_message', {message, username, room})
    }
}
