import prisma from '../../db/initiatePrisma.js';
import moment from 'moment-timezone';

export const getSeniorData = async (req, res) => {
  try {
    const id = req.id;
    const senior = await prisma.students.findFirst({
      where: {
        id: parseInt(id),
      },
      select: {
        senior_id: true,
      },
    });

    const data = await prisma.students.findFirst({
      where: {
        id: senior.senior_id,
      },
      select: {
        id: true,
        house: true,
        fullname: true,
        nickname: true,
        insta_url: true,
        nationality: true,
        profile_pic_name: true,
      },
    });

    const status = await prisma.chances.findFirst({
      where: {
        junior_id: parseInt(id),
      },
      select: {
        status: true,
      },
    });

    return !status.status &&
      moment.utc('2024-08-17T10:00:00.000Z').tz('Asia/Bangkok') >
        moment.utc().tz('Asia/Bangkok')
      ? res.status(200).json({
          condition: 'success',
          data: null,
          message: 'Success',
        })
      : res.status(200).json({
          condition: 'success',
          data: data,
          message: 'Success',
        });
  } catch (err) {
    console.error(err);
    return res.status(500).send('Internal server error');
  }
};
