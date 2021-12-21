# API 🕊️

Backend server code for **ECOM** .

This is made using `NODE JS`, `GRAPHQL`, & `PRISMA`.

## API DOCS 📖

Documentation for using this API.

### Authentication

1. REGISTER
   ```graphql
   mutation (
     $name: String
     $email: String
     $profile: String
     $password: String
   ) {
     register(
       name: $name
       email: $email
       profile: $profile
       password: $password
     ) {
       id
       name
       email
       profile
       token
     }
   }
   ```
2. LOGIN
   ```graphql
   mutation ($email: String, $password: String) {
     login(email: $email, password: $password) {
       id
       name
       email
       profile
       token
     }
   }
   ```
