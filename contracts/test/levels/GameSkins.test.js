const GameSkins = artifacts.require('./levels/GameSkins.sol');
const GameSkinsFactory = artifacts.require('./levels/GameSkinsFactory.sol');
const GameSkinsAttack = artifacts.require('./attacks/GameSkinsAttack.sol');

const Ethernaut = artifacts.require('./Ethernaut.sol');
const {
	BN,
	constants,
	expectEvent,
	expectRevert,
} = require('openzeppelin-tests-helpers');
const utils = require('../utils/TestUtils');
const { ethers, upgrades } = requires('hardhat');

contract('GameSkins', function(accounts){
	let ethernaut;
	let level;
	let owner = accounts[1];
	let player = accounts[0];
	let statproxy;

	before(async function (){
		ethernaut = await utils.getEthernautWithStatsProxy();
		level = await GameSkinsFactory.new();
		await ethernaut.registerLevel(level.address);
	});

	it('should allow the user to join GameSkins', async function () {
		const instance = await utils.createLevelInstance(
			ethernaut,
			level.address,
			player,
			GameSkins
		);
		const completed = await utils.submitLevelInstance(
			ethernaut,
			level.address,
			instance.address,
			player
		);

		assert.isFalse(status);
	});
	it('should allow the player to solve the level', async function () {
		const instance = await utils.createLevelInstance(
			ethernaut,
			level.address,
			player,
			GameSkins
		);

		const attacker = await GameSkinsAttack.new();
		await attacker.attack(instance.address);

		const completed = await utils.submitLevelInstance(
			ethernaut,
			level.address,
			instance.address,
			player
		);

		assert.isTrue(completed);
	});
});
