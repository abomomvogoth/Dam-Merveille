# TASTECAM HERITAGE — Script Vidéo 13 minutes
## SEN3244 Software Architecture — Engr. Tekoh Palma
## Présenté par : Abomo Mvogo Therese Damaris (ICTU20241280)

---

## PARTIE 1 : Introduction & Contexte (2 min)

### [0:00-0:30] Slide 1 — Title
**Parler :**
"Bonjour Monsieur, je suis Abomo Mvogo Therese Damaris, matricule ICTU20241280. Je vous présente aujourd'hui TasteCam Heritage, mon projet d'architecture logicielle pour SEN3244."

### [0:30-1:00] Slide 2 — Problème & Solution
**Parler :**
"Les recettes traditionnelles camerounaises — comme l'Eru, le Ndolé, l'Achu — se transmettent oralement de génération en génération. Mais avec l'urbanisation et la mondialisation, ce patrimoine culinaire risque de se perdre. TasteCam Heritage répond à ce problème en créant une plateforme web moderne qui préserve, documente et rend accessibles ces recettes avec leur contexte culturel."

### [1:00-2:00] Slide 3 — Objectifs
**Parler :**
"Les objectifs sont :
1. Créer un référentiel numérique de recettes camerounaises
2. Offrir une expérience bilingue français-anglais
3. Implémenter une architecture moderne avec Docker, Kubernetes, CI/CD
4. Atteindre 80% de couverture de tests
5. Documenter l'architecture complète selon les principes vus en cours"

---

## PARTIE 2 : Architecture & Design (3 min)

### [2:00-2:30] Slide 4 — Architecture Globale
**Parler :**
"L'architecture suit un modèle en couches (Layered Architecture) avec 3 tiers : un frontend React avec Vite, un backend Node.js/Express, et une base PostgreSQL. J'ai choisi ce style architectural pour sa simplicité, sa maintenabilité et sa scalabilité horizontale via Kubernetes."

### [2:30-3:00] Slide 5 — Stack Technique
**Parler :**
"La stack technique complète : React 18 + Vite pour le frontend, Node.js 20 + Express pour l'API, PostgreSQL 15 pour les données. Le tout conteneurisé avec Docker et orchestré avec Kubernetes. CI/CD via Jenkins, monitoring Prometheus/Grafana, et Infrastructure as Code avec Ansible."

### [3:00-3:30] Slide 6 — Diagrammes UML
**Parler :**
"Voici les diagrammes clés : le diagramme de cas d'utilisation montre les interactions utilisateur (recherche, consultation, calcul de portions). Le diagramme de classes montre les entités principales : Recipe, Ingredient, Region. Le diagramme de séquence illustre le flux de recherche par ingrédient."

### [3:30-4:00] Slide 7 — Modèle de Données
**Parler :**
"Le modèle de données relationnel comprend 6 tables : regions, recipes, ingredients, recipe_ingredients, users et comments. Ce schéma permet de gérer efficacement la relation many-to-many entre recettes et ingrédients, et d'associer chaque plat à sa région d'origine."

### [4:00-5:00] Slide 8 — Qualités Architecturales
**Parler :**
"Les qualités architecturales clés :
- **Scalabilité** : déploiement multi-pods Kubernetes avec RollingUpdate
- **Performance** : temps de réponse API < 50ms, chargement frontend < 2s
- **Sécurité** : CORS, JWT (prévu), variables d'environnement
- **Maintenabilité** : code modulaire, tests automatisés, documentation Swagger
- **Disponibilité** : health probes, auto-restart Kubernetes, backup PostgreSQL"

---

## PARTIE 3 : Implémentation & Résultats (4 min)

### [5:00-5:30] Slide 9 — Frontend
**Parler :**
"Le frontend React propose 10 recettes camerounaises avec leurs vraies photos, un système de recherche par ingrédient ou par nom, un sélecteur de portions qui ajuste automatiquement les quantités, et le support bilingue français-anglais pour toute l'interface."

### [5:30-6:00] Slide 10 — Backend API
**Parler :**
"L'API RESTful expose 4 endpoints : GET /api/recipes (liste), GET /api/recipes/:id (détail), GET /api/recipes/search?ingredient= (recherche), GET /api/health (healthcheck). Documentation Swagger disponible sur /api/docs. Un endpoint /api/metrics expose les métriques Prometheus."

### [6:00-6:30] Slide 11 — Tests & Coverage
**Parler :**
"J'ai implémenté 18 tests de 3 catégories : tests unitaires du controller, tests d'intégration des routes API (via Supertest), et tests de la documentation Swagger. La couverture de code atteint 92.53%, bien au-delà des 80% exigés."

### [6:30-7:00] Slide 12 — Docker & Kubernetes
**Parler :**
"Chaque service a son Dockerfile. Le docker-compose orchestre 5 conteneurs : backend, frontend, PostgreSQL, Prometheus et Grafana. Les manifests Kubernetes déploient 2 réplicas pour le backend et le frontend, avec RollingUpdate, readiness et liveness probes, et un service ClusterIP/NodePort."

### [7:00-7:30] Slide 13 — Jenkins CI/CD
**Parler :**
"Le pipeline Jenkins automatisé comporte 6 stages : Checkout → Install Dependencies → Backend Tests with Coverage → Build Frontend → Build Docker Images → Docker Compose Smoke Test. Le pipeline s'exécute à chaque push sur GitHub."

