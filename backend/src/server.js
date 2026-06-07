const express = require('express');
const cors = require('cors');
const recipesRouter = require('./routes/recipes');
const swaggerUiRouter = require('./swagger-ui');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', service: 'TasteCam Heritage API' });
});

app.use('/api/recipes', recipesRouter);

// Swagger UI
app.use('/api/docs', swaggerUiRouter);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`TasteCam Heritage backend listening on port ${port}`);
});

