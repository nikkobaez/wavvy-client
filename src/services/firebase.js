import { auth, db, storage } from './config'
import { EmailAuthProvider, createUserWithEmailAndPassword, reauthenticateWithCredential, signInWithEmailAndPassword, signOut, updateEmail, updatePassword, updateProfile } from 'firebase/auth'
import { collection, doc, onSnapshot, setDoc, query, where, addDoc, serverTimestamp, updateDoc, getDocs, orderBy, getDoc, arrayUnion, arrayRemove } from 'firebase/firestore'
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage'
import { v4 as uuid } from 'uuid'

// FIREBASE AUTHENTICATION 
const login = async (email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password)
    } catch (error) {
        console.log(error)

        if (error.code === "auth/invalid-credential" || "auth/invalid-email") {
            alert("The email or password you entered is incorrect")
        }
    }
}

const signup = async (displayName, email, password) => {
    if (displayName.length < 5) {
        alert("Your display name must be longer than 5 characters")
        throw new Error("Invalid Display Name")
    }

    if (!email.includes("@")) {
        alert("Please enter a valid email address")
        throw new Error("Invalid Email")
    }

    if (password.length < 7) {
        alert("Your password must be longer than 7 characters")
        throw new Error("Invalid Password")
    }

    try {
        const response = await createUserWithEmailAndPassword(auth, email, password)

        await updateProfile(response.user, {
            displayName: displayName,
            photoURL: ""
        });

        await setDoc(doc(db, "users", response.user.uid), {
            id: response.user.uid,
            displayName: displayName,
            email: email,
            photoURL: "",
            friends: [],
            pending: [],
        })
    } catch (error) {
        console.log(error)
    }
}

const logout = async () => {
    try {
        await signOut(auth)
    } catch (error) {
        console.log(error)
    }
}

// FIREBASE FIRESTORE AND STORAGE
const getUser = (setUsers, searchInput, currentUser) => {
    const unsubscribe = onSnapshot(query(collection(db, "users"), where("id", "!=", currentUser.uid)), (querySnapshot) => {
        const updatedUsers = []

        querySnapshot.forEach((doc) => {
            const userData = doc.data()

            if (userData.displayName.toLowerCase().includes(searchInput.toLowerCase()) && searchInput.length > 0) {
                updatedUsers.push(userData);
            }
        });

        setUsers(updatedUsers);
    })

    return unsubscribe
}

const getUserInfo = async (id) => {
    try {        
        const response = await getDoc(doc(db, "users", id))
        return response.data()
    } catch (error) {
        console.log(error)
    }
}

const updateUserInfo = async (currentUser, state) => {
    try {
        await reauthenticateWithCredential(currentUser, EmailAuthProvider.credential(currentUser.email, state.currentPassword))

        if (state.newPassword) {
            await updatePassword(auth.currentUser, state.newPassword)
        }

        if (state.email && currentUser.email !== state.email) {
            await updateEmail(auth.currentUser, state.email)

            await updateDoc(doc(db, "users", currentUser.uid), {
                email: state.email
            })
        }

        if (state.displayName && currentUser.displayName !== state.displayName) {
            await updateProfile(auth.currentUser, {
                displayName: state.displayName
            })

            await updateDoc(doc(db, "users", currentUser.uid), {
                displayName: state.displayName
            })
        }

        if (state.file) {
            const storageRef = ref(storage, `users/${currentUser.uid}/profile`)
            const uploadTask = await uploadBytes(storageRef, state.file)
            const downloadURL = await getDownloadURL(uploadTask.ref)

            await updateProfile(auth.currentUser, {
                photoURL: downloadURL
            })

            await updateDoc(doc(db, "users", currentUser.uid), {
                photoURL: downloadURL
            })
        }

        window.location.reload()
    } catch (error) {
        console.log(error)

        if (error.code === "auth/invalid-credential") {
            alert("The password you entered is incorrect")
        }
    }
}

const getChat = async (setChats, setReceiverInfo, searchInput, currentUserId) => {
    const unsubscribe = onSnapshot(query(collection(db, "chats"), where("members", "array-contains", currentUserId)), async (querySnapshot) => {
        const updatedChats = []
        const updatedReceiverInfo = []

        const promises = querySnapshot.docs.map(async (doc) => {
            const chatData = doc.data()

            const receiverId = chatData.members.filter(id => id !== currentUserId)

            try {
                const response = await getUserInfo(receiverId[0])

                if (response.displayName.toLowerCase().includes(searchInput.toLowerCase())) {
                    updatedChats.push(chatData)
                    updatedReceiverInfo.push(response)
                }
            } catch (error) {
                console.log(error)
            }
        })

        await Promise.all(promises)

        setChats(updatedChats)
        setReceiverInfo(updatedReceiverInfo)
    })

    return unsubscribe
}

const getChats = (setChats, currentUserId) => {
    const unsubscribe = onSnapshot(query(collection(db, "chats"), where("members", "array-contains", currentUserId), orderBy("timestamp", "desc")), (querySnapshot) => {
        const updatedChats = []

        querySnapshot.forEach((doc) => {
            updatedChats.push(doc.data())
        });

        setChats(updatedChats);
    })

    return unsubscribe
}

