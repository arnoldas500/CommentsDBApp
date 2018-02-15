import express, { Router } from 'express';
// Import index action from movies controller
import { index } from './controllers/bcData';

// Initialize the router
const router = Router();

// Handle /movies.json route with index action from movies controller
router.route('/bcData.json')
  .get(index);

export default router;
