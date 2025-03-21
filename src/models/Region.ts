type PokeId = number;

export interface Region {
  id: number;
  first: number;
  last: number;
}

export class RegionList extends Array<Region> {
  get firstId(): PokeId {
    return this[0]?.first || 1;
  }

  get lastId(): PokeId {
    return this[this.length - 1]?.last || 1;
  }

  findRegion(id: PokeId): [number, Region] {
    const index = this.findIndex(
      (region) => region.first <= id && id <= region.last,
    );
    return [index, this[index]];
  }

  prevId(id: PokeId): PokeId {
    const [i, region] = this.findRegion(id);
    if (!region) {
      return this.firstId;
    }

    if (id > region.first) {
      return id - 1;
    }
    if (i > 0) {
      return this[i - 1].last;
    }
    return this[this.length - 1].last;
  }

  nextId(id: PokeId): PokeId {
    const [i, region] = this.findRegion(id);
    if (!region) {
      return this.lastId;
    }
    if (id < region.last) {
      return id + 1;
    }
    if (i < this.length - 1) {
      return this[i + 1].first;
    }
    return this[0].first;
  }

  toId(id: number | string | undefined): PokeId {
    return +(id || "1"); //todo
  }

  getRandom(): PokeId {
    // todo this is not uniform over all pokemons from all regions...
    const region = this[getRandomInt(0, this.length)];
    return getRandomInt(region.first, region.last + 1);
  }
}

function getRandomInt(min: number, max: number): number {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min) + min);
}
