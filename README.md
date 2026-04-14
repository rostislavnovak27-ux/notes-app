Notes App

Webová aplikace pro správu poznámek s autentizací uživatele. Každý uživatel pracuje pouze se svými daty.

**Požadavky**

- Node.js
- npm
- PostgreSQL

**Instalace**

git clone https://git.uzlabina.cz/novakro/projekt.git
cd projekt
npm install

**.env konfigurace**

Vytvoř .env podle .env.example:
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/notesapp"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret"

**Migrace databáze**

npx prisma migrate dev

**Seed (demo data)**

npm run seed
Demo uživatel:
jméno: demo
heslo: demo1234

**Spuštění aplikace**

npm run dev
http://localhost:3000

**Export poznámek**

GET /api/notes/export
GET /api/notes/export?id=ID

**Import poznámek**

Upload JSON přes UI nebo POST /api/notes/import
Pravidla:
- title povinný
- content může být prázdný
- poznámky se vždy vytvoří jako nové

**Bezpečnost**

- pouze přihlášený uživatel
- každý vidí jen své poznámky
- hesla jsou hashovaná (bcrypt)

**Struktura projektu**

/src
/pages
/api
/components
/lib
/prisma
