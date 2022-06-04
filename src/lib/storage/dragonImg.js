
export function getImg(element) {

    let images = {
        idle: '/images/dragons/' + element + '/standing/idle.png',
        fly: '/images/dragons/' + element + '/flying/fly.png',
        sleep: '/images/dragons/' + element + '/sleeping/sleep.png',
        egg: '/images/eggs/' + element + '.png',
        segg: '/images/eggs/s' + element + '.png',
    }

    return images;

}

export function iconElement(element) {

    let icon

    switch (element) {
        case 'Fire':
            icon = '<div class="elemCircle"><i class="fas fa-fire"></i></div>'
        break;
        case 'Earth':
            icon = '<div class="elemCircle"><i class="fas fa-mountain"></i></div>'
        break;
        case 'Water':
            icon = '<div class="elemCircle"><i class="fas fa-tint"></i></div>'
        break;
        case 'Air':
            icon = '<div class="elemCircle"><i class="fas fa-wind"></i></div>'
        break;
    }

    return icon

}

export function iconAttr(attr) {

    let icon

    switch (attr) {
        case 'Strength':
            icon = '<i class="fas fa-fist-raised"></i>'
        break;
        case 'Agility':
            icon = '<i class="fas fa-tachometer-alt"></i>'
        break;
        case 'Intelligence':
            icon = '<i class="fas fa-book"></i>'
        break;
        case 'Endurance':
            icon = '<i class="fas fa-shield-alt"></i>'
        break;
        case 'Charisma':
            icon = '<i class="far fa-heart"></i>'
        break;
        case 'Wisdom':
            icon = '<i class="fas fa-brain"></i>'
        break;   
    }

    return icon

}

