const {Router} = require("express");
const UserController = require("./user.controller");
const router = Router();

// --- routes ---
router.post('/', UserController.userCreate);

router.get('/', UserController.userGetAll);

router.get('/:id', UserController.userGetOne);

router.put('/:id', UserController.userUpdate);

router.delete('/:id', UserController.userDelete);

module.exports = router;