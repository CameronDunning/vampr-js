class Vampire {
  constructor(name, yearConverted) {
    this.name = name;
    this.yearConverted = yearConverted;
    this.offspring = [];
    this.creator = null;
  }

  /** Simple tree methods **/

  // Adds the vampire as an offspring of this vampire
  addOffspring(vampire) {
    this.offspring.push(vampire);
    vampire.creator = this;
  }

  // Returns the total number of vampires created by that vampire
  get numberOfOffspring() {
    return this.offspring.length;
  }

  // Returns the number of vampires away from the original vampire this vampire is
  get numberOfVampiresFromOriginal() {
    let count = 0;
    let currentVampire = this;
    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      count++;
    }
    return count;
  }

  // Returns true if this vampire is more senior than the other vampire. (Who is closer to the original vampire)
  isMoreSeniorThan(vampire) {
    let output =
      this.numberOfVampiresFromOriginal < vampire.numberOfVampiresFromOriginal;
    return output;
  }

  /** Stretch **/

  // Returns the closest common ancestor of two vampires.
  // The closest common anscestor should be the more senior vampire if a direct ancestor is used.
  // For example:
  // * when comparing Ansel and Sarah, Ansel is the closest common anscestor.
  // * when comparing Ansel and Andrew, Ansel is the closest common anscestor.
  getLineage() {
    let output = [];
    let currentVampire = this;
    while (currentVampire.creator) {
      currentVampire = currentVampire.creator;
      output.push(currentVampire);
    }
    return output;
  }

  closestCommonAncestor(vampire) {
    if (!this.creator) {
      return this;
    } else if (!vampire.creator) {
      return vampire;
    } else if (this.creator === vampire) {
      return vampire;
    } else if (vampire.creator === this) {
      return this;
    } else if (this === vampire) {
      return this;
    } else {
      let lineage1 = this.getLineage();
      let lineage2 = vampire.getLineage();
      for (let ancestor1 of lineage1) {
        for (let ancestor2 of lineage2) {
          if (ancestor1.name === ancestor2.name) {
            return ancestor1;
          }
        }
      }
    }
  }
}

module.exports = Vampire;
