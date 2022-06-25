import {Router, Request, Response} from "express";
//import {bloggers} from "./bloggers-router";
import {postsRepository} from "../repositories/posts-repository";
import {authValidationMiddleware} from "../middlewares/auth-middleware";

export const postsRouter = Router({})

const errorsCollect = (errors: FieldErrorType[], message: string, field: string) => {
    const error: FieldErrorType = {
        message: message,
        field: field
    }
    errors.push(error)
}

const errorsResult = (res: Response, errorsMessages: FieldErrorType[], status: number) => {
    const errorResult: APIErrorResultType = {
        errorsMessages: errorsMessages,
        //resultCode: 1
    }
    res.status(status).send(errorResult)
}

postsRouter.get('/', (req: Request, res: Response) => {
    const posts = postsRepository.getPosts()
    res.send(posts)
})

postsRouter.post('/',
    authValidationMiddleware,
    (req: Request, res: Response) => {
    const errors: FieldErrorType[] = []
    const body: PostInputModelType = req.body
    if (!body.title || typeof body.title !== 'string' || !body.title.trim() || body.title.length > 30) {
        errorsCollect(errors, "You should enter the correct title", "title")
    }
    if (!body.shortDescription || typeof body.shortDescription !== 'string' || !body.shortDescription.trim() || body.shortDescription.length > 100) {
        errorsCollect(errors, "You should enter the correct short description", "shortDescription")

    }
    if (!body.content || typeof body.content !== 'string' || !body.content.trim() || body.content.length > 1000) {
        errorsCollect(errors, "You should enter the correct content", "content")
    }
    /*ТУТ МОЖЕТ БЫТЬ ОШИБКА, МОЖЕТ, НУЖНО ПРОВЕРКУ !BLOGGER ОТДЕЛЬНО*/
    //const blogger = bloggers.find(bl => bl.id === req.body.bloggerId)
    /*if (!body.bloggerId || typeof body.bloggerId !== "number" || !blogger) {
        errorsCollect(errors, "You should enter the correct bloggerId", "bloggerId")
    }*/

    if (errors.length !== 0) {
        errorsResult(res, errors, 404)
    } else {
        const newPost = postsRepository.createPost(
            body.title,
            body.shortDescription,
            body.content,
            body.bloggerId)
        if (!newPost) {
            res.status(404).send({errors: [{message: "You should enter the correct bloggerId", field: "bloggerId"}]})
        return
        }
        res.status(201).send(newPost)
    }
})

postsRouter.get('/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    const post = postsRepository.getPostById(id)
    if (!id) {
        res.sendStatus(404)
        return
    }
    if (!post) {
        res.sendStatus(404)
        return

    } else {
        res.status(200).send(post)
    }
})

postsRouter.put('/:id',
    authValidationMiddleware,
    (req: Request, res: Response) => {
    const errors: FieldErrorType[] = []
    const id = parseInt(req.params.id)
    const body: PostInputModelType = req.body
    const isUpdated = postsRepository.updatePost(id, body.title, body.shortDescription, body.content, body.bloggerId)

    if (!body.title || typeof body.title !== "string" || !body.title.trim() || body.title.length > 30) {
        errorsCollect(errors, "You should enter the correct title", "title")
    }
    if (!body.shortDescription || typeof body.shortDescription !== "string" || !body.shortDescription.trim() || body.shortDescription.length > 100) {
        errorsCollect(errors, "You should enter the correct short description", "shortDescription")
    }
    if (!body.content || typeof body.content !== "string" || !body.content.trim() || body.content.length > 1000) {
        errorsCollect(errors, "You should enter the correct content", "content")
    }
    if (!body.bloggerId || typeof body.bloggerId !== "number") {
        errorsCollect(errors, "You should enter the correct BloggerId", "bloggerId")
    }
  /*  const blogger = bloggers.find(bl => bl.id === req.body.bloggerId)
    if (!blogger) {
        errorsCollect(errors, "You should enter the correct bloggerId", "bloggerId")
        return
    }*/
    if (errors.length !== 0) {
        errorsResult(res, errors, 404)
    }
    if (!isUpdated) {
        errorsResult(res, errors, 404)
    } else {
        res.status(204).send()
    }
})

postsRouter.delete('/:id',
    authValidationMiddleware,
    (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    const post = postsRepository.deletePost(id)
    if(!post) {
        res.status(404).send()
    } else {
            res.status(204).send()
    }
})

type APIErrorResultType = {
    errorsMessages: FieldErrorType[]
    //resultCode: number
}

type FieldErrorType = {
    message: string
    field: string
}

type PostInputModelType = {
    title: string
    shortDescription: string
    content: string
    bloggerId: number
}

