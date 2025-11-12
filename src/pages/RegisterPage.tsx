import { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import { useStudents } from '../context/StudentContext';

export default function RegisterPage() {

    const [name, setName] = useState('');
    const [course, setCourse] = useState('');
    const [email, setEmail] = useState('');
    const [edad, setEdad] = useState(0);

    const { addStudent: onAddStudent } = useStudents();
    const navigate = useNavigate();
    // TAREA 2: useRef para acceder al DOM
    // 1. Creamos la referencia
    const nameInputRef = useRef<HTMLInputElement>(null);
    // TAREA 2: useEffect para hacer foco al cargar la pagina
    useEffect(() => {
        nameInputRef.current?.focus();
    }, []); // <-- Array vacío, se ejecuta 1 SOLA VEZ

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault(); // Evita que la página se recargue
        // Validación simple
        if (!name || !course || !email) {
            alert('Por favor completa todos los campos');
            return;
        }

        onAddStudent(name, course, email, edad);
        // Limpiar el formulario
        setName('');
        setCourse('');
        setEmail('');
        setEdad(0);

        navigate('/');
    };
    return (
        <div>
            <h2>Registrar Nuevo Alumno</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Nombre Completo</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        // TAREA 2: "Conectamos" el ref al input
                        // 3. Asignamos el ref al atributo 'ref' del input
                        ref={nameInputRef}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="course" className="form-label">Curso</label>
                    <input
                        type="text"
                        className="form-control"
                        id="course"
                        value={course}
                        onChange={(e) => setCourse(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="edad" className="form-label">Edad</label>
                    <input
                        type="number"
                        className="form-control"
                        id="edad"
                        value={edad === 0 ? '' : edad} // 1. El valor lo da el State
                        onChange={(e) => setEdad
                            (parseInt(e.target.value))} // 2. onChange actualiza el State
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Registrar
                </button>
            </form>
        </div>
    );
}