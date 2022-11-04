console.log("App connected")

let clickUpgrades = [
    {
        name: 'pickaxe',
        price: 10,
        quantity: 0,
        multiplier: 1
    },
    {
        name: 'Drill',
        price: 15,
        quantity: 0,
        multiplier: 5
    }
];

let automaticUpgrades = [
    {
        name: 'rover',
        price: 600,
        quantity: 0,
        multiplier: 20
    }
];



let mithrilResource = 0
let clickPower = 1


// TODO trying to increase click power - Correctly 
function MiningResource() {

    console.log("Resources mining")
    mithrilResource += clickPower
    console.log("Clicking power mining ", clickPower)
    console.log(mithrilResource)

    updateStats()

}


function updateStats() {

    console.log("Drawing stats")
    let userRes = document.getElementById('user-resource')
    userRes.innerText = mithrilResource;
    let clickpowerAdd = document.getElementById('user-click-power')
    clickpowerAdd.innerText = clickPower




}

function updateUpgradeQTY(item) {
    console.log("updating upgrade qty: ", item)
    let upgradeQTY = document.getElementById(item.name + "-qty")
    console.log("Increasing ", upgradeQTY)
    upgradeQTY.innerText = item.quantity

    let upgradePwr = document.getElementById(item.name + "-tp")
    console.log("Increasing ", upgradePwr)

    upgradePwr.innerText = item.multiplier * item.quantity

}

// TODO Trying to get total power to equal my clickpower
// 
function buyClickUpgrade(upgradeItem) {
    let totalClickPwr = 0
    let newUP = clickUpgrades.find(cU => cU.name == upgradeItem)
    if (mithrilResource < newUP.price) {
        console.log("Yo Yo you broke \n Resource: \n", mithrilResource, 'is less than the price ', newUP.price)
    }

    newUP.quantity++
    totalClickPwr += newUP.quantity * newUP.multiplier
    clickPower += totalClickPwr
    // debugger
    mithrilResource = mithrilResource - newUP.price
    console.log("You have enough resources, increasing quantity \n", "Click power increasing: \n", clickPower, '\n Resources:', mithrilResource)
    updateStats()
    updateUpgradeQTY(newUP)





}

