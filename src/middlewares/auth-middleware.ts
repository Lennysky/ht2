import {NextFunction, Request, Response} from "express";


export const authValidationMiddleware = (req: Request, res: Response, next: NextFunction) => {
    let lp = "admin:qwerty";
    let buff = new Buffer(lp);
    let encodedLP = buff.toString('base64');
    let readyString = "Basic " + encodedLP;
    const extractedHeaders = req.headers['authorization'];

    console.log(readyString === extractedHeaders)
    if (readyString === extractedHeaders) {
        next()
    } else (
        res.sendStatus(401)
    )
}



