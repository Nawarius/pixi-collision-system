
function getDirection (keyboardKeys) {
    if ((keyboardKeys["87"] && keyboardKeys["68"]) || (keyboardKeys["38"] && keyboardKeys["39"])) {
        return 'walkNE'
    } else if ((keyboardKeys["87"] && keyboardKeys["65"]) || (keyboardKeys["38"] && keyboardKeys["37"])) {
        return 'walkNW'
    } else if (keyboardKeys["87"] || keyboardKeys["38"]) {
        return 'walkN'
    }

    else if ((keyboardKeys["83"] && keyboardKeys["65"]) || (keyboardKeys["40"] && keyboardKeys["37"])) {
        return 'walkSW'
    } else if ((keyboardKeys["83"] && keyboardKeys["68"]) || (keyboardKeys["40"] && keyboardKeys["39"])) {
        return 'walkSE'
    } else if(keyboardKeys["83"] || keyboardKeys["40"]) {
        return 'walkS'
    }

    else if (keyboardKeys["65"] || keyboardKeys["37"]) {
        console.log('here')
        return 'walkW'
    }
    else if (keyboardKeys["68"] || keyboardKeys["39"]) {
        return 'walkE'
    } 
}