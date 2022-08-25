var expressao="";

function mostrarExpressao(digito) {

    if(digito === 'c' || digito === '=') {
        
    } else {
        expressao = expressao + digito;
        document.getElementById("visor").value = expressao;

        switch(digito) {
            case '1': 
                break;

            case '2': 
                break;

            case '3': 
                break;

            case '4': 
                break;

            case '5': 
                break;

            case '6': 
                break;

            case '7': 
                break;

            case '8': 
                break;

            case '9': 
                break;

            case '0': 
                break;

            case '+': 
                break;

            case '-': 
                break;

            case '/': 
                break;

            case '*': 
                break;

            case '.': 
                break;

            default: 
                alert("Digito invalido");
                break;
        }
    }
    
}