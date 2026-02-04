import mongoose from "mongoose";
import User from "../src/dao/models/user.model.js";
import Pet from "../src/dao/models/pet.model.js";
import { expect } from "chai";
import supertest from "supertest";

const expect = chai.expect;
const requester = supertest("http://localhost:8080");

describe("Testing Adoption Router", () => {
  let userId;
  let petId;

  before(async function () {
    this.timeout(5000); 
    const MONGO_URL = "mongodb+srv://lautaro:Ok4NyR8Vt6cUmPbk@clusterbackend3.edhwrsi.mongodb.net/?appName=Clusterbackend3";
    await mongoose.connect(MONGO_URL);
  });

  it("Debería crear un usuario y una mascota para la prueba", async () => {
    const user = await User.create({
      first_name: "Test",
      last_name: "User",
      email: "test@user.com",
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

    const petUpdated = await Pet.findById(petId);
    expect(petUpdated.adopted).to.be.true;
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
    expect(response.body.error).to.equal("User not found");
  });

  it("Debería fallar si la mascota no existe", async () => {
      const fakePetId = new mongoose.Types.ObjectId();
      const response = await requester.get(`/api/adoptions/${userId}/${fakePetId}`);
      expect(response.status).to.equal(404);
      expect(response.body.error).to.equal("Pet not found");
  });

  after(async function () {
    if(userId) await User.findByIdAndDelete(userId);
    if(petId) await Pet.findByIdAndDelete(petId);
    await mongoose.disconnect();
  });
});