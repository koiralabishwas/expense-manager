.PHONY: help
help: ## help 表示 `make help` でタスクの一覧を確認できます
	@echo "------- タスク一覧 ------"
	@grep -E '^[0-9a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36mmake %-20s\033[0m %s\n", $$1, $$2}'

run-dev: ## for dev use i.e hot reloads front , back 
	@docker compose -f docker-compose.dev.yaml up --build

run-test-prod: ## for testing production with logs
	@docker compose -f docker-compose.prod.yaml up --build 

run-prod: ## for production , runs in background without logs
	@docker compose -f docker-compose.prod.yaml up --build -d

kill-prod: ## stop background containers in production
	@docker compose -f docker-compose.prod.yaml down




