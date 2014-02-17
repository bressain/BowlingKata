"use strict"

var Game = function() {
	this.rolls = [];
	this.currentRoll = 0;
};

Game.prototype.roll = function(pins) {
	this.rolls.push(pins);
};

Game.prototype.score = function() {
	var runningScore = 0;
	var frameIndex = 0;
	for (var frame = 0; frame < 10; frame++) {
		if (isStrike(this.rolls, frameIndex)) {
			runningScore += 10 + strikeBonus(this.rolls, frameIndex);
			frameIndex += 1;
		}
		else if (isSpare(this.rolls, frameIndex)) {
			runningScore += 10 + spareBonus(this.rolls, frameIndex);
			frameIndex += 2;
		} else {
			runningScore += sumOfBallsInFrame(this.rolls, frameIndex);
			frameIndex += 2;
		}
	}
	return runningScore;
};

function isSpare(rolls, frameIndex) {
	return rolls[frameIndex] + rolls[frameIndex + 1] == 10;
}

function isStrike(rolls, frameIndex) {
	return rolls[frameIndex] == 10;
}

function strikeBonus(rolls, frameIndex) {
	return rolls[frameIndex + 1] + rolls[frameIndex + 2];
}

function spareBonus(rolls, frameIndex) {
	return rolls[frameIndex + 2];
}

function sumOfBallsInFrame(rolls, frameIndex) {
	return rolls[frameIndex] + rolls[frameIndex + 1];
}

module.exports = Game;
