let app = document.getElementById('app')
let img_container = document.getElementsByClassName('img-container')
let img = document.getElementsByTagName('img')
let desliza = 1;

setInterval(()=>{
    for(let i=0; i<img_container.length; i++){
        img_container[i].style.transform = `translate(${-desliza * img[i].width}px)`
    }
    
    desliza++
    if(desliza >= img_container.length){
        desliza = 0
    }
},8000)
app.addEventListener('click', ()=>{
    for(let i=0; i<img_container.length; i++){
        img_container[i].style.transform = `translate(${-desliza * img[i].width}px)`
    }
    
    desliza++
    if(desliza >= img_container.length){
        desliza = 0
    }
})