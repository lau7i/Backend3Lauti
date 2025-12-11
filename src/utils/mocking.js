import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";

export const generatePets = (count) => {
  const pets = [];
  for (let i = 0; i < count; i++) {
    pets.push({
      name: faker.animal.dog(),
      specie: "dog",
      adopted: false,
    });
  }
  return pets;
};

export const generateUsers = (count) => {
  const users = [];
  for (let i = 0; i < count; i++) {
    users.push({
      first_name: faker.person.firstName(),
      last_name: faker.person.lastName(),
      email: faker.internet.email(),
      password: bcrypt.hashSync("coder123", bcrypt.genSaltSync(10)),
      role: Math.random() > 0.5 ? "user" : "admin",
      pets: [],
    });
  }
  return users;
};
