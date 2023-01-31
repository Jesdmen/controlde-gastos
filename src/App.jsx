import { useState } from 'react'
import Header from './components/Header'
import Modal from './components/Modal'
import ListadoGastos from './components/ListadoGastos'
import { generarId } from './helpers'
import IconoNuevoGasto from "./img/nuevo-gasto.svg"


function App() {

  const [presupuesto, setPresupuesto] = useState(0);
  const [isValidPresupuesto, setIsValidPresupuesto] = useState(false);
  const [modal, setModal] = useState(false);
  const [AnimarModal, setAnimarModal] = useState(false);

  const [gastos, setGastos] = useState([])

  const handleNuevoGasto = () => {
    setModal(true)

    setTimeout(() => {
      setAnimarModal(true)
    }, 450);
  }

  const guardarGasto = gasto => {
    gasto.id = generarId();
    gasto.fecha = Date.now()
    setGastos([...gastos, gasto])

    setAnimarModal(false)

        setTimeout(() => {
            setModal(false)
        }, 450);
  }

  return (
    <div className={modal ? 'fijar' : ''}>
      <Header
        gastos={gastos}
        presupuesto={presupuesto}
        setPresupuesto= {setPresupuesto}
        isValidPresupuesto= {isValidPresupuesto}
        setIsValidPresupuesto= {setIsValidPresupuesto}
      />

      {isValidPresupuesto && (
        <>
          <main>
            <ListadoGastos 
              gastos={gastos}
            />
          </main>
          <div className='nuevo-gasto'>
            <img src={IconoNuevoGasto} alt="Icono nuevo gasto" onClick={handleNuevoGasto}/>
          </div> 
        </> 
      )}

      {modal && (
        <Modal 
          setModal={setModal}
          AnimarModal={AnimarModal} 
          setAnimarModal={setAnimarModal} 
          guardarGasto={guardarGasto}
        />
      )}
      
    </div>
  )
}

export default App
