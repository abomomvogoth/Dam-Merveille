const fs = require('fs');
const path = require('path');
const yaml = require('yaml');

describe('Swagger/OpenAPI', () => {
  test('api-swagger.yaml file exists and is valid YAML', () => {
    const swaggerPath = path.join(__dirname, '..', '..', 'docs', 'api-swagger.yaml');
    expect(fs.existsSync(swaggerPath)).toBe(true);

    const raw = fs.readFileSync(swaggerPath, 'utf8');
    expect(raw).toBeTruthy();

    const doc = yaml.parse(raw);
    expect(doc).toHaveProperty('openapi', '3.0.0');
    expect(doc).toHaveProperty('info');
    expect(doc.info).toHaveProperty('title', 'TasteCam Heritage API');
    expect(doc).toHaveProperty('paths');
  });

  test('swagger.js loadOpenApiYaml loads correctly', () => {
    const { loadOpenApiYaml } = require('../src/swagger');
    const doc = loadOpenApiYaml();
    expect(doc).toHaveProperty('openapi');
    expect(doc.info.title).toBe('TasteCam Heritage API');
  });

  test('Swagger UI router is defined', () => {
    const swaggerUiRouter = require('../src/swagger-ui');
    expect(swaggerUiRouter).toBeDefined();
    expect(typeof swaggerUiRouter).toBe('function');
  });

  test('api-swagger.yaml defines /recipes endpoint', () => {
    const swaggerPath = path.join(__dirname, '..', '..', 'docs', 'api-swagger.yaml');
    const raw = fs.readFileSync(swaggerPath, 'utf8');
    const doc = yaml.parse(raw);
    expect(doc.paths).toHaveProperty('/recipes');
    expect(doc.paths['/recipes']).toHaveProperty('get');
  });

  test('api-swagger.yaml defines /recipes/search endpoint', () => {
    const swaggerPath = path.join(__dirname, '..', '..', 'docs', 'api-swagger.yaml');
    const raw = fs.readFileSync(swaggerPath, 'utf8');
    const doc = yaml.parse(raw);
    expect(doc.paths).toHaveProperty('/recipes/search');
    expect(doc.paths['/recipes/search']).toHaveProperty('get');
  });

  test('api-swagger.yaml defines Recipe schema', () => {
    const swaggerPath = path.join(__dirname, '..', '..', 'docs', 'api-swagger.yaml');
    const raw = fs.readFileSync(swaggerPath, 'utf8');
    const doc = yaml.parse(raw);
    expect(doc.components.schemas).toHaveProperty('Recipe');
    expect(doc.components.schemas.Recipe.properties).toHaveProperty('name');
    expect(doc.components.schemas.Recipe.properties).toHaveProperty('ingredients');
  });
});
