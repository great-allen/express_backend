# express_backend

This is a basic setup for an express.js app with typescript and mongoDB, including session, routes, authentication, etc.

Step 1.
run npm init -y to generate a package.json file, then open a new tsconfig.json file, setup the configs.

Step 2.
install all the dependencies:
For express:

npm i express
npm i express-session
npm install mongoose --save
npm i body-parser
npm i express-session
npm i connect-mongo
npm i bcrypt
npm i passport
npm install passport-local
npm i cors
npm i compression
npm i ts-node

dependencies for ts:
npm i -D typescript
npm i -D ts-node
npm i -D nodemon
npm i -D mongoose
npm install -D @faker-js/faker
npm install -D @types/body-parser
npm install -D @types/passport
npm i -D @types/express-session
npm install -D @types/bcrypt
npm i -D @types/passport-local
npm i -D @types/express
npm i -D @types/express_session
npm i -D @types/cors
npm i -D @types/compression

setup nodemon config.json file

Step 3.

run npx ts-node seed.ts to seed data.
