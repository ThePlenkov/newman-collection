const { Collection, Item } = require("newman-collection");

let oCollection = new Collection([
  // test GET
  new Item("Test GET request")
    .get("https://postman-echo.com/get?foo1=bar1&foo2=bar2")
    .pm.test("Endpoint is reached", () => {
      pm.response.to.be.ok;
    }),
  // test POST
  new Item("Test POST request")
    .post("https://postman-echo.com/post")
    .headers({ "Content-Type": "text/plain" })
    .body("test")
    .pm.test("body should be same", () => {
      pm.response.to.have.jsonBody("data", "test");
    }),
  // test auth
  new Item("Test basic auth")
    .get("https://postman-echo.com/basic-auth")
    .auth.basic({ username: "postman", password: "password" })
    .pm.test("Must be authenticated", () => {
      pm.response.to.have.jsonBody("authenticated", true);
    })
]);