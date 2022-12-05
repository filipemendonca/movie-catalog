# movie-catalog

A movie-catalog api building in Nest.js / TypeORM / MySQL

## Before Installation
Create a .env file and fill with your database credentials.

```bash
STATUS=dev
APPLICATION_PORT=4000
DATABASE_TYPE=mysql
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USER=root
DATABASE_PASSWORD={YOUR PASSWORD HERE}
DATABASE_SCHEMA=catalog
```

------------------------------------------------------------------------------------------

<p>This API aims to list and page movies in a catalog.
You can add new movies to the catalog every time you look for it in the search field.<p/>

<p>To start this API you needs to clone this repository in your machine.</p>

------------------------------------------------------------------------------------------

## Installation

```bash
$ npm install
```

<p>After that, you must create a database called <b>catalog</b> in you MySQL</p>
<p>Run the .sql file contained on project root to create a table</p>

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev
```

<p>After running you can go to the navigator and enter on this link: http://localhost:4000/api</p>
