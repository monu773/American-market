const mongoose = require('mongoose');
const Review = require('./review')
const Schema = mongoose.Schema;


const FollowSchema = new Schema({
    username: String,
    following: [String],
});

module.exports = mongoose.model('Follow', FollowSchema);