import React from 'react';
import { Route } from 'react-router-dom';
import ConsultasAnteriores from './ConsultasAnteriores';
import ProximasConsultas from './ProximasConsultas';

const MinhasConsultas = ({match}) => (
  <div className="content">
    <Route path={`${match.url}/proximas-consultas`} component={ProximasConsultas} />
    <Route path={`${match.url}/consultas-anteriores`} component={ConsultasAnteriores} />
  </div>
);

export default MinhasConsultas;