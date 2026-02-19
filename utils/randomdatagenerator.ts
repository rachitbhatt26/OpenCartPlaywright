import { faker, Faker } from '@faker-js/faker';
export class RandomDataUtil
{

    static getFirstName(): string
{
    return faker.person.firstName();
}

    static getLastName(): string
{
    return faker.person.lastName();
}

    static getFullName(): string
    {
      return faker.person.fullName();

    }
static getPhoneNumber()
{
    return faker.phone.number() ;
}

static getRandomAddress(): string
{
    return faker.location.secondaryAddress();
}

static getRandomEmail(): string
{
    return faker.internet.email();
}

static getPassword(length:number=10):string
{
    return faker.internet.password({length});
    //return "Rach@389922#";
}

static getRandomAddLine(): string
{
    return faker.location.streetAddress();
}

static getRandomCity(): string
{
    return faker.location.city();
}

static getRandomstate(): string
{
    return faker.location.state() ;
}

static getRandomPostal(): string
{
    return faker.location.zipCode() ;
}


static getRandomCountry() : string
{
    return faker.location.country() ;
}

}
