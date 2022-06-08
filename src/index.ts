import express, {Request, Response} from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import {bloggersRouter} from "./routes/bloggers-router";
import {postsRouter} from "./routes/posts-router";

//!!!ДОБАВИТЬ В ПЭКЕДЖ.ДЖСОН СКРИПТЫ ДЛЯ ХЕРОКУ


// создать экспресс-приложение
const app = express()

const corsMiddleware = cors();
app.use(corsMiddleware)
const jsonBodyMiddleware = bodyParser.json()
app.use(jsonBodyMiddleware)

const port = process.env.PORT || 3001

app.use('/bloggers', bloggersRouter)
app.use('/posts', postsRouter)

// стартануть приложение
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})


