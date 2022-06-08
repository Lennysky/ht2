import {Router, Request, Response} from "express";
import {bloggersRepository} from "../repositories/bloggers-repository";

export let bloggers: BloggerViewModelType[] = [
    {id: 1, name: "Lenko", youtubeUrl: "https://www.youtube.com/channel/UCkgXcNSMktRtfMiv64Pxo5g/videos"},
    {id: 2, name: "Dimych", youtubeUrl: "https://www.youtube.com/c/ITKAMASUTRA/videos"},
    {id: 3, name: "Humberman", youtubeUrl: "https://www.youtube.com/c/AndrewHubermanLab/videos"},
    {id: 4, name: "Goblin", youtubeUrl: "https://www.youtube.com/c/DmitryPuchkov/videos"},
    {id: 5, name: "Yamshchikov", youtubeUrl: "https://www.youtube.com/channel/UCQMteJvING2dzFIFbBYdipw/videos"}
]

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
        resultCode: 1
    }
    res.status(status).send(errorResult)
}



bloggersRouter.get('/', (req: Request, res: Response) => {
    res.send(bloggers)
})

bloggersRouter.post('/', (req: Request, res: Response) => {
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
        errorsResult(res, errors, 404)
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

bloggersRouter.put('/:id', (req: Request, res: Response) => {
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
bloggersRouter.delete('/:id', (req: Request, res: Response) => {
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

type BloggerViewModelType = {
    id: number
    name: string
    youtubeUrl: string
}

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
    resultCode: number
}