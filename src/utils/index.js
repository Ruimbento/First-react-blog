import faker from "faker";

export const generatePostText = (item) => {
  item.description = item.text;

  const text = new Array(faker.random.number({ min: 3, max: 8 })).fill(
    faker.lorem.sentences(20)
  );

  const images = new Array(faker.random.number({ min: 2, max: 3 })).fill(
    faker.image.unsplash.imageUrl(600, 400)
  );

  // Рандомная сортировка массива с текстом и картинкой, для иммитации написаного поста.
  item.text = text.concat(images).sort((a, b) => {
    return 0.5 - Math.random();
  });

  return item;
};
