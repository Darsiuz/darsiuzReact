import { useState, useEffect, useRef } from 'react';
import { useStudents } from '../context/StudentContext';
import TituloContador from '../components/TituloContador';
import MiniPerfil from '../components/MiniPerfil';

import axios from 'axios';
import { toast } from 'react-toastify';
const API_GRADES = 'http://localhost:4000/api/grades';// se que se puede poner mas modular pero asi es mas rapido :D

export default function HomePage() {
    const modalOpeners = useRef<Record<number, Function>>({});
    const { students, deleteStudent, countStudents } = useStudents();
    const [total, setTotal] = useState(0);

    const [grades, setGrades] = useState<Record<number, number>>({});
    const [studentGrades, setStudentGrades] = useState<Record<number, any[]>>({});

    const handleSaveGrade = async (studentId: number, course: string) => {
        const score = grades[studentId];

        if (score === undefined || score < 0 || score > 20) {
            toast.error('Ingrese una nota válida (0 - 20)');
            return;
        }

        try {
            await axios.post(
                API_GRADES,
                {
                    student_id: studentId,
                    course: course,
                    score: score
                },
                {
                    headers: { 'x-secret-key': 'UTP2025' }
                }
            );

            toast.success('Nota registrada correctamente');
            setGrades(prev => ({ ...prev, [studentId]: undefined as any }));
            fetchGradesByStudent(studentId);
        } catch (error) {
            console.error(error);
            toast.error('Error al guardar la nota');
        }
    };

    const fetchGradesByStudent = async (studentId: number) => {
        try {
            const response = await axios.get(
                `${API_GRADES}/student/${studentId}`,
                {
                    headers: { 'x-secret-key': 'UTP2025' }
                }
            );

            setStudentGrades(prev => ({
                ...prev,
                [studentId]: response.data
            }));
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const fetchTotal = async () => {
            const totalCount = await countStudents();
            setTotal(totalCount);
        };
        fetchTotal();
        students.forEach(student => {
            fetchGradesByStudent(student.id);
        });
    }, [students]);

    return (
        <div>
            <TituloContador total={total} nombre="DAVID GALVEZ MONTUFAR" />
            <h2>Lista de Alumnos Registrados</h2>
            <hr />
            {students.length === 0 ? (
                <p className="text-muted">Aún no hay alumnos registrados. Ve a la pestaña "Registrar".</p>
            ) : (
                <div className="row">

                    {students.map(student => (
                        <div className="col-md-4" key={student.id}>
                            <div className="card mb-3">
                                <div className="card-body">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <h5 className="card-title">{student.name}</h5>
                                        <h5 className="card-subtitle mb-2 text-muted">ID: {student.id}</h5>
                                    </div>
                                    <p className="card-text">Curso: {student.course}</p>
                                    <p className="card-text">Email: {student.email}</p>
                                    {/* <p className="card-text">Edad: {student.edad}</p> */}
                                    <div className="mt-2">
                                        <div className="input-group input-group-sm">
                                            <input
                                                type="number"
                                                min={0}
                                                max={20}
                                                className="form-control"
                                                placeholder="Nota"
                                                value={grades[student.id] ?? ''}
                                                onChange={(e) =>
                                                    setGrades(prev => ({
                                                        ...prev,
                                                        [student.id]: Number(e.target.value)
                                                    }))
                                                }
                                            />
                                            <button
                                                className="btn btn-success"
                                                onClick={() => handleSaveGrade(student.id, student.course)}
                                            >
                                                Guardar
                                            </button>
                                        </div>
                                        {studentGrades[student.id]?.length > 0 && (
                                            <ul className="list-group list-group-flush mt-2">
                                                {studentGrades[student.id].map((grade) => (
                                                    <li
                                                        key={grade.id}
                                                        className="list-group-item d-flex justify-content-between p-1"
                                                    >
                                                        <span>{grade.course}</span>
                                                        <strong>{grade.score}</strong>
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>
                                </div>
                                <div className="d-flex justify-content-between align-items-center card-footer">
                                    <MiniPerfil
                                        id={student.id}
                                        name={student.name}
                                        email={student.email}
                                        course={student.course}
                                        edad={student.edad}
                                        onExposeOpen={(id, open) => {
                                            modalOpeners.current[id] = open;
                                        }}
                                    />
                                    <a href={`/edit/${student.id}`} className="btn btn-primary">Editar</a>
                                    <button className="btn btn-danger" onClick={() => deleteStudent(student.id)}>Eliminar</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}