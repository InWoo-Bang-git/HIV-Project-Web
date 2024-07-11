const jwt = require("jsonwebtoken");
const CONSTS = require("../const/common");

// 1. checking the token is legit
const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];
  if (!token) {
    // return res.status(403).send("A token is required for authentication");
    if (isUnprotectedRoute(req)) {
      return next();
    }
  }
  try {
    const decoded = jwt.verify(token.split(" ")[1], process.env.ENCRYPTION_KEY);
    req.user = decoded;
    if (decoded.role && hasPermissions(decoded.role, req)) {
      return next();
    } else {
      return res.status(403).send("Forbidden");
    }
  } catch (err) {
    console.log(err)
    return res.status(401).send("Invalid Token");
  }
};

const hasPermissions = (role, req) => {
  
  // We assume the first path param is the path the user wishes to access.
  // i.E https://domain:port/{PATH}
  const topPath = req.path.split("/")[1];
  let hasPermissions = false;
  if (role.toUpperCase() === CONSTS.ADMIN.toUpperCase()) {
    CONSTS.ADMIN_ROUTES.forEach((protectedRoute) => {
      if (protectedRoute.toUpperCase() === topPath.toUpperCase()) {
        hasPermissions = true;
      }
    });
  } else {
    CONSTS.USER_ROUTES.forEach((protectedRoute) => {
      if (protectedRoute.toUpperCase() === topPath.toUpperCase()) {
        hasPermissions = true;
      }
    });
  }
  return hasPermissions;
};

const isUnprotectedRoute = (req) => {
  const topPath = req.path.split("/")[1];
  let isUnprotected = false;
  CONSTS.UNPROTECTED.forEach((route) => {
    if (route.toUpperCase() === topPath.toUpperCase()) {
      isUnprotected = true;
    }
  });

  return isUnprotected;
};

module.exports = verifyToken;
