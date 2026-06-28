# TASTECAM HERITAGE — PowerPoint (20 slides)
## SEN3244 Software Architecture — Engr. Tekoh Palma

---

## SLIDE 1 — Page de Titre
**Titre :** TasteCam Heritage — Preservation of Cameroonian Culinary Heritage
**Sous-titre :** SEN3244 Software Architecture — Final Project
**Nom :** Abomo Mvogo Therese Damaris
**Matricule :** ICTU20241280
**Instructor :** Engr. Tekoh Palma
**Date :** Spring 2026
**Style visuel :** Utiliser les couleurs chaudes (ocre, orange, vert) du projet
**Image :** Logo TasteCam Heritage + photo collage de plats camerounais

---

## SLIDE 2 — Problème & Contexte
**Titre :** The Problem We're Solving

**Contenu :**
- Les recettes traditionnelles camerounaises se transmettent oralement
- Risque de perte avec l'urbanisation et la mondialisation
- Pas de plateforme centralisée dédiée à la cuisine camerounaise
- Difficulté pour la diaspora de préserver ce patrimoine

**Image :** Photo d'une grand-mère cuisinant / plat traditionnel

---

## SLIDE 3 — Solution & Objectifs
**Titre :** TasteCam Heritage — The Solution

**Objectifs :**
1. ✅ Créer un référentiel numérique de recettes camerounaises
2. ✅ Offrir une expérience bilingue (FR/EN)
3. ✅ Architecture moderne : Docker, K8s, CI/CD, Monitoring
4. ✅ Tests automatisés avec couverture ≥ 80%
5. ✅ Documentation complète (Swagger, Archi, Rapport)

**Valeur ajoutée :** Allier technologie moderne et préservation culturelle

---

## SLIDE 4 — Architecture Globale
**Titre :** System Architecture Overview

