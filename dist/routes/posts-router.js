"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRouter = void 0;
const express_1 = require("express");
//import {bloggers} from "./bloggers-router";
const posts_repository_1 = require("../repositories/posts-repository");
const auth_middleware_1 = require("../middlewares/auth-middleware");
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
        //resultCode: 1
    };
    res.status(status).send(errorResult);
};
exports.postsRouter.get('/', (req, res) => {
    const posts = posts_repository_1.postsRepository.getPosts();
    res.send(posts);
});
exports.postsRouter.post('/', auth_middleware_1.authValidationMiddleware, (req, res) => {
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
    //const blogger = bloggers.find(bl => bl.id === req.body.bloggerId)
    /*if (!body.bloggerId || typeof body.bloggerId !== "number" || !blogger) {
        errorsCollect(errors, "You should enter the correct bloggerId", "bloggerId")
    }*/
    if (errors.length !== 0) {
        errorsResult(res, errors, 404);
    }
    else {
        const newPost = posts_repository_1.postsRepository.createPost(body.title, body.shortDescription, body.content, body.bloggerId);
        if (!newPost) {
            res.status(404).send({ errors: [{ message: "You should enter the correct bloggerId", field: "bloggerId" }] });
            return;
        }
        res.status(201).send(newPost);
    }
});
exports.postsRouter.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts_repository_1.postsRepository.getPostById(id);
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
exports.postsRouter.put('/:id', auth_middleware_1.authValidationMiddleware, (req, res) => {
    const errors = [];
    const id = parseInt(req.params.id);
    const body = req.body;
    const isUpdated = posts_repository_1.postsRepository.updatePost(id, body.title, body.shortDescription, body.content, body.bloggerId);
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
    /*  const blogger = bloggers.find(bl => bl.id === req.body.bloggerId)
      if (!blogger) {
          errorsCollect(errors, "You should enter the correct bloggerId", "bloggerId")
          return
      }*/
    if (errors.length !== 0) {
        errorsResult(res, errors, 404);
    }
    if (!isUpdated) {
        errorsResult(res, errors, 404);
    }
    else {
        res.status(204).send();
    }
});
exports.postsRouter.delete('/:id', auth_middleware_1.authValidationMiddleware, (req, res) => {
    const id = parseInt(req.params.id);
    const post = posts_repository_1.postsRepository.deletePost(id);
    if (!post) {
        res.status(404).send();
    }
    else {
        res.status(204).send();
    }
});
//# sourceMappingURL=posts-router.js.map