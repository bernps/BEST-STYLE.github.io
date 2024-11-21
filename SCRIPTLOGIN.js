const formulario=document.getElementById('login-form');
const ingresarBtn = document.getElementById('íngresar-btn');
const usuarioInput = document.getElementById('usuario');
const contraseñaInput = document.getElementById('contraseña');

formulario.addEventListener('submit', (e) =>{
    e.preventDefault();
    if(usuarioInput.value&&contraseñaInput.value){
        window.location.href='INDEX.html'
    }else{
        alert('Por favor complete ambos campos');
    }
});

ingresarBtn.addEventListener('click', () => {
formulario.onsubmit();
});

document.addEventListener('keydown', (e) =>
{
    if(e.key === 'Enter'){
        formulario.submit();
    }
});