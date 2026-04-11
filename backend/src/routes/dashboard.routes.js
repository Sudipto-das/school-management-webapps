const { Router } = require('express');
const dashboardRouter = Router();

const { getDashboardStats, getDashboardRecent } = require('../controllers/dashboard.controller');

dashboardRouter.get('/stats', getDashboardStats);
dashboardRouter.get('/recent', getDashboardRecent);

module.exports = dashboardRouter;