const createDirectChat = async (senderId, receiverId) => {
    const members = []
    members.push(senderId)
    members.push(receiverId)

    try {
        const response = await addDoc(collection(db, "chats"), {
            members: members,
            lastMessage: "No messages",
            timestamp: serverTimestamp()
        })

        await updateDoc(doc(db, "chats", response.id), {
            id: response.id
        })
    } catch (error) {
        console.log(error)
    }
}

const getDirectChat = async (senderId, recieverId) => {
    const senderAndReceiverChat = []

    try {
        const response = await getDocs(query(collection(db, "chats"), where("members", "array-contains", senderId)))

        if (response.empty) {
            return senderAndReceiverChat
        } else {
            response.forEach((doc) => {
                if (doc.data().members.includes(recieverId)) {
                    senderAndReceiverChat.push(doc.data())
                }
            })
            return senderAndReceiverChat
        }
    } catch (error) {
        console.log(error)
    }
}

const sendMessage = async (chatId, text, senderId) => {
    try {
        const response = await addDoc(collection(db, `chats/${chatId}/messages`), {
            senderId: senderId,
            message: text,
            image: null,
            video: null,
            timestamp: serverTimestamp()
        })

        await updateDoc(doc(db, `chats/${chatId}/messages`, response.id), {
            id: response.id
        })

        await updateDoc(doc(db, "chats", chatId), {
            lastMessage: text,
            timestamp: serverTimestamp()
        })
    } catch (error) {
        console.log(error)
    }
}

const sendMessageAndImage = async (chatId, text, image, senderId) => {
    try {
        const storageRef = ref(storage, `chats/${chatId}/${image.name}_${uuid()}`)
        const uploadTask = await uploadBytes(storageRef, image)
        const downloadURL = await getDownloadURL(uploadTask.ref)

        const response = await addDoc(collection(db, `chats/${chatId}/messages`), {
            senderId: senderId,
            message: text ? text : null,
            image: downloadURL,
            video: null,
            timestamp: serverTimestamp()
        })

        await updateDoc(doc(db, `chats/${chatId}/messages`, response.id), {
            id: response.id
        })

        await updateDoc(doc(db, "chats", chatId), {
            lastMessage: text ? text : "Image Attached",
            timestamp: serverTimestamp()
        })
    } catch (error) {
        console.log(error)
    }
}

const sendMessageAndVideo = async (chatId, text, video, senderId) => {
    try {
        const storageRef = ref(storage, `chats/${chatId}/${video.name}_${uuid()}`)
        const uploadTask = await uploadBytes(storageRef, video)
        const downloadURL = await getDownloadURL(uploadTask.ref)

        const response = await addDoc(collection(db, `chats/${chatId}/messages`), {
            senderId: senderId,
            message: text ? text : null,
            image: null,
            video: downloadURL,
            timestamp: serverTimestamp()
        })

        await updateDoc(doc(db, `chats/${chatId}/messages`, response.id), {
            id: response.id
        })

        await updateDoc(doc(db, "chats", chatId), {
            lastMessage: text ? text : "Video Attached",
            timestamp: serverTimestamp()
        })
    } catch (error) {
        console.log(error)
    }
}

const getMessages = (setMessages, chatId) => {
    const unsubscribe = onSnapshot(query(collection(db, `chats/${chatId}/messages`), orderBy("timestamp", "asc")), (querySnapshot) => {
        const updatedMessages = []

        querySnapshot.forEach((doc) => {
            updatedMessages.push(doc.data())
        });
        
        setMessages(updatedMessages);
    })

    return unsubscribe
}

const sendFriendRequest = async (senderId, receiverId) => {
    try {
        const response = await getDoc(doc(db, "users", receiverId))
        
        if (response.data().pending.includes(senderId) || response.data().friends.includes(senderId)) {
            return
        } else {
            await updateDoc(doc(db, "users", receiverId), {
                pending: arrayUnion(senderId)
            }) 
        }
    } catch (error) {
        console.log(error)
    }
}

const approveFriendRequest = async (userId, requestId) => {
    try {
        await updateDoc(doc(db, "users", userId), {
            pending: arrayRemove(requestId),
            friends: arrayUnion(requestId)
        }) 

        await updateDoc(doc(db, "users", requestId), {
            friends: arrayUnion(userId)
        }) 
    } catch (error) {
        console.log(error)
    }
}

const removeFriendRequest = async (userId, requestId) => {
    try {  
        await updateDoc(doc(db, "users", userId), {
            pending: arrayRemove(requestId)
        }) 
    } catch (error) {
        console.log(error)
    }
}

const removeFriend = async (userId, friendId) => {
    try {
        await updateDoc(doc(db, "users", userId), {
            friends: arrayRemove(friendId)
        }) 

        await updateDoc(doc(db, "users", friendId), {
            friends: arrayRemove(userId)
        }) 
    } catch (error) {
        console.log(error)
    }
}
 
export {
    login,
    signup,
    logout,
    getUser,
    getUserInfo,
    updateUserInfo,
    getChat,
    getChats,
    createDirectChat,
    getDirectChat,
    sendMessage,
    sendMessageAndImage,
    sendMessageAndVideo,
    getMessages,
    sendFriendRequest,
    approveFriendRequest,
    removeFriendRequest,
    removeFriend
}