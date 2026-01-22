
document.addEventListener('DOMContentLoaded', () => { // esto asegura que el DOM esté cargado
    const tareaInput = document.getElementById('Nueva-Tarea');
    const botonAgregar = document.getElementById('agregar-tarea');
    const listaTareas = document.getElementById('lista-tareas');

    let tareas = JSON.parse(localStorage.getItem('misTareas')) || []; // carga las tareas que ya existen

    tareas.forEach(tarea => crearElementoTarea(tarea)); // por cada tarea existente, crea un elemento en la lista

    botonAgregar.addEventListener('click', () => {
        const texto = tareaInput.value.trim(); //trim para eliminar espacios en blanco
        if (texto === '') return; // no agregar tareas vacías

        const nuevaTarea = { // crea un objeto tarea
            texto: texto,
            hecha: false
        };

        tareas.push(nuevaTarea); // agrega la nueva tarea al array
        guardar();
        crearElementoTarea(nuevaTarea);
        tareaInput.value = '';
    });

    function crearElementoTarea(tarea) {// funcion para crear el elemento de la tarea en el DOM
        const li = document.createElement('li');

        const spanTexto = document.createElement('span');// elemento para el texto de la tarea
        spanTexto.textContent = tarea.texto;// asigna el texto de la tarea
        if (tarea.hecha) spanTexto.style.textDecoration = 'line-through';// si la tarea está hecha, la tacha

        const divBotones = document.createElement('div');

        const btnListo = document.createElement('button');
        btnListo.textContent = 'Listo';
        btnListo.onclick = () => {
            tarea.hecha = !tarea.hecha;
            spanTexto.style.textDecoration =
                tarea.hecha ? 'line-through' : 'none';
            guardar();
        };

        const btnEditar = document.createElement('button');
        btnEditar.textContent = 'Editar';
        btnEditar.classList.add('edit-btn');   // 👈 CLAVE
        btnEditar.onclick = () => {
            const nuevoTexto = prompt("Editar tarea:", tarea.texto);
            if (nuevoTexto && nuevoTexto.trim() !== '') {   
                tarea.texto = nuevoTexto.trim();
                spanTexto.textContent = tarea.texto;
                guardar();
            }
        };

        const btnEliminar = document.createElement('button');
        btnEliminar.textContent = 'Eliminar';
        btnEliminar.classList.add('delete-btn'); // 👈 CLAVE
        btnEliminar.onclick = () => {
            tareas = tareas.filter(t => t !== tarea);
            guardar();
            li.remove();
        };

        divBotones.appendChild(btnListo);
        divBotones.appendChild(btnEditar);
        divBotones.appendChild(btnEliminar);

        li.appendChild(spanTexto);
        li.appendChild(divBotones);
        listaTareas.appendChild(li);
    }

    function guardar() {
        localStorage.setItem('misTareas', JSON.stringify(tareas));
    }
});
