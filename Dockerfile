FROM node:16-alpine as Deps
WORKDIR /app
COPY package.json /app/
COPY yarn.lock /app/
RUN node -pe '(t="dependencies",JSON.stringify({[t]:require("./package.json")[t],type:"module"}))' > deps.json \
  && mv deps.json package.json
RUN yarn install --production

FROM node:16-alpine
WORKDIR /app
COPY --from=Deps /app/node_modules/ /app/node_modules/
COPY package.json /app/
COPY build/ /app/build/
# for fix: https://github.com/sveltejs/kit/issues/5431
RUN sed -i 's|compression$1.exports({ threshold: 0 })|//compression$1.exports({ threshold: 0 })|g' build/index.js
CMD [ "node","build/" ]