var expressao="";

function checaOperando(op){
    if(op === '/')
        return true;
    if(op === '*')
        return true;
    if(op === '-')
        return true;
    if(op === '+')
        return true;
    
    return false;
}

function inverteNum(num) {
    return num.split("").reverse().join("");
}

function procuraOperando(exp) {
    var flag=0;

    for(var i=0;i<exp.length;i++) {
        if(exp.charAt(i) === '/')
            return true;
        if(exp.charAt(i) === '*')
            return true;
        if(exp.charAt(i) === '-')
            flag=1;
        if(exp.charAt(i) === '+')
            return true;
    }

    if(flag===1 && exp.charAt(0)==='-') 
        return false;
        
    if(flag===1)
        return true;
    

    return false;
}

function procuraPreferencia(exp) {
    for(var i=0;i<exp.length;i++) {
        if(exp.charAt(i) === '/')
            return true;
        if(exp.charAt(i) === '*')
            return true;
    }
    return false;
}

function resolveExpressao(exp) {
    var resultado;
    var aux;
    var naux;
    var n1;
    var n2;
    var flag;
    var flagneg;

    while(procuraOperando(exp)){
        n1="";
        n2="";

        if(procuraPreferencia(exp)) {
            for(var i=0;i<exp.length;i++) {
                switch(exp.charAt(i)) {
                    case '*': 
                        for(var j=i-1; !checaOperando(exp.charAt(j)) && j>=0; j--) {
                            n1=n1+exp.charAt(j);
                        }
                        n1 = inverteNum(n1);
                        for(var j=i+1; !checaOperando(exp.charAt(j)) && j<exp.length; j++) {
                            n2=n2+exp.charAt(j);
                        }
                        aux = n1 + '*' + n2;
                        naux = parseFloat(n1) * parseFloat(n2);
                        flag = 1;
                        break;

                    case '/': 
                        for(var j=i-1; !checaOperando(exp.charAt(j)) && j>=0; j--) {
                            n1=n1+exp.charAt(j);
                        }
                        n1 = inverteNum(n1);
                        for(var j=i+1; !checaOperando(exp.charAt(j)) && j<exp.length; j++) {
                            n2=n2+exp.charAt(j);
                        }
                        aux = n1 + '/' + n2;
                        naux = parseFloat(n1) / parseFloat(n2);
                        flag = 1;
                        break;
                }

                if(flag === 1) {
                    resultado = naux.toString();
                    exp = exp.replace(aux,resultado);
                    flag=0;
                    break;
                }
            }

        } else {
            if(exp.charAt(0)==='-') {
                flagneg=1;
                exp = exp.substring(1);
            }
                
            for(var i=0;exp.length;i++) {
                switch(exp.charAt(i)) {
                    case '+': 
                        for(var j=i-1; !checaOperando(exp.charAt(j)) && j>=0; j--) {
                            n1=n1+exp.charAt(j);
                        }
                        if(flagneg===1) 
                            n1 = n1 + '-';
                                                    
                        n1 = inverteNum(n1);
                        for(var j=i+1; !checaOperando(exp.charAt(j)) && j<exp.length; j++) {
                            n2=n2+exp.charAt(j);
                        }
                        aux = n1 + '+' + n2;
                        if(flagneg===1) {
                            aux = aux.substring(1);
                            flagneg=0;
                        }
                        naux = parseFloat(n1) + parseFloat(n2);
                        flag = 1;
                        break;

                    case '-': 
                        for(var j=i-1; !checaOperando(exp.charAt(j)) && j>=0; j--) {
                            n1=n1+exp.charAt(j);
                        }
                        n1 = inverteNum(n1);
                        for(var j=i+1; !checaOperando(exp.charAt(j)) && j<exp.length; j++) {
                            n2=n2+exp.charAt(j);
                        }
                        aux = n1 + '-' + n2;
                        naux = parseFloat(n1) - parseFloat(n2);
                        flag = 1;
                        break;
                }
                
                if(flag === 1) {
                    resultado = naux.toString();
                    exp = exp.replace(aux,resultado);
                    flag=0;
                    break;
                }
            }
        }        
    }
    return exp;
}

function mostrarExpressao(digito) {

    var tam = expressao.length - 1;
    var flag = 0;

    if(digito === 'c') {
        expressao="";
        document.getElementById("visor").value = expressao;

    } else if(digito === '=') {
        expressao = resolveExpressao(expressao);
        document.getElementById("visor").value = expressao;
    
    } else if(expressao==="") {
        if(digito!='+' && digito!='/' && digito!='*' && digito!='.') {
            expressao = expressao + digito;
            document.getElementById("visor").value = expressao;
        }
        
    } else if(digito==='-' || digito==='+' || digito==='/' || digito==='*') {
        if(!(expressao.charAt(tam)==='-' || expressao.charAt(tam)==='+' || expressao.charAt(tam)==='/' || expressao.charAt(tam)==='*' || expressao.charAt(tam)==='.')) {
            expressao = expressao + digito;
            document.getElementById("visor").value = expressao;
        }

    } else if(digito==='.') {
        if(expressao.charAt(tam)!='.') {
            for(var i=tam; !checaOperando(expressao.charAt(i)) && i>0; i--) {
                if(expressao.charAt(i)==='.') {
                    flag=1;
                    break;
                }
            }

            if(flag===0) {
                expressao = expressao + digito;
                document.getElementById("visor").value = expressao;
            }
        }
        
    } else {
        expressao = expressao + digito;
        document.getElementById("visor").value = expressao;
    }
}