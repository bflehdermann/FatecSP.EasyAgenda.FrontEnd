import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Collapse } from 'react-bootstrap';
import { connect } from 'react-redux';

class Nav extends Component {

  state = {};

  render() {
    let { location } = this.props;
    const acesso = localStorage.getItem('acesso')
    return (
      <ul className="nav">
        {acesso === "paciente" &&
          <li className={location.pathname === '/agendar-consulta' ? 'active' : null}>
            <Link to="/agendar-consulta">
              <i className="pe-7s-magic-wand"></i>
              <p>Agendar Consulta</p>
            </Link>
          </li>
        }
        {acesso === "paciente" &&
          <li className={this.isPathActive('/minhas-consultas') || this.state.consultaMenuOpen ? 'active' : null}>
            <a onClick={() => this.setState({ consultaMenuOpen: !this.state.consultaMenuOpen })}
              data-toggle="collapse">
              <i className="pe-7s-notebook"></i>
              <p>
                Minhas consultas
                <b className="caret"></b>
              </p>
            </a>
            <Collapse in={this.state.consultaMenuOpen}>
              <div>
                <ul className="nav">
                  <li className={this.isPathActive('/minhas-consultas/proximas-consultas') ? 'active' : null}>
                    <Link to="/minhas-consultas/proximas-consultas">Proximas Consultas</Link>
                  </li>
                  <li className={this.isPathActive('/minhas-consultas/consultas-anteriores') ? 'active' : null}>
                    <Link to="/minhas-consultas/consultas-anteriores">Consultas Anteriores</Link>
                  </li>
                </ul>
              </div>
            </Collapse>
          </li>
        }
        {acesso === "medico" &&
          <li className={this.isPathActive('/minha-agenda') ? 'active' : null}>
            <Link to="/minha-agenda">
              <i className="pe-7s-notebook"></i>
              <p>Minha Agenda</p>
            </Link>
          </li>
        }
      </ul>
    );
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }
}

export default withRouter(Nav);