import prisma from '../../db/initiatePrisma.js';
import { z } from 'zod';
import { Storage } from '@google-cloud/storage';
import crypto from 'crypto';
import * as fs from 'fs';

const profileSchema = z.object({
  fullname: z.string().min(1),
  nickname: z.string().min(1),
  nationality: z.string().min(1),
  insta_url: z.string().regex(/^[\w](?!.*?\.{2})[\w.]{1,28}[\w]$/),
});

const addExtension = (filename, mimetype) =>
  `${filename}.${mimetype.substring(6)}`;

export const updateProfileData = async (req, res) => {
  try {
    const id = req.id;

    if (req.failed_upload)
      return res.status(400).json({ message: 'Invalid mime type' }).send();

    try {
      const storage = new Storage();
      const assets = await storage.bucket('csfd-assets');

      const destinationName = crypto.randomUUID();
      const destinationFullFileName = addExtension(
        destinationName,
        req.file.mimetype,
      );

      await assets.upload(req.file.path, {
        destination: destinationFullFileName,
      });
      await prisma.students.update({
        where: {
          id,
        },
        data: {
          profile_pic_name: `https://storage.googleapis.com/csfd-assets/${destinationFullFileName}`,
          updated_at: new Date(),
        },
      });
      fs.unlink(req.file.path, () => {});
    } catch (err) {
      console.log(err);
    }

    const { success, data, error } = await profileSchema.safeParseAsync(
      req.body,
    );

    if (!success) {
      return res.status(400).send();
    }

    await prisma.students.update({
      where: {
        id,
      },
      data: {
        fullname: data.fullname,
        nickname: data.nickname,
        nationality: data.nationality,
        insta_url: data.insta_url,
        updated_at: new Date(),
      },
    });

    return res.status(200).json({
      condition: 'success',
      data: null,
      message: 'Success',
    });
  } catch (err) {
    return res.status(500).send('Internal server error');
  }
};
