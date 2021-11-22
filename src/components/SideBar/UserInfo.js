import React, { Component } from 'react';
import { Collapse } from 'react-bootstrap';
import { connect } from 'react-redux';
import cx from 'classnames';
import Alert from 'sweetalert-react';

class UserInfo extends Component {

  state = {
    isShowingUserMenu: false
  };

  logout = () =>{
    localStorage.clear()
    window.location.reload()
  }

  render() {
    let { user } = this.props;
    let { isShowingUserMenu } = this.state;
    return (
      <div className="user-wrapper">
        <div className="user">
          <img src={user.image} alt={user.nome} className="photo" />
          <div className="userinfo">
            <div className="username">
              {user.nome}
            </div>
            <div className="title">{user.type}</div>
          </div>
          <span
            onClick={() => this.setState({ isShowingUserMenu: !this.state.isShowingUserMenu })}
            className={cx("pe-7s-angle-down collapse-arrow", {
              active: isShowingUserMenu
            })}></span>
        </div>
        <Collapse in={isShowingUserMenu}>
          <ul className="nav user-nav">
            <li><a href="#/profile">Editar Perfil</a></li>
            <li>
              <a onClick={() => this.setState({ message5: true })}>Logout</a>
              <Alert
                title="Tem certeza que deseja sair?"
                show={this.state.message5}
                text="Dados não salvos serão perdidos"
                showCancelButton
                onConfirm={() => this.logout()}
                onCancel={() => this.setState({ message5: false })} />
            </li>

          </ul>
        </Collapse>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state.Auth.user
});

export default connect(mapStateToProps)(UserInfo);