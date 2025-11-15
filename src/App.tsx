import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';
import axios from 'axios';

import { StudentContext, type Student } from './context/StudentContext';

const API_URL = 'http://localhost:4000/api/students';

// Datos de prueba (simulando una API)
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
                setStudents([]); // Establecer un estado vacío en caso de error
            }
        };
        fetchStudents();
    }, []);

    const handleDeleteStudent = async (id: number) => {
        try {
            await axios.delete(`${API_URL}/${id}`);
            setStudents(prevStudents => prevStudents.filter(student => student.id !== id));
        } catch (error) {
            console.error('Error deleting student:', error);
        }
    };

    const handleAddStudent = async (name: string, email: string, course: string, edad: number) => {
        try {
            const newStudent = { name, email, course, edad };
            const response = await axios.post(API_URL, newStudent);
            setStudents(prevStudents => [...prevStudents, response.data]);
        } catch (error) {
            console.error('Error para crear estudiante:', error);
        }
    };
    return (
        // TAREA 3: Proveer el contexto
        // Envolvemos toda la app con el Provider y le pasamos el 'value'
        <StudentContext.Provider value={{ students: students, addStudent: handleAddStudent, deleteStudent: handleDeleteStudent }}>
            <Header />
            <div className="container mt-4">
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/register" element={<RegisterPage />} />
                </Routes>
            </div>
        </StudentContext.Provider>
    );

}
export default App;