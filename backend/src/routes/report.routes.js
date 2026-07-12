import { Router } from 'express';
import { authorize } from '../middlewares/auth.middleware.js';
import {
    generateReportController,
    getDashboardController,
    getReportController,
    listReportsController,
} from '../controllers/report.controller.js';
import upload from '../middlewares/file.middleware.js';

const router = Router();


/**
 * @route GET /api/v1/report/dashboard
 * @description Get aggregated dashboard analytics for the logged-in user
 * @access Private
 */
router.get('/dashboard', authorize, getDashboardController);

/**
 * @route GET /api/v1/report
 * @description Get all reports for the logged-in user (lightweight list view)
 * @access Private
 */
router.get('/', authorize, listReportsController);

/**
 * @route POST /api/v1/report/generate
 * @description Generate report based on job description, resume and selfDescription
 * @access Private
 */
router.post('/generate', authorize, upload.single("resume"), generateReportController);

/**
 * @route GET /api/v1/report/:id
 * @description Get a single full report by ID (must belong to logged-in user)
 * @access Private
 */
router.get('/:id', authorize, getReportController);

export default router;