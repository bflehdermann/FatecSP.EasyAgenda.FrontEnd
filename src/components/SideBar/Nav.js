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
          <li className={location.pathname === '/' ? 'active' : null}>
            <Link to="/">
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
        {
          <li className={this.isPathActive('/components') || this.state.componentMenuOpen ? 'active' : null}>
            <a onClick={() => this.setState({ componentMenuOpen: !this.state.componentMenuOpen })}
              data-toggle="collapse">
              <i className="pe-7s-plugin"></i>
              <p>
                Components
                <b className="caret"></b>
              </p>
            </a>
            <Collapse in={this.state.componentMenuOpen}>
              <div>
                <ul className="nav">
                  <li className={this.isPathActive('/components/buttons') ? 'active' : null}>
                    <Link to="/components/buttons">Buttons</Link>
                  </li>
                  <li className={this.isPathActive('/components/grid') ? 'active' : null}>
                    <Link to="/components/grid">Grid System</Link>
                  </li>
                  <li className={this.isPathActive('/components/icons') ? 'active' : null}>
                    <Link to="/components/icons">Icons</Link>
                  </li>
                  <li className={this.isPathActive('/components/notifications') ? 'active' : null}>
                    <Link to="/components/notifications">Notifications</Link>
                  </li>
                  <li className={this.isPathActive('/components/panels') ? 'active' : null}>
                    <Link to="/components/panels">Panels</Link>
                  </li>
                  <li className={this.isPathActive('/components/sweetalert') ? 'active' : null}>
                    <Link to="/components/sweetalert">Sweet Alert</Link>
                  </li>
                  <li className={this.isPathActive('/components/typography') ? 'active' : null}>
                    <Link to="/components/typography">Typography</Link>
                  </li>
                </ul>
              </div>
            </Collapse>
          </li>
       }{
          <li className={this.isPathActive('/forms') || this.state.formMenuOpen ? 'active' : null}>
            <a onClick={() => this.setState({ formMenuOpen: !this.state.formMenuOpen })} data-toggle="collapse">
              <i className="pe-7s-note2"></i>
              <p>Forms <b className="caret"></b></p>
            </a>
            <Collapse in={this.state.formMenuOpen}>
              <div>
                <ul className="nav">
                  <li className={this.isPathActive('/forms/regular-forms') ? 'active' : null}>
                    <Link to="/forms/regular-forms">Regular Forms</Link>
                  </li>
                  <li className={this.isPathActive('/forms/extended-forms') ? 'active' : null}>
                    <Link to="/forms/extended-forms">Extended Forms</Link>
                  </li>
                  <li className={this.isPathActive('/forms/validation-forms') ? 'active' : null}>
                    <Link to="/forms/validation-forms">Validation Forms</Link>
                  </li>
                </ul>
              </div>
            </Collapse>
          </li>
       }{
          <li className={this.isPathActive('/calendar') ? 'active' : null}>
            <Link to="/calendar">
              <i className="pe-7s-date"></i>
              <p>Calendar</p>
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