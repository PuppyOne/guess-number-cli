# Guess Number CLI

A simple command-line **number guessing game**.

The player needs to guess a random number within a specified range until they guess correctly.

![NPM Version](https://img.shields.io/npm/v/guess-number-cli)
![language](https://img.shields.io/badge/language-TypeScript-3178c6)
![GitHub Release Date](https://img.shields.io/github/release-date/PuppyOne/guess-number-cli)
![GitHub License](https://img.shields.io/github/license/PuppyOne/guess-number-cli)

## Features

- Supports default range (1-100) and custom range games.
- Provides detailed error messages to help players understand if their guess is within the valid range.
- Records the player's attempts and displays them when the correct number is guessed.

- **Object-Oriented Programming (OOP)** Principles and encapsulates the game logic. Provides a simple interface for interacting with the game
- Includes comprehensive **testing** to ensure code quality and functionality.

## Usage

### Use As CLI

1. Ensure you have [Node.js](https://nodejs.org/en/download) (version 16 or higher) and npm installed.
2. Run the following command in your terminal:

```bash
npm install -g guess-number-cli
```

3. To start the game, run the following command in your terminal:

```bash
guess-number
```

or with a custom range:

```bash
guess-number 1 10
```

### Use As Module

1. Install the package using npm:

```bash
npm install guess-number-cli
```

2. Import the module in your project:

```typescript
import { NumberGuessingGame, type GuessResult } from 'guess-number-cli';
const game = new NumberGuessingGame();

// Guess a number
const result: GuessResult = game.guess(5);
console.log(result);
```
