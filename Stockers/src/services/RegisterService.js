import axios from 'axios';

const API_BASE_URL = "https://localhost:7067/LostBorn";

class RegisterService{
    getUsers(){
        return axios.get(API_BASE_URL);
    }
    createUser(user){
        return axios.post(API_BASE_URL,user);
    }
}
export default new RegisterService()