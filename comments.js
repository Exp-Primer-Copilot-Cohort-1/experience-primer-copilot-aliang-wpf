// Create web server
// http://localhost:3000/comments
// http://localhost:3000/comments/1

// Import express module
const express = require('express');
const app = express();

// Import body-parser module
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));

// Import mongoose module
const mongoose = require('mongoose');

// Connect to database
mongoose.connect('mongodb://localhost:27017/comments', { useNewUrlParser: true });

// Create schema
const commentSchema = new mongoose.Schema({
    name: String,
    comment: String
});

// Create model
const Comment = mongoose.model('Comment', commentSchema);

// Create a new comment
// Comment.create({
//     name: 'John',
//     comment: 'This is a comment'
// }, (err, comment) => {
//     if (err) {
//         console.log(err);
//     } else {
//         console.log('New comment added');
//         console.log(comment);
//     }
// });

// Set view engine
app.set('view engine', 'ejs');

// Get all comments
app.get('/comments', (req, res) => {
    Comment.find({}, (err, comments) => {
        if (err) {
            console.log(err);
        } else {
            res.render('comments', { comments: comments });
        }
    });
});

// Get a comment
app.get('/comments/:id', (req, res) => {
    Comment.findById(req.params.id, (err, comment) => {
        if (err) {
            console.log(err);
        } else {
            res.render('comment', { comment: comment });
        }
    });
});

// Create a comment
app.get('/comments/new', (req, res) => {
    res.render('new');
});

// Create a comment
app.post('/comments', (req, res) => {
    Comment.create(req.body.comment, (err, comment) => {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/comments');
        }
    });
});

// Edit a comment
app.get('/comments/:id/edit', (req, res) => {
    Comment.findById(req.params.id, (err, comment) => {
        if (err) {
            console.log(err);
        } else {
            res.render('edit', { comment: comment });
        }
    });
});

// Update a comment
app.put('/comments/: