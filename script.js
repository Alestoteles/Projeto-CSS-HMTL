var transaction = []
var total = 0
var totalFormatado = "0,00"

function syncTransaction(){
  var transactionraw = localStorage.getItem("transaction")
    transaction=JSON.parse(transactionraw)
}

function calculateValue(){
  if(transaction !== null && transaction.length!=0) {  
    total = 0
    for(item in transaction) {
      var a = transaction[item].value.split(",")
      var b = a[0].split(".")
      b.push(a[1])
      var c = ""
      for(i in b) {
        c+=b[i]
      }
      if(transaction[item].type=="+"){
        total+=parseInt(c)
      }
      else{
        total-=parseInt(c)
      }
      formatarMoeda(total)
    }
  }
  else { 
    totalFormatado = "0,00"
  }
}

function syncScreen() { 
  syncTransaction()
  calculateValue()
  buildTable()
}


function buildTable() {
  currentlines = [...document.querySelectorAll("table.extract-list tbody .dynamic-content")];
  currentlines.forEach((element) => {
    element.remove()
  });
  if(transaction !== null && transaction.length!=0){ 
    for (product in transaction) {
      document.querySelector("table.extract-list tbody").innerHTML +=
      `<tr class="dynamic-content">
        <td class="dynamic-td1">${transaction[product].type }</td>
        <td class="dynamic-td2">${transaction[product].name}</td>
        <td class="dynamic-td">R$ `+ transaction[product].value+` </td>
      </tr> `
      ;
    }
  } 
  else { 
    document.querySelector("table.extract-list tbody").innerHTML +=
    `<tr class="dynamic-content">
      <td class="dynamic-td1"></td>
      <td class="dynamic-td2">Nenhuma Transação Cadastrada</td>
      <td class="dynamic-td"></td>
    </tr> `
    ;
  }
  
  document.querySelector("table.extract-list tbody").innerHTML +=
  `
  <tr class="dynamic-content">        
    <td class="start" id="recebeTotal" >Total</td>
    <td></td>
    <td class="end">R$ `+totalFormatado+` </td>
  </tr> `
}

var recebeTotal = document.getElementById("recebeTotal")
var profitPrejudice = document.getElementById("profitPrejudice")


if(total > 0){
  profitPrejudice.innerHTML = "[Lucro]"
}
else if(total < 0){
  profitPrejudice.innerHTML ="[Prejuizo]"
}
else{
  profitPrejudice.innerHTML = "" }

function insertLocalStorageItem(e){
  
  var transactionraw = localStorage.getItem("transaction")
  if(transactionraw !=null){
    var transaction=JSON.parse(transactionraw)
  } else {
    var transaction=[];
  }
  
  transaction.push({
    type: e.target.elements["type"].value ,
    name: e.target.elements["name"].value , 
    value: e.target.elements["value"].value
  })
  
  localStorage.setItem("transaction",JSON.stringify(transaction))
}


function deleteAll(e){
  e.preventDefault();
  let confirm = false
  confirm = window.confirm("Tem certeza que deseja realizar a limpeza?")
  if(confirm == true){
    localStorage.clear();
    syncScreen();
    alert("Registro Excluidos");
  }
  else{
    alert("Registros Mantidos")
  }
}
  
  
  
  function submitForm(e) { 
    e.preventDefault();
    insertLocalStorageItem(e)
    syncScreen();
  }

   
  
  
  syncScreen();
  
  
   function formatValue(campo) {
    campo.value = filtraCampoValor(campo); 
    vr = campo.value;
    tam = vr.length;
    
    if ( tam <= 2 ){ 
      campo.value = vr ; }
      if ( (tam > 2) && (tam <= 5) ){
        campo.value = vr.substr( 0, tam - 2 ) + ',' + vr.substr( tam - 2, tam ) ; }
        if ( (tam >= 6) && (tam <= 8) ){
          campo.value = vr.substr( 0, tam - 5 ) + '.' + vr.substr( tam - 5, 3 ) + ',' + vr.substr( tam - 2, tam ) ; }
          if ( (tam >= 9) && (tam <= 11) ){
            campo.value = vr.substr( 0, tam - 8 ) + '.' + vr.substr( tam - 8, 3 ) + '.' + vr.substr( tam - 5, 3 ) + ',' + vr.substr( tam - 2, tam ) ; }
            if ( (tam >= 12) && (tam <= 14) ){
              campo.value = vr.substr( 0, tam - 11 ) + '.' + vr.substr( tam - 11, 3 ) + '.' + vr.substr( tam - 8, 3 ) + '.' + vr.substr( tam - 5, 3 ) + ',' + vr.substr( tam - 2, tam ) ; }
              if ( (tam >= 15) && (tam <= 18) ){
                campo.value = vr.substr( 0, tam - 14 ) + '.' + vr.substr( tam - 14, 3 ) + '.' + vr.substr( tam - 11, 3 ) + '.' + vr.substr( tam - 8, 3 ) + '.' + vr.substr( tam - 5, 3 ) + ',' + vr.substr( tam - 2, tam ) ;}
                
              }
              
              
              function filtraCampoValor(campo){
                var s = "";
                var cp = "";
                vr = campo.value;
                tam = vr.length;
                for (i = 0; i < tam ; i++) {  
                  if (vr.substring(i,i + 1) >= "0" && vr.substring(i,i + 1) <= "9"){
                    s = s + vr.substring(i,i + 1);}
                  } 
                  campo.value = s;
                  return cp = campo.value
                }
              
                
             

             
             
                function formatarMoeda(total){
                  totalFormatado = total;
                  totalFormatado = totalFormatado + '';
                  totalFormatado = parseInt(totalFormatado.replace(/[\D]+/g, ''));
                  totalFormatado = totalFormatado + '';
                  totalFormatado = totalFormatado.replace(/([0-9]{2})$/g, ",$1");
                  if (totalFormatado.length > 6) {
                    totalFormatado = totalFormatado.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");
                  }
                }
              
                
                
                
                
                
                
                
      
                
 