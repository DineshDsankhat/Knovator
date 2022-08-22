const postService = require("../services/postService");

// create a post
exports.create = (req, res, next) => {
    const token = retriveToken(req)
    postService.create(req.body,token)
        .then((r) => {
            res.json(r)
        })
        .catch((err) => next(err));
}

// read all post
exports.allPost = (req, res, next) => {
    const token = retriveToken(req)
    postService.allPost(token)
        .then((r) => {
            res.send(r)
        })
        .catch((err) => next(err));
}
// read a post
exports.read = (req, res, next) => {
    const token = retriveToken(req)
    postService.read(req.body,token)
        .then((r) => {
            res.send(r)
        })
        .catch((err) => next(err));
}

// update a post
exports.update = (req, res, next) => {
    const token = retriveToken(req)
    postService.update(req.body,token)
        .then((r) => {
            res.send(r)
        })
        .catch((err) => next(err));
}


// delete a post
exports.delete = (req, res, next) => {
    const token = retriveToken(req)
    postService.delete(req.body,token)
        .then((r) => {
            res.send(r)
        })
        .catch((err) => next(err));
}


// // retrieve posts using latitude and longitude.
exports.readLatitude = (req, res, next) => {
    postService.readLatitude(req.body)
        .then((r) => {
            res.send(r)
        })
        .catch((err) => next(err));
}

// count of active and inactive post
exports.count = (req, res, next) => {
    const token = retriveToken(req)
    postService.count(token)
        .then((r) => {
            res.send(r)
        })
        .catch((err) => next(err));
}

function retriveToken(req) {
    const authHeader=req.rawHeaders[1];
    const token = authHeader.substring(7, authHeader.length)
    return token;
}

