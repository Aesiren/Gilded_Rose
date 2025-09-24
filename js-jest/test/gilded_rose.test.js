const { Item, Shop } = require("../src/gilded_rose.js");
// You need more tests than just the ones written here, this is just to get you started.
// USE COVERAGE GUTTERS TO GUIDE YOUR TEST WRITING
describe("Gilded Rose Pin Down Tests", () => {
  test('Passing incorrect item should return undefined', () => {
    const gildedRose = new Shop();

    const items = gildedRose.updateQuality();

    expect(items[0]).toBe(undefined);
  });

  test("Normal items should degrade in quality by 1 each day", () => {
    let normalItem = new Item("normal", 10, 20); //build
    const gildedRose = new Shop([normalItem]);

    const items = gildedRose.updateQuality(); //operate

    expect(items[0].quality).toBe(19); //check
    expect(items[0].sellIn).toBe(9); //check
  });

  test("Normal items should degrade in quality twice as fast after the sellIn date has passed", () => {
    let normalItem = new Item("normal", 0, 20); //build
    const gildedRose = new Shop([normalItem]);

    const items = gildedRose.updateQuality(); //operate

    expect(items[0].quality).toBe(18); //check
    expect(items[0].sellIn).toBe(-1); //check
  });

  test("Quality should never go negative", () => {
    let normalItem = new Item("normal", 10, 0); //build
    const gildedRose = new Shop([normalItem]);

    const items = gildedRose.updateQuality(); //operate

    expect(items[0].quality).toBe(0); //check
    expect(items[0].sellIn).toBe(9); //check
  });

  test('Quality of "Aged Brie" should increase by 1 each day', () => {
    let agedBrie = new Item("Aged Brie", 10, 20);
    const gildedRose = new Shop([agedBrie]);

    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(21);
    expect(items[0].sellIn).toBe(9);
  });

  test('Quality of "Aged Brie" should never go above 50', () => {
    let agedBrie = new Item("Aged Brie", 10, 50);
    const gildedRose = new Shop([agedBrie]);

    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(50);
    expect(items[0].sellIn).toBe(9);
  });

  test('Quality of "Aged Brie" should increase after the sellIn date passes', () => {
    let agedBrie = new Item("Aged Brie", -1, 20);
    const gildedRose = new Shop([agedBrie]);

    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(22);
    expect(items[0].sellIn).toBe(-2);
  });

  test('Quality of "Backstage passes" should increase by 2 when there are 10 days or less', () => {
    let backstagePass = new Item(
      "Backstage passes to a TAFKAL80ETC concert",
      10,
      20
    );
    const gildedRose = new Shop([backstagePass]);

    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(22);
    expect(items[0].sellIn).toBe(9);
  });

  test('Quality of "Backstage passes" should increase by 3 when there are 5 days or less', () => {
    let backstagePass = new Item(
      "Backstage passes to a TAFKAL80ETC concert",
      5,
      20
    );
    const gildedRose = new Shop([backstagePass]);

    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(23);
    expect(items[0].sellIn).toBe(4);
  });

  test('Quality of "Backstage passes" should decrease to 0 after the concert', () => {
    let backstagePass = new Item(
      "Backstage passes to a TAFKAL80ETC concert",
      0,
      20
    );
    const gildedRose = new Shop([backstagePass]);

    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(0);
    expect(items[0].sellIn).toBe(-1);
  });

  test('Quality of "Backstage passes" should never go above 50', () => {
    let backstagePass = new Item(
      "Backstage passes to a TAFKAL80ETC concert",
      10,
      50
    );
    const gildedRose = new Shop([backstagePass]);

    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(50);
    expect(items[0].sellIn).toBe(9);
  });

  test('Quality of "Backstage passes" should never go above 50, even with days left', () => {
    let backstagePass = new Item(
      "Backstage passes to a TAFKAL80ETC concert",
      10,
      49
    );
    const gildedRose = new Shop([backstagePass]);

    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(50);
    expect(items[0].sellIn).toBe(9);
  });

  test('Quality of "Backstage passes" should increase in quality by 1 each day over sellIn 10', () => {
    let backstagePass = new Item(
      "Backstage passes to a TAFKAL80ETC concert",
      11,
      20
    );
    const gildedRose = new Shop([backstagePass]);

    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(21);
    expect(items[0].sellIn).toBe(10);
  });

  test('Quality of "Backstage passes" should increase in quality by 1 each day over sellIn 10, unless it is already quality 50', () => {
    let backstagePass = new Item(
      "Backstage passes to a TAFKAL80ETC concert",
      11,
      50
    );
    const gildedRose = new Shop([backstagePass]);

    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(50);
    expect(items[0].sellIn).toBe(10);
  });

  test('Quality of "Backstage passes" should increase in quality by 1 each day over sellIn 10, unless it is already quality 50', () => {
    let backstagePass = new Item(
      "Backstage passes to a TAFKAL80ETC concert",
      5,
      50
    );
    const gildedRose = new Shop([backstagePass]);

    const items = gildedRose.updateQuality();

    expect(items[0].quality).toBe(50);
    expect(items[0].sellIn).toBe(4);
  });

  test(`Sulfuras' quality should not decrease`, () => {
    let legendaryItem = new Item("Sulfuras, Hand of Ragnaros", 5, 80);

    const gildedRose = new Shop([legendaryItem]);

    const items = gildedRose.updateQuality();

    expect(items[0].sellIn).toBe(5);
    expect(items[0].quality).toBe(80);
  })

  test(`Conjured items should degrade twice as fast as normal items`, () => {
    let conjuredItem = new Item("Conjured", 10, 10);
    const gildedRose = new Shop([conjuredItem]);
    const items = gildedRose.updateQuality();

    expect(items[0].sellIn).toBe(9);
    expect(items[0].quality).toBe(8);
  })

  test(`Conjured items should degrade twice as fast as normal items, but not go negative`, () => {
    let conjuredItem = new Item("Conjured", 10, 1);
    const gildedRose = new Shop([conjuredItem]);
    const items = gildedRose.updateQuality();

    expect(items[0].sellIn).toBe(9);
    expect(items[0].quality).toBe(0);
  })

  test(`Conjured items should degrade twice as fast as normal items, but not go negative`, () => {
    let conjuredItem = new Item("Conjured", 0, 4);
    const gildedRose = new Shop([conjuredItem]);
    const items = gildedRose.updateQuality();

    expect(items[0].sellIn).toBe(-1);
    expect(items[0].quality).toBe(0);
  })
});
