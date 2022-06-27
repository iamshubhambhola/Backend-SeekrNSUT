const path = require("path");
const aws = require("aws-sdk");
const multer = require("multer");
const multerS3 = require("multer-s3");
const { v4: uuid } = require("uuid");
const _ = require("lodash");
const fs = require("fs");

// eslint-disable-next-line no-undef
if (!fs.existsSync(`${rootDir}/uploads`)) {
  // eslint-disable-next-line no-undef
  fs.mkdir(`${rootDir}/uploads`, () => {});
}

aws.config.update({
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET,
  region: process.env.AWS_REGION,
});

const S3 = new aws.S3();

const fileFilter = (req, file, cb) => {
  if (
    _.includes(
      ["image/jpg", "image/jpeg", "image/png", "zip", "application/pdf"],
      file.mimetype
    )
  )
    return cb(null, true);
  req.mimeError = true;
  cb(null, false);
};

const s3Storage = new aws.S3();
const s3Upload = multer({
  storage: multerS3({
    s3: s3Storage,
    bucket: process.env.AWS_S3_BUCKET,
    metadata: function (req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key: function (req, file, cb) {
      cb(null, `${uuid()}${path.extname(file.originalname)}`);
    },
  }),
  fileFilter,
});

const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    // eslint-disable-next-line no-undef
    cb(null, `${rootDir}/uploads`);
  },
  filename: function (req, file, cb) {
    cb(null, `${uuid()}${path.extname(file.originalname)}`);
  },
});
const localUpload = multer({
  storage: diskStorage,
  // fileFilter
});

async function s3DeleteFile(bucket, key) {
  return new Promise((resolve, reject) => {
    S3.deleteObject({ Bucket: bucket, Key: key }, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

module.exports = {
  s3Upload,
  localUpload,
  s3DeleteFile,
};
