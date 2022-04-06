const userRouter = require('express').Router();
const {
    getAllUsers,
    getOneUser,
    createUser,
    updateUser,
    deleteUser,
    addFriend,
    removeFriend
} = require('../../controllers/userController');

userRouter.route('/').get(getAllUsers).post(createUser);

userRouter.route('/:id').get(getOneUser).put(updateUser).delete(deleteUser);

userRouter.route('/:userId/friends/:friendId').post(addFriend).delete(removeFriend);

module.exports = userRouter;