const mongoose = require('mongoose');
const formatDate = require('../utils/helpers');

const Schema = mongoose.Schema;

const ObjectId = Schema.Types.ObjectId;

const reactionSchema = new Schema(
    {
        reactionId: {
            type: ObjectId,
            default: () => new mongoose.Types.ObjectId()
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
        reactionBody: {
            type: String,
            required: true,
            maxlength: 280
        },
    },
    {
        toJSON: {
            getters: true
        },
        id: false,
    }
);

module.exports = reactionSchema;
