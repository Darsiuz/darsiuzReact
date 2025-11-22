type TituloContadorProps = {
    total?: number;
    nombre?: string;
};

export default function TituloContador({ total, nombre }: TituloContadorProps) {
    return (
        <div className="alert alert-primary" role="alert">
            <center>
                {nombre ? (
                    <h2>SISTEMA de {nombre}</h2>
                ) : (
                    <h2>SISTEMA de DARSIUZ</h2>
                )}
            </center>
            <center>
                {total && (
                    <h3>Total de alumnos: <div className="badge bg-secondary">{total}</div></h3>
                )}
            </center>
        </div>
    );
}
