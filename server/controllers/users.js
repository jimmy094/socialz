import User from "../models/User.js";

// read
//grab id from user that we need from req.params
//search for user in db with id using findById()
export const getUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
            res.status(200).json(user);
    } catch (error) {
            res.status(404).json({ message: error.message });
    }

}

//grab id from params
//search for user in db with id using findById()
//grab friends use promise.all because we are making multiple api calls to db 
//map through friends grab each id and find each user using id
//format friends map through all friends and return object with all we grabbed
//send to front end with res.status fromatted friends
export const getUserFriends = async (req, res) => {
    try {

        const { id } = req.params;
        const user = await User.findById(id);
    
        const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );
        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath}) => {
                return { _id, firstName, lastName, occupation, location, picturePath};
            }
        );
        res.status(200).json(formattedFriends);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}



//update
//grab user id and friendId from req.params
//find and set cosnt user with current user id
//find and set const friend with friendId
//if friend(friendID) is included in current user(id) friends' list, we remove them with filter method. Same for friend friends list.
//remove user from friends list
//else if theyre not in friends list we will push them to the array of friend list, save the updated lists for both user and friend
//promise all to make multiple calls
//format new frineds list with friends.map give it all params ex: id, first/last and return an object with what we grabbed
export const addRemoveFriend = async (req, res) => {
    try {
        const { id, friendId } = req.params;
         const user = await User.findById(id);
         const friend = await User.findById(friendId)
        
         if (user.friends.includes(friendId)) {
            user.friends = user.friends.filter((id) => id !== friendId);
            friend.friends = friend.friends.filter((id) => id !== id);
         } else {
            user.friend.push(friendId);
            friend.friends.push(id);
         }
          await user.save();
          await friend.save();

         const friends = await Promise.all(
            user.friends.map((id) => User.findById(id))
        );
        const formattedFriends = friends.map(
            ({ _id, firstName, lastName, occupation, location, picturePath}) => {
                return { _id, firstName, lastName, occupation, location, picturePath};
            }
        );

        res.status(200).json(formattedFriends)
    } catch (error) {
        res.status(404).json({ message: err.message });
    }
}
