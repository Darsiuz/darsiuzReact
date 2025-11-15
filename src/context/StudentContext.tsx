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
};
// 3. Creamos el Contexto
// Un valor por defecto que coincide con el tipo, aunque el valor real vendrá del Provider en App.tsx.
export const StudentContext =
    createContext<StudentContextType>({
        students: [],
        addStudent: () => { },
        deleteStudent: () => { },
    });
//"Hook personalizado"
// Esto nos ahorra importar useContext y StudentContext en cada componente.
export const useStudents = () => {
    const context = useContext(StudentContext);
    if (!context) {
        throw new Error('useStudents debe ser usado dentro de un StudentProvider');
    }
    return context;
};