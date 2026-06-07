# Architecture Document - TasteCam Heritage

## 1. Vue d'ensemble

TasteCam Heritage est une plateforme web destinée à préserver et valoriser les recettes traditionnelles camerounaises. L'architecture suit un pattern monolithique évolutif vers microservices.

### Stack technique
- **Frontend** : React 18 + Vite
- **Backend** : Node.js 20 + Express.js
- **Base de données** : PostgreSQL 15
- **Conteneurisation** : Docker
- **Orchestration** : Kubernetes (étape 2)
- **CI/CD** : Jenkins (étape 2)
- **Monitoring** : Prometheus + Grafana (étape 3)

---

## 2. Architecture générale

### Diagramme d'architecture haute niveau

```mermaid
graph TB
    Client["Client Web<br/>(React + Vite)"]
    LB["Load Balancer<br/>(NGINX)"]
    Backend["Backend API<br/>(Node.js + Express)"]
    DB["Base de données<br/>(PostgreSQL)"]
    Cache["Cache<br/>(Redis)"]
    FileStore["Stockage média<br/>(S3 / Local)"]
    
    Client -->|HTTP/HTTPS| LB
    LB -->|Route| Backend
    Backend -->|Query| DB
    Backend -->|Cache| Cache
    Backend -->|Média| FileStore
```

---

## 3. Diagramme des composants

```mermaid
graph LR
    subgraph Frontend["Frontend (React)"]
        UI["Interface utilisateur"]
        SearchModule["Module de recherche"]
        PortionCalc["Calcul des portions"]
        Translation["Système de traduction"]
    end
    
    subgraph Backend["Backend API (Express)"]
        RecipeCtrl["Recipe Controller"]
        UserCtrl["User Controller"]
        SearchService["Search Service"]
        PortionService["Portion Service"]
        AuthMiddleware["Auth Middleware"]
    end
    
    subgraph Database["Données"]
        RecipesDB["Recettes"]
        UsersDB["Utilisateurs"]
        IngredientsDB["Ingrédients"]
        RegionsDB["Régions"]
    end
    
    Frontend -->|API calls| Backend
    Backend -->|CRUD| Database
    RecipeCtrl -->|Service| SearchService
    RecipeCtrl -->|Service| PortionService
```

---

## 4. Diagramme de déploiement

```mermaid
graph TB
    subgraph Kubernetes["Kubernetes Cluster"]
        subgraph Frontend_Pods["Frontend Pods"]
            FE1["Pod React #1"]
            FE2["Pod React #2"]
            FE3["Pod React #3"]
        end
        
        subgraph Backend_Pods["Backend Pods"]
            BE1["Pod Express #1"]
            BE2["Pod Express #2"]
            BE3["Pod Express #3"]
        end
        
        DB["StatefulSet PostgreSQL"]
        Service_FE["Service Frontend"]
        Service_BE["Service Backend"]
    end
    
    Internet["Internet"]
    Ingress["Ingress Controller"]
    
    Internet -->|HTTP/HTTPS| Ingress
    Ingress -->|Route /| Service_FE
    Ingress -->|Route /api| Service_BE
    Service_FE --> FE1 & FE2 & FE3
    Service_BE --> BE1 & BE2 & BE3
    BE1 & BE2 & BE3 --> DB
```

---

## 5. Modèle de données

```mermaid
erDiagram
    REGIONS ||--o{ RECIPES : contains
    RECIPES ||--o{ RECIPE_INGREDIENTS : has
    INGREDIENTS ||--o{ RECIPE_INGREDIENTS : "used in"
    USERS ||--o{ COMMENTS : makes
    RECIPES ||--o{ COMMENTS : "receives"
    
    REGIONS {
        int id PK
        string name
        text description
    }
    
    RECIPES {
        int id PK
        string name
        int region_id FK
        text origin
        text description
        int default_portions
    }
    
    INGREDIENTS {
        int id PK
        string name
    }
    
    RECIPE_INGREDIENTS {
        int id PK
        int recipe_id FK
        int ingredient_id FK
        string quantity
    }
    
    USERS {
        int id PK
        string username UK
        string email UK
        string password_hash
    }
    
    COMMENTS {
        int id PK
        int user_id FK
        int recipe_id FK
        text content
        timestamp created_at
    }
```

---

## 6. Flux de requête

### Recherche de recette par ingrédient

