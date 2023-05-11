class Car {
    constructor(name) {
      this.name = name; // initialized the 'name' property
    }
  
    printName() {
      console.log("Car name: " + this.name);
    }
  
    printAssembly() {
      console.log("The Tesla Car finishes assembly every Friday at 5pm.");
    }
  }
  
  class TeslaCar extends Car {
    constructor(name) {
      super(name); // called the parent class constructor with the 'name'
    }
  
    generateAssemblyReports(struct) { // acccept 'struct' as an argument
      console.log("Generating assembly reports...");
      console.log("Exporting " + struct + " format reports...");
      console.log("Printing reports...");
    }
  }
  
  const myCar = new TeslaCar("Model_3");
  myCar.printName();
  myCar.generateAssemblyReports("Excel");
  