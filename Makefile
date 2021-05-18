dev-run:
	docker-compose -f docker-compose.yaml up --build -d

dev-stop:
	docker-compose -f docker-compose.yaml down

app-install:
	docker-compose -f docker-compose.yaml run --rm app-node yarn install

app-lint-check:
	docker-compose -f docker-compose.yaml run --rm app-node yarn tslint-check

app-lint-fix:
	docker-compose -f docker-compose.yaml run --rm app-node yarn lint

app-tests:
	docker-compose -f docker-compose.yaml run --rm app-node yarn test --watchAll

app-start:
	docker-compose -f docker-compose.yaml run --rm app-node yarn start
