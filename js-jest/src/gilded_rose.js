class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {

      switch (this.items[i].name) {
        case "normal":
          this.items[i] = this.normalItem(this.items[i]);
          break;
        case "Aged Brie":
          this.items[i] = this.brieItem(this.items[i]);
          break;
        case "Backstage passes to a TAFKAL80ETC concert":
          this.items[i] = this.backstagepassItem(this.items[i]);
          break;
        case "Sulfuras, Hand of Ragnaros":
          this.items[i] = this.legendaryItem(this.items[i]);
          break;
        case "Conjured":
          this.items[i] = this.conjurItem(this.items[i]);
          break;
      }
    }

    return this.items;
  }

  normalItem(item) {
    let updatedItem = {
      name: item.name,
      quality: item.quality,
      sellIn: item.sellIn
    }
    updatedItem.sellIn = this.decreaseSellIn(updatedItem.sellIn);
    updatedItem.quality = this.decreaseQuality(updatedItem.quality, item.sellIn)
    console.log(updatedItem);
    return updatedItem;
  }

  brieItem(item) {
    let updatedItem = item;
    updatedItem.sellIn = this.decreaseSellIn(updatedItem.sellIn);
    updatedItem.quality = this.increaseQuality(updatedItem.quality, item.sellIn);

    return updatedItem;
  }

  backstagepassItem(item) {
    let updatedItem = item;
    updatedItem.quality = this.backstageQuality(updatedItem.quality, item.sellIn);
    updatedItem.sellIn = this.decreaseSellIn(updatedItem.sellIn);


    return updatedItem;
  }

  legendaryItem(item) {
    let updatedItem = item;
    return updatedItem;
  }

  conjurItem(item) {
    let updatedItem = item;
    updatedItem.quality = this.conjurQuality(updatedItem.quality, item.sellIn);
    updatedItem.sellIn = this.decreaseSellIn(updatedItem.sellIn);
    return updatedItem;
  }
  decreaseSellIn(sellIn) {
    return sellIn - 1;
  }

  increaseQuality(quality, sellIn) {
    return quality <= 48 && sellIn <= 0 ? quality + 2 : quality <= 49 ? quality + 1 : quality;
  }

  decreaseQuality(quality, sellIn) {
    return quality > 2 && sellIn <= 0 ? quality - 2 : quality > 1 ? quality - 1 : quality;
  }

  backstageQuality(quality, sellIn) {
    switch (true) {
      case (10 < sellIn):
        return quality <= 49 ? quality + 1 : 50;
      case (6 <= sellIn && sellIn <= 10):
        return quality <= 48 ? quality + 2 : 50;
      case (1 <= sellIn && sellIn <= 5):
        return quality <= 47 ? quality + 3 : 50;
      case (sellIn <= 0):
        return 0;
    }
  }

  conjurQuality(quality, sellIn) {
    return quality >= 4 && sellIn <= 0 ? quality - 4 : quality > 2 ? quality - 2 : 0;
  }
}

module.exports = {
  Item,
  Shop
}
