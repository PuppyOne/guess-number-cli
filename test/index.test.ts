import { expect } from 'chai';
import sinon from 'sinon';
import {
  NumberGuessingGame,
  GuessResult,
  InvalidGuessError,
  InvalidRangeError,
} from '../src/index.js';

describe('NumberGuessingGame', () => {
  describe('.constructor()', () => {
    it('should use default range 1-100 when no args', () => {
      const game = new NumberGuessingGame();
      expect(game['range']).to.deep.equal({ min: 1, max: 100 });
      expect(game['targetNumber']).to.be.within(1, 100);
    });

    it('should generate target within valid custom range', () => {
      const testRanges = [
        { min: 10, max: 20 },
        { min: 0, max: 1 },
        { min: 999, max: 1000 },
      ];

      testRanges.forEach(range => {
        const game = new NumberGuessingGame(range);
        expect(game['targetNumber']).to.be.within(range.min, range.max);
      });
    });

    it('should handle same min-max values', () => {
      const game = new NumberGuessingGame({ min: 5, max: 5 });
      expect(game['targetNumber']).to.equal(5);
    });

    it('should cover all possible values', function () {
      this.retries(2);

      const range = { min: 1, max: 10 };
      const results = new Set<number>();

      for (let i = 0; i < 1000; i++) {
        const game = new NumberGuessingGame(range);

        results.add(game['targetNumber']);
      }

      // Verify that all possible values are covered
      expect(results).to.have.members([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    });

    it('should throw error for invalid range', () => {
      expect(() => new NumberGuessingGame({ min: 10, max: 5 })).to.throw(
        InvalidRangeError
      );
      expect(() => new NumberGuessingGame({ min: 10, max: 9 })).to.throw(
        InvalidRangeError
      );
    });
  });

  describe('.guess()', () => {
    let game: NumberGuessingGame;

    let mockMathRandom: sinon.SinonStub;

    before(() => {
      // Mock Math.random to return predictable values
      mockMathRandom = sinon.stub(Math, 'random');
    });

    after(() => {
      mockMathRandom.restore();
    });

    beforeEach(() => {
      mockMathRandom.returns(0.7);
      game = new NumberGuessingGame({ min: 1, max: 10 });
      // Force targetNumber to 8 for predictable tests (1 + (10-1)*0.7 ≈ 7.3 → floor=7 +1=8)
    });

    it('should return TooLow when guess < target', () => {
      expect(game.guess(5)).to.equal(GuessResult.TooLow);
    });

    it('should return TooHigh when guess > target', () => {
      expect(game.guess(9)).to.equal(GuessResult.TooHigh);
    });

    it('should return Correct when guess matches target', () => {
      expect(game.guess(8)).to.equal(GuessResult.Correct);
    });

    it('should increment attempts counter', () => {
      expect(game['attempts']).to.equal(0);
      game.guess(5);
      game.guess(9);
      expect(game['attempts']).to.equal(2);
      expect(() => game.guess(8))
        .to.increase(game, 'attempts')
        .by(1);
    });

    it('should throw error for out-of-range guesses', () => {
      expect(() => game.guess(0))
        .to.throw(InvalidGuessError)
        .that.has.property('name', 'InvalidGuessError');
      expect(() => game.guess(11))
        .to.throw(InvalidGuessError)
        .that.has.property('name', 'InvalidGuessError');
    });
  });
});
