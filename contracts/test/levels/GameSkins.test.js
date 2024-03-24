const RPGFactory = artifacts.require('./levels/RPGFactory.sol');
const RPG = artifacts.require('./levels/RPG.sol');
const RPGAttack = artifacts.require('./attacks/RPGAttack.sol');

contract('RPG', function(accounts){
	let ethernaut;
	let level;
	let owner = accounts[1];
	let player = accounts[0];
	let statproxy;

	before(async function (){
	 	ethernaut = await utils.getEthernautWithStatsProxy();
		level = await RPGFactory.new();
		await ethernaut.registerLevel(level.address);
	});

	it('should allow the player to solve the level', async function () {
	 	const instance = await utils.createLevelInstance(
	 		ethernaut,
	 		level.address,
	 		player,
	 		RPG
	 	);

	 	const ethCompleted = await utils.submitLevelInstance(
	 		ethernaut,
	 		level.address,
	 		instance.address,
			player
		);

	 	assert.isTrue(ethCompleted);
	});
});
