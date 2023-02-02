import { useState, useEffect } from "react"
import Mensaje from "./Mensaje";
import cerrarModal from "../img/cerrar.svg"

const Modal = ({setModal, AnimarModal, setAnimarModal, guardarGasto, gastoEditar, setGastoEditar}) => {

    const [mensaje, setMensaje] = useState("");
    const [id, setId] = useState('');
    const [fecha, setFecha] = useState('')
    const [nombre, setNombre] = useState("");
    const [cantidad, setCantidad] = useState("");
    const [categoria, setCategoria] = useState("");

    useEffect(() => {
        if(Object.keys(gastoEditar).length > 0){
            setNombre(gastoEditar.nombre);
            setCantidad(gastoEditar.cantidad);
            setCategoria(gastoEditar.categoria)
            setId(gastoEditar.id)
            setFecha(gastoEditar.fecha)
          }
    }, [])

    const btnCerrarModal = () => {
        setAnimarModal(false)
        setGastoEditar({})
        setTimeout(() => {
            setModal(false)
        }, 450);
    }

    function handleSubmit (e) {
        e.preventDefault();
        
        if([nombre, cantidad, categoria].includes("")){
            setMensaje("Todos los campos son obligatorios")

            setTimeout(() => {
                setMensaje("")
            }, 3000);
            return
        }
        guardarGasto({nombre, cantidad, categoria, id, fecha})
    }

  return (
    <div className="modal">
        <div className="cerrar-modal">
            <img src={cerrarModal} alt="cerrar modal" onClick={btnCerrarModal} />
        </div>

        <form onSubmit={handleSubmit} className={`formulario ${AnimarModal ? "animar" : "cerrar"}`} action="">
            <legend>{gastoEditar.nombre ? "Editar Gasto" : "Nuevo Gasto"}</legend>
            {mensaje && <Mensaje tipo="error">{mensaje}</Mensaje>}

            <div className="campo">
                <label htmlFor="nombre">Nombre Gasto</label>

                <input 
                id="nombre" 
                type="text" 
                placeholder="Añade el nombre del gasto" 
                value={nombre}
                onChange={e => setNombre(e.target.value)}
                />
            </div>

            <div className="campo">
                <label htmlFor="nombre">Cantidad</label>

                <input 
                id="cantidad" 
                type="number" 
                placeholder="Añade la cantidad del gasto"
                value={cantidad}
                onChange={e => setCantidad(Number(e.target.value))} />
            </div>

            <div className="campo">
                <label htmlFor="categoria">Categoría</label>

                <select 
                name="" 
                id="categoria"
                value={categoria}
                onChange={e => setCategoria(e.target.value)}
                >
                    <option value="">-- Seleccione</option>
                    <option value="ahorro">Ahorro</option>
                    <option value="comida">Comida</option>
                    <option value="casa">Casa</option>
                    <option value="gastos">Gastos Varios</option>
                    <option value="ocio">Ocio</option>
                    <option value="salud">Salud</option>
                    <option value="suscripciones">Suscripciones</option>
                </select>
            </div>

            <input type="submit" value={gastoEditar.nombre ? "Guardar cambios" : "Guardar Gastos"}/>
        </form>
    </div>
  )
}

export default Modal