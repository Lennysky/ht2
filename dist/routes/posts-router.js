"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRouter = void 0;
const express_1 = require("express");
const bloggers_router_1 = require("./bloggers-router");
let posts = [
    {
        id: 1,
        title: 'Some awesome video',
        shortDescription: "New awesome video",
        content: 'Some content2',
        bloggerId: 2,
        bloggerName: 'Lenko'
    },
    {
        id: 2,
        title: 'Back video',
        shortDescription: 'New video about back',
        content: 'Some content1',
        bloggerId: 1,
        bloggerName: 'Dimych'
    },
    {
        id: 3,
        title: 'Health video',
        shortDescription: 'New video about health',
        content: 'Some content3',
        bloggerId: 3,
        bloggerName: 'Huberman'
    },
    {
        id: 4,
        title: 'History video',
        shortDescription: 'New video about history',
        content: 'Some content4',
        bloggerId: 4,
        bloggerName: 'Goblin'
    },
    {
        id: 5,
        title: 'AI video',
        shortDescription: 'New AI video',
        content: 'Some content5',
        bloggerId: 5,
        bloggerName: 'Yamshchikov'
    }
];
exports.postsRouter = (0, express_1.Router)({});
const errorsCollect = (errors, message, field) => {
    const error = {
        message: message,
        field: field
    };
    errors.push(error);
};
const errorsResult = (res, errorsMessages, status) => {
    const errorResult = {
        errorsMessages: errorsMessages,
        resultCode: 1
    };
    res.status(status).send(errorResult);
};
const getLastPostsId = (postsArray) => {
    let lastIndex = 0;
    postsArray.forEach(el => {
        if (el.id > lastIndex) {
            lastIndex = el.id;
        }
    });
    return lastIndex;
};
exports.postsRouter.get('/', (req, res) => {
    res.send(posts);
});
exports.postsRouter.post('/', (req, res) => {
    const errors = [];
    const body = req.body;
    if (!body.title || typeof body.title !== 'string' || !body.title.trim() || body.title.length > 30) {
        errorsCollect(errors, "You should enter the correct title", "title");
    }
    if (!body.shortDescription || typeof body.shortDescription !== 'string' || !body.shortDescription.trim() || body.shortDescription.length > 100) {
        errorsCollect(errors, "You should enter the correct short description", "shortDescription");
    }
    if (!body.content || typeof body.content !== 'string' || !body.content.trim() || body.content.length > 1000) {
        errorsCollect(errors, "You should enter the correct content", "content");
    }
    /*ТУТ МОЖЕТ БЫТЬ ОШИБКА, МОЖЕТ, НУЖНО ПРОВЕРКУ !BLOGGER ОТДЕЛЬНО*/
    const blogger = bloggers_router_1.bloggers.find(bl => bl.id === req.body.bloggerId);
    if (!body.bloggerId || typeof body.bloggerId !== "number" || !blogger) {
        errorsCollect(errors, "You should enter the correct bloggerId", "bloggerId");
    }
    if (errors.length !== 0) {
        errorsResult(res, errors, 400);
    }
    else {
        const newPost = {
            id: getLastPostsId(posts) + 1,
            title: body.title,
            shortDescription: body.shortDescription,
            content: body.content,
            bloggerId: body.bloggerId,
            /*ПОДУМАТЬ, ОТКУДА БЕРЕТСЯ ЭТОТ АТРИБУТ*/
            bloggerName: req.body.bloggerName
        };
        posts.push(newPost);
        res.status(201).send(newPost);
    }
});
exports.postsRouter.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts.find(p => p.id === id);
    if (!id) {
        res.sendStatus(404);
        return;
    }
    if (!post) {
        res.sendStatus(404);
        return;
    }
    else {
        res.status(200).send(post);
    }
});
exports.postsRouter.put('/:id', (req, res) => {
    const errors = [];
    const id = parseInt(req.params.id);
    const post = posts.find(p => p.id === id);
    const body = req.body;
    if (!body.title || typeof body.title !== "string" || !body.title.trim() || body.title.length > 30) {
        errorsCollect(errors, "You should enter the correct title", "title");
    }
    if (!body.shortDescription || typeof body.shortDescription !== "string" || !body.shortDescription.trim() || body.shortDescription.length > 100) {
        errorsCollect(errors, "You should enter the correct short description", "shortDescription");
    }
    if (!body.content || typeof body.content !== "string" || !body.content.trim() || body.content.length > 1000) {
        errorsCollect(errors, "You should enter the correct content", "content");
    }
    if (!body.bloggerId || typeof body.bloggerId !== "number") {
        errorsCollect(errors, "You should enter the correct BloggerId", "bloggerId");
    }
    const blogger = bloggers_router_1.bloggers.find(bl => bl.id === req.body.bloggerId);
    if (!blogger) {
        errorsCollect(errors, "You should enter the correct bloggerId", "bloggerId");
        return;
    }
    if (errors.length !== 0) {
        errorsResult(res, errors, 400);
    }
    if (!post) {
        errorsResult(res, errors, 404);
    }
    else {
        post.title = body.title;
        post.shortDescription = body.shortDescription;
        post.content = body.content;
        post.bloggerId = body.bloggerId;
        res.status(204).send();
    }
});
exports.postsRouter.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts.find(p => p.id === id);
    if (!post) {
        res.status(404).send();
    }
    else {
        const newPostsArray = posts.filter(p => p.id !== id);
        if (newPostsArray.length < posts.length) {
            posts = newPostsArray;
            res.status(204).send();
        }
        res.send(404);
    }
});
//# sourceMappingURL=posts-router.js.map