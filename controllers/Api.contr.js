const apiServices = require("../services/Api.serv");

async function getApi(req, res, next) {
    const {userName} = req.body;

    if (!userName) {
        res.statusCode = 400;
        const err = new Error("Не передано имя пользователя");
        next(err);
    }

    if (typeof userName !== "string") {
        res.statusCode = 400;
        const err = new Error("Имя пользователя должно быть типа \"строка\"");
        next(err);
    }

    try {
        const api = await apiServices.getApi(userName)
        res.json(api);
    }
    catch (err) {
        res.statusCode = 500;
        next(err);
    }
}

async function deleteApi(req, res, next) {
    const api = req.headers.api;

    if (!api) {
        const err = new Error("Не передан API ключ");
        res.statusCode = 401;
        next(err);
    }
    else {
        try {
            const deletedApi = await apiServices.deleteApi(api);
            res.json(deletedApi);
        }
        catch (err) {
            res.statusCode = 500;
            next(err);
        }
    }
}

function checkApi(req, res, next) {
    const api = req.headers.api;

    if (!api) {
        const err = new Error("Не передан API");
        res.statusCode = 401;
        next(err);
    }
    else {
        next();
    }
}


module.exports = {
    deleteApi,
    checkApi,
    getApi
}