const { Router } = require('express');
const { authorize } = require('../middlewares/auth.middleware');
const { generateReportController } = require('../controllers/report.controller');
const router = Router();

/**
 * @route POST /api/v1/report/generate
 * @description Generate report based on job description, resume and selfDescription
 * @access Private
 */
router.post('/generate', authorize, generateReportController);

module.exports = router;