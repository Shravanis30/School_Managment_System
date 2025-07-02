import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // contains user ID and role
    next();
  } catch (err) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

// export const authorizeRole = (role) => {
//   return (req, res, next) => {
//     if (!req.user) {
//       return res.status(401).json({ message: "Unauthorized: No user in request" });
//     }

//     if (req.user.role !== role) {
//       return res.status(403).json({ message: `Access denied. Only ${role}s allowed.` });
//     }

//     next();
//   };
// };

export const authorizeRole = (role) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    const token = authHeader.split(" ")[1];

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      if (decoded.role !== role) {
        return res.status(403).json({ message: "Access denied. Not authorized." });
      }

      req.user = decoded; // ✅ This is what makes req.user.id work
      next();
    } catch (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
  };
};




export default authMiddleware;
