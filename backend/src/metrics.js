// TasteCam Heritage - Production Metrics Middleware for Prometheus
// Uses prom-client library for proper Prometheus metric types

const promClient = require('prom-client');

// Create a Registry
const register = new promClient.Registry();

// Default metrics (CPU, memory, etc.)
promClient.collectDefaultMetrics({ register, prefix: 'tastecam_' });

// Custom metrics
const httpRequestCounter = new promClient.Counter({
  name: 'tastecam_http_requests_total',
  help: 'Total HTTP requests received',
  labelNames: ['method', 'route', 'status'],
  registers: [register],
});

const httpRequestDurationHistogram = new promClient.Histogram({
  name: 'tastecam_http_request_duration_seconds',
  help: 'HTTP request duration in seconds',
  labelNames: ['method', 'route', 'status'],
  buckets: [0.01, 0.05, 0.1, 0.25, 0.5, 1, 2.5, 5],
  registers: [register],
});

const recipesGauge = new promClient.Gauge({
  name: 'tastecam_recipes_total',
  help: 'Total number of recipes in the database',
  registers: [register],
});

const appInfo = new promClient.Gauge({
  name: 'tastecam_info',
  help: 'Application metadata',
  labelNames: ['version', 'service', 'language'],
  registers: [register],
});

// Initialize static metrics
appInfo.set(1);

const recipes = require('./data/sampleRecipes.json');
recipesGauge.set(recipes.length);

// Middleware: track every request
function metricsMiddleware(req, res, next) {
  const end = httpRequestDurationHistogram.startTimer();
  const originalEnd = res.end;

  res.end = function (...args) {
    const route = req.route ? req.route.path : req.path;
    const status = res.statusCode.toString();
    httpRequestCounter.inc({ method: req.method, route, status });
    end({ method: req.method, route, status });
    originalEnd.apply(res, args);
  };

  next();
}

// Handler: expose metrics
async function metricsHandler(req, res) {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
}

module.exports = { metricsMiddleware, metricsHandler, register };
