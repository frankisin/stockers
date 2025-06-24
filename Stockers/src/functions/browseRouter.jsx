import { useNavigate } from "react-router-dom";
import RegisterService from "../services/RegisterService";
import EmployeeService from "../services/EmployeeService";

export const Register = (param) => {
  //const params = useParams(param) // we're calling this submit button with parameters
  const navigate = useNavigate()
  
  const onRegister = e => {
    e.preventDefault()

    //construct employee object using param pass with this component...
    if(param.user.firstName !== '' 
    && param.user.lastName !== '' 
    && param.user.email !== ''
    && param.user.passWord !== ''){
      let user = {firstName:param.user.firstName,
        lastName:param.user.lastName,
        emailId:param.user.email,
        passWord:param.user.passWord}
  
      //TODO:Create service that handles registration...
      RegisterService.createUser(user);
  
      console.log('Object sent=> ' + JSON.stringify(user));
  
      navigate("/login")
    }
  }
  return (
    <button className="btn btn-outline-dark" type="submit" onClick={onRegister}>Register</button>
  )
}
//The parameter we're accepting is an employee id...
export const NavigateToUpdate = (param) => {
  const navigate = useNavigate();

  const OnNavigateToUpdate = e => {
    e.preventDefault();

    navigate('/update-employee',{ replace: true, state: {param} });

  }
  return (
    <button className="btn btn-outline-dark" type="Update" onClick={OnNavigateToUpdate}>Update</button>
  )
}
export const Submit = (param) => {
  //const params = useParams(param) // we're calling this submit button with parameters
  const navigate = useNavigate()

  const onSubmit = e => {
    e.preventDefault()

    //construct employee object using param pass with this component...
    if(param.person.first_name !== '' 
    && param.person.last_name !== '' 
    && param.person.email_id !== ''){
      let employee = 
      { id:param.person.id,
        first_name:param.person.first_name,
        last_name:param.person.last_name,
        email:param.person.email_id, 
        gender:param.person.gender,
        ip_address:param.person.ip_address,
        password: param.person.password,
        first_address:param.person.first_address,
        second_address: param.person.second_address, 
        city:param.person.city, 
        state:param.person.state, 
        zip:param.person.zip
      }

      console.log('Object sent=> ' + JSON.stringify(employee));
  
      EmployeeService.createEmployee(employee);
  
      
  
      navigate("/employee")
    }
   
  }
  return (
    <button className="btn btn-outline-dark" type="submit" onClick={onSubmit}>Add User</button>
  )
}
export const Login = (param) => {
  //const params = useParams(param) // we're calling this submit button with parameters
  const navigate = useNavigate()

  const onLogin = e => {
    e.preventDefault()

    //construct employee object using param pass with this component...
    if(param.user.userName === 'frankisin' && param.user.passWord === '0722info'){
      let user = {userName:param.user.userName,
        passWord:param.user.passWord}
  
      //EmployeeService.createEmployee(employee);
  
      console.log('Object sent=> ' + JSON.stringify(user));
  
      navigate("/employee")
    }
   
  }

  return (
    <button className="btn btn-outline-dark" type="submit" onClick={onLogin}>Login</button>   
  )
}
export const Cancel = () => {
  //const params = useParams(param) // we're calling this submit button with parameters
  const navigate = useNavigate()

  const onCancel = e => {
    e.preventDefault()

    navigate("/employee")
   
  }

  return (
    <button className="btn btn-outline-dark" type="submit" onClick={onCancel}>Cancel</button>   
  )
}



