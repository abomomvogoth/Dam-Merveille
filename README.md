# TasteCam Heritage

Plateforme web de recettes traditionnelles du Cameroun, axée sur les régions du Nord-Ouest et du Sud-Ouest.

## Objectif
Proposer une expérience utilisateur moderne pour découvrir, rechercher et comprendre des plats camerounais comme l'Eru, l'Achu, le Ndolé et le Fufu Corn.

## Stack technique
- Frontend : React + Vite
- Backend : Node.js + Express
- Base de données : PostgreSQL
- Conteneurisation : Docker
- Orchestration : Kubernetes (minimaux pour l’examen)
- CI/CD : Jenkins (`Jenkinsfile`)
- Monitoring : Prometheus + Grafana (planifié / non prioritaire pour l’instant)

## Contenu initial
- `backend/` : API Express pour les recettes
- `frontend/` : application React
- `database/` : scripts SQL pour la structure et les données
- `docker/` : configuration de base pour les services
- `docs/` : plan de projet et backlog Scrum

## État actuel (livrables examen)
- Swagger/OpenAPI : `docs/api-swagger.yaml` + Swagger UI sur `http://localhost:4000/api/docs`
- Backend tests Jest : `backend/test/*` + coverage (Jest config)
- Jenkins : pipeline ajouté (`Jenkinsfile`)
- Kubernetes : manifests minimaux ajoutés (`k8s/*`)

## Démarrage rapide
### Backend (dev)
1. Aller dans `backend`
2. Installer les dépendances : `npm install`
3. Lancer le serveur : `npm run dev`

### Swagger UI
- Après démarrage backend : http://localhost:4000/api/docs
- OpenAPI spec : `docs/api-swagger.yaml`

### Backend tests + coverage
- cd backend
- npm test -- --coverage

### Frontend
1. Aller dans `frontend`
2. Installer les dépendances : `npm install`
3. Lancer l'application : `npm run dev`

### Docker Compose
- docker compose -f docker/docker-compose.yml up -d --build

### Kubernetes (si minikube/K8s prêt)
- kubectl apply -f k8s/

## Prochaines étapes (non prioritaires aujourd’hui)
- Compléter les endpoints API
- Ajouter les pages de détail et la recherche avancée
- Prometheus/Grafana (dashboards minimaux)
- Infrastructure monitoring + alerting
- Ansible playbooks (si le prof exige l’exécution)