```mermaid
sequenceDiagram
    participant User
    participant Browser
    participant Express
    participant Cache
    participant PostgreSQL
    
    User->>Browser: Tape un ingrédient
    Browser->>Express: GET /api/recipes/search?ingredient=Eru
    Express->>Cache: Vérifier le cache
    alt Cache Hit
        Cache-->>Express: Retourner les résultats
    else Cache Miss
        Express->>PostgreSQL: SELECT recipes WHERE ingredients...
        PostgreSQL-->>Express: Résultats
        Express->>Cache: Stocker le résultat
    end
    Express-->>Browser: JSON (recettes)
    Browser->>User: Afficher les résultats
```

---

## 7. Style architectural : Layered + MVC

L'application suit une architecture en couches avec le pattern MVC :

### **Couche Présentation**
- React components
- Vite build system
- i18n translations

### **Couche Application (Controllers)**
- Express routes
- Request/Response handlers
- Validation

### **Couche Métier (Services)**
- Logique de recherche
- Calcul des portions
- Gestion des utilisateurs

### **Couche Données (Models)**
- PostgreSQL database
- ORM (future: Sequelize/Prisma)
- Migrations

---

## 8. Qualités architecturales

### Scalabilité
- **Horizontal scaling** : Déploiement multi-pods Kubernetes
- **Caching** : Redis pour les requêtes fréquentes
- **CDN** : Servir les assets statiques

### Performance
- **Compression** : GZIP sur les réponses API
- **Lazy loading** : Images et vidéos chargées à la demande
- **Code splitting** : Vite optimise les bundles

### Sécurité
- **Authentication** : JWT tokens
- **Validation** : Input sanitization
- **CORS** : Contrôle des origines autorisées
- **HTTPS** : Chiffrage des données en transit

### Maintenabilité
- **Modularité** : Séparation des services
- **Documentation** : OpenAPI/Swagger
- **Tests** : Jest avec 80% couverture
- **Logging** : Winston pour les logs structurés

### Disponibilité
- **Health checks** : Liveness et readiness probes
- **Auto-restart** : Politique de redémarrage Kubernetes
- **Backup** : Snapshots PostgreSQL

---

## 9. Évolution future (Microservices)

```mermaid
graph TB
    API_Gateway["API Gateway"]
    
    Recipe_Service["Recipe Service<br/>(Recettes, Ingrédients)"]
    Auth_Service["Auth Service<br/>(Utilisateurs, JWT)"]
    Recommendation_Service["Recommendation Service<br/>(IA, Suggestions)"]
    Media_Service["Media Service<br/>(Images, Vidéos)"]
    
    DB1["PostgreSQL<br/>Recettes"]
    DB2["PostgreSQL<br/>Utilisateurs"]
    Cache["Redis"]
    
    API_Gateway --> Recipe_Service
    API_Gateway --> Auth_Service
    API_Gateway --> Recommendation_Service
    API_Gateway --> Media_Service
    
    Recipe_Service --> DB1
    Auth_Service --> DB2
    Recipe_Service --> Cache
```

---

## 10. Infrastructure as Code

### Docker Compose (Développement local)
```yaml
services:
  db:
    image: postgres:15
    volumes:
      - db_data:/var/lib/postgresql/data
  backend:
    build: ../backend
    depends_on: [db]
  frontend:
    build: ../frontend
```

### Kubernetes (Production)
- **Helm charts** pour déploiement standardisé
- **StatefulSet** pour PostgreSQL
- **Deployment** pour applications stateless
- **Ingress** pour le routage HTTP

---

## 11. Metriques de monitoring

### Prometheus
- `http_requests_total` : Total des requêtes
- `http_request_duration_seconds` : Latence
- `db_query_duration_seconds` : Performance DB
- `cache_hit_ratio` : Efficacité du cache

### Grafana
- Dashboard de l'application
- Dashboard de la base de données
- Dashboard d'infrastructure

---

## Conclusion

TasteCam Heritage combine une architecture monolithique simple pour le MVP avec la scalabilité en microservices. Cette approche permet un démarrage rapide tout en restant extensible pour les besoins futurs.

**État actuel** : Monolithe layered simple (React + Express + PostgreSQL)
**Phase 2** : Extraction de services (Auth, Recommendations)
**Phase 3** : Kubernetes + Jenkins + Monitoring complets
