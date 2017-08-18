console.log('Hey !') ;

let btns = document.getElementsByTagName("button");

console.log(btns) ;

for (let i = 0 ; i < btns.length ; i += 1)   {
    btns[i].addEventListener("click", function(){
        console.log(this.id) ;
    });
}