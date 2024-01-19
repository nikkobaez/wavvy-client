const initialChatState = {
    currentChatId: "",
    currentReceiverId: ""
}

const chatReducer = (state, action) => {
    switch (action.type) {
        case "UPDATE_CHAT_INFO":
            return {
                ...state,
                currentChatId: action.payload.currentChatId,
                currentReceiverId: action.payload.currentReceiverId
            }
        default: 
            return state
    }
}

export {
    initialChatState,
    chatReducer
}