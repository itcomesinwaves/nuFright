import express from 'express';
import { db } from '../../prisma/utils/db.server';
import { config } from '../../config';
import multer from 'multer';
import { S3Client, PutObjectCommand, GetObjectCommand} from '@aws-sdk/client-s3';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
const images = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });






const s3 = new S3Client({
  credentials: {
    accessKeyId: config.BUCKET_KEY,
    secretAccessKey: config.BUCKET_SECRET
  },
  region: config.BUCKET_REGION
});

images.post('/', upload.single('image'), async (req, res) => {

  const params = {
    Bucket: config.BUCKET_NAME,
    Key: req.file?.originalname,
    Body: req.file?.buffer,
    ContentType: req.file?.mimetype
  }
  const command = new PutObjectCommand(params);
  s3.send(command)
    .then((data) => {
      console.log('s3 command successful', data);
    })
    .catch((err) => {
      console.error('error on s3 send command\n', err);
    })

  const ObjectParams = {
    Bucket: config.BUCKET_NAME,
    Key: req.file?.originalname
  };

  const urlCommand = new GetObjectCommand(ObjectParams)

  res.sendStatus(200);
});

export default images;
