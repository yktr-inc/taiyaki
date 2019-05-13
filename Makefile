up:
	docker-compose up -d --build

down:
	docker-compose down

run:
	docker-compose up

restart:
	docker-compose down && \
	docker-compose up

install:
	cd front && yarn install

clean-front:
	cd front && \
	rm yarn.lock && \
	rm -rf node_modules && \
	yarn install
