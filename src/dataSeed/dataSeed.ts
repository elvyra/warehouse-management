import { clearData, createItem } from "../components/localStorage/LocalStorage";
import { IHistory } from "../components/interfaces/interfaces";

const getRandomDateTime = () =>
  Number(
    (
      Math.random() * (Date.now() - (Date.now() - 31556926000)) +
      (Date.now() - 31556926000)
    ).toFixed(0)
  );

const sortByDate = (arr: IHistory[]): IHistory[] =>
  arr.sort((a, b) => (a.date > b.date ? -1 : 1));

const dataSeed = (): void => {
  clearData();
  createItem({
    name: "Minkštas kampas Wequid",
    EAN: "5-901234-123457",
    type: 2,
    weight: 56.8,
    color: 3,
    active: true,
    priceHistory: sortByDate([
      { value: 1289, date: getRandomDateTime() },
      { value: 1320, date: getRandomDateTime() },
      { value: 1279, date: getRandomDateTime() },
    ]),
    quantityHistory: sortByDate([
      { value: 30, date: getRandomDateTime() },
      { value: 27, date: getRandomDateTime() },
      { value: 21, date: getRandomDateTime() },
      { value: 26, date: getRandomDateTime() },
    ]),
  });
  createItem({
    name: "Lova MAYA",
    EAN: "0-123456-789012",
    type: 4,
    weight: 78,
    color: 0,
    active: false,
    priceHistory: sortByDate([
      { value: 315, date: getRandomDateTime() },
      { value: 359, date: getRandomDateTime() },
    ]),
    quantityHistory: sortByDate([
      { value: 2, date: getRandomDateTime() },
      { value: 8, date: getRandomDateTime() },
      { value: 6, date: getRandomDateTime() },
      { value: 14, date: getRandomDateTime() },
      { value: 12, date: getRandomDateTime() },
    ]),
  });
  createItem({
    name: "Sekcija Olen",
    EAN: "9-567778-877654",
    type: 2,
    weight: 31.5,
    color: 4,
    active: true,
    priceHistory: sortByDate([
      { value: 414, date: getRandomDateTime() },
      { value: 519, date: getRandomDateTime() },
      { value: 549, date: getRandomDateTime() },
    ]),
    quantityHistory: sortByDate([
      { value: 30, date: getRandomDateTime() },
      { value: 27, date: getRandomDateTime() },
      { value: 21, date: getRandomDateTime() },
      { value: 26, date: getRandomDateTime() },
    ]),
  });
  createItem({
    name: "Sekcija Fotro",
    EAN: "3-534567-689222",
    type: 2,
    weight: 86,
    color: 1,
    active: true,
    priceHistory: sortByDate([
      { value: 190.85, date: getRandomDateTime() },
      { value: 209.99, date: getRandomDateTime() },
      { value: 205.5, date: getRandomDateTime() },
    ]),
    quantityHistory: sortByDate([
      { value: 13, date: getRandomDateTime() },
      { value: 16, date: getRandomDateTime() },
      { value: 17, date: getRandomDateTime() },
      { value: 26, date: getRandomDateTime() },
    ]),
  });
  createItem({
    name: "Minkštas kampas Lise",
    EAN: "8-987000-789876",
    type: 0,
    weight: 79.8,
    color: 4,
    active: true,
    priceHistory: sortByDate([
      { value: 960, date: getRandomDateTime() },
      { value: 1020, date: getRandomDateTime() },
      { value: 999.99, date: getRandomDateTime() },
      { value: 989.9, date: getRandomDateTime() },
    ]),
    quantityHistory: sortByDate([
      { value: 5, date: getRandomDateTime() },
      { value: 4, date: getRandomDateTime() },
      { value: 3, date: getRandomDateTime() },
      { value: 6, date: getRandomDateTime() },
    ]),
  });
  createItem({
    name: "Spinta MT-26",
    EAN: "7-333524-124654",
    type: 0,
    weight: 37,
    color: 3,
    active: false,
    priceHistory: sortByDate([
      { value: 169, date: getRandomDateTime() },
      { value: 231, date: getRandomDateTime() },
    ]),
    quantityHistory: sortByDate([
      { value: 30, date: getRandomDateTime() },
      { value: 33, date: getRandomDateTime() },
      { value: 35, date: getRandomDateTime() },
      { value: 26, date: getRandomDateTime() },
    ]),
  });
  createItem({
    name: "Spinta SZ 2D",
    EAN: "0-566224-911234",
    type: 4,
    weight: 46,
    color: 1,
    active: false,
    priceHistory: sortByDate([
      { value: 340, date: getRandomDateTime() },
      { value: 329.99, date: getRandomDateTime() },
      { value: 310, date: getRandomDateTime() },
    ]),
    quantityHistory: sortByDate([
      { value: 8, date: getRandomDateTime() },
      { value: 12, date: getRandomDateTime() },
      { value: 18, date: getRandomDateTime() },
      { value: 22, date: getRandomDateTime() },
    ]),
  });
  createItem({
    name: "Lova LIAGI",
    EAN: "9-766231-877813",
    type: 5,
    weight: 14,
    color: 2,
    active: true,
    priceHistory: sortByDate([
      { value: 120, date: getRandomDateTime() },
      { value: 140, date: getRandomDateTime() },
      { value: 119, date: getRandomDateTime() },
    ]),
    quantityHistory: sortByDate([
      { value: 3, date: getRandomDateTime() },
      { value: 2, date: getRandomDateTime() },
      { value: 5, date: getRandomDateTime() },
      { value: 7, date: getRandomDateTime() },
    ]),
  });
};

export default dataSeed;
