FROM node:16-alpine
WORKDIR /app
COPY package.json /app/
COPY yarn.lock /app/
RUN yarn install --production && yarn cache clean
COPY build/ /app/build/
# for fix: https://github.com/sveltejs/kit/issues/5431
RUN sed -i 's|compression$1.exports({ threshold: 0 })|//compression$1.exports({ threshold: 0 })|g' build/index.js
CMD [ "node","build/" ]