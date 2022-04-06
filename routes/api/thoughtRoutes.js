const thoughtRouter = require('express').Router();
const {
    getAllThoughts,
    getOneThought,
    createThought,
    updateThought,
    deleteThought,
    addReaction,
    removeReaction
} = require('../../controllers/thoughtController');

thoughtRouter.route('/').get(getAllThoughts).post(createThought);

thoughtRouter.route('/:id').get(getOneThought).put(updateThought).delete(deleteThought);

thoughtRouter.route('/:thoughtId/reactions').put(addReaction);

thoughtRouter.route('/:thoughtId/reactions/:reactionId').put(removeReaction);

module.exports = thoughtRouter;