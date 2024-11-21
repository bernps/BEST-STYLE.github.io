const formulario = document.getElementById('register-form');
const registrarBtn = document.getElementById('btn-registrar');
const nombreInput = document.getElementById('nombre');
const apellidosInput = document.getElementById('apellidos');
const correoInput = document.getElementById('correo');
const contraseñaInput = document.getElementById('contraseña');
const confirmarContraseñaInput = document.getElementById('confirmar');

formulario.addEventListener('submit', (e) => {
  e.preventDefault();
  
  if (nombreInput.value && apellidosInput.value && correoInput.value && contraseñaInput.value && confirmarContraseñaInput.value) {
    if (contraseñaInput.value === confirmarContraseñaInput.value) {
      window.location.href = 'INDEX.html';
    } else {
      alert('Las contraseñas no coinciden');
    }
  } else {
    alert('Por favor, complete todos los campos');
  }
});

registrarBtn.addEventListener('click', () => {
  formulario.submit();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    if (!(nombreInput.value && apellidosInput.value && correoInput.value && contraseñaInput.value && confirmarContraseñaInput.value)) {
      alert('Por favor, complete todos los campos');
      e.preventDefault();
    } else {
      formulario.submit();
    }
  }
});

// Agregar evento keydown para cambiar de input a input con Enter
nombreInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && nombreInput.value) {
    apellidosInput.focus();
    e.preventDefault();
  }
});

apellidosInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && apellidosInput.value) {
    correoInput.focus();
    e.preventDefault();
  }
});

correoInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && correoInput.value) {
    contraseñaInput.focus();
    e.preventDefault();
  }
});

contraseñaInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && contraseñaInput.value) {
    confirmarContraseñaInput.focus();
    e.preventDefault();
  }
});

confirmarContraseñaInput.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && confirmarContraseñaInput.value) {
    formulario.submit();
  }
});
