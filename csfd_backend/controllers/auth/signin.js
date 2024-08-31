import { generateAccessToken } from '../../middleware/jwtHandler.js';
import * as jose from 'jose';
import prisma from '../../db/initiatePrisma.js';

const signin = async (req, res) => {
  try {
    const { accessToken, idToken } = req.body;

    const JWKS = jose.createRemoteJWKSet(
      new URL(
        `https://login.microsoftonline.com/6f4432dc-20d2-441d-b1db-ac3380ba633d/discovery/keys?appid=3364c0b5-6ecf-4214-b972-6089832dab22`
      )
    );
    const { payload, protectedHeader } = await jose.jwtVerify(idToken, JWKS);

    const resp = await fetch('https://graph.microsoft.com/v1.0/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    const { id, mail } = await resp.json();
    const user = await prisma.students.findFirst({
      where: {
        uni_mail: 'oakar.oo01@kmutt.ac.th',
      },
      select: {
        id: true,
        uni_mail: true,
        role: true,
      },
    });

    // if no data is found, the user will be granted the spectator role
    const appAccessToken =
      user !== null
        ? generateAccessToken(user.id, user.uni_mail, user.role)
        : generateAccessToken(id, mail, 'spectator');

    return res
      .cookie('jwt', appAccessToken, {
        httpOnly: true,
        sameSite: 'None',
        secure: true,
        maxAge: 3 * 60 * 60 * 1000, // 3-hour lifetime
      })
      .json({
        condition: 'success',
        data: null,
        message: 'Signin successful',
      })
      .send();
  } catch (e) {
    res.status(401).send();
  }
};

export { signin };
