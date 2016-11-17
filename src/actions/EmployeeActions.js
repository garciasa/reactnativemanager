import {
EMPLOYEE_UPDATE
} from './types';

export const employeeUpdate = ({ prop, update }) => {
  return {
    type: EMPLOYEE_UPDATE,
    payload: { prop, update }
  };
};
