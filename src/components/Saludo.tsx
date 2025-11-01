type Props = {
    nombre: string;
    edad?: number; // campo opcional
};
export default function Saludo({ nombre, edad }: Props) {
    return (
        <div className="card mb-2">
            <div className="card-body">
                <h5 className="card-title">Salute, {nombre}!</h5>
                <p className="card-text">
                    {edad ? `Edad aproximada: ${edad}` : "Edad no disponible"}
                </p>
                <button
                    className="btn btn-primary"
                    onClick={() => alert(`Saludando a ${nombre}`)}
                >
                    Hola
                </button>
            </div>
        </div>
    );
}