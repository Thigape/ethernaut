const RPGFactory = artifacts.require('./levels/RPGFactory.sol');
const RPGAttack = artifacts.require('./attacks/RPGAttack.sol');
const RPG = artifacts.require('./levels/RPG.sol');

const Ethernaut = artifacts.require('./Ethernaut.sol');
const {
  BN,
  constants,
  expectEvent,
  expectRevert,
} = require('openzeppelin-test-helpers');
const utils = require('../utils/TestUtils');
const { ethers, upgrades } = require('hardhat');

contract('RPG', function (accounts) {
  let ethernaut;
  let level;
  let owner = accounts[1];
  let player = accounts[0];
  let statproxy;

  before(async function () {
    ethernaut = await utils.getEthernautWithStatsProxy();
    level = await ElevatorFactory.new();
    await ethernaut.registerLevel(level.address);
  });

  it('should fail if the player didnt solve the level', async function () {
    const instance = await utils.createLevelInstance(
      ethernaut,
      level.address,
      player,
      RPG
    );

    const completed = await utils.submitLevelInstance(
      ethernaut,
      level.address,
      instance.address,
      player
    );

    assert.isFalse(completed);
  });

  it('should allow the player to solve the level', async function () {
    const instance = await utils.createLevelInstance(
      ethernaut,
      level.address,
      player,
      RPG
    );

    const attacker = await RPGAttack.new();
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
