FROM node:14

WORKDIR /mnt/app

# Install packages.
COPY package.json \
    package-lock.json \
    ./

RUN npm ci

# Copy source files.
COPY . ./

RUN chmod -x ./docker-entrypoint

ENTRYPOINT [ "sh", "/mnt/app/docker-entrypoint" ]
