FROM php:8.0.0-fpm

RUN apt-get update && apt-get install -y git
#In this place you can specify all the extensions you need.
RUN docker-php-ext-install pdo_mysql

RUN apt-get install -y \
        libzip-dev \
        zip \
  && docker-php-ext-install zip

RUN  apt-get install git unzip wait-for-it wget libicu-dev -y && \
        docker-php-ext-install intl pdo_mysql && \
        echo 'extension=intl.so' > /usr/local/etc/php/conf.d/docker-php-ext-intl.ini

COPY --from=composer:2.0.9 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www
