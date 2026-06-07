Kubernetes (manifestes minimaux) pour l’examen.

Ordre recommandé d’application:
1) kubectl apply -f secrets.yaml
2) kubectl apply -f postgres.yaml
3) kubectl apply -f backend-deployment.yaml
4) kubectl apply -f backend-service.yaml
5) kubectl apply -f frontend-deployment.yaml
6) kubectl apply -f frontend-service.yaml

Exemple (simple) :
- kubectl apply -f .

Note: les images doivent être disponibles dans le cluster (par ex. via minikube image build, ou registry).

