"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bloggersRouter = exports.bloggers = void 0;
const express_1 = require("express");
exports.bloggers = [
    { id: 1, name: "Lenko", youtubeUrl: "https://www.youtube.com/channel/UCkgXcNSMktRtfMiv64Pxo5g/videos" },
    { id: 2, name: "Dimych", youtubeUrl: "https://www.youtube.com/c/ITKAMASUTRA/videos" },
    { id: 3, name: "Humberman", youtubeUrl: "https://www.youtube.com/c/AndrewHubermanLab/videos" },
    { id: 4, name: "Goblin", youtubeUrl: "https://www.youtube.com/c/DmitryPuchkov/videos" },
    { id: 5, name: "Yamshchikov", youtubeUrl: "https://www.youtube.com/channel/UCQMteJvING2dzFIFbBYdipw/videos" }
];
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
const getLastId = (bloggersArray) => {
    let lastIndex = 0;
    bloggersArray.forEach(el => {
        if (el.id > lastIndex) {
            lastIndex = el.id;
        }
    });
    return lastIndex;
};
exports.bloggersRouter.get('/', (req, res) => {
    res.send(exports.bloggers);
});
exports.bloggersRouter.post('/', (req, res) => {
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
        const newBlogger = {
            id: getLastId(exports.bloggers) + 1,
            name: body.name,
            youtubeUrl: body.youtubeUrl
        };
        exports.bloggers.push(newBlogger);
        res.status(201).send(newBlogger);
    }
});
exports.bloggersRouter.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const blogger = exports.bloggers.find(bl => bl.id === id);
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
exports.bloggersRouter.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const errors = [];
    const blogger = exports.bloggers.find(bl => bl.id === id);
    const body = req.body;
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
        blogger.name = body.name;
        blogger.youtubeUrl = body.youtubeUrl;
        res.sendStatus(204).send();
    }
});
exports.bloggersRouter.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const blogger = exports.bloggers.find(bl => bl.id === id);
    if (!id) {
        res.send(404);
    }
    if (!blogger) {
        res.send(404);
    }
    else {
        const newBloggerArray = exports.bloggers.filter(bl => bl.id !== id);
        if (newBloggerArray.length < exports.bloggers.length) {
            exports.bloggers = newBloggerArray;
            res.sendStatus(204).send();
        }
        else {
            res.send(404);
        }
    }
});
//# sourceMappingURL=bloggers-router.js.map