### [7:30-8:00] Slide 14 — Monitoring
**Parler :**
"Prometheus scrape les métriques à 15s d'intervalle sur /api/metrics. Grafana affiche un dashboard avec 4 panneaux : statut du service, taux de requêtes HTTP, latence P95, et nombre de recettes. Une alerte est configurée si le service devient indisponible."

### [8:00-8:30] Slide 15 — Ansible & Scrum
**Parler :**
"Deux playbooks Ansible : playbook-install.yml (installation de Node.js, Docker, PM2) et playbook-deploy.yml (déploiement complet de l'application). Côté Scrum, j'ai documenté les rôles (Product Owner, Scrum Master, Developer), le product backlog, 2 sprints, et un burndown chart."

### [8:30-9:00] Slide 16 — Infrastructure Diagram
**Parler :**
"Le diagramme d'infrastructure montre l'architecture complète : depuis l'utilisateur jusqu'aux pods Kubernetes, en passant par l'Ingress Controller, les services backend et frontend, la base de données PostgreSQL, et les services de monitoring."

---

## PARTIE 4 : Démonstration (2 min)

### [9:00-9:30] Démo — Frontend
**Montrer à l'écran :**
"Je vais vous montrer l'application en action."
- Naviguer dans la liste des 10 recettes
- Cliquer sur "Eru" → montrer les détails
- Changer la langue en English → montrer la traduction
- Ajuster les portions de 4 à 8 → montrer les quantités qui doublent
- Taper "fish" dans la recherche → montrer les résultats filtrés

### [9:30-10:00] Démo — Backend & Swagger
**Montrer à l'écran :**
- GET /api/health → "{ status: 'ok' }"
- GET /api/recipes → les 10 recettes
- GET /api/recipes/1 → détail de Eru
- GET /api/metrics → les métriques Prometheus
- Swagger UI sur /api/docs

### [10:00-11:00] Démo — Infrastructure
**Montrer :**
- Les fichiers Dockerfile
- Les manifests Kubernetes
- Le Jenkinsfile
- Le rapport de couverture (92.53%)
- Les playbooks Ansible

---

## PARTIE 5 : Conclusion & Discussion (2 min)

### [11:00-11:30] Slide 17 — Défis & Solutions
**Parler :**
"Les principaux défis rencontrés :
1. **Contrainte de temps** : MVP réalisé en 5 heures — priorisation stricte des fonctionnalités
2. **Intégration continue** : configuration Jenkins pour build automatique — résolu avec pipeline multi-stage
3. **Données culturelles** : collecter et documenter 10 recettes avec leur contexte — résolu via recherche documentaire"

### [11:30-12:00] Slide 18 — Innovations
**Parler :**
"Les innovations du projet :
1. **Préservation culturelle** : alliage unique entre technologie moderne et patrimoine culinaire africain
2. **Bilingue complet** : FR/EN pour chaque élément de données (nom, région, origine, ingrédients, étapes)
3. **Dashboard monitoring culturel** : visualisation en temps réel de l'utilisation de la plateforme"

### [12:00-12:30] Slide 19 — Évolutions futures
**Parler :**
"Pour l'avenir :
- Migration microservices (Auth, Recommendations, Media)
- Ajout d'un système de soumission communautaire
- Application mobile React Native
- Intégration IA pour recommandations personnalisées
- Déploiement cloud (AWS/GCP)"

### [12:30-13:00] Slide 20 — Conclusion
**Parler :**
"En conclusion, TasteCam Heritage démontre l'application réussie des principes d'architecture logicielle à un problème réel de préservation culturelle. Le projet couvre tous les aspects demandés : architecture en couches, conteneurisation, orchestration, CI/CD, monitoring, tests, et documentation complète. Merci pour votre attention. Je suis prêt à répondre à vos questions."

---

## Questions & Réponses (Préparation Défense)

### Questions probables du jury :

**Q1 : Pourquoi avoir choisi une architecture en couches plutôt que microservices ?**
→ "Pour un MVP, l'architecture en couches est plus simple à mettre en œuvre, plus rapide à développer, et suffisante pour 10 recettes. L'architecture est conçue pour évoluer vers des microservices quand le nombre de recettes et d'utilisateurs augmentera."

**Q2 : Comment atteignez-vous la scalabilité ?**
→ "Via Kubernetes : déploiement multi-pods (2 réplicas minimum), stratégie RollingUpdate (maxUnavailable: 0), readiness/liveness probes pour le trafic routing, et ClusterIP pour le load balancing interne."

**Q3 : Quels sont les trade-offs de votre architecture ?**
→ "L'architecture monolithique layered sacrifie la scalabilité fine au profit de la simplicité de développement. Le couplage entre couches est plus fort qu'en microservices. En contrepartie, le déploiement est plus simple, les tests plus faciles, et la latence intra-service est quasi nulle."

**Q4 : Comment la couverture de test est-elle calculée ?**
→ "Via Jest avec l'option --coverage. Istanbul (le moteur derrière Jest) trace les lignes, branches et fonctions exécutées pendant les tests. J'obtiens 92.53% de couverture de lignes, bien au-dessus du minimum de 80%."

**Q5 : Quelle est votre innovation principale ?**
→ "Le projet combine préservation culturelle et technologie moderne d'une manière unique. Chaque recette inclut son origine culturelle, sa région, et des photos réelles. Le système bilingue va au-delà de l'interface : les noms d'ingrédients, les étapes, les descriptions sont tous traduits."
