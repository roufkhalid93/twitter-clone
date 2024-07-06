import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios"; //redux implemenation
import { jwtDecode } from "jwt-decode"; //redux implementation

const BASE_URL = "https://364f14f3-6e78-4594-a9e8-c54d62ac51a1-00-22ss80nkf5izd.kirk.replit.dev";

//async thunk for fetching a user's posts(helps handle asynchronous operation that need some time such as fething data from API)
export const fetchPostsByUser = createAsyncThunk(
    "posts/fetchByUser",
    async (userId) => {
        const response = await fetch(`${BASE_URL}/posts/user/${userId}`);
        return response.json();
    }
);

//Redux implemenatation for NewPostModal
//async thunk  for saving post
export const savePost = createAsyncThunk(
    "posts/savePost",
    async (postContent) => {
        const token = localStorage.getItem("authToken");
        const decode = jwtDecode(token);
        const userId = decode.id;

        //packaging for data to be send back to requestor
        const data = {
            title: "Post Title",
            content: postContent,
            user_id: userId,
        };

        const response = await axios.post(`${BASE_URL}/posts`, data);
        return response.data;
    }
);

//slice
const postsSlice = createSlice({
    name: "posts",
    initialState: { posts: [], loading: true },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchPostsByUser.fulfilled, (state, action) => {
            state.posts = action.payload;
            state.loading = false;
        }),
            builder.addCase(savePost.fulfilled, (state, action) => {
                state.posts = [action.payload, ...state.posts];
                //new post => action.payload = {id: 20, title: "Post Title", content: "Hello", user_id: 4} 
                //exisiting post => current state.posts = {id: 19, title: "Post Title", content: "Heyyo", user_id: 4}
                //state.posts [{id: 20, title: "Post Title", content: "Hello", user_id: 4}, {id: 19, title: "Post Title", content: "Heyyo", user_id: 4}]
            });
    },
});
//redux implementation ends here



//b4 redux implmentation slice
//slice
// const postsSlice = createSlice({
//     name: "posts",
//     initialState: { posts: [], loading: true },
//     reducers: {},
//     extraReducers: (builder) => {
//         builder.addCase(fetchPostsByUser.fulfilled, (state, action) => {
//             state.posts = action.payload;
//             state.loading = false;
//         });
//     },
// });


export default postsSlice.reducer; 