let btns = document.getElementsByTagName("button");

for (let i = 0 ; i < btns.length ; i += 1)   {
    let instruct = "" ;
    
    btns[i].addEventListener("mousedown", function(){
        instruct = this.id+"go" ;
        console.log(instruct) ;
        
        ajaxMultisurfaces({
            method: 'POST',
            url: '/back', 
            args: 'instruction='+instruct,
            callback: function(response) {

            },
            callbackError: function(response) {
                console.log(response) ;
            }
        }) ;
        
    });
    
    btns[i].addEventListener("mouseup", function(){
        instruct = this.id+"stop" ;
        console.log(instruct) ;
        
        ajaxMultisurfaces({
            method: 'POST',
            url: '/back', 
            args: 'instruction='+instruct,
            callback: function(response) {

            },
            callbackError: function(response) {
                console.log(response) ;
            }
        }) ;
    
    });
    
 

    
}





/*Modele*/
//Méthode GET ou POST, url, asynchrone ou pas, arguments, fonction callback, fonction callback si erreur
function ajaxMultisurfaces(options) {
    //on trouvera souvent ce type de fonction appelée XHR pour XML Http Request)
    let defaultOptions = {
        method: 'GET',
        url: '',
        async: true,
        args: '',
        callback: function() {},
        callbackError: function() {}
    }

    assignArgs(options, defaultOptions);

    let monAjax = new XMLHttpRequest();

    //Comme c'est asynchrone, on n'a pas la réponse là tout de suite : il faut préparer l'équivalent d'un addeventlistener ajaxien :
    monAjax.onreadystatechange = function() {

        if (monAjax.readyState === 4) {
            //conditionnelle pour ne prendre que les requêtes réussies (ou "not modified")
            if (monAjax.status === 200 || monAjax.status === 304) {
                defaultOptions.callback(monAjax.response);
            } else {
                defaultOptions.callbackError();
            }
        }
    };

    if(defaultOptions.method === 'GET') {
        //on précise la méthode, le chemin, et si c'est asynchrone ou pas
        monAjax.open(defaultOptions.method, defaultOptions.url+defaultOptions.args, defaultOptions.async);
        //on envoie la requête
        monAjax.send();
    } else if(defaultOptions.method === 'POST') {
        monAjax.open(defaultOptions.method, defaultOptions.url, defaultOptions.async);
        monAjax.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        monAjax.send(defaultOptions.args);
    } else {
        monAjax.open(defaultOptions.method, defaultOptions.url, defaultOptions.async);
        monAjax.send(defaultOptions.args);
    }


    function assignArgs(source, target) {
        for (let clef in source) {
            if (target.hasOwnProperty(clef)) {
                target[clef] = source[clef];
            }
        }
    }
}