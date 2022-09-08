const checkIfAuthenticated = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({
      message: 'unauthenticated',
    });
  }
  let headerToken = req.headers.authorization.split(' ')[1];
  try {
    let user = Jwt.verify(headerToken, process.env.JWT_SECRET);
    req.user = user;
    next();
  } catch (err) {
    console.log(err.message);
    return res.status(403).json({
      message: 'forbidden',
    });
  }
};

module.exports.checkIfAuthenticated = checkIfAuthenticated;
