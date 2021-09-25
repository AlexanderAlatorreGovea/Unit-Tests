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
  middlename;
  fullNamePieces;
  constructor(data = {}) {
    this.firstName = data.firstName || "";
    this.lastName = data.lastName || "";
    this.middlename = data.middlename || "";
    this.fullNamePieces = [data.firstName, data.middlename, data.lastName];
  }

  get fullName() {
    if (this.middlename.length > 0) {
      return `${this.firstName} ${this.middlename[0]} ${this.lastName}`;
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

  getUserById(id) {
    return fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
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
    it("first middlename defaults to empty string", () => {
      //assert
      expect(model.middlename).toBe("");
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
      model.middlename = "alatorre";

      //act
      const result = model.fullName;

      //audit
      const { firstName: fn, lastName: ln, middlename: mn } = model;

      //assert
      expect(result).toBe(`${fn} ${mn[0]} ${ln}`);
    });

    it("when NO middlename return just first and last", () => {
      //arrange
      model.middlename = "";

      //act
      const result = model.fullName;

      //audit
      const { firstName: fn, lastName: ln, middlename: mn } = model;

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

  describe(`getUserById`, () => {
    let mockPersonService;
    let model;

    beforeEach(() => {
      const data = {
        firstName: "alex",
        lastName: "govea",
        middlename: "alatorre",
        id: 1,
      };
      mockPersonService = {
        lastId: null,
        user: {},
        getUserById(id) {
          this.lastId = id;
          return this.user;
        },
      };
      model = new Person(data, mockPersonService);
    });

    it("gets user by id", async () => {
      //arrange
      mockPersonService.lastName = null;
      mockPersonService = {
        firstName: "alex",
        lastName: "govea",
        middlename: "alatorre",
        id: 1,
      };
      //act

      const result = await model.getUserById();
      //assert
      expect(mockPersonService.id).toBe(1);
    });
  });
});

describe(`${Person.name} Class`, () => {
  it("exists", () => {
    expect(Person).toBeDefined();
  });

  let model;
  beforeEach(() => {
    model = new Person();
  });

  describe("additional matchers examples", () => {
    it("gets full name pices", () => {
      //arrange
      const firstName = "alex";
      const middlename = "alatorre";
      const lastName = "govea";
      //act
      model = new Person({ firstName, middlename, lastName });

      //
      expect(model.fullNamePieces).toEqual([
        firstName,
        middlename,
        lastName,
      ]);
    });
  });
});
