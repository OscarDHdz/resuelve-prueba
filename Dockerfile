FROM node:stretch

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY packages/web-server ./

# Delete files not for production
RUN rm -rf sandbox && rm -rf test

EXPOSE 3000
ENTRYPOINT [ "node server.js" ]