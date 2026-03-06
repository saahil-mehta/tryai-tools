.PHONY: lint format format-fix typecheck test build check dev clean env-push env-pull

# --- Individual targets (composable) ---

lint:
	pnpm eslint .

format:
	pnpm prettier --check .

format-fix:
	pnpm prettier --write .

typecheck:
	pnpm tsc --noEmit

test:
	pnpm vitest run

build:
	pnpm build

dev:
	pnpm dev

clean:
	rm -rf .next node_modules/.cache

# --- Composite targets ---

check: lint format typecheck test  ## Run all checks (CI gate)

# --- Environment sync ---

env-push:  ## Push .env.local vars to Vercel (all environments)
	@grep -v '^\s*#' .env.local | grep -v '^\s*$$' | while IFS='=' read -r key value; do \
		echo "Setting $$key..."; \
		echo "$$value" | vercel env add "$$key" production preview development --force 2>/dev/null || true; \
	done
	@echo "Done. Run 'vercel --prod' to redeploy with new vars."

env-pull:  ## Pull Vercel env vars to .env.local
	vercel env pull .env.local
