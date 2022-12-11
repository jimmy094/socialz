import { createSlice } from "@reduxjs/toolkit";

//! will be the state stored in global state this data will be accesible in our entire app and we can grab wherever we want and dont have to pass down state and props into different components

//? represents dark and light mode, configure globally
//? auth info we are storing

const initialState = {
    mode: "light",
    user: null,
    token: null,
    posts: [],
};

//* reducers are our actions/functions that involve modifying out initial state
//* state.mode reps the initialState, what you set it to will be the new state.

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setMode: (state) => {
            state.mode = state.mode === "light" ? "dark" : "light";
        },
        setLogin: (state, action) => {
            state.user = action.payload.user;
            state.token = action.payload.token;
        },
        setLogout: (state) => {
            state.user = null;
            state.token = null;
        },
        setFriends: (state, action) => {
            if (state.user) {
                state.user.friends = action.payload.friends
            } else {
                console.error("user friends non-existent")
            }
        },
        setPosts: (state, action) => {
            state.posts = action.payload.posts;
        },
        setPost: (state, action) => {
            const updatedPosts = state.posts.map((post) => {
                if (post._id === action.payload.post._id) return action.payload.post;
                return post;
            });
            state.posts = updatedPosts;
        }
    }
})

export const { setMode, setLogin, setLogout, setFriends, setPosts, setPost } = authSlice.actions;
export default authSlice.reducer;