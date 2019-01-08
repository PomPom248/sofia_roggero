FROM node:latest
ADD . /
WORKDIR /
RUN npm install
CMD ["node", "app.js"]