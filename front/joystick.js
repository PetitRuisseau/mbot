let btns = document.getElementsByTagName("button");

for (let i = 0 ; i < btns.length ; i += 1)   {
    btns[i].addEventListener("mousedown", function(){
        console.log(this.id+"go") ;
    });
    btns[i].addEventListener("mouseup", function(){
        console.log(this.id+"stop") ;
    });
}