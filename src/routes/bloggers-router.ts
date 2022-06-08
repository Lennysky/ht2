import {Router, Request, Response} from "express";

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

const getLastId = (bloggersArray: BloggerViewModelType[]) => {
    let lastIndex = 0;
    bloggersArray.forEach(el => {
        if (el.id > lastIndex) {
            lastIndex = el.id
        }
    })
    return lastIndex
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
        const newBlogger: BloggerViewModelType = {
            id: getLastId(bloggers) + 1,
            name: body.name,
            youtubeUrl: body.youtubeUrl
        }
        bloggers.push(newBlogger)
        res.status(201).send(newBlogger)
    }
})

bloggersRouter.get('/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    const blogger = bloggers.find(bl => bl.id === id)
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
    const blogger = bloggers.find(bl => bl.id === id)
    const body: BloggerInputModelType = req.body
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
        blogger.name = body.name
        blogger.youtubeUrl = body.youtubeUrl
        res.sendStatus(204).send()
    }
})

bloggersRouter.delete('/:id', (req: Request, res: Response) => {
    const id = parseInt(req.params.id)
    const blogger = bloggers.find(bl => bl.id === id)
    if (!id) {
        res.send(404)
    }
    if (!blogger) {
        res.send(404)
    } else {
        const newBloggerArray = bloggers.filter(bl => bl.id !== id)
        if (newBloggerArray.length < bloggers.length) {
            bloggers = newBloggerArray
            res.sendStatus(204).send()
        } else {
            res.send(404)
        }
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