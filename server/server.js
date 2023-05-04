// Server file
const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 4000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

//👇🏻 holds all the existing users
const users = [];
//👇🏻 generates a random string as ID
const generateID = () => Math.random().toString(36).substring(2, 10);

app.get("/api/all/threads", (req, res) => {
    res.json({
        threads: threadList,
    });
});

app.post("/api/register", async (req, res) => {
    const { email, password, username } = req.body;
    //👇🏻 holds the ID
    const id = generateID();
    //👇🏻 logs all the user's credentials to the console.
    console.log({ email, password, username, id });
});

app.post("/api/thread/like", (req, res) => {
    //👇🏻 accepts the post id and the user id
    const { threadId, userId } = req.body;
    //👇🏻 gets the reacted post
    const result = threadList.filter((thread) => thread.id === threadId);
    //👇🏻 gets the likes property
    const threadLikes = result[0].likes;
    //👇🏻 authenticates the reaction
    const authenticateReaction = threadLikes.filter((user) => user === userId);
    //👇🏻 adds the users to the likes array
    if (authenticateReaction.length === 0) {
        threadLikes.push(userId);
        return res.json({
            message: "You've reacted to the post!",
        });
    }
    //👇🏻 Returns an error user has reacted to the post earlier
    res.json({
        error_message: "You can only react once!",
    });
});app.post("/api/thread/like", (req, res) => {
    //👇🏻 accepts the post id and the user id
    const { threadId, userId } = req.body;
    //👇🏻 gets the reacted post
    const result = threadList.filter((thread) => thread.id === threadId);
    //👇🏻 gets the likes property
    const threadLikes = result[0].likes;
    //👇🏻 authenticates the reaction
    const authenticateReaction = threadLikes.filter((user) => user === userId);
    //👇🏻 adds the users to the likes array
    if (authenticateReaction.length === 0) {
        threadLikes.push(userId);
        return res.json({
            message: "You've reacted to the post!",
        });
    }
    //👇🏻 Returns an error user has reacted to the post earlier
    res.json({
        error_message: "You can only react once!",
    });
});

app.post("/api/thread/replies", (req, res) => {
    //👇🏻 The post ID
    const { id } = req.body;
    //👇🏻 searches for the post
    const result = threadList.filter((thread) => thread.id === id);
    //👇🏻 return the title and replies
    res.json({
        replies: result[0].replies,
        title: result[0].title,
    });
});

app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});