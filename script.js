document.addEventListener('DOMContentLoaded', () => {
    // 1. Referencias
    const tareaInput = document.getElementById('Nueva-Tarea');
    const botonAgregar = document.getElementById('agregar-tarea');
    const listaTareas = document.getElementById('lista-tareas');

    // 2. Cargar tareas guardadas
    const tareasGuardadas = JSON.parse(localStorage.getItem('misTareas')) || [];
    tareasGuardadas.forEach(tarea => crearElementoTarea(tarea));

    // 3. Evento del botón
    botonAgregar.addEventListener('click', () => {
        const texto = tareaInput.value.trim();
        if (texto === '') return;

        crearElementoTarea(texto);
        guardarEnLocalStorage(texto);
        tareaInput.value = '';
    });

    // 4. Función para crear elemento (dentro del scope)
    function crearElementoTarea(texto) {
        const li = document.createElement('li');
        li.textContent = texto;
        listaTareas.appendChild(li);
    }

    // 5. Función para guardar (dentro del scope)
    function guardarEnLocalStorage(tarea) {
        let tareas = JSON.parse(localStorage.getItem('misTareas')) || [];
        tareas.push(tarea);
        localStorage.setItem('misTareas', JSON.stringify(tareas));
    }
});