FROM node
WORKDIR /app
COPY package.json .

RUN npm install

COPY .env .
COPY wait-for-it.sh .
COPY start-script.sh .
COPY tsconfig.json .
COPY prisma ./prisma/
COPY src ./src/

RUN npx prisma generate
RUN npm run build

CMD node app.js