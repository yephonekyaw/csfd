const signout = async (req, res) => {
  const cookies = req.cookies;
  if (!cookies?.jwt) return res.status(204).send('Logged out');
  res.clearCookie('jwt', { httpOnly: true, sameSite: 'None', secure: true });
  return res.status(204).send('Logged out');
};

export { signout };
