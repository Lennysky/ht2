"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authValidationMiddleware = void 0;
const authValidationMiddleware = (req, res, next) => {
    let lp = "admin:qwerty";
    let buff = new Buffer(lp);
    let encodedLP = buff.toString('base64');
    let readyString = "Basic " + encodedLP;
    const extractedHeaders = req.headers['authorization'];
    console.log(readyString === extractedHeaders);
    if (readyString === extractedHeaders) {
        next();
    }
    else
        (res.sendStatus(401));
};
exports.authValidationMiddleware = authValidationMiddleware;
//# sourceMappingURL=auth-middleware.js.map