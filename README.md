Notes App

Webová aplikace pro správu poznámek s autentizací uživatele. Každý uživatel pracuje pouze se svými daty.

Požadavky

- Node.js
- npm
- PostgreSQL

Instalace

git clone https://git.uzlabina.cz/novakro/projekt.git
cd projekt
npm install

.env konfigurace

Vytvoř soubor .env podle .env.example (soubor je v repozitáři):

DATABASE_URL="postgresql://postgres:postgres@localhost:5432/notesapp"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret"

Migrace databáze

npx prisma migrate dev

Seed (demo data)

npm run seed

Demo uživatel:
jméno: demo
heslo: demo1234

Spuštění aplikace

npm run dev

Aplikace poběží na:
http://localhost:3000

Export poznámek

GET /api/notes/export
GET /api/notes/export?id=ID

Export se stáhne jako JSON soubor.

Import poznámek

Možnosti:
- přes UI (tlačítko Import v aplikaci)
- nebo přes API:

POST /api/notes/import

Pravidla:
- title je povinný
- content může být prázdný
- import vždy vytvoří nové poznámky pro přihlášeného uživatele

Bezpečnost

- aplikace je přístupná pouze přihlášeným uživatelům
- každý uživatel vidí pouze své poznámky
- hesla jsou hashovaná pomocí bcrypt
- kontrola session probíhá na serveru

Nasazení (Vercel)

Aplikace je nasazena pomocí Vercelu.

Postup:
1. push projektu na GitHub
2. import projektu do Vercel
3. nastavení environment proměnných:
   DATABASE_URL
   NEXTAUTH_URL
   NEXTAUTH_SECRET
4. deploy aplikace

Struktura projektu

/src
/pages
/api
/components
/lib
/prisma

Funkce aplikace

- registrace a přihlášení uživatele
- CRUD operace s poznámkami
- export poznámek do JSON
- import poznámek z JSON