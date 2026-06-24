const request = require('supertest');

// Import the actual app from server.js
const app = require('../src/server');

describe('API Routes', () => {
  test('GET /api/health returns ok', async () => {
    const res = await request(app).get('/api/health');
    expect(res.status).toBe(200);
    expect(res.body).toEqual({ status: 'ok', service: 'TasteCam Heritage API' });
  });

  test('GET /api/recipes returns array', async () => {
    const res = await request(app).get('/api/recipes');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    expect(res.body.length).toBeGreaterThanOrEqual(3);
  });

  test('GET /api/recipes/search?ingredient= returns all', async () => {
    const res = await request(app).get('/api/recipes/search?ingredient=');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    // Should contain at least the default recipes
    expect(res.body.length).toBeGreaterThanOrEqual(3);
  });

  test('GET /api/recipes/search?ingredient=Eru returns filtered', async () => {
    const res = await request(app).get('/api/recipes/search?ingredient=Eru');
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
    // At least one recipe should contain "Eru" in ingredients
    expect(res.body.length).toBeGreaterThanOrEqual(1);
  });

  test('GET /api/recipes/1 returns a specific recipe', async () => {
    const res = await request(app).get('/api/recipes/1');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('id', 1);
    expect(res.body).toHaveProperty('name');
    expect(res.body).toHaveProperty('ingredients');
  });

  test('GET /api/recipes/99999 returns 404', async () => {
    const res = await request(app).get('/api/recipes/99999');
    expect(res.status).toBe(404);
    expect(res.body).toHaveProperty('error');
  });

  test('GET /api/recipes/abc returns 404 (invalid id)', async () => {
    const res = await request(app).get('/api/recipes/abc');
    expect(res.status).toBe(404);
  });
});
