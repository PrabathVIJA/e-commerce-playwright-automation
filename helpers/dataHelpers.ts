import { faker } from "@faker-js/faker";
export function populateFakerFields(order: any) {
  return {
    ...order,
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    company: faker.company.name(),
    email: faker.internet.email(),
    townOrCity: faker.location.city(),
    address: faker.location.streetAddress(),
    addressTwo: faker.location.secondaryAddress(),
  };
}
