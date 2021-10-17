//get random number and return the floor 
export const getRandomNumber = (max: number, min: number) => {
  return Math.floor(Math.random() * (max - min)) + min;
};


//Convert the fruit text into emoji
export const convertFruitTextToEmoji = (fruitText: string) => {
  let emojiFruit;
  switch (fruitText) {
    case "cherry":
      emojiFruit = "🍒";
      break;
    case "apple":
      emojiFruit = "🍎";
      break;
    case "banana":
      emojiFruit = "🍌";
      break;
    case "lemon":
      emojiFruit = "🍋";
      break;
    default:
      emojiFruit = "";
      break;
  }

  return emojiFruit;
};

/*Slot machine rewards rules, only consider pairs a match if they are in order from left to right*/
export const slotMachineRewardRules = (reels: {
  reel1: string;
  reel2: string;
  reel3: string;
}) => {
  const { reel1, reel2, reel3 } = reels;
  /*cherry award*/
  if (reel1 === "cherry" && reel2 === "cherry" && reel3 === "cherry") {
    return 50;
  }

  if (reel1 === "cherry" && reel2 === "cherry") {
    return 40;
  }
  /*apple award*/

  if (reel1 === "apple" && reel2 === "apple" && reel3 === "apple") {
    return 20;
  }
  if (reel1 === "apple" && reel2 === "apple") {
    return 10;
  }
  /*banana award*/

  if (reel1 === "banana" && reel2 === "banana" && reel3 === "banana") {
    return 15;
  }

  if (reel1 === "banana" && reel2 === "banana") {
    return 5;
  }
  /*lemon award*/

  if (reel1 === "lemon" && reel2 === "lemon" && reel3 === "lemon") {
    return 3;
  }
  return 0;
};