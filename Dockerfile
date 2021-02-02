# pull official base image
FROM node:13.12.0-alpine

# set working directory
WORKDIR /app

# install app dependencies
COPY package.json ./
COPY package-lock.json ./
RUN apk add --no-cache --virtual .gyp python make g++ \
    && npm install

# add app
COPY . ./

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# start app
CMD ["npm", "start"]