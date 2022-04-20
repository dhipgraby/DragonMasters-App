
export function getImg(element){

    let images = {
        idle:'/images/dragons/'+ element+ '/standing/idle.png',
        fly:'/images/dragons/'+ element+ '/flying/fly.png',
        sleep:'/images/dragons/'+ element+ '/sleeping/sleep.png',        
        egg:'/images/eggs/'+ element+ '.png',        
        segg:'/images/eggs/s'+ element+ '.png',        
    }

    return images;

}