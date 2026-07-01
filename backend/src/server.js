const express = require('express');
const cors = require('cors');
const path = require('path');
const recipesRouter = require('./routes/recipes');
const swaggerUiRouter = require('./swagger-ui');
const { metricsMiddleware, metricsHandler } = require('./metrics');

const app = express();
app.use(cors());
app.use(express.json());
app.use(metricsMiddleware);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'TasteCam Heritage API' });
});

// Prometheus metrics endpoint
app.get('/api/metrics', metricsHandler);

// API routes
app.use('/api/recipes', recipesRouter);

// Swagger UI
app.use('/api/docs', swaggerUiRouter);

// Serve frontend static files in production (single-service deploy)
if (process.env.SERVE_STATIC === 'true') {
  const frontendDist = path.join(__dirname, '..', '..', 'frontend', 'dist');
  console.log(`[deploy] Serving static frontend from: ${frontendDist}`);
  app.use(express.static(frontendDist));
  // SPA fallback: all non-API routes -> index.html
  app.get('*', (req, res) => {
    if (!req.path.startsWith('/api')) {
      res.sendFile(path.join(frontendDist, 'index.html'));
    }
  });
}

const port = process.env.PORT || 4000;

// Only listen when NOT in test mode
if (process.env.NODE_ENV !== 'test') {
  app.listen(port, () => {
    console.log(`TasteCam Heritage backend listening on port ${port}`);
  });
}

module.exports = app;
