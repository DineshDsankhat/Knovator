const db = require("../utils/db");
const jwt_decode = require("jwt-decode");
const Post = db.Post;

// create
exports.create = async (body, token) => {
    body.status = "Active"
    body.createdBy = getID(token)
    const newPost = new Post(body)
    await newPost.save();
    return newPost
}

//allPost
exports.allPost = async (token) => {
    const id = getID(token)
    const posts = await Post.find({ createdBy: id }).exec();
    return posts;
}

// read
exports.read = async (body, token) => {
    const id = getID(token)
    const postData = await Post.findById(body.id)
    if (postData) {
        if (id == postData.createdBy) {
            return postData
        }
        else {
            return { "error": "User not valied for this post" }
        }
    }
    else {

        return { "error": "post not found" }
    }
}

// update
exports.update = async (body, token) => {
    const id = getID(token)
    let postData = await Post.findById(body.id)
    if (postData) {
        if (id == postData.createdBy) {
            Post.findByIdAndUpdate(body.id, body,
                function (err, docs) {
                    if (err) {
                        console.log(err)
                    }
                    else {
                        return docs
                    }
                })
            return { "Status": "Post Update Successful" }


        } else {
            return { "error": "User not valied for this post" }
        }
    }
    else {

        return { "error": "post not found" }
    }

}

// delete
exports.delete = async (body, token) => {
    const id = getID(token)
    const postData = await Post.findById(body.id)
    if (postData) {

        if (id == postData.createdBy) {
            Post.findByIdAndDelete({ _id: body.id }, function (err, docs) {
                if (err) {
                    console.log(err)
                }
            })
            return postData
        } else {
            return { "error": "User not valied for this post" }
        }
    }
    else {

        return { "error": "post not found" }
    }
}


// retrieve posts using latitude and longitude.
exports.readLatitude = async (body) => {
    const posts = await Post.find({ latitude: body.latitude,longitude:body.longitude }).exec();
    return posts;
}

// count of active and inactive post
exports.count = async (token) => {
    const id = getID(token)
    const activePosts = await Post.find({ createdBy: id ,status:"Active"}).exec();
    const inactivePosts = await Post.find({ createdBy: id,status:"Inactive" }).exec();
    return {
        "activePosts":activePosts.length,
        "inactivePosts":inactivePosts.length
    }
}

function getID(token) {
    var decoded = jwt_decode(token);
    return decoded.sub
}
