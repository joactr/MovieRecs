import {React,useEffect,useState, Fragment} from 'react';
import './config.scss';


const Config = () => {
    const [demografico, setDemografico] = useState(false);
    const [contenido, setContenido] = useState(false);
    const [colaborativo, setColaborativo] = useState(false);

    function textoRecomendador(){
        let numActivos = (contenido?1:0) + (demografico?1:0) + (colaborativo?1:0)
        let arrayRecomendadores = [false,false,false]
        if(demografico){arrayRecomendadores[0]=true}
        if(contenido){arrayRecomendadores[1]=true}
        if(colaborativo){arrayRecomendadores[2]=true}
        localStorage.setItem("recomendador",arrayRecomendadores)
        if(numActivos >= 2){
            return "Recomendador actual: Híbrido"
        }else if(numActivos === 0){
            return "Sin recomendador, por favor seleccione uno."
        }else{
            if(arrayRecomendadores[0]){//demografico
                return "Recomendador actual: Demográfico"}
            if(arrayRecomendadores[1]){//contenido
                return "Recomendador actual: Basado en contenido"}
            if(arrayRecomendadores[2]){//colaborativo
                return "Recomendador actual: Colaborativo"}
        }
        localStorage.setItem("recomendador",arrayRecomendadores)

    }
  
  
    return (
      <div className='configContainer'>
        Seleccione su sistema recomendador deseado:
        <div className="checkboxConfig">
          <input type="checkbox"
            id="demografico"
            checked={demografico}
            onChange={()=> setDemografico(!demografico)}
          />
          <label className='labelCheckbox'>Demográfico</label>
        </div>
        <div className="checkboxConfig">
          <input type="checkbox"
            id="contenido"
            checked={contenido}
            onChange={()=> setContenido(!contenido)}
          />
          <label className='labelCheckbox'>Basado en contenido</label>
        </div>
        <div className="checkboxConfig">
          <input type="checkbox"
            id="colaborativo"
            checked={colaborativo}
            onChange={()=> setColaborativo(!colaborativo)}
          />
          <label className='labelCheckbox'>Colaborativo</label>
        </div>
        <div className="result">
            {textoRecomendador()}
        </div>
        <label>Número de recomendaciones:</label>
        <select className="inputNumRecs" id="numRecs">
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
        </select>
      </div>
    );
  }

export default Config;