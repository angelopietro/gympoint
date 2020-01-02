import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { signOut } from '~/store/modules/auth/actions';

import logo from '~/assets/logo-header.svg';
import { Container, Content, Line, Profile, ButtonLogout } from './styles';

export default function Header() {
  const profile = useSelector(state => state.user.profile);
  const dispatch = useDispatch();
  function handleSignOut() {
    dispatch(signOut());
  }

  return (
    <Container>
      <Content>
        <nav>
          <Link to="/">
            <img src={logo} alt="Gympoint" />
          </Link>

          <Line />

          <ul>
            <li>
              <NavLink to="/students" activeClassName="active">
                Alunos
              </NavLink>
            </li>
            <li>
              <NavLink to="/plans" activeClassName="active">
                Planos
              </NavLink>
            </li>
            <li>
              <NavLink to="/registers" activeClassName="active">
                Matrículas
              </NavLink>
            </li>
            <li>
              <NavLink to="/help" activeClassName="active">
                Pedidos de auxílio
              </NavLink>
            </li>
          </ul>
        </nav>

        <aside>
          <Line />
          <Profile>
            <div>
              <strong>{profile.name}</strong>
              <ButtonLogout type="button" onClick={handleSignOut}>
                Sair do sisema
              </ButtonLogout>
            </div>
          </Profile>
        </aside>
      </Content>
    </Container>
  );
}
