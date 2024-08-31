import prisma from '../../db/initiatePrisma.js';

const getMembersIds = async (req, res) => {
  const { house, batch } = req.params;
  const role = batch === '24' ? 'senior' : 'junior';
  try {
    const data = await prisma.students.findMany({
      where: {
        house: house.charAt(0).toUpperCase() + house.slice(1),
        role: role,
      },
      select: {
        id: true,
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

export { getMembersIds };
