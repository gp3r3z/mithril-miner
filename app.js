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



let mithrilResource = 250
let clickPower = 1
let timer = 3000
let barStatus = 100





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
    smTimer.innerText = barStatus



}
// NOTE I can possibly just put this back into the buy click upgrade
function updateResources(item) {
    item.quantity++
    item.price = item.price + (item.price * .6)
    console.log("Price increases ohhhhhh jebus")

    // TODO still trying to add up the math correctly on 3 add upgrade

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
    let newTotal = 0
    let getHelp = document.getElementById(item.name)
    let gethelpTotal = document.getElementById(item.name + '-total')


    let getNewPriceElem = document.getElementById(item.name + '-price')
    if (item.name == 'dwarf' || item.name == 'Rover') {
        let newPrice = item.price + item.price

        getHelp.innerText = item.quantity
        newTotal = newTotal + (item.quantity * item.multiplier)
        item.price = newPrice
        getNewPriceElem.innerText = item.price

        console.log(" The new price for automation muahaha", newPrice)

        gethelpTotal.innerText = newTotal


    }


}

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
        // NOTE working on the set interval but havin some thing going lol 
        setInterval(getAutoResource, 1000)
        let helpInterval = setInterval(() => {
            console.log('Resources supplied', autoResources)
            autoResources = (newRes.quantity * newRes.multiplier)

            mithrilResource += autoResources
            console.log(mithrilResource + ' added')
            updateStats()

        }, timer)
        updateStats()
        // stop interval
        // setTimeout(() => {
        //     console.log(newRes.name + ' completed quota')
        //     clearInterval(helpInterval)
        // }, 3000)
    }


}

updateStats()

function getAutoResource() {

    // NOTE as of now my timer is set to tag ever 3 seconds but i also need to include a way to reduce a timer to show when it will be in another attempt

    let timerBarElem = document.getElementById('timer-progress')
    debugger
    barStatus -= 25
    if (barStatus <= 0) {
        barStatus = 100

    }
    timerBarElem.style.width = barStatus + '%'

    console.log('TimerBar is updating ', timerBarElem.style.width)
    updateStats()
}




