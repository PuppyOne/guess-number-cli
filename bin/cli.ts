#!/usr/bin/env node

import { number } from '@inquirer/prompts';
import {
  GuessResult,
  InvalidGuessError,
  NumberGuessingGame,
} from '../src/index.js';

const [, , minArg, maxArg] = process.argv;

if (![2, 4].includes(process.argv.length)) {
  const COMMAND = 'guess-number';

  console.error(`
    ❌ Invalid arguments! 
    
    Usage: ${COMMAND} [<min> <max>]
    
    Examples:
      $ ${COMMAND}       # Use default range
      $ ${COMMAND} 5 80  # Custom range 5-80
    
    Options:
      <min>  Minimum value (inclusive)  [number]
      <max>  Maximum value (inclusive)  [number]
    `);
  process.exit(1);
}

let game: NumberGuessingGame;

if (process.argv.length === 4) {
  const min = Number(minArg);
  const max = Number(maxArg);

  if (isNaN(min) || isNaN(max)) {
    throw new Error('min and max must be valid numbers');
  }
  if (min >= max) {
    throw new Error('max must be greater than min');
  }

  game = new NumberGuessingGame({ min, max });
} else {
  game = new NumberGuessingGame();
}

const { min, max } = game.range;

console.log(`
Welcome to the Number Guessing Game!
I've chosen a number between ${min} and ${max}.
Can you guess what it is?
`);

while (true) {
  let guess: GuessResult;

  await number({
    message: 'Guess a number:',
    required: true,
    validate: input => {
      if (input === undefined) return false;

      try {
        guess = game.guess(input);
      } catch (error) {
        if (error instanceof InvalidGuessError) {
          return error.message;
        }
        return false;
      }
      return true;
    },
  });

  console.log(`${guess!}!`);
  if (guess! === GuessResult.Correct) {
    console.log(`
🎉 Congratulations! You've found the number in ${game.attempts} ${
      game.attempts === 1 ? 'try' : 'tries'
    }!
`);
    break;
  }
}
