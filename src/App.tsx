import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import RegisterPage from './pages/RegisterPage';

import { StudentContext, type Student } from './context/StudentContext';

// Datos iniciales para la Tarea 1 (simulando una API)
const INITIAL_STUDENTS: Student[] = [
    { id: 1001, name: 'Alvaro Maravi', email: 'alvaro@example.com', course: 'JavaScript Avanzado', edad: 25 },
    { id: 1002, name: 'Ana Torres', email: 'ana@example.com', course: 'React con TS', edad: 22 },
];

function App() {

    const [students, setStudents] = useState<Student[]>([]);
    //==========================================================
    // TAREA 1: useEffect para simular carga de API
    //==========================================================
    useEffect(() => {
        const timer = setTimeout(() => {
            setStudents(INITIAL_STUDENTS);
        }, 500);
        // (Opcional) Buena práctica: limpiar el timer si el componente se desmonta
        return () => clearTimeout(timer);
    }, []); // <-- Array de dependencias VACÍO. Se ejecuta 1 SOLA VEZ al montar.
    //==========================================================

// La lógica para añadir estudiantes sigue siendo la misma
const handleAddStudent = (name: string, email: string, course: string, edad: number) => {
    const newStudent: Student = {
        id: Date.now(),
        name: name,
        email: email,
        course: course,
        edad: edad,
    };
// Actualizamos el estado, añadiendo el nuevo estudiante
setStudents(prevStudents => [...prevStudents, newStudent]);
};
    return (
        // TAREA 3: Proveer el contexto
        // Envolvemos toda la app con el Provider y le pasamos el 'value'
        <StudentContext.Provider value={{ students: students, addStudent: handleAddStudent }}>
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