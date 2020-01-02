import React from 'react';
import { Switch } from 'react-router-dom';
import Route from './Route';

import SignIn from '~/pages/SignIn';

import Students from '~/pages/Students';
import StudentsNew from '~/pages/Students/New';
import StudentsEdit from '~/pages/Students/Edit';

import Plans from '~/pages/Plans';
import PlansAdd from '~/pages/Plans/New';
import PlansEdit from '~/pages/Plans/Edit';

import Registers from '~/pages/Register';
import RegistersAdd from '~/pages/Register/New';
import RegistersEdit from '~/pages/Register/Edit';

import Help from '~/pages/Help';

export default function Routes() {
  return (
    <Switch>
      <Route path="/" exact component={SignIn} />

      <Route path="/students" exact component={Students} isPrivate />
      <Route path="/students/new" component={StudentsNew} isPrivate />
      <Route path="/students/edit/:id" component={StudentsEdit} isPrivate />

      <Route path="/plans" exact component={Plans} isPrivate />
      <Route path="/plans/new" component={PlansAdd} isPrivate />
      <Route path="/plans/edit/:id" component={PlansEdit} isPrivate />

      <Route path="/registers" exact component={Registers} isPrivate />
      <Route path="/registers/new" component={RegistersAdd} isPrivate />
      <Route path="/registers/edit/:id" component={RegistersEdit} isPrivate />

      <Route path="/help" component={Help} isPrivate />
      <Route path="/help/answer" component={Help} isPrivate />
    </Switch>
  );
}
