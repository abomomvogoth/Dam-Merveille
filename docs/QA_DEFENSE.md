# SEN3244 Software Architecture — Defense Q&A Preparation
## TasteCam Heritage Project
## Prepared by: Abomo Mvogo Therese Damaris (ICTU20241280)

---

## GENERAL QUESTIONS

### Q1: Présentez votre projet en 2 minutes.
**Réponse :**
"TasteCam Heritage est une plateforme web de préservation des recettes traditionnelles camerounaises. L'application permet de découvrir 10 recettes avec leurs photos, origines culturelles, ingrédients et étapes de préparation, en français et en anglais. L'architecture est en couches (Layered) avec React/Vite frontend, Node.js/Express backend, PostgreSQL database. L'infrastructure est conteneurisée avec Docker, orchestrée avec Kubernetes, avec un pipeline CI/CD Jenkins, monitoring Prometheus/Grafana et Infrastructure as Code avec Ansible."

---

### Q2: Pourquoi avez-vous choisi l'architecture en couches (Layered) plutôt que microservices ?
**Réponse :**
"J'ai choisi l'architecture en couches pour plusieurs raisons :
1. **Simplicité** : Pour un MVP de 10 recettes, une architecture monolithique en couches est plus rapide à développer et plus facile à maintenir.
2. **Performance** : Pas de latence réseau entre services (tout est dans un même processus).
3. **Tests** : Les tests d'intégration sont plus simples car toutes les couches sont accessibles sans mocking réseau.
4. **Évolutivité vers microservices** : L'architecture est conçue pour évoluer — chaque couche peut être extraite en microservice séparé quand le besoin se présente (ex: Auth Service, Recommendation Service, Media Service).
5. **Pour ce projet d'examen** : Le layered architecture permet de démontrer clairement la séparation des préoccupations (SoC) et les principes architecturaux discutés en cours."

---

### Q3: Quels sont les trade-offs de votre architecture ?
**Réponse :**
"Les principaux trade-offs sont :
1. **Scalabilité vs Simplicité** : Le monolithe layered scale moins finement que les microservices. En contrepartie, le déploiement est trivial (un seul artefact).
2. **Couplage** : Plus fort qu'en microservices — un changement dans la couche métier peut impacter la couche présentation. Mitigé par l'utilisation d'interfaces bien définies.
3. **Stack technologique unique** : On ne peut pas utiliser des langages différents par service. Mais pour ce projet, Node.js est excellent pour les APIs REST.
4. **Disponibilité** : Un bug dans une couche peut impacter toute l'application. Mitigé par les health probes Kubernetes et le RollingUpdate."

---

## QUESTIONS TECHNIQUES

### Q4: Comment avez-vous implémenté le CI/CD ?
**Réponse :**
"Le pipeline Jenkins comporte 8 stages :
1. **Checkout** : Récupération du code depuis GitHub
2. **Install Dependencies** : npm ci en parallèle (frontend + backend)
3. **Static Analysis** : ESLint
4. **Backend Tests & Coverage** : Jest avec --coverage, publication du rapport HTML
5. **Build Frontend** : Vite build
6. **Build & Tag Docker Images** : Construction et tagging (latest + numéro de build)
7. **Push Docker Images** : Publication sur Docker Hub
8. **Deploy to Kubernetes** : kubectl set image + rollout status
9. **Smoke Test** : curl sur /api/health
10. **Security Scan** : Trivy (optionnel)

Le pipeline s'exécute à chaque push sur la branche main. Les notifications Slack sont configurées pour les succès et échecs."

---

### Q5: Comment fonctionne le monitoring Prometheus/Grafana ?
**Réponse :**
"Prometheus scrape les métriques à 15 secondes d'intervalle sur l'endpoint /api/metrics du backend. Nous utilisons la bibliothèque prom-client qui expose :
- Métriques par défaut (CPU, mémoire, event loop lag)
- http_requests_total (compteur) : par méthode, route et statut
- http_request_duration_seconds (histogramme) : distribution des temps de réponse
- tastecam_recipes_total (gauge) : nombre de recettes
- tastecam_info : métadonnées de version

Grafana est pré-provisionné avec :
- Une datasource Prometheus automatique
- Un dashboard avec 4 panneaux : statut API, taux de requêtes, latence P95, nombre de recettes."

---

