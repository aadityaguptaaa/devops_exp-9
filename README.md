# 🔐 DevSecOps - Secure Healthcare System
### Experiment 9: Jenkins + OWASP + Trivy + Docker + Kubernetes

---

## 📁 Project Structure
```
devsecops-healthcare/
├── app.js              ← Secure Node.js Healthcare App
├── package.json        ← Dependencies (includes helmet)
├── Dockerfile          ← Secure Docker config (non-root user)
├── Jenkinsfile         ← 8-stage DevSecOps pipeline
├── .gitignore
└── k8s/
    ├── deployment.yaml ← Secure K8s deployment (securityContext)
    └── service.yaml    ← NodePort service
```

---

## 🔐 Security Features

| Feature | Tool | Purpose |
|---------|------|---------|
| Dependency Scan | OWASP | Find vulnerable npm packages |
| Image Scan | Trivy | Find CVEs in Docker image |
| Secure Headers | Helmet.js | Prevent XSS, clickjacking |
| Non-root Container | Dockerfile | Prevent privilege escalation |
| K8s Security Context | deployment.yaml | Drop all Linux capabilities |

---

## ✏️ STEP 1 — Edit Placeholders (Ctrl+H in VS Code)

| Find | Replace with |
|------|-------------|
| `YOUR_DOCKERHUB_USERNAME` |
| `YOUR_USERNAME/YOUR_REPO` | 

---

## ⚡ STEP 2 — Push to GitHub

```powershell
git init
git add .
git commit -m "DevSecOps Healthcare setup"
git remote add origin https://github.com/aadityaguptaaa/devops_exp-9.git
git branch -M main
git push -u origin main
```

---

## 🐳 STEP 3 — Build & Push Docker Image

```powershell
docker build -t aadityaxggg/healthcare-app:latest .
docker push aadityaxggg/healthcare-app:latest
```

---

## ☸️ STEP 4 — Deploy to Kubernetes

```powershell
minikube start --driver=docker
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
kubectl get pods
minikube service healthcare-service --url
```

---

## 🏗️ STEP 5 — Jenkins Pipeline

1. New Item → `devsecops-cicd` → Pipeline
2. Pipeline from SCM → Git → your repo
3. Build Now!

---

## 🎯 Pipeline Stages

```
✅ Stage 1: Clone Repository
✅ Stage 2: Install Dependencies
✅ Stage 3: Run Tests
✅ Stage 4: OWASP Dependency Check  ← Security!
✅ Stage 5: Build Docker Image
✅ Stage 6: Trivy Image Scan        ← Security!
✅ Stage 7: Push to DockerHub
✅ Stage 8: Deploy to Kubernetes
✅ Stage 9: Verify Deployment
```
