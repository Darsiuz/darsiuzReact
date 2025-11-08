import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {
    onAddStudent: (name: string, course: string, email: string, edad: number) => void;
};
export default function RegisterPage({ onAddStudent }: Props) {

    const [name, setName] = useState('');
    const [course, setCourse] = useState('');
    const [email, setEmail] = useState('');
    const [edad, setEdad] = useState(0);


    const navigate = useNavigate();
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
                        value={name} // 1. El valor lo da el State
                        onChange={(e) => setName
                            (e.target.value)} // 2. onChange actualiza el State
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="course" className="form-label">Curso</label>
                    <input
                        type="text"
                        className="form-control"
                        id="course"
                        value={course} // 1. El valor lo da el State
                        onChange={(e) => setCourse
                            (e.target.value)} // 2. onChange actualiza el State
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        value={email} // 1. El valor lo da el State
                        onChange={(e) => setEmail
                            (e.target.value)} // 2. onChange actualiza el State
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
    )
}