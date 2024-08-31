import prisma from '../../db/initiatePrisma.js';
import moment from 'moment-timezone';

export const getAllGuessInfo = async (req, res) => {
  const id = req.id;
  try {
    let data;
    let hint_data = await prisma.hints.findMany({
      where: {
        junior_id: parseInt(id),
      },
      select: {
        id: true,
        description: true,
        reveal_date: true,
      },
      orderBy: {
        id: 'asc',
      },
    });

    hint_data = hint_data.map((item, index) => {
      if (
        moment.utc(item.reveal_date).tz('Asia/Bangkok') >
        moment.utc().tz('Asia/Bangkok')
      ) {
        return {
          ...item,
          id: index,
          description: 'Locked',
          reveal_date: item.reveal_date,
        };
      }
      return {
        ...item,
      };
    });

    const chance_data = await prisma.chances.findFirst({
      where: {
        junior_id: parseInt(id),
      },
      select: {
        id: true,
        lives: true,
        status: true,
        reveal_date: true,
      },
    });

    const server_time = moment
      .utc()
      .tz('Asia/Bangkok')
      .format('YYYY-MM-DDTHH:mm:ss');

    data = {
      hint_data: hint_data,
      chance_data: chance_data,
      server_time: server_time,
    };
    return res.status(200).json({
      condition: 'success',
      data: data,
      message: 'Success',
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send('Internal server error');
  }
};
