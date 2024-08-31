import prisma from '../../db/initiatePrisma.js';

export const getHintDataByJuniorId = async (req, res) => {
  const senior_id = req.id;
  const { junior_id } = req.params;
  try {
    const data = await prisma.hints.findMany({
      where: {
        senior_id: senior_id,
        junior_id: parseInt(junior_id),
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
