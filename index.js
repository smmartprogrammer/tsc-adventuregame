#! /usr/bin/env node
import inquirer from "inquirer";
console.log(`
\t\t################################
        \t\tADVENTURE GAME
\t\t################################
`);
console.log(`
===========================================================
            You can damage enemy upto 50 health
            Enemy can damage you upto 50 health
===========================================================
`);
let maxEnemyHealth = 75;
let enemyAttackDamage = 25;
let enemies = ['Skeleton', 'Zoombie', 'Warrior', 'Assassin',];
// Player Variables
let health = 100;
let attackDamage = 50;
let numHealthPotions = 3;
let healthPotionMealAmount = 30;
let healthPotionDropChance = 50; // percentage
let running = true;
console.log('\tWelcome to the Dungeon!');
while (running) {
    console.log('----------------------------------------');
    let enemyHealth = Math.ceil(Math.random() * maxEnemyHealth);
    let enemy = enemies[Math.floor(Math.random() * enemies.length)];
    console.log(`\t ${enemy} has Appeared! \n`);
    while (enemyHealth > 0) {
        console.log(`\tYour HP: ${health}`);
        console.log(`\t${enemy}'s HP: ${enemyHealth}`);
        const { choice } = await inquirer.prompt([{
                name: 'choice',
                message: 'What would you like to do ?',
                type: 'rawlist',
                choices: ['Attack', 'Drink Health Potion', 'Run']
            }]);
        console.log(choice);
        if (choice === "Attack") {
            let damageDealt = Math.ceil(Math.random() * attackDamage);
            let damageTaken = Math.ceil(Math.random() * enemyAttackDamage);
            health -= damageTaken;
            enemyHealth -= damageDealt;
            console.log(`> You strike the ${enemy} for ${damageDealt} damage`);
            console.log(`> You recieve ${damageTaken} in retailation`);
            if (health < 1) {
                console.log('> You have taken too much damage, You are too weak to go on!');
                break;
            }
        }
        else if (choice === "Drink Health Potion") {
            if (numHealthPotions > 0) {
                health += healthPotionMealAmount;
                numHealthPotions--;
                console.log(`\t> You drink a health potion, healing yourself for ${healthPotionMealAmount}.`);
                console.log(`\n\t You now have ${health} HP`);
                console.log(`\n\t You have ${numHealthPotions} health potions left. \n`);
            }
            else {
                console.log('\t> You have no health potions left! Defeat Enemies for a chance to get one!');
            }
        }
        else if (choice === 'Run') {
            console.log(`\t> You run away from the ${enemy}!`);
            continue;
        }
        else {
            console.log('\tInvalid Command');
        }
    }
    if (health < 1) {
        console.log('You limp out of the dungeon, weak from battle');
        break;
    }
    console.log('--------------------------------------------------------------------');
    console.log(`# ${enemy} was defeated! #`);
    console.log(`# You have ${health} HP left #`);
    if (Math.ceil(Math.random() * 100) < healthPotionDropChance) {
        numHealthPotions++;
        console.log(`# The ${enemy} dropped the health potion #`);
        console.log(`# You now have ${numHealthPotions} health potion(s). #`);
    }
    console.log('--------------------------------------------------------------------');
    const { choice } = await inquirer.prompt([{
            name: 'choice',
            message: 'what would you like to do?',
            type: 'rawlist',
            choices: ['Continue Fighting', 'Exit']
        }]);
    console.log(choice);
    if (choice === 'Continue Fighting') {
        console.log('You continue on you adventure');
        continue;
    }
    else if (choice === 'Exit') {
        console.log('You exit the dungeon, successful from your adventure');
        break;
    }
    console.log('#########################');
    console.log('# THANKYOU FOR PLAYING #');
    console.log('#########################');
}
