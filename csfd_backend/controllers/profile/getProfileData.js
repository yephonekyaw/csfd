import prisma from '../../db/initiatePrisma.js';

const getProfileData = async (req, res) => {
  const id = req.id;
  const uni_mail = req.mail;
  const role = req.role;
  if (role === 'spectator') {
    return res.status(200).json({
      condition: 'success',
      data: null,
      message: 'Spectator mode',
    });
  }

  try {
    const user_data = await prisma.students.findUnique({
      where: {
        id: id,
      },
      select: {
        profile_pic_name: true,
        house: true,
        fullname: true,
        nickname: true,
        insta_url: true,
        nationality: true,
        role: true,
        chances: {
          select: {
            lives: true,
          },
        },
      },
    });
    return res.status(200).json({
      condition: 'success',
      data: user_data,
      message: 'Success',
    });
  } catch (err) {
    console.error(err);
    return res.status(500).send('Internal server error');
  }
};

export { getProfileData };
