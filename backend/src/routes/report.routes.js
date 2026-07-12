import { Router } from 'express';
import { authorize } from '../middlewares/auth.middleware.js';
import { generateReportController } from '../controllers/report.controller.js';
import upload from '../middlewares/file.middleware.js';

const router = Router();

/**
 * @route POST /api/v1/report/generate
 * @description Generate report based on job description, resume and selfDescription
 * @access Private
 */
router.post('/generate', authorize, upload.single("resume"), generateReportController);

export default router;