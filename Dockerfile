FROM debian:latest

RUN apt update && apt upgrade -y
RUN apt install git node npm -y
RUN git clone https://github.com/AJTimePyro/music-x
WORKDIR /music-x
RUN npm i
RUN npm run build
CMD node server.js
