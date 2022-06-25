"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRepository = void 0;
const bloggers_repository_1 = require("./bloggers-repository");
let posts = [
    {
        id: 1,
        title: 'Some awesome video',
        shortDescription: "New awesome video",
        content: 'Some content2',
        bloggerId: 2,
        bloggerName: 'Lenko'
    },
    {
        id: 2,
        title: 'Back video',
        shortDescription: 'New video about back',
        content: 'Some content1',
        bloggerId: 1,
        bloggerName: 'Dimych'
    },
    {
        id: 3,
        title: 'Health video',
        shortDescription: 'New video about health',
        content: 'Some content3',
        bloggerId: 3,
        bloggerName: 'Huberman'
    },
    {
        id: 4,
        title: 'History video',
        shortDescription: 'New video about history',
        content: 'Some content4',
        bloggerId: 4,
        bloggerName: 'Goblin'
    },
    {
        id: 5,
        title: 'AI video',
        shortDescription: 'New AI video',
        content: 'Some content5',
        bloggerId: 5,
        bloggerName: 'Yamshchikov'
    }
];
const getLastPostsId = (postsArray) => {
    let lastIndex = 0;
    postsArray.forEach(el => {
        if (el.id > lastIndex) {
            lastIndex = el.id;
        }
    });
    return lastIndex;
};
exports.postsRepository = {
    getPosts() {
        return posts;
    },
    createPost(title, shortDescription, content, bloggerId) {
        const blogger = bloggers_repository_1.bloggers.find(bl => bl.id === bloggerId);
        if (!blogger) {
            return false;
        }
        const newPost = {
            id: getLastPostsId(posts) + 1,
            title: title,
            shortDescription: shortDescription,
            content: content,
            bloggerId: bloggerId,
            bloggerName: blogger.name
        };
        posts.push(newPost);
        return newPost;
    },
    getPostById(id) {
        const post = posts.find(p => p.id === id);
        if (!post) {
            return false;
        }
        else {
            return post;
        }
    },
    // так можно сделать, чтобы после if не писать else, а сразу продолжение кода?
    updatePost(id, title, shortDescription, content, bloggerId) {
        const post = posts.find(p => p.id === id);
        const blogger = bloggers_repository_1.bloggers.find(bl => bl.id === bloggerId);
        if (!post || !blogger) {
            return false;
        }
        post.title = title;
        post.shortDescription = shortDescription;
        post.content = content;
        post.bloggerId = bloggerId;
        post.bloggerName = blogger.name;
        return true;
    },
    deletePost(id) {
        const post = posts.find(p => p.id === id);
        const newPostsArray = posts.filter(p => p.id === id);
        if (newPostsArray.length < posts.length) {
            posts = newPostsArray;
            return true;
        }
        return false;
    }
};
//# sourceMappingURL=posts-repository.js.map