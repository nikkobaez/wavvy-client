const initialDetailsState = {
    file: null,
    displayName: "",
    email: "",
    currentPassword: "",
    newPassword:""
}

const detailsReducer = (state, action) => {
    switch (action.type) {
        case "UPDATE_PROFILE_IMAGE": 
            return {
                ...state,
                file: action.payload.file
            }
        case "UPDATE_DISPLAY_NAME": 
            return {
                ...state,
                displayName: action.payload.displayName
            }
        case "UPDATE_EMAIL":
            return {
                ...state,
                email: action.payload.email
            }
        case "UPDATE_CURRENT_PASSWORD":
            return {
                ...state,
                currentPassword: action.payload.currentPassword
            }
        case "UPDATE_NEW_PASSWORD":
            return {
                ...state,
                newPassword: action.payload.newPassword
            }
        case "RESET":
            return {
                ...state,
                file: action.payload.file,
                displayName: action.payload.displayName,
                email: action.payload.email,
                currentPassword: action.payload.currentPassword,
                newPassword: action.payload.newPassword
            }
        default: 
            return state
    }
}

export {
    initialDetailsState,
    detailsReducer
}