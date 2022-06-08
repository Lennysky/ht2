"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const bloggers_router_1 = require("./routes/bloggers-router");
const posts_router_1 = require("./routes/posts-router");
//!!!ДОБАВИТЬ В ПЭКЕДЖ.ДЖСОН СКРИПТЫ ДЛЯ ХЕРОКУ
// создать экспресс-приложение
const app = (0, express_1.default)();
const corsMiddleware = (0, cors_1.default)();
app.use(corsMiddleware);
const jsonBodyMiddleware = body_parser_1.default.json();
app.use(jsonBodyMiddleware);
const port = process.env.PORT || 3001;
app.use('/bloggers', bloggers_router_1.bloggersRouter);
app.use('/posts', posts_router_1.postsRouter);
// стартануть приложение
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
//# sourceMappingURL=index.js.map