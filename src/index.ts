export interface NumberRange {
  min: number;
  max: number;
}

export enum GuessResult {
  TooLow = 'Too Low',
  TooHigh = 'Too High',
  Correct = 'Correct',
}

const generateRandomNumber = ({ min, max }: NumberRange): number => {
  if (min > max) {
    throw new InvalidRangeError(
      'Minimum value cannot be greater than maximum value.'
    );
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export class NumberGuessingGame {
  private _range: NumberRange;
  private targetNumber: number;
  private _attempts: number;

  constructor(range: NumberRange = { min: 1, max: 100 }) {
    this._range = range;
    this.targetNumber = generateRandomNumber(range);
    this._attempts = 0;
  }

  get range(): NumberRange {
    return this._range;
  }

  get attempts(): number {
    return this._attempts;
  }

  guess(guess: number): GuessResult {
    this.validateGuess(guess);

    this._attempts++;

    if (guess < this.targetNumber) {
      return GuessResult.TooLow;
    } else if (guess > this.targetNumber) {
      return GuessResult.TooHigh;
    } else {
      return GuessResult.Correct;
    }
  }

  private validateGuess(guess: number): void {
    if (guess < this._range.min || guess > this._range.max) {
      throw new InvalidGuessError(
        `Guess must be between ${this._range.min} and ${this._range.max}.`
      );
    }
  }
}

export class InvalidRangeError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidRangeError';
  }
}

export class InvalidGuessError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidGuessError';
  }
}
