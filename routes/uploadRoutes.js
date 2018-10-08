const AWS = require('aws-sdk');
const uuid = require('uuid/v1');
const keys = require('../config/keys');
const requireLogin = require('../middlewares/requireLogin');

AWS.config.update({region: 'ap-southeast-1'});
const s3 = new AWS.S3({
    accessKeyId : keys.accessKeyId,
    secretAccessKey : keys.secretAccessKey
})

module.exports = app => {
    app.get('/api/upload' ,requireLogin , (req,res) => {
        const key = `${req.user.id}/${uuid()}.jpg`;

        const params = {
            Bucket: 'my-blog-bucket-test', 
            ContentType: 'image/jpeg',
            Key: key
        };
        s3.getSignedUrl('putObject', params , (err , url) => {
            return res.send({key , url});
        });
    });
};