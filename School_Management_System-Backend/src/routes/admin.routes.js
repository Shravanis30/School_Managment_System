// import express from "express";
// import { registerAdmin, loginAdmin } from "../controllers/admin.controller.js";

// const router = express.Router();

// router.post("/register", registerAdmin);
// router.post("/login", loginAdmin);

// export default router;



// ✅ admin.routes.js
import express from "express";
import { registerAdmin, loginAdmin, checkAdminExists} from "../controllers/admin.controller.js";

const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.get("/check", checkAdminExists);

export default router;
