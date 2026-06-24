FROM php:8.3-cli-alpine

RUN apk add --no-cache curl-dev \
    && docker-php-ext-install curl

WORKDIR /app
COPY . .

RUN mkdir -p api/storage && chmod -R 775 api/storage

CMD ["sh", "-c", "php -S 0.0.0.0:${PORT:-10000} -t ."]
