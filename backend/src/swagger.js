const fs = require('fs');
const path = require('path');
const yaml = require('yaml');

function loadOpenApiYaml() {
  const swaggerPath = path.join(__dirname, '..', '..', 'docs', 'api-swagger.yaml');
  const raw = fs.readFileSync(swaggerPath, 'utf8');
  return yaml.parse(raw);
}

module.exports = { loadOpenApiYaml };

