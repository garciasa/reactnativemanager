import React from 'react';
import { Router, Scene, Actions } from 'react-native-router-flux';
import LoginForm from './components/LoginForm';
import EmployeeList from './components/EmployeeList';
import EmployeeCreate from './components/EmployeeCreate';

const RouterComponent = () => {
  return(
    <Router sceneStyle={{ paddingTop: 65}}>
      <Scene key="auth">
        <Scene key="login" component={LoginForm} title="Please Login" />
      </Scene>
      <Scene key="main">
        <Scene
          key="employeeList"
          component={EmployeeList}
          title="Employee List"
          rightTitle="Add"
          onRight={()=> Actions.employeeCreate()}
          initial />

            <Scene key="employeeCreate" component={EmployeeCreate} title="Create Employee" />
      </Scene>

    </Router>
  );
};

export default RouterComponent;
