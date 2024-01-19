const initialMessageState = {
    file: null,
    message: "",
    sending: false
} 

const messageReducer = (state, action) => {
    switch (action.type) {
        case "UPDATE_FILE":
            return {
                ...state,
                file: action.payload.file
            }
        case "UPDATE_MESSAGE": {
            return {
                ...state,
                message: action.payload.message
            }
        }
        case "UPDATE_SENDING": {
            return {
                ...state,
                sending: action.payload.sending
            }
        }
        case "RESET": {
            return {
                ...state,
                file: null,
                message: "",
                sending: false
            }
        }
        default:
            return state
    }
}

export {
    initialMessageState, 
    messageReducer
}