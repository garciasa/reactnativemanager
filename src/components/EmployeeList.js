import React from 'react';
import { connect } from 'react-redux';
import { ListView } from 'react-native';
import _ from 'lodash';

import ListItem from './ListItem';
import { employeesFETCH } from '../actions';

class EmployeeList extends React.Component {
  componentWillMount(){
    this.props.employeesFETCH();
    this.createDataSource(this.props);
  }

  componentWillReceiveProps(nextProps){
    //nextProps are the next set of  props
    //this.props is still the old set of props
    this.createDataSource(nextProps);
  }
  //we need initialize the datasource when go back from create users
  //and the first time we load data. So we create a helper method
  //for reusing in both cases.
  createDataSource({ employees }) {
    const ds = new ListView.DataSource({
      rowHasChanged: (r1,r2) => r1 != r2
    });
    this.dataSource = ds.cloneWithRows(employees);
  }

  renderRow(employee){
    return <ListItem employee={employee} />;
  }

  render() {
    return (
      <ListView
        enableEmptySections
        dataSource={this.dataSource}
        renderRow={this.renderRow}
        />
    );
  }

}

//We have to conver our object from objects (firebase) to an array
//since cloneWithRows expects an array rather than object with objects.
const mapStateToProps = state =>{
  const employees = _.map(state.employees, (val, uid) => {
    return { ...val, uid }; //{ shift: 'moday',..., uid: 'poia0234fja'}
  });
  return { employees };
}

export default connect(mapStateToProps, { employeesFETCH })(EmployeeList);
