FROM node

WORKDIR /app

ENV cb https://viaapp.azurewebsites.net
ENV PORT 80

COPY . .

RUN npm install
RUN npm run build

CMD ["npm","start"]