// TasteCam Heritage - Metrics middleware for Prometheus
// Exposes key application metrics at GET /api/metrics

const recipes = require('./data/sampleRecipes.json');

// In-memory counters (in production, use prom-client library)
let requestCount = 0;
const requestDurationBuckets = {};
const startTime = Date.now();

function metricsMiddleware(req, res, next) {
  const start = Date.now();
  
  res.on('finish', () => {
    requestCount++;
    const duration = Date.now() - start;
    const bucket = Math.floor(duration / 50) * 50; // 50ms buckets
    requestDurationBuckets[bucket] = (requestDurationBuckets[bucket] || 0) + 1;
  });
  
  next();
}

function metricsHandler(req, res) {
  const uptime = Math.floor((Date.now() - startTime) / 1000);
  
  const metrics = [
    '# HELP tastecam_uptime_seconds Application uptime',
    '# TYPE tastecam_uptime_seconds gauge',
    `tastecam_uptime_seconds ${uptime}`,
    '',
    '# HELP tastecam_http_requests_total Total HTTP requests',
    '# TYPE tastecam_http_requests_total counter',
    `tastecam_http_requests_total ${requestCount}`,
    '',
    '# HELP tastecam_recipes_total Total recipes in database',
    '# TYPE tastecam_recipes_total gauge',
    `tastecam_recipes_total ${recipes.length}`,
    '',
    '# HELP tastecam_up Application status (1 = up)',
    '# TYPE tastecam_up gauge',
    'tastecam_up 1',
    '',
    '# HELP tastecam_request_duration_ms Request duration histogram buckets',
    '# TYPE tastecam_request_duration_ms gauge',
    ...Object.entries(requestDurationBuckets).map(
      ([bucket, count]) => `tastecam_request_duration_ms_bucket{le="${bucket}ms"} ${count}`
    ),
    '',
    '# HELP tastecam_info Application metadata',
    '# TYPE tastecam_info gauge',
    `tastecam_info{version="1.0.0",service="TasteCam Heritage API"} 1`,
  ].join('\n');
  
  res.set('Content-Type', 'text/plain; charset=utf-8');
  res.status(200).send(metrics);
}

module.exports = { metricsMiddleware, metricsHandler };
