// describe("Modal Component", () => {
//   it("opens on click", () => {
//     expect(true).toBe(true);
//   });
// });
//spy's third party dependency doesn't interact with the dom
//mock is for third party dipendency to not hit servers everytime
class Person {
  firstName;
  lastName;
  middleName;

  constructor(data = {}) {
    this.firstName = data.firstName || "";
    this.lastName = data.lastName || "";
    this.middleName = data.middleName || "";
  }

  get fullName() {
    if (this.middleName.length > 0) {
      return `${this.firstName} ${this.middleName[0]} ${this.lastName}`;
    }

    return `${this.firstName} ${this.lastName}`;
  }

  sayMyName() {
    window.alert(this.fullName);
  }

  getCodeName() {
    const isTestingGood = confirm("are you testing correctly");

    if (isTestingGood) {
      return "tesing correctly";
    } else {
      return `Scrub skipping tests in his best friend'Îs ride`;
    }
  }
}

/*
    1. Write a unit test for lastname and middlename
    to test its default values
    2. Group all 3 unit tests with a describe

    fit is to focus on one test and ignore the rest
    x will skip an entire thing and is done for debugging
*/

describe(`${Person.name} Class`, () => {
  let model;
  beforeEach(() => {
    model = new Person();
    console.log("beforeeach");
  });

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

  describe(`full name`, () => {
    beforeEach(() => {
      model = new Person({
        firstName: "alex",
        lastName: "govea",
      });
    });

    it("middle inital wehn middle name is defined with first and last", () => {
      //arrange
      model.middleName = "alatorre";

      //act
      const result = model.fullName;

      //audit
      const { firstName: fn, lastName: ln, middleName: mn } = model;

      //assert
      expect(result).toBe(`${fn} ${mn[0]} ${ln}`);
    });

    it("when NO middlename return just first and last", () => {
      //arrange
      model.middleName = "";

      //act
      const result = model.fullName;

      //audit
      const { firstName: fn, lastName: ln, middleName: mn } = model;

      //assert
      expect(result).toBe(`${fn} ${ln}`);
    });
  });

  describe(`say my name`, () => {
    it("alerts the full name of the user", () => {
      //arrange
      model.firstName = "Alex";
      model.lastName = "govea";
      spyOn(window, "alert");

      //act
      model.sayMyName();

      //assert
      expect(window.alert).toHaveBeenCalledWith(model.fullName);
    });
  });

  describe(`get code name`, () => {
    it("alerts the full name of the user", () => {
      //arrange
      spyOn(window, "confirm").and.returnValue(true);

      //act
      const result = model.getCodeName();
      const expected = "tesing correctly";
      //assert
      expect(result).toBe(expected);
    });

    it("NOT confirm is just another scrub", () => {
      //arrange
      spyOn(window, "confirm").and.returnValue(false);

      //act
      const result = model.getCodeName();
      const expected = "Scrub skipping tests in his best friend'Îs ride";

      //assert
      expect(result).toBe(expected);
    });
  });
});
