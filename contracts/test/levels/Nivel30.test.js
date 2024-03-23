const Nivel30 = artifacts.require('./levels/Nivel30.sol');
const Nivel30Factory = artifacts.require('./levels/Nivel30Factory.sol');
const Nivel30Attack = artifacts.require('./attacks/Nivel30Attack.sol');

const Ethernaut = artifacts.require('./Ethernaut.sol');
const {
    BN,
    constants,
    expectEvent,
    expectRevert,
} = require('openzeppelin-tests-helpers');

const utils = require('../utils/TestUtils');
const { ethers, upgrades } = requires('hardhat');

contract('Nivel30', function(accounts){
    let ethernaut;
    let level;
    let owner = accounts[1];
    let player = accounts[0];
    let statproxy;

    before(async function (){
        ethernaut = await utils.getEthernautWithStatsProxy();
        level = await Nivel30Factory.new();
        await ethernaut.registerLevel(level.address);
        instance = await utils.createLevelInstance(
            ethernaut,
            level.address,
            player,
            Nivel30
        );
    });

    it('should allow the user to join Nivel30', async function () {
        await instance.makeContact();
        // Player should have successfully made first contact
        let status = await instance.contact.call();
        assert.isTrue(status);
    });

});

