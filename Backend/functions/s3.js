import {S3Client, PutObjectCommand} from '@aws-sdk/client-s3'
import { AWS_BUCKET_NAME, AWS_BUCKET_REGION, AWS_PUBLIC_KEY, AWS_SECRET_KEY } from '../config.js'
import fs from 'fs';


const client = new S3Client({
    region: AWS_BUCKET_REGION,
    credentials: {
        accessKeyId: AWS_PUBLIC_KEY,
        secretAccessKey: AWS_SECRET_KEY,

    }  
})

export async function uploadFile(file) {
    const stream = fs.createReadStream(file.path)
    const uploadParams = {
        Bucket: AWS_BUCKET_NAME,
        Key: file.name,
        Body: stream
    }
    const command = new PutObjectCommand(uploadParams);
    const result = await client.send(command);
    console.log(result);
    return result;
}

export async function uploadFiles(files) {
    const uploadResults = [];

    for (const file of files) {
        const stream = fs.createReadStream(file.path);
        const uploadParams = {
            Bucket: AWS_BUCKET_NAME,
            Key: file.originalname, // Usar originalname para mantener el nombre
            Body: stream
        };
        const command = new PutObjectCommand(uploadParams);
        
        try {
            const result = await client.send(command);
            console.log(result);
            uploadResults.push(result);
        } catch (error) {
            console.error('Error al subir el archivo:', error);
            throw new Error('Error al subir uno o más archivos');
        }
    }

    return uploadResults;
}