**Diagramme :** (Inclure le diagramme d'architecture haute niveau)
```
[Client Web] → [Load Balancer] → [Backend API] → [PostgreSQL]
                                     ↓
                              [Prometheus + Grafana]
```

**Style architectural :** Layered Architecture (3 tiers)
- **Presentation Layer :** React + Vite
- **Business Layer :** Node.js + Express
- **Data Layer :** PostgreSQL

**Pourquoi Layered ?** Simplicité, maintenabilité, scalabilité horizontale

---

## SLIDE 5 — Stack Technique
**Titre :** Technology Stack

| Technologie | Version | Rôle |
|------------|:-------:|:----:|
| React | 18 | Frontend UI |
| Vite | 5 | Build tool |
| Node.js | 20 | Runtime backend |
| Express | 4 | API framework |
| PostgreSQL | 15 | Base de données |
| Docker | latest | Conteneurisation |
| Kubernetes | 1.27 | Orchestration |
| Jenkins | LTS | CI/CD |
| Prometheus | 2.x | Métriques |
| Grafana | 10.x | Dashboards |
| Ansible | latest | IaC |
| Jest | 29 | Tests |

---

## SLIDE 6 — Diagrammes UML
**Titre :** UML Diagrams

**Afficher 3 diagrammes :**

1. **Diagramme de Cas d'Utilisation**
   - User → Search Recipes, View Details, Calculate Portions, Switch Language
   - Admin → Manage Recipes, View Metrics

2. **Diagramme de Classes**
   - Recipe, Ingredient, Region, RecipeIngredient

3. **Diagramme de Séquence**
   - Flux de recherche par ingrédient avec cache

---

## SLIDE 7 — Modèle de Données
**Titre :** Database Schema (PostgreSQL)

**Diagramme entité-relation :**
```
RECIPES ──── RECIPE_INGREDIENTS ──── INGREDIENTS
    │                                       │
    └────────── REGIONS ────────────────────┘
```

**Tables :** regions, recipes, ingredients, recipe_ingredients, users, comments

**Points clés :**
- Relation many-to-many (recipes ↔ ingredients)
- Chaque recette liée à une région d'origine
- Support bilingue pour tous les champs textes

---

## SLIDE 8 — Qualités Architecturales
**Titre :** Quality Attributes & Trade-offs

| Qualité | Implémentation | Trade-off |
|---------|---------------|-----------|
| **Scalabilité** | K8s multi-pods, RollingUpdate | + Complexité opérationnelle |
| **Performance** | API < 50ms, Cache-ready | - Latence réseau entre services |
| **Sécurité** | CORS, JWT, env vars | + Overhead auth |
| **Maintenabilité** | Code modulaire, Swagger | - Plus de fichiers à gérer |
| **Disponibilité** | Health probes, auto-restart | + Consommation ressources |
| **Testabilité** | Jest, Supertest, coverage | + Temps d'écriture tests |

---

## SLIDE 9 — Frontend React
**Titre :** Frontend Features

**Fonctionnalités :**
1. **10 recettes** avec photos réelles (Eru, Ndolé, Achu, Okok, Koki, etc.)
2. **Recherche** par ingrédient, plat ou région
3. **Calcul dynamique** des portions (ajustement automatique quantités)
4. **Bilingue** Français/Anglais (interface + données)
5. **Design responsive** (mobile + desktop)

**Vue liste + Vue détail** côte à côte

---

## SLIDE 10 — Backend API
**Titre :** REST API Endpoints

| Endpoint | Méthode | Description |
|----------|:-------:|-------------|
| /api/health | GET | Health check |
| /api/recipes | GET | Liste des recettes |
| /api/recipes/:id | GET | Détail d'une recette |
| /api/recipes/search?ingredient= | GET | Recherche par ingrédient |
| /api/metrics | GET | Métriques Prometheus |
| /api/docs | GET | Swagger UI |

**Documentation :** OpenAPI 3.0 (YAML) + Swagger UI

---

## SLIDE 11 — Tests & Code Coverage
**Titre :** Testing Strategy (92.53% Coverage)

**3 catégories de tests :**
1. **Tests Unitaires** → Controller (5 tests)
2. **Tests d'Intégration** → Routes API via Supertest (7 tests)
3. **Tests Documentation** → Validation Swagger (6 tests)

**Résultat :** 18 tests — 18 passed ✅

**Métriques clés :**
- Statements : 100%
- Branches : 91.66%
- Functions : 84.61%
- Lines : 92.3%

*Seuil exigé : 80% — Dépassé !*

---

## SLIDE 12 — Docker & Containerization
**Titre :** Docker Containerization

**Images Docker :**
- `tastecam-backend:latest` (Node.js 20-alpine)
- `tastecam-frontend:latest` (Vite static build)

**Docker Compose :** 5 services orchestrés
1. `db` → PostgreSQL 15
2. `backend` → API Express
3. `frontend` → React SPA
4. `prometheus` → Métriques
5. `grafana` → Dashboard (port 3001)

---

## SLIDE 13 — Kubernetes
**Titre :** Kubernetes Orchestration

**Manifests K8s (6 fichiers)**
- `secrets.yaml` → DATABASE_URL
- `postgres.yaml` → StatefulSet + Service
- `backend-deployment.yaml` → 2 replicas, RollingUpdate
- `backend-service.yaml` → ClusterIP
- `frontend-deployment.yaml` → 2 replicas, RollingUpdate
- `frontend-service.yaml` → NodePort

**Stratégie :**
- RollingUpdate : maxUnavailable=0, maxSurge=1
- Readiness probe : /api/health
- Liveness probe : /api/health

---

## SLIDE 14 — Jenkins CI/CD
**Titre :** CI/CD Pipeline (Jenkins)

**Pipeline stages :**
```
[Checkout] → [Install Dependencies] → [Backend Tests + Coverage]
    ↓
[Build Frontend] → [Build Docker Images] → [Docker Compose Smoke Test]
```

**Déclencheur :** Push sur GitHub
**Post-build :** docker ps -a (vérification conteneurs)

---

## SLIDE 15 — Prometheus & Grafana
**Titre :** Continuous Monitoring

**Métriques Prometheus exposées :**
- `tastecam_uptime_seconds` → Uptime service
- `tastecam_http_requests_total` → Requêtes totales
- `tastecam_recipes_total` → Nombre de recettes
- `tastecam_up` → Statut (1 = alive)
- `tastecam_request_duration_ms_bucket` → Distribution latence

**Dashboard Grafana :** 4 panneaux
1. API Health (stat)
2. HTTP Requests Rate (graph)
3. Request Duration P95 (graph)
4. Total Recipes (stat)

---

## SLIDE 16 — Ansible & Scrum
**Titre :** Infrastructure as Code & Agile Practices

**Ansible (2 playbooks) :**
- `playbook-install.yml` → Node.js, Docker, PM2
- `playbook-deploy.yml` → Clone repo, npm install, PM2 start

**Scrum :**
| Rôle | Personne |
|------|----------|
| Product Owner | Abomo Mvogo T. D. |
| Scrum Master | Abomo Mvogo T. D. |
| Developer | Abomo Mvogo T. D. |

**Product Backlog :** 10 items priorisés
**Sprints :** 2 sprints (MVP + Features)
**Burndown Chart :** Progression 25→0 story points en 10 jours

---

## SLIDE 17 — Infrastructure Diagram
**Titre :** Deployment Infrastructure

**Diagramme complet montrant :**
```
Internet → Render.com/VPS
    ↓
[Ingress Controller]
    ↓
[Frontend Pods (×2)]  ←→  [Backend Pods (×2)]
                                    ↓
                              [PostgreSQL]
                                    ↓
                         [Prometheus + Grafana]
```

**Services externes :** GitHub, Jenkins, Docker Hub

---

## SLIDE 18 — Innovation
**Titre :** Innovation & Originality

**3 innovations clés :**

1. **Préservation culturelle par la tech**
   - 10 recettes camerounaises authentiques documentées
   - Origines culturelles, régions, histoires

2. **Système bilingue complet**
   - Pas juste l'interface — les données aussi
   - Noms, ingrédients, étapes en FR/EN

3. **Architecture évolutive démontrée**
   - MVP monolithique → Architecture microservices-ready
   - CI/CD, monitoring, IaC complets

---

## SLIDE 19 — Défis & Évolutions Futures
**Titre :** Challenges & Future Work

**Défis rencontrés :**
- Contrainte de temps (5h pour MVP)
- Intégration Jenkins → Pipeline multi-stage
- Documentation culturelle → Recherche approfondie

**Évolutions futures :**
1. 🔄 Migration microservices (Auth, Recommendations, Media)
2. 👥 Soumission communautaire de recettes
3. 📱 Application mobile React Native
4. 🤖 IA pour recommandations personnalisées
5. ☁️ Déploiement cloud (AWS/GCP)

---

## SLIDE 20 — Conclusion
**Titre :** Thank You — Questions ?

**Résumé des accomplissements :**
| Section | Points | Score |
|---------|:------:|:-----:|
| Infrastructure | 15 | ✅ |
| Scrum | 5 | ✅ |
| Jenkins CI/CD | 10 | ✅ |
| Prometheus/Grafana | 5 | ✅ |
| Ansible | 5 | ✅ |
| Tests (92.53%) | 10 | ✅ |
| Docker + K8s | 15 | ✅ |
| Architecture | 20 | ✅ |
| Innovation | 10 | ✅ |
| Documentation | 15 | ✅ |
| **Total Part A** | **110** | **✅** |

**Contact :**
- GitHub : https://github.com/abomomvogoth/Dam-Merveille
- Email : [votre email]

**Merci pour votre attention ! 🙏**
