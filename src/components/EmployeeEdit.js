import React from 'react';
import { connect } from 'react-redux';
import Communications from 'react-native-communications';
import _ from 'lodash';

import { employeeUpdate, employeeSave, employeeDelete } from '../actions';
import { Card, CardSection, Button, Confirm } from './common';
import EmployeeForm from './EmployeeForm';

class EmployeeEdit extends React.Component {
  state = {
    showModal: false
  };

  componentWillMount(){
    _.each(this.props.employee, (value,prop) => {
      this.props.employeeUpdate({ prop, value });
    });
  }

  onButtonSavePress(){
    const { name, phone, shift } = this.props;
    this.props.employeeSave({
      name,
      phone,
      shift,
      uid: this.props.employee.uid
    });
  }

  onButtonDeletePress(){
    this.setState({showModal: true});
  }

  onButtonTextPress(){
    const { phone, shift }  = this.props;
    Communications.text(phone, `Your upcoming shift is on ${shift}`);
  }
  onPressModalYes(){
    const { uid } = this.props.employee;
    this.props.employeeDelete({ uid });
  }

  onPressModalNo(){
    this.setState({showModal: false});
  }

  render() {
    return (
      <Card>
        <EmployeeForm />
        <CardSection>
          <Button onPress={this.onButtonSavePress.bind(this)}>
            Save Changes
          </Button>
        </CardSection>
        <CardSection>
          <Button onPress={this.onButtonTextPress.bind(this)}>
            Text
          </Button>
        </CardSection>
        <CardSection>
          <Button onPress={this.onButtonDeletePress.bind(this)}>
            Delete
          </Button>
        </CardSection>
        <Confirm
          visible={this.state.showModal}
          onAccept={this.onPressModalYes.bind(this)}
          onCancel={this.onPressModalNo.bind(this)}
        >
          Are you sure?
        </Confirm>
      </Card>
    );
  }

}
const mapStateToProps = (state) => {
  const { name, phone, shift } = state.employeeForm;
  return { name, phone, shift };
};

export default connect(mapStateToProps,{
  employeeUpdate,
  employeeSave,
  employeeDelete,
})(EmployeeEdit);
