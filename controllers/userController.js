const { User, Thought } = require('../models');

module.exports = {
    async getAllUsers(req, res) {
        try {
            const user = await User.find();
            res.json(user);
        } catch(err) {
            console.log(err)
            res.status(500).json(err)
        }
    },
    async getOneUser(req, res) {
        try {
            const user = await User.findOne(
                { _id: req.params.id }
            );
            if (!user) {
                res.status(404).json("No user with this ID was found.")
            } else {
                res.json(user);
            }
        } catch(err) {
            console.log(err)
            res.status(500).json(err)
        }
    },
    async createUser(req, res) {
        try {
            const user = await User.create(req.body);
            res.json(user);
        } catch(err) {
            console.log(err)
            res.status(500).json(err)
        }
    },
    async updateUser(req, res) {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.id },
                {
                    username: req.body.username,
                    email: req.body.email
                },
                { new: true }
            );
            if (!user) {
                res.status(404).json("No user with this ID was found.")
            } else {
                res.json(user);
            }
        } catch(err) {
            console.log(err)
            res.status(500).json(err)
        }
    },
    async deleteUser(req, res) {
        try {
            const specificUser = User.findOne({ _id: req.params.id });
            if (specificUser.thoughts) {
                for (let thought of specificUser.thoughts) {
                    await Thought.findOneAndRemove({_id: thought._id});
                }
            }
            const user = await User.findOneAndRemove(
                { _id: req.params.id }
            );
            if (!user) {
                res.status(404).json("No user with this ID was found.")
            } else {
                res.json(user);
            }
        } catch(err) {
            console.log(err)
            res.status(500).json(err)
        }
    },
    async addFriend(req, res) {
        try {
            const friend = await User.findById(req.params.friendId);

            console.log(friend)

            if (!friend) {
                console.log("Friend with that ID does not exist");
                return;
            } else {
                const user = await User.findOneAndUpdate(
                    { _id: req.params.userId },
                    {
                        $addToSet: {
                            friends: req.params.friendId
                        }
                    },
                    { new: true }
                );

                console.log(user);

                if (!user) {
                    console.log("User with that ID does not exist");
                    return;
                } else {
                    res.status(200).json(user);
                }
            }
        } catch(err) {
            console.log(err)
            res.status(500).json(err)
        }
    },
    async removeFriend(req, res) {
        try {
            const friend = await User.findById(req.params.friendId);

            if (!friend) {
                console.log("Friend with that ID does not exist");
                return;
            } else {
                const user = await User.findOneAndUpdate(
                    { _id: req.params.userId },
                    {
                        $pull: {
                            friends: req.params.friendId
                        }
                    },
                    { new: true }
                );

                if (!user) {
                    console.log("User with that ID does not exist");
                    return;
                } else {
                    res.status(200).json(user);
                }
            }
        } catch(err) {
            console.log(err)
            res.status(500).json(err)
        }
    },
}

//* {
//*   "username": "lernantino",
//*   "email": "lernantino@gmail.com"
//* }


// userRouter.post("/:userId/friends/:friendId", async (req,res) => {
//     //* add a new friend to friends list
//     try {

//     } catch (err) {
//         console.log(err);
//         res.status(500).json(err);
//     }
// })

// userRouter.delete("/:userId/friends/:friendId", async (req,res) => {
//     //* remove a friend from the list
//     try {

//     } catch (err) {
//         console.log(err);
//         res.status(500).json(err);
//     }
// })
