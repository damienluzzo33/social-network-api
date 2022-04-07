const { User, Thought } = require('../models');

module.exports = {
    async getAllThoughts(req, res) {
        try {
            const thoughts = await Thought.find();
            res.json(thoughts)
        } catch(err) {
            console.log(err)
            res.status(500).json(err)
        }
    },
    async getOneThought(req, res) {
        try {
            const thought = await Thought.findOne(
                { _id: req.params.id}
            );
            if (!thought) {
                res.status(404).json("No thought with this ID was found.")
            } else {
                res.json(thought);
            }
        } catch(err) {
            console.log(err)
            res.status(500).json(err)
        }
    },
    async createThought(req, res) {
        try {
            const thought = await Thought.create(req.body);

            await User.findOneAndUpdate(
                { username: thought.username },
                {
                    $addToSet: {
                        thoughts: thought._id
                    }
                }
            )

            res.json(thought);
        } catch(err) {
            console.log(err)
            res.status(500).json(err)
        }
    },
    async updateThought(req, res) {
        try {
            const thought = await Thought.findOneAndUpdate(
                { _id: req.params.id },
                {
                    $set: req.body
                },
                { new: true }
            );
            if (!thought) {
                res.status(404).json("No thought with this ID was found.")
            } else {
                res.json(thought);
            }
        } catch(err) {
            console.log(err)
            res.status(500).json(err)
        }
    },
    async deleteThought(req, res) {
        try {
            const specificThought = await Thought.findOneAndRemove({ _id: req.params.id });

            if (!specificThought) {
                res.status(404).json("No thought with this ID was found.")
            } else {
                res.json(specificThought);
            }
        } catch(err) {
            console.log(err)
            res.status(500).json(err)
        }
    },
    async addReaction(req,res) {
        try {
            const newReaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                {
                    $addToSet: {
                        reactions: req.body
                    }
                },
                {new: true}
            )
            if (!newReaction) {
                res.status(404).json("This thought ID was not found.")
            } else {
                res.json(newReaction);
            }
        } catch(err) {
            console.log(err)
            res.status(500).json(err)
        }
    },
    async removeReaction(req,res) {
        try {
            const newReaction = await Thought.findOneAndUpdate(
                { _id: req.params.thoughtId },
                {
                    $pull: {
                        reactions: {
                            _id: req.params.reactionId
                        }
                    }
                },
                {new: true}
            )
            if (!newReaction) {
                res.status(404).json("This thought ID was not found.")
            } else {
                res.json(newReaction);
            }
        } catch(err) {
            console.log(err)
            res.status(500).json(err)
        }
    }
}

//* DATA STRUCTURE
//* {
//*   "username": "damienluzzo33",
//*   "thoughtText": "This is the thought I am having..."
//* }