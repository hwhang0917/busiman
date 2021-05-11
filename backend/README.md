# Busiman Backend

> This is the backend part of Busiman project

## Setup Guide

1. Install [Yarn](https://yarnpkg.com/) package manager.
2. Install dependencies by using `yarn` command.
3. Setup dotenv file as following:

   ```dotenv
   DB_HOST=localhost        # Database Host Name
   DB_PORT=5432             # Database Port
   DB_USERNAME=postgres     # Database Username
   DB_PASSWORD=look012      # Database Password
   DB_NAME=busiman          # Database Name
   PRIVATE_KEY=test         # Private Key for JSON Web Token
   ```

3. Run `yarn start:dev` for development.
4. Go to `http://localhost:4000/api/` for documentation.