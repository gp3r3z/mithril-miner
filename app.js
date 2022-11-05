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



let mithrilResource = 15
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
// NOTE I can possible just put this back into the buy click upgrade
function updateResources(item) {
    item.quantity++
    debugger

    clickPower = clickPower + (item.quantity * item.multiplier)

    mithrilResource = mithrilResource - item.price

    console.log("Up upgrade qty: ", item)
    let upgradeQTY = document.getElementById(item.name + "-qty")
    console.log("Increasing QTY ", upgradeQTY)
    upgradeQTY.innerText = item.quantity

    let upgradePwr = document.getElementById(item.name + "-tp")
    console.log("TotalPower ", upgradePwr)

    // NOTE still trying to add up the math correctly on 3 add upgrade
    console.log("Click power increasing:", clickPower)
    upgradePwr.innerText = item.quantity * item.multiplier


}

// TODO Trying to get total power to equal my clickpower after 3rd attempt math goes wack 
// 
function buyClickUpgrade(upgradeItem) {
    console.log('Clicking buy upgrade')
    let newUP = clickUpgrades.find(cU => cU.name == upgradeItem)

    if (mithrilResource < newUP.price) {
        window.alert("Yo Yo you broke \n Resource: \n", mithrilResource, 'is less than the price ', newUP.price)
    }
    else {

        mithrilResource = mithrilResource - newUP.price
        console.log("You have enough resources, increasing quantity", newUP.quantity, '\n Resources:', mithrilResource)

        updateResources(newUP)
        updateStats()

    }

}




//
