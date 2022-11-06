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
        name: 'dwarf',
        price: 150,
        quantity: 0,
        multiplier: 10
    },
    {
        name: 'Rover',
        price: 300,
        quantity: 0,
        multiplier: 100
    }
];



let mithrilResource = 0
let clickPower = 1
let timer = 3000

// TODO trying to increase click power - Correctly 
function MiningResource() {

    console.log("Resources mining")
    mithrilResource += clickPower
    console.log("Clicking power mining ", clickPower)
    console.log(mithrilResource)

    updateStats()
    document.getElementById("pick-sound").play()
}


function updateStats() {
    console.log("Drawing stats")

    let clickpowerAdd = document.getElementById('user-click-power')
    clickpowerAdd.innerText = clickPower

    let userRes = document.getElementById('user-resource')
    userRes.innerText = mithrilResource;






    // Small widgets for side menu
    let smCP = document.getElementById('smCP')
    smCP.innerText = clickPower

    let smRes = document.getElementById('sm-resource')
    smRes.innerText = mithrilResource


    let smTimer = document.getElementById('sm-timer')
    smTimer.innerText = timer

    // console.log(timer)

}
// NOTE I can possibly just put this back into the buy click upgrade
function updateResources(item) {
    item.quantity++
    item.price = item.price + (item.price * .6)
    console.log("Price increases ohhhhhh jebus")

    // NOTE still trying to add up the math correctly on 3 add upgrade

    if (item.name == 'pickaxe' || item.name == 'Drill') {
        clickPower = clickPower + (item.quantity * item.multiplier)
        mithrilResource = mithrilResource - item.price

        let upgradeQTY = document.getElementById(item.name + "-qty")
        console.log("Increasing QTY ", upgradeQTY)
        upgradeQTY.innerText = item.quantity

        let upgradePwr = document.getElementById(item.name + "-tp")
        console.log("TotalPower ", upgradePwr)
        upgradePwr.innerText = item.quantity * item.multiplier
    }
    let oldTotal = 0
    let getHelp = document.getElementById(item.name)
    let gethelpTotal = document.getElementById(item.name + '-total')


    let getNewPriceElem = document.getElementById(item.name + '-price')
    if (item.name == 'dwarf' || item.name == 'Rover') {
        let newPrice = item.price + item.price

        getHelp.innerText = item.quantity
        oldTotal = oldTotal + (item.quantity * item.multiplier)
        item.price = newPrice
        getNewPriceElem.innerText = item.price

        console.log(" The new price for automation muahaha", newPrice)

        gethelpTotal.innerText = oldTotal



    }


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

        updateResources(newUP)
        updateStats()

    }

}



function hireHelp(autoUP) {
    console.log("Hiring auto help ")

    let newRes = automaticUpgrades.find(c => c.name == autoUP)

    if (mithrilResource < newRes.price) {
        window.alert("Yo Yo you broke \n Resource: \n", mithrilResource, 'is less than the price ', newRes.price)
    } else {
        let autoResources = 0
        mithrilResource = mithrilResource - newRes.price
        console.log("Resources deducted " + mithrilResource)

        updateResources(newRes)

        console.log('Help added ', newRes.quantity)

        let helpInterval = setInterval(() => {
            console.log(newRes.name, "Res submitting quota")

            autoResources = (newRes.quantity * newRes.multiplier)

            console.log('Resources supplied', autoResources)
            mithrilResource += autoResources


            updateStats()


        }, timer)
        debugger

        updateStats()
        // stop interval
        // setTimeout(() => {
        //     console.log(newRes.name + ' completed quota')
        //     clearInterval(helpInterval)
        // }, 3000)
    }


}



updateStats()