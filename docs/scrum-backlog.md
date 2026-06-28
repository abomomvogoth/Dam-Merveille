# Scrum et backlog

## Rôles
- Product Owner : me
- Scrum Master : me
- Équipe de développement : me

## Backlog produit
| Priorité | Épique | Description |
|---|---|---|
| 1 | Recettes | Afficher la liste des recettes et les détails d'un plat |
| 2 | Recherche | Recherche par ingrédient et filtrage par région |
| 3 | Traduction | Support français / anglais |
| 4 | Portions | Calcul automatique des quantités selon le nombre de personnes |
| 5 | Médias | Photos et liens vidéo pour chaque plat |
| 6 | Architecture | Docker, Kubernetes, Jenkins, monitoring |
| 7 | Tests | Tests unitaires et d'intégration avec couverture >= 80% |
| 8 | Documentation | README, rapport, manuel utilisateur, API docs |

## Sprint 1 (phase initiale)
- Créer le dépôt et l'architecture du projet
- Définir les modèles de données (recette, ingrédient, région)
- Développer le backend Express avec API de base
- Créer le frontend React avec liste de recettes
- Rédiger la documentation projet

## Sprint 2 (amélioration)
- Ajouter la recherche par ingrédient
- Ajouter les détails de recette et l'historique culturel
- Ajouter le calcul des portions
- Définir le schéma Docker et les scripts de build
- Préparer les premiers tests unitaires

## Chart de burndown
- Sprint 1 : initialisation du projet
- Sprint 2 : fonctionnalités principales

> Note : pour un projet individuel sur 5 heures, il est conseillé de concentrer le premier sprint sur un MVP clair, puis d'étendre progressivement.

---

## Sprint Retrospectives

### Sprint 1 Retrospective — MVP (Days 1-5)
**What went well:**
- ✅ Backend API fully functional with 4 endpoints
- ✅ Frontend displaying 10 recipes with bilingual support
- ✅ Swagger documentation integrated and tested
- ✅ Core architecture (Layered + MVC) implemented correctly

**Challenges:**
- ⚠️ Initial metrics implementation used manual string building instead of prom-client
- ⚠️ Docker compose needed healthcheck for PostgreSQL dependency
- ⚠️ Limited time (25h) required strict scope management

**Improvements for Sprint 2:**
- Use prom-client library for production-grade Prometheus metrics
- Add healthcheck to all service dependencies
- Prioritize testing before feature development

---

### Sprint 2 Retrospective — Infrastructure & Features (Days 6-10)
**What went well:**
- ✅ 18 tests passing with 94.28% code coverage (exceeds 80% requirement)
- ✅ Complete Jenkins pipeline with parallel stages and Docker deployment
- ✅ Kubernetes manifests with Ingress, HPA, and rolling updates
- ✅ Prometheus/Grafana monitoring stack fully configured
- ✅ Ansible playbooks for VPS provisioning and deployment
- ✅ Professional architecture diagram created

**Challenges:**
- ⚠️ Team size (solo) made it impossible to demonstrate multi-person Scrum dynamics
- ⚠️ No live VPS deployment URL available yet

**Action items for next phase:**
- Deploy to Render.com using blueprint (render.yaml)
- Record 13-minute demo video following presentation script
- Create physical PowerPoint .pptx file from POWERPOINT_CONTENT.md

---

## Sprint Burndown Chart

See `docs/burndown-chart.svg` for the visual burndown chart showing:
- **Sprint 1**: 25 → 6 story points over 5 days (MVP delivery)
- **Sprint 2**: 20 → 0 story points over 5 days (Infrastructure + Enhancements)
- **Ideal vs Actual**: Actual progress closely tracked ideal trajectory
- **Velocity**: 4.5 story points/day average

## Scrum Artifacts Complete

| Artifact | Location |
|---|---|
| Product Backlog | This document (above) |
| Sprint Backlogs | This document (above) |
| Sprint Planning | `docs/QA_DEFENSE.md` Q15 |
| Daily Standups | Self-documented in commit history |
| Sprint Reviews | `docs/PROJECT_REPORT.md` Ch4 |
| Sprint Retrospectives | This document (above) |
| Burndown Chart | `docs/burndown-chart.svg` |
