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

    // 1. Creamos la referencia
    const nameInputRef = useRef<HTMLInputElement>(null);
    const emailInputRef = useRef<HTMLInputElement>(null);
    const courseInputRef = useRef<HTMLInputElement>(null);
    const edadInputRef = useRef<HTMLInputElement>(null);
    // TAREA 2: useEffect para hacer foco al cargar la pagina
    useEffect(() => {
        nameInputRef.current?.focus();
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !course || !email) {
            alert('Por favor completa todos los campos');
            return;
        }
        onAddStudent(name, course, email, edad);
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
                        ref={emailInputRef}
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
                        ref={courseInputRef}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="edad" className="form-label">Edad</label>
                    <input
                        type="number"
                        className="form-control"
                        id="edad"
                        value={edad === 0 ? '' : edad} // 1. El valor lo da el State
                        onChange={(e) => setEdad(parseInt(e.target.value))}
                        ref={edadInputRef}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Registrar
                </button>
            </form>
        </div>
    );
}