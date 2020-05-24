import { createItem } from "../localStorage/LocalStorage";

const dataSeed = (): void => {
  createItem({
    name: "Vaza",
    EAN: "12-331-355-777",
    type: 0,
    weight: 320,
    color: 3,
    active: true,
    priceHistory: [
      { value: 12, date: Date.now() },
      { value: 14, date: Date.now() },
      { value: 11, date: Date.now() },
    ],
    quantityHistory: [
      { value: 300, date: Date.now() },
      { value: 278, date: Date.now() },
      { value: 212, date: Date.now() },
      { value: 262, date: Date.now() },
    ],
  });
  createItem({
    name: 'Statulėlė Piemenėlė"',
    EAN: "34-122-755-2",
    type: 3,
    weight: 180,
    color: 1,
    active: true,
    priceHistory: [
      { value: 45, date: Date.now() },
      { value: 39, date: Date.now() },
    ],
    quantityHistory: [
      { value: 2, date: Date.now() },
      { value: 8, date: Date.now() },
      { value: 6, date: Date.now() },
      { value: 14, date: Date.now() },
      { value: 12, date: Date.now() },
    ],
  });
};

export default dataSeed;
