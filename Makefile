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

app-check-all: app-lint-check app-tests

app-start:
	docker-compose -f docker-compose.yaml run --rm app-node yarn start

api-types:
	docker-compose -f docker-compose.yaml run --rm api-php-cli composer psalm

api-lint:
	docker-compose -f docker-compose.yaml run --rm api-php-cli composer lint

api-cs:
	docker-compose -f docker-compose.yaml run --rm api-php-cli composer phpcs

api-test:
	docker-compose -f docker-compose.yaml run --rm api-php-cli composer test

api-check-all: api-types api-lint api-cs api-test

check-all: app-check-all api-check-all
