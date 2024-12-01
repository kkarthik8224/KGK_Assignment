const express = require('express');
const { 
  createResource, 
  getResources, 
  getResourceById, 
  deleteResource 
} = require('../controllers/resource_controllers');


const { authMiddleware } = require('../middlewares/auth');

const router = express.Router();

router.use(authMiddleware);

router.post('/', createResource);

router.get('/', getResources);

router.get('/:id', getResourceById);

router.delete('/:id', deleteResource);

module.exports = router;
