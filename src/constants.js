export const WORD_COUNT = 50;
export const WORD_LENGTH_RANGE = [3, 7];

export const PRACTICE_TEXTS = [
  "The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs. How vexingly quick daft zebras jump!",
  "Technology is rapidly changing the way we live and work. From smartphones to artificial intelligence, innovation continues to shape our future in unprecedented ways.",
  "Learning to type efficiently is a valuable skill in today's digital world. Practice regularly and focus on accuracy before speed to develop proper muscle memory.",
  "The art of programming requires patience, logic, and creativity. Good code is not just about making things work, but writing clean and maintainable solutions.",
  "Success comes from consistent effort and dedication. Small daily improvements lead to significant results over time. Never underestimate the power of persistence.",
  "The sun always shines above the clouds. Keep your face to the sunshine and you cannot see a shadow. The future belongs to those who believe in the beauty of their dreams.",
  "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment. The only way to do great work is to love what you do.",
  "Life is a journey, not a destination. It is not in the stars to hold our destiny but in ourselves. The purpose of our lives is to be happy."
];

export const KEYBOARD_LAYOUT = [
  ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'],
  ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
  ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
  ['z', 'x', 'c', 'v', 'b', 'n', 'm']
];

export const ALL_LETTERS = KEYBOARD_LAYOUT.flat();

export const ANIMATION_DEFAULTS = {
  duration: 800,
  easing: 'easeOutExpo',
};

export const STATS_ANIMATION = {
  ...ANIMATION_DEFAULTS,
  round: 1,
};

export const ERROR_ANIMATION = {
  ...ANIMATION_DEFAULTS,
  duration: 600,
  easing: 'easeOutBounce',
};

export const KEY_ANIMATION = {
  ...ANIMATION_DEFAULTS,
  duration: 200,
  easing: 'easeOutElastic(1, .8)',
};

export const COMPLETION_ANIMATION = {
  ...ANIMATION_DEFAULTS,
  duration: 600,
  easing: 'easeOutElastic(1, .8)',
  scale: [0.8, 1],
  opacity: [0, 1],
};
