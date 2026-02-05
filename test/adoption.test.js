import mongoose from "mongoose";
import User from "../src/dao/models/user.model.js";
import Pet from "../src/dao/models/pet.model.js";
import { expect } from "chai";
import supertest from "supertest";

const requester = supertest("http://localhost:8080");

describe("Testing Adoption Router", function () {
  this.timeout(20000); 
  let userId;
  let petId;

  before(async function () {
    const MONGO_URL = "mongodb+srv://lautaro:Ok4NyR8Vt6cUmPbk@clusterbackend3.edhwrsi.mongodb.net/?appName=Clusterbackend3";
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(MONGO_URL);
    }
  });

  it("Debería crear un usuario y una mascota para la prueba", async () => {
    const user = await User.create({
      first_name: "Test",
      last_name: "User",
      email: `test${Date.now()}@user.com`,
      password: "123",
      role: "user",
      pets: [],
    });
    userId = user._id;

    const pet = await Pet.create({
      name: "TestPet",
      specie: "dog",
      adopted: false,
    });
    petId = pet._id;

    expect(userId).to.be.ok;
    expect(petId).to.be.ok;
  });

  it("Debería realizar una adopción correctamente: GET /api/adoptions/:uid/:pid", async () => {
    const response = await requester.get(`/api/adoptions/${userId}/${petId}`);
    expect(response.status).to.equal(200);
    expect(response.body.message).to.equal("Pet adopted");
  });

  it("Debería fallar si la mascota ya está adoptada", async () => {
    const response = await requester.get(`/api/adoptions/${userId}/${petId}`);
    expect(response.status).to.equal(400);
    expect(response.body.error).to.equal("Pet is already adopted");
  });

  it("Debería fallar si el usuario no existe", async () => {
    const fakeId = new mongoose.Types.ObjectId();
    const response = await requester.get(`/api/adoptions/${fakeId}/${petId}`);
    expect(response.status).to.equal(404);
  });

  it("Debería fallar si la mascota no existe", async () => {
    const fakePetId = new mongoose.Types.ObjectId();
    const response = await requester.get(`/api/adoptions/${userId}/${fakePetId}`);
    expect(response.status).to.equal(404);
  });

  after(async function () {
    if (userId) await User.findByIdAndDelete(userId);
    if (petId) await Pet.findByIdAndDelete(petId);
    await mongoose.disconnect();
  });
});