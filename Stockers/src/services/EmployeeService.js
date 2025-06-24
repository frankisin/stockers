import axios from 'axios';

const EMPLOYEE_API_BASE_URL = "https://localhost:7067/LostBorn";

class EmployeeService{
    getEmployees(){
        return axios.get(EMPLOYEE_API_BASE_URL);
    }
    getEmployee(id){
        return axios.get(EMPLOYEE_API_BASE_URL+'/'+id);
    }
    createEmployee(employee){
        return axios.post(EMPLOYEE_API_BASE_URL,employee);
    }
    updateEmployee(employee){
        return axios.put(EMPLOYEE_API_BASE_URL,employee);
    }
    deleteEmployee(id){
        return axios.delete(EMPLOYEE_API_BASE_URL+'/'+id);
    }
}
export default new EmployeeService()