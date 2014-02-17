"use strict"

var Game = require("./game");

describe("game", function () {
	var g;

	beforeEach(function () {
		g = new Game();
	});

	it("should have no points for a gutter game", function () {
		rollMany(20, 0);
		expect(g.score()).toBe(0);
	});

	it("should have 20 points for 1 point per roll", function () {
		rollMany(20, 1);
		expect(g.score()).toBe(20);
	});

	it("should add first score from next frame for a spare", function () {
		rollSpare();
		g.roll(3);
		rollMany(17, 0);
		expect(g.score()).toBe(16);
	});

	it("should add both scores from the next frame for a strike", function () {
		rollStrike();
		g.roll(3);
		g.roll(4);
		rollMany(16, 0);
		expect(g.score()).toBe(24);
	});

	it("should score 300 on a perfect game", function () {
		rollMany(12, 10);
		expect(g.score()).toBe(300);
	});

	function rollMany(times, pins) {
		for (var i = 0; i < times; i++)
			g.roll(pins);
	}

	function rollSpare() {
		g.roll(5);
		g.roll(5);
	}

	function rollStrike() {
		g.roll(10);
	}
});
