// describe("Modal Component", () => {
//   it("opens on click", () => {
//     expect(true).toBe(true);
//   });
// });

class Person {
  firstName;
  lastName;
  middleName;

  constructor(data = {}) {
    this.firstName = data.firstName || "";
    this.lastName = data.lastName || "";
    this.middleName = data.middleName || "";
  }
}

describe(`${Person.name} Class`, () => {
  let model;
  beforeEach(() => {
    model = new Person();
    console.log("beforeeach");
  });

  /*
    1. Write a unit test for lastname and middlename
    to test its default values
    2. Group all 3 unit tests with a describe
  */

  describe(`${Person.name} Class`, () => {
    it("first name defaults to empty string", () => {
      //assert
      expect(model.firstName).toBe("");
    });
    it("first middleName defaults to empty string", () => {
      //assert
      expect(model.middleName).toBe("");
    });
    it("first lastName defaults to empty string", () => {
      //assert
      expect(model.lastName).toBe("");
    });
  });
});
