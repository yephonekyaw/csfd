import prisma from '../../db/initiatePrisma.js';

export const getMemberDataById = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await prisma.students.findUnique({
      where: {
        id: parseInt(id),
      },
      select: {
        id: true,
        profile_pic_name: true,
        house: true,
        fullname: true,
        nickname: true,
        insta_url: true,
        nationality: true,
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
