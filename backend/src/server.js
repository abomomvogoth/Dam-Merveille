const express = require('express');
const cors = require('cors');
const recipesRouter = require('./routes/recipes');
const swaggerUiRouter = require('./swagger-ui');
const { metricsMiddleware, metricsHandler } = require('./metrics');

const app = express();
app.use(cors());
app.use(express.json());
app.use(metricsMiddleware);

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'TasteCam Heritage API' });
});

// Prometheus metrics endpoint
app.get('/api/metrics', metricsHandler);

app.use('/api/recipes', recipesRouter);

// Swagger UI
app.use('/api/docs', swaggerUiRouter);

const port = process.env.PORT || 4000;

// Only listen when NOT in test mode
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`TasteCam Heritage backend listening on port ${port}`);
  });
}

module.exports = app;
