// 1. Clase Tarea con sus propiedades y métodos
class Tarea {
    constructor(nombre, estado = false) {
        this.nombre = nombre;
        this.estado = estado; // false = incompleta, true = completa
    }

    actualizarEstado() {
        this.estado = !this.estado;
    }

    editarContenido(nuevoNombre) {
        this.nombre = nuevoNombre;
    }
    
    
}

// 2. Clase GestorDeTareas para el almacenamiento
class GestorDeTareas {
    constructor() {
        this.tareas = [];
    }

    agregarTarea(nombre) { //esto agrega una tarea
        const nuevaTarea = new Tarea(nombre);
        this.tareas.push(nuevaTarea);
        this.mostrarEnDOM();
    }

    eliminarTarea(indice) { //esto elimina la tarea
        this.tareas.splice(indice, 1);
        this.mostrarEnDOM();
    }

    mostrarEnDOM() { //esto muestra las tareas en el DOM
        const listaUl = document.getElementById('lista-tareas');
        listaUl.innerHTML = '';

        this.tareas.forEach((tarea, indice) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span style="text-decoration: ${tarea.estado ? 'line-through' : 'none'}">
                    ${tarea.nombre}
                </span>
                <button class="status-btn">¿Listo?</button>
                <button class="edit-btn">Editar</button>
                <button class="delete-btn">Eliminar</button>
            `;

            // Asigna eventos usando los métodos de las clases
            li.querySelector('.status-btn').onclick = () => {
                tarea.actualizarEstado();
                this.mostrarEnDOM();
            };

            li.querySelector('.edit-btn').onclick = () => {
                const nuevo = prompt("Nuevo nombre:", tarea.nombre);
                if (nuevo) {
                    tarea.editarContenido(nuevo);
                    this.mostrarEnDOM();
                }
            };

            li.querySelector('.delete-btn').onclick = () => this.eliminarTarea(indice);

            listaUl.appendChild(li);
        });
    }
}

// Inicialización
const miGestor = new GestorDeTareas();
const botonAdd = document.getElementById('agregar-tarea');
const inputAdd = document.getElementById('Nueva-Tarea');

botonAdd.onclick = () => {
    if (inputAdd.value.trim()) {
        miGestor.agregarTarea(inputAdd.value);
        inputAdd.value = '';
    }
};