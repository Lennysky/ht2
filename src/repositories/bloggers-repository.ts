export let bloggers: BloggerViewModelType[] = [
    {id: 1, name: "Lenko", youtubeUrl: "https://www.youtube.com/channel/UCkgXcNSMktRtfMiv64Pxo5g/videos"},
    {id: 2, name: "Dimych", youtubeUrl: "https://www.youtube.com/c/ITKAMASUTRA/videos"},
    {id: 3, name: "Humberman", youtubeUrl: "https://www.youtube.com/c/AndrewHubermanLab/videos"},
    {id: 4, name: "Goblin", youtubeUrl: "https://www.youtube.com/c/DmitryPuchkov/videos"},
    {id: 5, name: "Yamshchikov", youtubeUrl: "https://www.youtube.com/channel/UCQMteJvING2dzFIFbBYdipw/videos"}
]

const getLastId = (bloggersArray: BloggerViewModelType[]) => {
    let lastIndex = 0;
    bloggersArray.forEach(el => {
        if (el.id > lastIndex) {
            lastIndex = el.id
        }
    })
    return lastIndex
}

export const bloggersRepository = {
    getBloggers() {
        return bloggers
    },
    createBlogger(name: string, youtubeUrl: string) {
        const newBlogger: BloggerViewModelType = {
            id: getLastId(bloggers) + 1,
            name: name,
            youtubeUrl: youtubeUrl
        }
        bloggers.push(newBlogger)
        return newBlogger
    },
    getBloggerById(id: number) {
        // если find не найдет, он возвращает undefined, поэтому проверку не делаем
        const blogger = bloggers.find(bl => bl.id === id)
            return blogger
    },
    putBlogger(id: number, name: string, youtubeUrl: string) {
        const blogger = bloggers.find(bl => bl.id === id)
        if (!blogger) {
            return false
        } else {
            blogger.name = name
            blogger.youtubeUrl = youtubeUrl
            return true
        }
    },
    deleteBlogger(id: number) {
        const blogger = bloggers.find(bl => bl.id === id)
        if (!blogger) {
            return false
        } else {
            const newBloggerArray = bloggers.filter(bl => bl.id !== id)
            if (newBloggerArray.length < bloggers.length) {
                bloggers = newBloggerArray
                return true
            } else {
                return false
            }
        }
    }

}

type BloggerViewModelType = {
    id: number
    name: string
    youtubeUrl: string
}

type BloggerInputModelType = {
    name: string
    youtubeUrl: string
}