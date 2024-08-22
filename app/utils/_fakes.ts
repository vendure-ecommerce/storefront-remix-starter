import { faker } from "@faker-js/faker";

export const userCardDummies = Array.from({ length: 3 }).map((_, index) => ({
  title: faker.person.fullName(),
  expertEmail: faker.internet.email(),
  expertPhoneNumber: faker.phone.number(),
  imageSrc: faker.image.avatar(),
}))