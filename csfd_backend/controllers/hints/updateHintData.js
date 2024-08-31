import prisma from '../../db/initiatePrisma.js';

export const updateHintData = async (req, res) => {
  const { data } = req.body;
  const { id: senior_id } = req;

  try {
    const updateQueries = data.map((item) =>
      prisma.hints.update({
        where: {
          id: parseInt(item.db_index),
          reveal_date: {
            gte: new Date(),
          },
          senior_id,
        },
        data: {
          description: item.value,
        },
      })
    );

    await Promise.all(updateQueries);

    return res.status(200).json({
      condition: 'success',
      data: 'Good',
      message: 'Success',
    });
  } catch (err) {
    if (err.code === 'P2025') {
      return res.status(204).send();
    }

    return res.status(500).send();
  }
};
