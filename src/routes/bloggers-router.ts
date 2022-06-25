import {Router, Request, Response} from "express";
import {bloggersRepository} from "../repositories/bloggers-repository";
import {authValidationMiddleware} from "../middlewares/auth-middleware";


export const bloggersRouter = Router({})

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

//bloggersRouter.get('/',)


bloggersRouter.get('/', (req: Request, res: Response) => {
    const bloggers = bloggersRepository.getBloggers()
    res.send(bloggers)
})

bloggersRouter.post('/',
    authValidationMiddleware,
    (req: Request, res: Response) => {
    const body: BloggerInputModelType = req.body
    let errors: FieldErrorType[] = []
    const reg = new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?")
    if (!body.name || typeof body.name !== 'string' || !body.name.trim() || body.name.length > 15) {
        errorsCollect(errors, "You should enter the correct name", 'name')
    }
    if (!body.youtubeUrl || !body.youtubeUrl.trim() || body.youtubeUrl.length > 100 || !reg.test(body.youtubeUrl)) {
        errorsCollect(errors, "You should enter the correct url", "youtubeUrl")
    }
    if (errors.length !== 0) {
        errorsResult(res, errors, 400)
    } else {
        const newBlogger = bloggersRepository.createBlogger(body.name, body.youtubeUrl)
        res.status(201).send(newBlogger)
    }
})

bloggersRouter.get('/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    const blogger = bloggersRepository.getBloggerById(id)
    if (!id) {
        res.send(404)
        return;
    }
    if (!blogger) {
        res.send(404)
        return
    } else {
        res.status(200).send(blogger)
    }
})

bloggersRouter.put('/:id',
    authValidationMiddleware,
    (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    const errors: FieldErrorType[] = []
    const body: BloggerInputModelType = req.body
    const blogger = bloggersRepository.putBlogger(id, body.name, body.youtubeUrl)
    const reg = new RegExp("^(http[s]?:\\/\\/(www\\.)?|ftp:\\/\\/(www\\.)?|www\\.){1}([0-9A-Za-z-\\.@:%_\+~#=]+)+((\\.[a-zA-Z]{2,3})+)(/(.)*)?(\\?(.)*)?")
    if (!id) {
        res.send(404)
        return
    }
    if (!body.name || typeof body.name !== 'string' || !body.name.trim() || body.name.length > 15) {
        errorsCollect(errors, "Your name should be correct", "name")
    }

    if (!body.youtubeUrl || typeof body.youtubeUrl !== 'string' || !body.youtubeUrl.trim() || body.youtubeUrl.length > 100 || !reg.test(body.youtubeUrl)) {
        errorsCollect(errors, "Your url should be correct", "name")
    }
    if (errors.length !== 0) {
        errorsResult(res, errors, 400)
    }
    if (!blogger) {
        res.status(404).send()
    } else {
        res.sendStatus(204).send()
    }
})


// ПРОВЕРИТЬ С ТП
//убрала дополинительную проверку, хорошо проверить, может валиться тест
bloggersRouter.delete('/:id',
    authValidationMiddleware,
    (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    const blogger = bloggersRepository.deleteBlogger(id)
    if (!id) {
        res.send(404)
    }
    //нужна ли здесь проверка на наличие блогера, что этот айдишник не входит в скоуп?
    if (!blogger) {
        res.send(404)
    } else {
        res.sendStatus(204).send()
    }
})

type FieldErrorType = {
    message: string
    field: string
}

type BloggerInputModelType = {
    name: string
    youtubeUrl: string
}

type APIErrorResultType = {
    errorsMessages: FieldErrorType[]
    //resultCode: number
}