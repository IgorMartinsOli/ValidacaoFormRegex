window.addEventListener("load", init);

let formulario;

function init(){
   formulario = document.forms["cadastro"];

   formulario.addEventListener('submit', validarFormulario);

   formulario.nome.addEventListener('blur', validarNome);
   formulario.idade.addEventListener('blur', validarIdade);
   formulario.dtNasc.addEventListener('blur', validarDataNascimento);
   formulario.cpfCnpj.addEventListener('blur', validarCpfCnpj);
   formulario.email.addEventListener('blur', validarEmail);
   formulario.telefone.addEventListener('blur', validarTelefone)
   formulario.estados.addEventListener('change', validarEstados)
   formulario.cidades.addEventListener('change', validarCidades)

}

function validarFormulario(event){
   let qtdErros = 0;

   qtdErros += validarNome();
   qtdErros += validarIdade();
   qtdErros += validarDataNascimento();
   qtdErros += validarCpfCnpj();
   qtdErros += validarEmail();
   qtdErros += validarTelefone();
   qtdErros += validarSexo();
   qtdErros += validarIdiomas();
   qtdErros += validarEstados();
   qtdErros += validarCidades();

   if(qtdErros != 0){
      event.preventDefault();
      return false;
   }

   return true;
}

function validarNome(){
   let cNome = formulario.nome; //Campo (Input) do nome
   let regex = /^[A-Za-z áàãâäéèêëíìîïóòôõöúùûü]{2,30}$/;
   return validarCampoRegex(cNome, regex);
}

function validarIdade(){
   let cIdade = formulario.idade; 
   let idade = parseInt(cIdade.value);
   
   if(idade >= 18 && idade<=110){
      addBorderSuccess(cIdade);
      return 0;
   }else{
      addBorderError(cIdade);
      return 1;
   }
}

function validarDataNascimento(){
   let cDataNascimento = formulario.dtNasc;
   console.log(cDataNascimento.value)
   let regex = /^\d{2}\/\d{2}\/\d{4}$/
   return validarCampoRegex(cDataNascimento, regex);
}

function validarCpfCnpj(){
   let cCpfCnpj = formulario.cpfCnpj;
   let regex = /^([0-9]{3}\.[0-9]{3}\.[0-9]{3}\-[0-9]{2})|(\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2})$/
   return validarCampoRegex(cCpfCnpj, regex);
}

function validarEmail(){
   let cEmail = formulario.email;
   let regex = /^[a-zA-Z]{1}[a-zA-Z0-9\_\.\-]*[@]{1}[a-zA-Z]{3,}\.[a-zA-Z]{2,3}(\.[a-zA-Z]{2}){0,1}$/;
   return validarCampoRegex(cEmail, regex);
}

function validarTelefone(){
   let cTelefone = formulario.telefone;//(XX) XXXX-XXXX
   let regex = /^((\(\d{2}\))|(\d{2}))[ ]?[9]?\d{4}[\-]?\d{4}$/;
   return validarCampoRegex(cTelefone, regex);
}


function validarCampoRegex(campoTexto, regex){
   let valorCampo = campoTexto.value;
   if(regex.test(valorCampo)){
      addBorderSuccess(campoTexto);
      return 0;
   }else{
      addBorderError(campoTexto);
      return 1;
   }
}

function validarSexo(){
   let cSexo = formulario.sexo;
   let divSexo = document.querySelector('#divSexo')
   if(cSexo.value == ""){
      addBorderError(divSexo);
      return 1
   }else{
      console.log("Sexo: "+cSexo.value)
      addBorderSuccess(divSexo);
      return 0;
   }
}

function validarIdiomas(){
   let cIdiomas = formulario.idiomas;
   let divIdiomas = document.querySelector("#divIdiomas")
   let idiomasSelecionados = 0;

   for(let i=0; i<cIdiomas.length; i++){
      let idioma = cIdiomas[i];
      if(idioma.checked){
         idiomasSelecionados++;
      }
   }

   if(idiomasSelecionados >= 2){
      addBorderSuccess(divIdiomas)
      return 0;
   }else{
      addBorderError(divIdiomas)
      return 1;
   }
}

function validarEstados(){
   let cEstados = formulario.estados;
   let estadoSelecionado = cEstados.selectedIndex;

   if(estadoSelecionado != 0){
      addBorderSuccess(cEstados)
      return 0;
   }else{
      addBorderError(cEstados);
      return 1;
   }
}

function validarCidades(){
   let cCidades = formulario.cidades;
   let cidadeSelecionada = cCidades.selectedIndex;

   if(cidadeSelecionada != 0){
      addBorderSuccess(cCidades)
      return 0;
   }else{
      addBorderError(cCidades);
      return 1;
   }
}

function addBorderError(campo){
   campo.classList.remove("certo")
   campo.classList.add("errado")
}

function addBorderSuccess(campo){
   campo.classList.remove("errado")
   campo.classList.add("certo")
}