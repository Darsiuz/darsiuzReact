import { useState, useRef, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useStudents } from '../context/StudentContext';

export default function EditStudent() {

    const { id } = useParams();
    const { getStudentById, editStudent } = useStudents();

    const student = id ? getStudentById(Number(id)) : null;

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [course, setCourse] = useState('');
    const [edad, setEdad] = useState(0);

    const navigate = useNavigate();

    const nameInputRef = useRef<HTMLInputElement>(null);
    const emailInputRef = useRef<HTMLInputElement>(null);
    const courseInputRef = useRef<HTMLInputElement>(null);
    const edadInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (student) {
            setName(student.name);
            setEmail(student.email);
            setCourse(student.course);
            setEdad(student.edad);
        }
        nameInputRef.current?.focus();
    }, [student]);

    if (!student) {
        return <h2>Alumno no encontrado</h2>;
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!name || !course || !email) {
            alert('Por favor completa todos los campos');
            return;
        }

        editStudent(student.id, name, email, course, edad);

        navigate('/');
    };

    return (
        <div className='card card-body'>
            <h2>Editar Alumno</h2>

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
                        value={edad}
                        onChange={(e) => setEdad(parseInt(e.target.value))}
                        ref={edadInputRef}
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    Actualizar
                </button>
            </form>
        </div>
    );
}
