# FinControl — Controle Financeiro Pessoal

MVP de controle financeiro pessoal composto por React + TypeScript, API Express, PostgreSQL, Docker e manifestos Kubernetes. Inclui uma conta de demonstração com dados iniciais e não requer migrações manuais: a API cria o esquema e o seed ao iniciar.

## Recursos

- Login JWT de demonstração (`demo@financeiro.app` / `demo123`).
- CRUD de categorias, transações e orçamentos por categoria/mês via REST.
- Dashboard com saldo, receitas, despesas e gráficos de fluxo e distribuição.
- Lista de transações com busca, filtro de tipo/período e exclusão.
- Endpoints operacionais: `/healthz`, `/ready` (PostgreSQL) e `/metrics` (Prometheus).

## Rodar localmente com Docker

```bash
cd financial-control-app
docker compose up --build
```

Abra `http://localhost:8080`. A API estará em `http://localhost:3000`; por exemplo, `http://localhost:3000/healthz`.

## Kubernetes (kind ou minikube)

1. Construa e disponibilize as imagens com o nome que os manifests usam:

```bash
docker build -t financial-control-backend:latest backend
docker build -t financial-control-frontend:latest frontend
```

Para **kind**, carregue as imagens no cluster:

```bash
kind load docker-image financial-control-backend:latest
kind load docker-image financial-control-frontend:latest
```

Para **minikube**, crie as imagens dentro do Docker do próprio minikube ou publique-as em um registro acessível.

2. Antes de aplicar, altere `k8s/02-secrets.yaml`: gere valores base64 novos para a senha e JWT. Também ajuste o host/CORS em `k8s/01-configmap.yaml` e `k8s/09-ingress.yaml`.

3. Instale um Ingress NGINX e o Metrics Server (necessários para Ingress e HPA), então aplique:

```bash
kubectl apply -f k8s/
kubectl get pods -n financial-app -w
kubectl get ingress -n financial-app
```

4. Faça `finance.example.com` apontar para o IP do Ingress (ou ajuste o host). Em minikube, obtenha o IP com `minikube ip` e adicione-o ao arquivo hosts local para desenvolvimento.

## API principal

Todos os endpoints sob `/api` (exceto `POST /api/auth/login`) recebem `Authorization: Bearer <token>`.

| Método | Endpoint | Função |
|---|---|---|
| POST | `/api/auth/login` | Autenticação |
| GET/POST | `/api/categories` | Categorias |
| PUT/DELETE | `/api/categories/:id` | Atualiza/remove categoria |
| GET/POST | `/api/transactions` | Lista/cria transações |
| PUT/DELETE | `/api/transactions/:id` | Atualiza/remove transação |
| GET/POST | `/api/budgets` | Consulta/define orçamento mensal |
| GET | `/api/dashboard` | Métricas agregadas e gráficos |

Filtros de transações: `page`, `limit`, `type`, `from`, `to` e `search`.

## Notas de produção

- Não use os segredos de exemplo: injete os valores por Secret Manager/GitOps.
- Publique as imagens em um registry, troque `imagePullPolicy` para `Always` quando apropriado e informe seus nomes em `k8s/05-*` e `k8s/07-*`.
- O HPA pressupõe Metrics Server instalado. Para alta disponibilidade do banco, use uma oferta PostgreSQL gerenciada ou um operador de banco em vez do StatefulSet de demonstração.
