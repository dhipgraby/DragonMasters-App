export const ScreenType = {
    eggs: 1,
    dragons: 2,
    eggsLend: 3,
    eggsBorrow: 4,
    dragonsLend: 5,
    dragonsBorrow: 6,
    lends: 7,
    borrows: 8
}

export const urlCurrentParam = ()=>{

    let show;
    const searchParams = new URLSearchParams(window.location.search);
    const currentParam = searchParams.get('current');

    switch (currentParam) {
        case 'eggs':
            show = ScreenType.eggs;
            break;
        case 'dragons':
            show = ScreenType.dragons;
            break;
        case 'eggsLend':
            show = ScreenType.eggsLend;
            break;
        case 'eggsBorrow':
            show = ScreenType.eggsBorrow;
            break;
        case 'dragonsLend':
            show = ScreenType.dragonsLend;
            break;
        case 'dragonsBorrow':
            show = ScreenType.dragonsBorrow;
            break;
        case 'lends':
            show = ScreenType.lends;
            break;
        case 'borrows':
            show = ScreenType.borrows;
            break;
        default:
            show = ScreenType.eggs;
            break;
    }
    return show
}
