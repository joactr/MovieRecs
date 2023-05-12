import {React,useEffect,useState, Fragment} from 'react';
import './config.scss';


const Config = () => {
  const [demografico, setDemografico] = useState(false);
  const [contenido, setContenido] = useState(false);
  const [colaborativo, setColaborativo] = useState(false);
  const [init, setInit] = useState(false);
  const [nRecs,setNRecs] = useState(null)

  function textoRecomendador() {
    let numActivos = (contenido ? 1 : 0) + (demografico ? 1 : 0) + (colaborativo ? 1 : 0)
    let arrayRecomendadores = [false, false, false]

    if (demografico) { arrayRecomendadores[0] = true }
    if (contenido) { arrayRecomendadores[1] = true }
    if (colaborativo) { arrayRecomendadores[2] = true }
    if (numActivos >= 2) {
      return "Recomendador actual: Híbrido"
    } else if (numActivos === 0) {
      return "Sin recomendador, por favor seleccione uno."
    } else {
      if (arrayRecomendadores[0]) {//demografico
        return "Recomendador actual: Demográfico"
      }
      if (arrayRecomendadores[1]) {//contenido
        return "Recomendador actual: Basado en contenido"
      }
      if (arrayRecomendadores[2]) {//colaborativo
        return "Recomendador actual: Colaborativo"
      }
    }
      
  }

  useEffect(() => {
    let tipoRecs = localStorage.getItem("recomendador")
    tipoRecs = tipoRecs.split(",")
    var demog = (tipoRecs[0] === 'true');
    var conte = (tipoRecs[1] === 'true');
    var colab = (tipoRecs[2] === 'true');
    setDemografico(demog)
    setContenido(conte)
    setColaborativo(colab)
    setInit(true)
    setNRecs(localStorage.getItem("nRecs"))
  }, [])
  
  useEffect(() => {
    if(init)
      localStorage.setItem("recomendador", [demografico, contenido, colaborativo])
  }, [init, demografico, contenido, colaborativo])
  
  useEffect(() => {
    if(init)
      localStorage.setItem("nRecs", nRecs)
  }, [nRecs])


    return (
      <div className='configContainer'>
        <h2 className='labelCheckbox'>Seleccione su sistema recomendador deseado:</h2>
        <div className="checkboxConfig">
          <input type="checkbox"
            id="demografico"
            checked={demografico}
            onChange={()=> setDemografico(!demografico)}
          />
          <h3 className='labelCheckbox'>Demográfico</h3>
        </div>
        <div className="checkboxConfig">
          <input type="checkbox"
            id="contenido"
            checked={contenido}
            onChange={()=> setContenido(!contenido)}
          />
          <h3 className='labelCheckbox'>Basado en contenido</h3>
        </div>
        <div className="checkboxConfig">
          <input type="checkbox"
            id="colaborativo"
            checked={colaborativo}
            onChange={()=> setColaborativo(!colaborativo)}
          />
          <h3 className='labelCheckbox'>Colaborativo</h3>
        </div>
        <div className="result">
        <h3>{textoRecomendador()}</h3>
            
        </div>
        <div className="numRecsConfig">
          <h3>Número de recomendaciones:</h3>
          <select className="inputNumRecs" id="numRecs" onChange={(e)=>setNRecs(e.target.value)} value={nRecs}>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
            </select>
          </div>
      </div>
    );
  }

export default Config;