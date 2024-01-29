const app = require("../../app");
const request = require("supertest");
require("../mongodb_helper");
const User = require("../../models/user");
const JWT = require("jsonwebtoken");
const secret = process.env.JWT_SECRET;

const createTestUser = async (testUserInfoObject) => {
  let response = await request(app).post("/users").send(testUserInfoObject);
  return response;
};

const getMostRecentlyCreatedUser = async () => {
  let users = await User.find();
  return users[users.length - 1];
};

const numberOfExistingUsers = async () => {
  let users = await User.find();
  return users.length;
};

const logInAndGetTokenAs = (user) => {
  // Returns a token backdated to 5 mins ago, valid for a further 10 mins.
  return JWT.sign({
    user_id: user.id,
    iat: Math.floor(Date.now() / 1000) - (5 * 60),
    exp: Math.floor(Date.now() / 1000) + (10 * 60),
  }, secret);
};

describe("/users", () => {
  beforeEach(async () => {
    await User.deleteMany({});
    });

    describe("POST, when display name, email, and password are provided", () => {
    test("the response code is 201", async () => {
      const userInfo = {
        displayName: "Poppy Python",
        email: "poppy@email.com",
        password: "1234",
      };
      let response = await createTestUser(userInfo);
      expect(response.statusCode).toBe(201);
    });

    test("a user is created", async () => {
      const userInfo = {
        displayName: "Scarlett Scala",
        email: "scarlett@email.com",
        password: "1234",
      };
      await createTestUser(userInfo);
      let newUser = await getMostRecentlyCreatedUser();
      expect(newUser.displayName).toEqual("Scarlett Scala");
      expect(newUser.email).toEqual("scarlett@email.com");
    });
  });

    describe("POST, when password is missing", () => {
    test("response code is 400", async () => {
      const userInfo = {
        displayName: "Skye Swift",
        email: "skye@email.com",
      };
      let response = await createTestUser(userInfo);
      expect(response.statusCode).toBe(400);
    });

    test("does not create a user", async () => {
      const userInfo = {
        displayName: "Skye Swift",
        email: "skye@email.com",
      };
      await createTestUser(userInfo);
      expect(await numberOfExistingUsers()).toEqual(0);
    });
  });

    describe("POST, when display name is missing", () => {
    test("response code is 400", async () => {
      const userInfo = {
        email: "james@email.com",
        password: "1234",
      };
      let response = await createTestUser(userInfo);
      expect(response.statusCode).toBe(400);
    });

    test("does not create a user", async () => {
      const userInfo = {
        email: "james@email.com",
        password: "1234",
      };
      await createTestUser(userInfo);
      expect(await numberOfExistingUsers()).toEqual(0);
    });
  });

  describe("POST, when email is missing", () => {
    test("response code is 400", async () => {
      const userInfo = {
        displayName: "Emily Erlang",
        password: "1234",
      };
      let response = await createTestUser(userInfo);
      expect(response.statusCode).toBe(400);
    });

    test("does not create a user", async () => {
      const userInfo = {
        displayName: "Emily Erlang",
        password: "1234",
      };
      await createTestUser(userInfo);
      expect(await numberOfExistingUsers()).toEqual(0);
    });
  });

  describe("GET, when token is present", () => {
    it("returns a user if there is a match", async () => {
      // Define info for two users.
      const userInfo1 = {
        displayName: "User One",
        email: "user-one@example.com",
        password: "11111111",
      };
      const userInfo2 = {
        displayName: "User Two",
        email: "user-two@example.com",
        password: "22222222",
      };
      // Create the two users.
      await createTestUser(userInfo1);
      const user1 = await getMostRecentlyCreatedUser();
      await createTestUser(userInfo2);
      const user2 = await getMostRecentlyCreatedUser();
      // Log in as User One.
      let token1 = logInAndGetTokenAs(user1);
      // As User One, search for User Two.
      let response = await request(app)
        .get(`/users/${user2.id}`)
        .set("Authorization", `Bearer ${token1}`)
        .send({ token: token1 });
      let userFound = response.body.user;
      expect(userFound.displayName).toEqual("User Two");
      expect(userFound.email).toEqual("user-two@example.com");
    });
  });

  describe("GET, when token is missing", () => {
    it("returns no user", async () => {
      // Define info for two users.
      const userInfo1 = {
        displayName: "User One",
        email: "user-one@example.com",
        password: "11111111",
      };
      const userInfo2 = {
        displayName: "User Two",
        email: "user-two@example.com",
        password: "22222222",
      };
      // Create the two users.
      await createTestUser(userInfo1);
      const user1 = await getMostRecentlyCreatedUser();
      //console.log(`USER 1: ${user1}`);
      await createTestUser(userInfo2);
      const user2 = await getMostRecentlyCreatedUser();
      //console.log(`USER 2: ${user2}`);
      // Log in as User One.
      let token1 = logInAndGetTokenAs(user1);
      // As User One, search for User Two.
      let response = await request(app)
        .get(`/users/${user2.id}`)
        // "Forget" to set token:
        /*.set("Authorization", `Bearer ${token1}`)*/
        .send({ token: token1 });
      let userFound = response.body.user;
      expect(userFound).toEqual(undefined);
    })
  })
});
