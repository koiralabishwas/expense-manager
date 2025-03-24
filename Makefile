.PHONY: help
help: ## help 表示 `make help` でタスクの一覧を確認できます
	@echo "------- タスク一覧 ------"
	@grep -E '^[0-9a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36mmake %-20s\033[0m %s\n", $$1, $$2}'

run: ## run frontend and backend servers
	@make run-backend & 
	@make run-frontend


run-frontend: ## run frontend on port3000
	@cd frontend && bun run dev

run-backend: ## run backend server
	@cd backend && bun run dev

