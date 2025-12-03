import { createContext, useContext } from 'react';

export type Student = {
    id: number;
    name: string;
    email: string;
    course: string;
    edad: number;
};
//la "forma" que tendra contexto
type StudentContextType = {
    students: Student[];
    addStudent: (name: string, email: string, course: string, edad: number) => void;
    deleteStudent: (id: number) => void;
    editStudent: (id: number, name: string, email: string, course: string, edad: number) => void;
    getStudentById: (id: number) => Student | undefined;
    countStudents: () => Promise<number>;
};
// Un valor por defecto que coincide con el tipo, aunque el valor real vendrá del Provider en App.tsx.
export const StudentContext =
    createContext<StudentContextType>({
        students: [],
        addStudent: () => { },
        deleteStudent: () => { },
        editStudent: () => { },
        getStudentById: () => undefined,
        countStudents: () => Promise.resolve(0),
    });
//"Hook personalizado"
// Ahorra importar useContext y StudentContext en cada componente.
export const useStudents = () => {
    const context = useContext(StudentContext);
    if (!context) {
        throw new Error('useStudents debe ser usado dentro de un StudentProvider');
    }
    return context;
};