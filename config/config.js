module.exports = {
  db: {
    production: "mongodb://user:pass@example.com:1234/stroeski-prod",
    development: "mongodb://localhost:27017/storeski-dev",
    test: "mongodb://dev:dev@localhost:27017/dixtri",
  }
};
/* CREATING A DB USER
db.createUser(
   {
     user: "dev",
     pwd: "dev",
     roles:
       [
         { role: "readWrite", db: "dixtri" }
       ]
   }
)

*/