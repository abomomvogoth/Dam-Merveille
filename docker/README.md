# Docker Compose

Cette configuration contient un service PostgreSQL, un backend Express et un frontend React.

## Démarrage

1. Aller dans le dossier `docker`
2. Lancer `docker compose up --build`

## Accès
- Frontend : http://localhost:3000
- Backend : http://localhost:4000/api/health
- Base de données : localhost:5432

## Notes
- Le backend utilise `DATABASE_URL` pour se connecter à PostgreSQL.
- Les services sont montés en volume pour le développement local.
