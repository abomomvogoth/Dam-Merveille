const express = require('express');
const swaggerUi = require('swagger-ui-express');
const { loadOpenApiYaml } = require('./swagger');

const router = express.Router();
const openapi = loadOpenApiYaml();

// Ex: GET /api/docs
router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(openapi));

module.exports = router;