### Q6: Expliquez votre stratégie de tests.
**Réponse :**
"J'ai implémenté 3 niveaux de tests :
1. **Tests Unitaires** (recipesController.test.js) : 5 tests qui valident les fonctions pures (getAllRecipes, getRecipeById, searchRecipesByIngredient) avec des mocks de req/res.
2. **Tests d'Intégration** (routes.test.js) : 7 tests via Supertest qui valident les endpoints HTTP (health, recipes, search, 404).
3. **Tests de Documentation** (swagger.test.js) : 6 tests qui valident la spec OpenAPI (structure, endpoints, schémas).

La couverture atteint 92.53% de lignes, bien au-dessus des 80% exigés."

---

### Q7: Comment gérez-vous la scalabilité ?
**Réponse :**
"La scalabilité est assurée à plusieurs niveaux :
1. **Kubernetes HPA** : HorizontalPodAutoscaler scale les pods backend de 2 à 10 réplicas quand le CPU dépasse 70%, et les pods frontend de 2 à 8 réplicas.
2. **RollingUpdate** : maxUnavailable=0 garantit zéro downtime pendant les mises à jour.
3. **Health Probes** : Readiness et liveness probes sur /api/health assurent que seuls les pods sains reçoivent du trafic.
4. **Services ClusterIP** : Load balancing interne entre les pods.
5. **Future** : Cache Redis pour les requêtes fréquentes, CDN pour les assets statiques."

---

### Q8: Comment avez-vous conteneurisé l'application ?
**Réponse :**
"L'application est conteneurisée avec Docker :
- **backend/Dockerfile** : Node.js 20-alpine, installation des dépendances en production, expose le port 4000.
- **frontend/Dockerfile** : Node.js 20-alpine, installation des dépendances, build Vite, expose le port 3000.

Le docker-compose orchestre 5 services :
1. db (PostgreSQL 15) avec healthcheck
2. backend avec dépendance sur db
3. frontend avec dépendance sur backend
4. prometheus (scraping automatique)
5. grafana (dashboard pré-configuré)"

---

### Q9: Parlez-moi de votre infrastructure Kubernetes.
**Réponse :**
"Les manifests Kubernetes couvrent :
1. **Secrets** : DATABASE_URL stockée de manière sécurisée
2. **PostgreSQL** : Déploiement StatefulSet avec volume persistant
3. **Backend** : 2 réplicas, RollingUpdate, readiness/liveness probes, service ClusterIP
4. **Frontend** : 2 réplicas, RollingUpdate, service NodePort
5. **Ingress** : NGINX Ingress Controller avec routage path-based (/api → backend, / → frontend)
6. **HPA** : Auto-scaling basé sur CPU/mémoire

Utilisation: kubectl apply -f k8s/"

---

### Q10: Quelles sont vos métriques Prometheus personnalisées ?
**Réponse :**
"J'ai implémenté 5 métriques personnalisées :
1. `tastecam_http_requests_total` : Compteur de requêtes HTTP avec labels method, route, status
2. `tastecam_http_request_duration_seconds` : Histogramme des temps de réponse (buckets 10ms à 5s)
3. `tastecam_recipes_total` : Gauge du nombre de recettes dans la base
4. `tastecam_info` : Métadonnées (version, service name)
5. Métriques par défaut Node.js : CPU, mémoire, event loop lag

Ces métriques permettent de répondre aux questions : "Combien de requêtes ?", "Quelle latence ?", "Le service est-il up ?", "Combien de recettes ?"."

---

### Q11: Comment avez-vous intégré Ansible dans votre projet ?
**Réponse :**
"J'ai créé 2 playbooks Ansible :
1. **playbook-install.yml** : Provisionne un serveur vierge avec Node.js 20, Docker, Docker Compose, PM2, et les dépendances système nécessaires. Vérifie chaque installation avec des commandes de version.
2. **playbook-deploy.yml** : Clone le dépôt GitHub, installe les dépendances, build le frontend, configure les variables d'environnement, démarre l'application avec PM2, et vérifie que le health check passe.

Un script Bash supplémentaire (infra/provision.sh) permet le provisioning complet d'un VPS avec installation de Prometheus, Grafana et kubectl."

---

