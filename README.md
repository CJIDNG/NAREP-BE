[![Build Status](https://travis-ci.org/CJIDNG/NAREP-BE.svg?branch=develop)](https://travis-ci.org/CJIDNG/NAREP-BE)

# NAREP-BE


## GET STARTED

#### Set up

- Navigate to the directory where you want to copy this repo,clone it by running `git clone <link of the repo>`

- Install `postgresql` into your computer

- Create two databases:
    -  for development
    -  for testing

- add connection string Urls to the `.env` file :
    - `DEV_DATABASE_URL=postgres://<username>:<password>@127.0.0.1:5432/<database for dev>` for development
    - `TEST_DATABASE_URL=postgres://<username>:<password>@127.0.0.1:5432/<database for test>` for testing

    - Make a copy of the .env.example and rename it .env, add the corresponding project variables 

- Run migrations using `npm run migrate`

- Run `npm run seedall` for commit the seeds to the database

- To undo:
       - all seeders run `npm run db:seedall:undo`
       - all migrations run `npm run migrate:undo`

#### Run the app

- Run `npm run server` to start the server
- Use postman to test the endpoints

       
## Deployment

This app will be deployed on heroku, To access this app go to these link:
    - [Staging](https://narep-be-staging.herokuapp.com/)

## Docker

#### Setting Up Docker

1. Install Docker on your pc using instruction [here](https://docs.docker.com/install/). Make sure it's running well

2. Navigate to the directory where you want to copy this repo,clone it by running `git clone <link of the repo>`

3. Follow the `.env.example` file to setup your environment and populate with corresponding values

4. In your root directory run `docker build -t <your username>/node-web-app .` to build your docker image

5. Run `docker images` to assure that image was successfully created

6. Run `docker run -p <given port>:3000 -d <your username>/<image name>` to run your image

#### Run app on Docker

1. Run `docker-compose build` to create and start containers

2. Run `docker ps` to get container ID

3. Run `docker exec -it <container id> sh` to enter container

4. Run `npm migrate` followed by ` npx sequelize-cli db:seed:all`

5. Run `npm run server` and test endpoint using postman using route `http://localhost:3000/<endpoint route>`
