.PHONY: lint format format-fix typecheck test build check dev clean

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
