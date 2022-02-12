
var transaction= []
var transactionraw = localStorage.getItem("transaction")
if(transactionraw !=null){
  transaction=JSON.parse(transactionraw)
}
var total = 0
console.log(transaction.length);

if (transaction.length!=0) {  
  for(item in transaction){
    var a =  transaction[item].value.split(",")
    var b = a[0].split(".")
    b.push(a[1])
    var c = ""
    for(i in b) {
      c+=b[i]
    }
    if (transaction[item].type=="+"){
      total+=parseInt(c)
    }
    else{
      total-=parseInt(c)
    }
formatarMoeda(total)
    }
}
var type = document.getElementById("transacao")


function desenhaExtrato() {
  currentlines = [...document.querySelectorAll("table.extract-list tbody .dinamic-content")];
  currentlines.forEach((element) => {
    element.remove()
  });

  for (person in transaction) {
    document.querySelector("table.extract-list tbody").innerHTML +=
      `<tr class="dinamic-content">
              <td  <td class="dinamic-td1">${transaction[person].type }</td>
              <td class="dinamic-td2">${transaction[person].name}</td>
              <td class="dinamic-td">${transaction[person].value }</td>
            </tr> `
      ;
  }
  document.querySelector("table.extract-list tbody").innerHTML +=
    `
    <tr>        
      <th class="start" id="recebeTotal" >Total</th>
      <td></td>
      <th class="end">R$: `+totalFormatado+` </th>
    </tr> `
}


function testaForm(e){

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


function deletarTudo(){
  confirm = confirm("Tem certeza que deseja realizar a limpeza?")
  if(confirm == true){
      localStorage.clear();
      deleteApiSave();
      alert("Registro Excluidos");
      
  }
  else{
      alert("Registros Mantidos")
  }}




  
  desenhaExtrato()

  
  function submitForm(e) { 
    
    var select = document.getElementById("transacao")
    var index = select.selectedIndex
 
    
    if (index!==0){ 
      
      testaForm(e)
    }
    else {
      alert("Selecione o tipo da transação")
    }
  }


  function formataValor(campo) {
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



  var recebeTotal = document.getElementById("recebeTotal")
  var lucroPrejuizo = document.getElementById("lucroPrejuizo")


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


if(total > 0){
  lucroPrejuizo.innerHTML = "[Lucro]"
}
// se o total for menor que zero, será prejuizo
else if(total < 0){
  lucroPrejuizo.innerHTML ="[Prejuizo]"
}
// se for neutro, ele deixará em branco
else{
  lucroPrejuizo.innerHTML = "" }















