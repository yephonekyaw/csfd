import prisma from '../../db/initiatePrisma.js';
import moment from 'moment-timezone';

export const getJuniorIds = async (req, res) => {
  const id = req.id;
  try {
    const ids = await prisma.students.findMany({
      where: {
        senior_id: id,
      },
      select: {
        id: true,
        nickname: true,
      },
      orderBy: {
        id: 'asc',
      },
    });

    const status = await prisma.chances.findMany({
      where: {
        junior_id: {
          in: ids.map((item) => item.id),
        },
      },
      select: {
        status: true,
      },
    });

    const server_time = moment
      .utc()
      .tz('Asia/Bangkok')
      .format('YYYY-MM-DDTHH:mm:ss');

    return res.status(200).send({
      condition: 'success',
      data: ids.map((item, index) => ({
        ...item,
        status: status[index].status,
      })),
      server_time: server_time,
      message: 'Success',
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send('Internal server error');
  }
};
