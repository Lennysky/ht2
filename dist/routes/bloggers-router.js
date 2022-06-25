"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bloggersRouter = void 0;
const express_1 = require("express");
const bloggers_repository_1 = require("../repositories/bloggers-repository");
const auth_middleware_1 = require("../middlewares/auth-middleware");
exports.bloggersRouter = (0, express_1.Router)({});
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
exports.bloggersRouter.get('/', (req, res) => {
    const bloggers = bloggers_repository_1.bloggersRepository.getBloggers();
    res.send(bloggers);
});
exports.bloggersRouter.post('/', auth_middleware_1.authValidationMiddleware, (req, res) => {
    const body = req.body;
    let errors = [];
    const reg = new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?");
    if (!body.name || typeof body.name !== 'string' || !body.name.trim() || body.name.length > 15) {
        errorsCollect(errors, "You should enter the correct name", 'name');
    }
    if (!body.youtubeUrl || !body.youtubeUrl.trim() || body.youtubeUrl.length > 100 || !reg.test(body.youtubeUrl)) {
        errorsCollect(errors, "You should enter the correct url", "youtubeUrl");
    }
    if (errors.length !== 0) {
        errorsResult(res, errors, 404);
    }
    else {
        const newBlogger = bloggers_repository_1.bloggersRepository.createBlogger(body.name, body.youtubeUrl);
        res.status(201).send(newBlogger);
    }
});
exports.bloggersRouter.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const blogger = bloggers_repository_1.bloggersRepository.getBloggerById(id);
    if (!id) {
        res.send(404);
        return;
    }
    if (!blogger) {
        res.send(404);
        return;
    }
    else {
        res.status(200).send(blogger);
    }
});
exports.bloggersRouter.put('/:id', auth_middleware_1.authValidationMiddleware, (req, res) => {
    const id = parseInt(req.params.id);
    const errors = [];
    const body = req.body;
    const blogger = bloggers_repository_1.bloggersRepository.putBlogger(id, body.name, body.youtubeUrl);
    const reg = new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?");
    if (!id) {
        res.send(404);
        return;
    }
    if (!body.name || typeof body.name !== 'string' || !body.name.trim() || body.name.length > 15) {
        errorsCollect(errors, "Your name should be correct", "name");
    }
    if (!body.youtubeUrl || typeof body.youtubeUrl !== 'string' || !body.youtubeUrl.trim() || body.youtubeUrl.length > 100 || !reg.test(body.youtubeUrl)) {
        errorsCollect(errors, "Your url should be correct", "name");
    }
    if (errors.length !== 0) {
        errorsResult(res, errors, 400);
    }
    if (!blogger) {
        res.status(404).send();
    }
    else {
        res.sendStatus(204).send();
    }
});
// ПРОВЕРИТЬ С ТП
//убрала дополинительную проверку, хорошо проверить, может валиться тест
exports.bloggersRouter.delete('/:id', auth_middleware_1.authValidationMiddleware, (req, res) => {
    const id = parseInt(req.params.id);
    const blogger = bloggers_repository_1.bloggersRepository.deleteBlogger(id);
    if (!id) {
        res.send(404);
    }
    //нужна ли здесь проверка на наличие блогера, что этот айдишник не входит в скоуп?
    if (!blogger) {
        res.send(404);
    }
    else {
        res.sendStatus(204).send();
    }
});
//# sourceMappingURL=bloggers-router.js.map