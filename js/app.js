document.addEventListener('DOMContentLoaded',function(){

    const email = {
        email: '',
        asunto:'',
        mensaje: ''
    }

    //seleccionar los elementos de la interfaz 
    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const Formulario = document.querySelector('#enviar-mail');
    const btnSumit = document.querySelector('#enviar');
    const btnReset = document.querySelector('#resetBtn');
    const spinner = document.querySelector('#Spinner');
    
    //se recomienda probar codigo linea por linea 
    // console.log(inputMensaje)
    console.log(Formulario);
    console.log(btnSumit);

    //Asignar eventos metodo callbacks , is quiero que se ve mas real podemos usar input en ves de blur 
    inputEmail.addEventListener('input', validar);
    //blur se usa para validar formularios hay varios pero se van a usar dos otro es input 
    inputAsunto.addEventListener('input', validar);
    inputMensaje.addEventListener('input', validar);
    Formulario.addEventListener('submit', enviarEmail);
    btnReset.addEventListener('click', function (e){
        e.preventDefault();
        ResetFormulario();
        comprobarEmail();
    });

   
    
    function enviarEmail (e) {
        e.preventDefault();
        if (btnSumit.disabled) {
            return; // No hagas nada si el botón está deshabilitado
        }
        spinner.classList.add('flex');
        spinner.classList.remove('hidden');
        setTimeout(() => {
            spinner.classList.remove('flex');
            spinner.classList.add('hidden');
            ResetFormulario();
            const alertaExito = document.createElement('P');
            alertaExito.classList.add('bg-green-500', 'text-white','p-2','text-center','rounded-lg','mt-5',
                'font-blod','text-sm','uppercase'
            );

            alertaExito.textContent = 'Mensaje enviado correctamente';
            Formulario.appendChild(alertaExito);

            setTimeout(() => {
                alertaExito.remove();
            }, 3000);    

        }, 1500);
        
    }
        function validar(e){
            // console.log(e.nextElementSibling)
            if(e.target.value.trim() === ''){
            //string metodo, para que elimine espacios en blanco 
                mostrarAlerta(`El campo ${e.target.id} es obligatorio`, e.target.parentElement);
                email[e.target.name]='';
                comprobarEmail();
                return
            }
          
            if(e.target.id ==='email' && !validarEmail(e.target.value)){
                mostrarAlerta('el email no es valido', e.target.parentElement);
                email[e.target.name]='';    
                comprobarEmail();
                return;
            }
            limpiarAlerta(e.target.parentElement);

            //asignar los valores
            email[e.target.name] = e.target.value.trim().toLowerCase();
            // console.log(email);

            //comprobar el objeto de email
            comprobarEmail();

        }
    //como detectar informacion del usuario 

    //funcion para mostrar alerta 
        function mostrarAlerta (mensaje, referencia){
            limpiarAlerta(referencia);
            //comprueba si ya existe una alerta, pero antes toca comprobar si ya existe un elemento
            // document.querySelector('.bg-red-600');
            // const alerta = referencia.querySelector('.bg-red-600');
            // if(alerta){
            //     alerta.remove();
            // }
            const error = document.createElement('P');
            error.textContent=mensaje;
            error.classList.add('bg-red-600', 'text-white', 'mt-2', 'text-center'); //se le agrera una clase 
            //inyectar error al formulario 
            referencia.appendChild(error); 
            // Formulario.innerHTML = error.innerHTML  //una forma 
           
        }

        function limpiarAlerta(referencia){
            const alerta = referencia.querySelector('.bg-red-600');
            if(alerta){
                alerta.remove();
            }
        }

        function validarEmail (email){
            const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ 
            const resultado = regex.test(email);
            return resultado; 
        }

        function comprobarEmail () {
            // console.log(Object.values(email)); //imprime el lado derecho del objeto 
            // console.log(Object.keys(email));  //imprime el lado izquierdo del objeto 
            // console.log(Object.values(email).includes('')); //la funcion includes va tomar los valores del objeto para asignarlos a un arreglo y comprube si alguno de los valores esta para retornarnos true 
            // console.log(email);
            if(Object.values(email).includes('')){
                //el codigo anteriro nos va a retornar true si algun esta vacio
                btnSumit.classList.add('opacity-50', 'cursor-not-allowed');
                btnSumit.disabled = true;
                return
            }
            btnSumit.classList.remove('opacity-50', 'cursor-not-allowed');
            btnSumit.disabled = false;
        }

       function ResetFormulario (){
        //reiniciar elementos del objeto
        email.email='';
        email.asunto='';
        email.mensaje='';
        Formulario.reset();
       // Limpiar todas las alertas
       limpiarTodasLasAlertas()
             
       }

       function limpiarTodasLasAlertas() {
        const alertas = Formulario.querySelectorAll('.bg-red-600');
        alertas.forEach(alerta => alerta.remove());
    }
 
});

