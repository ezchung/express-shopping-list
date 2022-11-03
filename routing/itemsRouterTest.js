const request = require("supertest");

const app = require("../app");
let db = require("../fakeDb");

let items = [{ name: "pineapple", price: 5.09 }, { name: "pen", price: 4.32}];

beforeEach(function() {
  db.items.add(items);
});

afterEach(function() {
  db.items.deleteAll();
});

/** Testing GET route */
describe("GET /items", function(){
    items("Gets list of items", async function() {
        const resp = await request(app).get(`/items`);

        expect(resp.body).toEqual([{ name: "pineapple", price: 5.09 }, { name: "pen", price: 4.32}])
    })
})