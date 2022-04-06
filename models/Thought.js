const mongoose = require('mongoose');
const formatDate = require('../utils/helpers');

const Schema = mongoose.Schema;
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (time) => formatDate(time)
        },
        username: {
            type: String,
            required: true
        },
        reactions: [
            reactionSchema
        ],
    },
    {
        toJSON: {
            getters: true
        },
        id: false,
    }
);

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = mongoose.model('Thought', thoughtSchema);

module.exports = Thought;
