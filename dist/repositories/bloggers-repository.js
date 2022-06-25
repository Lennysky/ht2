"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bloggersRepository = exports.bloggers = void 0;
exports.bloggers = [
    { id: 1, name: "Lenko", youtubeUrl: "https://www.youtube.com/channel/UCkgXcNSMktRtfMiv64Pxo5g/videos" },
    { id: 2, name: "Dimych", youtubeUrl: "https://www.youtube.com/c/ITKAMASUTRA/videos" },
    { id: 3, name: "Humberman", youtubeUrl: "https://www.youtube.com/c/AndrewHubermanLab/videos" },
    { id: 4, name: "Goblin", youtubeUrl: "https://www.youtube.com/c/DmitryPuchkov/videos" },
    { id: 5, name: "Yamshchikov", youtubeUrl: "https://www.youtube.com/channel/UCQMteJvING2dzFIFbBYdipw/videos" }
];
const getLastId = (bloggersArray) => {
    let lastIndex = 0;
    bloggersArray.forEach(el => {
        if (el.id > lastIndex) {
            lastIndex = el.id;
        }
    });
    return lastIndex;
};
exports.bloggersRepository = {
    getBloggers() {
        return exports.bloggers;
    },
    createBlogger(name, youtubeUrl) {
        const newBlogger = {
            id: getLastId(exports.bloggers) + 1,
            name: name,
            youtubeUrl: youtubeUrl
        };
        exports.bloggers.push(newBlogger);
        return newBlogger;
    },
    getBloggerById(id) {
        // если find не найдет, он возвращает undefined, поэтому проверку не делаем
        const blogger = exports.bloggers.find(bl => bl.id === id);
        return blogger;
    },
    putBlogger(id, name, youtubeUrl) {
        const blogger = exports.bloggers.find(bl => bl.id === id);
        if (!blogger) {
            return false;
        }
        else {
            blogger.name = name;
            blogger.youtubeUrl = youtubeUrl;
            return true;
        }
    },
    deleteBlogger(id) {
        const blogger = exports.bloggers.find(bl => bl.id === id);
        if (!blogger) {
            return false;
        }
        else {
            const newBloggerArray = exports.bloggers.filter(bl => bl.id !== id);
            if (newBloggerArray.length < exports.bloggers.length) {
                exports.bloggers = newBloggerArray;
                return true;
            }
            else {
                return false;
            }
        }
    }
};
//# sourceMappingURL=bloggers-repository.js.map