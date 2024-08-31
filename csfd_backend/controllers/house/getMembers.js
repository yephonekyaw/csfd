import prisma from '../../db/initiatePrisma.js';

export default async function getMembers(req, res) {
  const { house } = req.params;
  const { batch } = req.query;

  if (!house || !['alpha', 'iota', 'eta', 'epsilon'].includes(house)) {
    return res.send(404).send();
  }

  let role;

  switch (batch) {
    case '24':
      role = 'senior';
      break;
    case '25':
      role = 'junior';
      break;
    default:
      return res.send(404).send();
  }

  try {
    const result = await prisma.students.findMany({
      where: {
        house: {
          equals: house,
          mode: 'insensitive',
        },
        role,
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
      orderBy: {
        nickname: 'asc'
      }
    });

    return res.status(200).json({
      condition: 'success',
      data: result,
      message: 'Success',
    });
  } catch (err) {
    return res.status(500).send();
  }
}
