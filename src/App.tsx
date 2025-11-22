import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

import { StudentContext, type Student } from './context/StudentContext';

const API_URL = 'http://localhost:4000/api/students';

// Datos de prueba
// const INITIAL_STUDENTS: Student[] = [
//     { id: 1001, name: 'Carlos Gómez', email: 'carlos@example.com', course: 'JavaScript Avanzado', edad: 25 },
//     { id: 1002, name: 'Ana Torres', email: 'ana@example.com', course: 'React con TS', edad: 22 },
//     { id: 1003, name: 'Luis Pérez', email: 'luis@example.com', course: 'Node.js', edad: 28 },
// ];

function App() {

    const [students, setStudents] = useState<Student[]>([]);

    useEffect(() => {
        const fetchStudents = async () => {
            try {
                const response = await axios.get(API_URL);
                setStudents(response.data);
            } catch (error) {
                console.error('Error fetching students:', error);
                toast.error('Error al cargar los alumnos');
                setStudents([]); // Establecer un estado vacío en caso de error
            }
        };
        fetchStudents();
    }, []);

    const handleDeleteStudent = async (id: number) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            setStudents(prevStudents => prevStudents.filter(student => student.id !== id));
            toast.success('Alumno eliminado exitosamente');
        } catch (error) {
            console.error('Error eliminando estudiante:', error);
            toast.error('Error al eliminar el alumno');
        }
    };

    const handleAddStudent = async (name: string, email: string, course: string, edad: number) => {
        try {
            const newStudent = { name, email, course, edad };
            const response = await axios.post(API_URL, newStudent);
            setStudents(prevStudents => [...prevStudents, response.data]);
            toast.success('Alumno agregado exitosamente');
        } catch (error) {
            console.error('Error para crear estudiante:', error);
            toast.error('Error al agregar el alumno');
        }
    };

    return (
        // Envolvemos toda la app con el Provider y le pasamos el 'value'
        <StudentContext.Provider value={{
            students: students,
            addStudent: handleAddStudent,
            deleteStudent: handleDeleteStudent,
        }}>
            <ToastContainer />
            <Header />
            <div className="container mt-4">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/edit/:id" element={<RegisterPage />} />
                    <Route path="*" element={<h2>Página no encontrada</h2>} />
                </Routes>
            </div>
        </StudentContext.Provider>
    );

}
export default App;