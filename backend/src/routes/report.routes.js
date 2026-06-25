const { Router } = require('express');
const { authorize } = require('../middlewares/auth.middleware');
const { generateReportController } = require('../controllers/report.controller');
const upload = require('../middlewares/file.middleware');
const router = Router();

/**
 * @route POST /api/v1/report/generate
 * @description Generate report based on job description, resume and selfDescription
 * @access Private
 */
router.post('/generate', authorize, upload.single("resume"), generateReportController);

module.exports = router;