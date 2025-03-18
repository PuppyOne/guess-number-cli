/**
 * Represents a numerical interval.
 * @remarks Must satisfy: min <= max.
*/
export interface NumberRange {
  /** The inclusive lower bound of the numerical range. */
  min: number;
  /** The inclusive upper bound of the numerical range. */
  max: number;
}

/**
 * Enum representing possible results of a guessing game comparison.
 * @see NumberGuessingGame.guess
 */
export enum GuessResult {
  /** Indicates that the guess lower than the target. */
  TooLow = 'Too Low',
  /** Indicates that the guess higher than the target. */
  TooHigh = 'Too High',
  /** Indicates that the guess exactly matches the target. */
  Correct = 'Correct',
}

/**
 * Generates a random integer within the specified range [min, max] (inclusive).
 *
 * @param params - The range parameters object.
 * @param params.min - The minimum value of the range (inclusive).
 * @param params.max - The maximum value of the range (inclusive).
 * @returns Random integer in the specified range.
 * @throws {InvalidRangeError} When min is greater than max.
 * @private
 */
const generateRandomNumber = ({ min, max }: NumberRange): number => {
  if (min > max) {
    throw new InvalidRangeError(
      'Minimum value cannot be greater than maximum value.'
    );
  }
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Represents a number guessing game.
 * Manages game state including target number, valid range, and attempt tracking.
 * 
 * @example
 * const game = new NumberGuessingGame({ min: 1, max: 50 });
 * const result = game.guess(25);
 */
export class NumberGuessingGame {
  private _range: NumberRange;
  private targetNumber: number;
  private _attempts: number;

  /**
   * @param range - The valid number range for guesses (default: { min: 1, max: 100 }).
   */
  constructor(range: NumberRange = { min: 1, max: 100 }) {
    this._range = range;
    this.targetNumber = generateRandomNumber(range);
    this._attempts = 0;
  }

  /**
   * The valid number range configuration for the game.
   * @readonly
   */
  get range(): NumberRange {
    return this._range;
  }

  /**
   * Counter tracking total valid guesses made.
   * @readonly
   */
  get attempts(): number {
    return this._attempts;
  }

  /**
   * Processes a user's guess and provides feedback.
   * @param guess - The number guessed by the player.
   * @returns Result indication whether the guess was too low, too high, or correct.
   * @throws {InvalidGuessError} If guess is outside valid range.
   */
  guess(guess: number): GuessResult {
    this.validateGuess(guess);

    // Only increment attempts if the guess is valid.
    this._attempts++;

    if (guess < this.targetNumber) {
      return GuessResult.TooLow;
    } else if (guess > this.targetNumber) {
      return GuessResult.TooHigh;
    } else {
      return GuessResult.Correct;
    }
  }

  /**
   * Validates that a guess is within the allowed range.
   * @param guess - The number to validate.
   * @throws {InvalidGuessError} When guess ∉ [min, max].
   */
  private validateGuess(guess: number): void {
    if (guess < this._range.min || guess > this._range.max) {
      throw new InvalidGuessError(
        `Guess must be between ${this._range.min} and ${this._range.max}.`
      );
    }
  }
}

/**
 * Thrown when a numeric range definition is invalid (min > max).
 */
export class InvalidRangeError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidRangeError';
  }
}

/**
 * Thrown when a guessed number is outside allowed [min, max] range.
 */
export class InvalidGuessError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'InvalidGuessError';
  }
}
