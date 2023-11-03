// create a wecserver and listen to port 3000
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const Comment = require('./models/comment');
const app = express();

// connect to mongodb
mongoose.connect('mongodb://localhost:27017/comments', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to mongodb successfully!');
}).catch(err => {
    console.error(err);
    process.exit(1);
});

// use body parser
app.use(bodyParser.json());

// GET /comments
app.get('/comments', async (req, res) => {
    const comments = await Comment.find();
    res.json(comments);
});

// POST /comments
app.post('/comments', async (req, res) => {
    const comment = new Comment(req.body);
    const savedComment = await comment.save();
    res.json(savedComment);
});

// GET /comments/:id
app.get('/comments/:id', async (req, res) => {
    const comment = await Comment.findById(req.params.id);
    res.json(comment);
});

// PUT /comments/:id
app.put('/comments/:id', async (req, res) => {
    const comment = await Comment.findByIdAndUpdate(req.params.id, req.body);
    res.json(comment);
});

// DELETE /comments/:id
app.delete('/comments/:id', async (req, res) => {
    const comment = await Comment.findByIdAndRemove(req.params.id);
    res.json(comment);
});

// start the server
app.listen(3000, () => {
    console.log('Server started on port 3000');
});








