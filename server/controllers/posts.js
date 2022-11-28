import post from "../models/Post.js";

import user from "../models/User.js";

//***CREATE***
//grab userId, desc, pic from req.body from frontend
//likes object will have user id and boolean if they have liked or not
//create newPost variable and structure how the post will go into db
//save the newPost that was created
//return status 201 (succesfully built something )and all post information including all updated posts

export const createPost = async (req, res) => {
    try {
        const { userId, description, picturePath } = req.body;
        const user = await user.findById(userId);
        const newPost = new post({
            userId,
            firstName: user.firstName,
            lastName: user.lastName,
            location: user.location,
            description,
            userPicturePath: user.picturePath,
            likes: {},
            comments: [],
        })
        await newPost.save();

        const post = await Post.find();
        res.status(201).json(post);

    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

/* READ */
//grab user id from req.params
//post.find will return all posts
//200 is successful request 
export const getFeedPosts = async (req, res) => {
    try {
        const post = await Post.find();
        res.status(200).json(post);
        
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

/* 
get user id from req.params
find post with user id to return info on their post
return post
return 200
if error return 404
 */

export const getUserPosts = async (req, res) => {
    try {
        const { userId } = req.params;
        const post = await Post.find({ userId });
        res.status(200).json(post);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
};

/* UPDATE */
/* 
grab id from params
grab userid from body sent from front end
find post by id to get information from that post
isLiked check to see if userid exists in likes, meaning post has been liked by person
if isLiked is true delete the user
if not then we will set it
update post by finding it and passing it the new likes value
if error return 404
*/

export const likePost = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.body
        const post = await Post.find(id);
        const isLiked = post.likes.get(userId)
        
        if (isLiked) {
            post.likes.delete(userId)
        } else {
            post.likes.set(userId, true)
        }

        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { likes: post.likes },
            { new: true }
        )
        res.status(200).json(updatedPost);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}
