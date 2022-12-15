import { cidades } from '../dataEstadosMunicipios';

export function autoComplete() {
  let filterState = []
  cidades.forEach((todasCidades) => {
    todasCidades.forEach((Cidades)=>{
      filterState.push(Cidades.toLowerCase())
    })
  });
  return filterState
}
