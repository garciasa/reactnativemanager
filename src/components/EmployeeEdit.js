import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';

import { employeeUpdate, employeeSave } from '../actions';
import { Card, CardSection, Button } from './common';
import EmployeeForm from './EmployeeForm';

class EmployeeEdit extends React.Component {
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
    const { name, phone, shift } = this.props;
    console.log(name, phone, shift);
  }

  render() {
    return (
      <Card>
        <EmployeeForm />
        <CardSection>
          <Button onPress={this.onButtonSavePress.bind(this)}>
            Save Changes
          </Button>
          <Button onPress={this.onButtonDeletePress.bind(this)}>
            Delete
          </Button>
        </CardSection>
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
})(EmployeeEdit);