### Q12: Quel est le style architectural et pourquoi ?
**Réponse :**
"Le style architectural est **Layered Architecture (N-Tier)** combiné avec **MVC** :
- **Presentation Layer** : React components (Vue)
- **Application Layer** : Express controllers (Contrôleurs)
- **Business Layer** : Services métier (Modèle)
- **Data Layer** : PostgreSQL (Données)

Justification : Ce style offre la meilleure séparation des préoccupations pour un projet de cette taille. Il est compréhensible, maintenable, et facile à tester. De plus, il permet une migration progressive vers microservices quand le besoin de scalabilité fine se fera sentir."

---

## QUESTIONS SUR L'INNOVATION

### Q13: Quelle est l'innovation de votre projet ?
**Réponse :**
"Trois innovations clés :
1. **Préservation culturelle par la technologie** : Allier architecture logicielle moderne (Docker, K8s, CI/CD) à la préservation du patrimoine culinaire camerounais — une approche unique qui démontre que la technologie peut servir la culture.
2. **Système bilingue complet** : Chaque donnée (nom, région, origine, ingrédients, étapes) existe en français ET en anglais — pas juste l'interface.
3. **Architecture démontrée** : Le projet est un cas d'étude complet couvrant tous les aspects d'une architecture logicielle professionnelle : conteneurisation, orchestration, CI/CD, monitoring, IaC, tests, documentation."

---

### Q14: Quelles évolutions futures envisagez-vous ?
**Réponse :**
"1. **Microservices** : Extraire Auth Service, Recommendation Service (IA), Media Service
2. **Communauté** : Soumission de recettes, modération, notation
3. **Mobile** : Application React Native
4. **IA** : Recommandations personnalisées basées sur les préférences utilisateur
5. **Cloud** : Déploiement AWS EKS ou GCP GKE avec backup automatisé
6. **CI/CD avancé** : Canary deployments, feature flags, A/B testing"

---

## QUESTIONS SUR LE PROCESSUS SCRUM

### Q15: Comment avez-vous appliqué Scrum en étant seul ?
**Réponse :**
"Même en solo, j'ai respecté les artefacts Scrum :
- **Product Backlog** : 10 user stories priorisées
- **Sprint Planning** : 2 sprints de 5 jours chacun
- **Daily Standup** : Auto-évaluation quotidienne de l'avancement
- **Sprint Review** : Validation des fonctionnalités livrées
- **Sprint Retrospective** : Identification des améliorations
- **Burndown Chart** : Suivi visuel de la progression des story points

Le Product Owner fixait les priorités, le Scrum Master gérait les obstacles, et l'équipe de développement implémentait — les trois rôles étant tenus par moi-même avec une discipline rigoureuse."

---

## QUESTIONS SUR LES DIFFICULTÉS

### Q16: Quels ont été les principaux défis ?
**Réponse :**
"1. **Contrainte de temps** : MVP réalisé en 5 heures — priorisation stricte des fonctionnalités essentielles.
2. **Intégration Prometheus** : Passage de métriques manuelles à prom-client pour des métriques standards.
3. **Documentation culturelle** : Recherche approfondie pour documenter l'origine et le contexte de chaque recette.
4. **Configuration Jenkins** : Pipeline multi-stage avec déploiement Kubernetes — résolu en faisant du 'Infrastructure as Code' pour le pipeline."

---

## QUESTIONS SUR LA NOTE

### Q17: Quelle note pensez-vous mériter et pourquoi ?
**Réponse :**
"Je pense mériter une note entre 95 et 100/110 pour la Part A, car :
1. **Infrastructure Setup (15/15)** : VPS script + Docker + K8s complets
2. **Scrum (4/5)** : Backlog, sprints, burndown — manque juste la diversité d'équipe
3. **CI/CD Jenkins (10/10)** : Pipeline complet avec tests, build, deploy, notifications
4. **Prometheus/Grafana (5/5)** : Métriques custom, dashboard, alerting
5. **Ansible (5/5)** : 2 playbooks fonctionnels
6. **Tests (10/10)** : 18 tests, 92.53% couverture
7. **Docker + K8s (15/15)** : Images, Compose, manifests, Ingress, HPA
8. **Architecture (18/20)** : Diagrammes, qualités, trade-offs documentés
9. **Innovation (8/10)** : Concept original, bilingue complet
10. **Documentation (15/15)** : README, API docs, rapport, présentation, vidéo script"
