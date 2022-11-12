FROM node:16

# Create app directory
WORKDIR /usr/src/app

COPY . .
RUN npm ci
RUN npm run build

# PhantomJS fix https://github.com/bazelbuild/rules_closure/issues/351
ENV OPENSSL_CONF=/dev/null

EXPOSE 3000

# Run the web service on container startup.
CMD [ "npm", "run", "start" ]