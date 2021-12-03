import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import cx from 'classnames';
import { setMobileNavVisibility } from '../../reducers/Layout';
import { withRouter } from 'react-router-dom';

import Footer from './Footer';
import SideBar from '../../components/SideBar';
/**
 * Pages
 */
import Components from '../Components';
import UserProfile from '../UserProfile';
import Forms from '../Forms';
import Calendar from '../Calendar';
import AgendarConsulta from '../AgendarConsulta';
import MinhaAgenda from '../MinhaAgenda';
import MinhasConsultas from '../MinhasConsultas';

const Main = ({
  mobileNavVisibility,
  hideMobileMenu,
  history
}) => {
  history.listen(() => {
    if (mobileNavVisibility === true) {
      hideMobileMenu();
    }
  });
  return (
    <div className={cx({
      'nav-open': mobileNavVisibility === true
    })}>
      <div className="wrapper">
        <div className="close-layer" onClick={hideMobileMenu}></div>
        <SideBar />

        <div className="main-panel">
          <Route path="/profile" component={UserProfile} />
          <Route exact path="/" component={AgendarConsulta} />
          <Route path="/minha-agenda" component={MinhaAgenda} />
          <Route path="/minhas-consultas" component={MinhasConsultas} />
          <Route path="/components" component={Components} />
          <Route path="/forms" component={Forms} />
          <Route path="/calendar" component={Calendar} />
          <Footer />
        </div>
      </div>
    </div>
  )
};

const mapStateToProp = state => ({
  mobileNavVisibility: state.Layout.mobileNavVisibility
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  hideMobileMenu: () => dispatch(setMobileNavVisibility(false))
});

export default withRouter(connect(mapStateToProp, mapDispatchToProps)(Main));