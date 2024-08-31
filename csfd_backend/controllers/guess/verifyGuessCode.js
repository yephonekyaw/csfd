import prisma from '../../db/initiatePrisma.js';

export const verifyGuessCode = async (req, res) => {
  try {
    const id = req.id;
    const { code } = req.body;
    const student = await prisma.students.findFirst({
      where: {
        id: parseInt(id),
      },
      select: {
        senior_id: true,
      },
    });

    const correct =
      parseInt(code) ===
      parseInt(
        student.senior_id.toString().slice(0, 2) +
          student.senior_id.toString().slice(8)
      );

    const data = await prisma.chances.updateMany({
      where: {
        junior_id: parseInt(id),
      },
      data: {
        lives: {
          decrement: 1,
        },
        status: correct,
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
