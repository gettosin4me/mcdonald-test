FROM node:carbon

#Create Directory

RUN mkdir -p /usr/src/aku-test
WORKDIR /usr/src/aku-test

COPY package.json /usr/src/aku-test
RUN npm install

COPY . /usr/src/aku-test

#expose port
EXPOSE 2100
EXPOSE 27017

#run command
CMD [ "npm", "start" ]