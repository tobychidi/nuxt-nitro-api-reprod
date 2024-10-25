import { owners, houses, cars } from "./schema"; // Adjust the import as necessary
import { faker } from "@faker-js/faker";
import { db } from ".";

const main = async () => {
   await db.transaction(async (tx) => {
      // Generate 5 owners
      const ownerData = [];
      for (let i = 0; i < 5; i++) {
         ownerData.push({
            name: faker.person.fullName(),
            email: faker.internet.email(),
         });
      }

      const insertedOwners = await tx.insert(owners).values(ownerData).returning();

      // Generate houses and cars ensuring each owner gets multiple
      const houseData = [];
      const carData = [];
      const minEntriesPerOwner = 3;
      const maxEntries = 20;

      for (const owner of insertedOwners) {
         const numHouses =
            Math.floor(Math.random() * (maxEntries - minEntriesPerOwner)) +
            minEntriesPerOwner;
         const numCars =
            Math.floor(Math.random() * (maxEntries - minEntriesPerOwner)) +
            minEntriesPerOwner;

         for (let i = 0; i < numHouses; i++) {
            houseData.push({
               ownerId: owner.id,
               address: faker.location.streetAddress(),
               price: faker.finance.amount(),
            });
         }

         for (let i = 0; i < numCars; i++) {
            carData.push({
               ownerId: owner.id,
               make: faker.vehicle.manufacturer(),
               model: faker.vehicle.model(),
               year: faker.date.past({ years: 30 }).getFullYear(),
            });
         }
      }

      // Insert data into tables
      await tx.insert(houses).values(houseData);
      await tx.insert(cars).values(carData);
   });

   console.log("Seeding done");
};

main();
