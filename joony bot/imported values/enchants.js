const enchants = {};

enchants.fortune = {database: "Fortune",name: "👩‍🌾☘ FORTUNE", info: "You can use \`.fortune\` command, where it gives an extra 30% of your earnings while harvesting.", coin: 200}
enchants.bigharvest = {database: "BigHarvest",name: "🤑 HUGE HARVEST",info: "You can use \`.bigharvest\` command, where you can harvest a large amount of money x1-3, but has a longer cooldown.", coin: 300}
enchants.nuke = {database: "Nuke", name: "💣", info: "You can use \`.nuke\` command, where it will harvest x3 amount of your regular harvest.", coin: 2000}
enchants.luck = {database: "Luck", name: "☘ LUCK", info: `You can use \`.luck\` command, where it gives you better luck for rolling plants`, coin: 1000}

module.exports = enchants;