import pkg from 'jsonwebtoken';
const { sign, verify } = pkg;
const JWT_SECRET = process.env.JWT_SECRET;

const generateAccessToken = (id, mail, role) => {
  sign;
  const accessToken = sign({ id: id, mail: mail, role: role }, JWT_SECRET, {
    expiresIn: '3h',
  });
  return accessToken;
};

const verifyAccessToken = (req, res, next) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) {
    return res.status(401).send('Unauthorized access');
  }
  const accessToken = cookies.jwt;
  verify(accessToken, JWT_SECRET, (error, decoded) => {
    if (error) {
      return res.status(403).send('Invalid token');
    }
    req.id = decoded.id;
    req.mail = decoded.mail;
    req.role = decoded.role;
    next();
  });
};

export { generateAccessToken, verifyAccessToken };
