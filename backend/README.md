# BackendV2 with PostgreSQL + drizzle

## launching localy
install PostgreSQL Version 16
set the password "Passw0rd"
leave port as default (5432)

no need for build stack

npm i
create .env file
copy .env.example into .env
npm run db:generate
npm run db:migrate

npm start