import React, { Component } from 'react';
import { Register } from '../functions/browseRouter';

class RegisterPageComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            firstName:'',
            lastName:'',
            email:'',
            passWord:''
        }

        //handlers need to be binded to the constructor...
        this.changeFirstNameHandler = this.changeFirstNameHandler.bind(this);
        this.changeLastNameHandler = this.changeLastNameHandler.bind(this);
        this.changeUserNameHandler = this.changeUserNameHandler.bind(this);
        this.changePassWordHandler = this.changePassWordHandler.bind(this);

    }
    changeFirstNameHandler = (event)=>{
        this.setState({firstName:event.target.value});
    }
    //Last name variable change handler...
    changeLastNameHandler = (event)=>{
        this.setState({lastName:event.target.value});
    }
    changeUserNameHandler = (event)=>{
        this.setState({email:event.target.value});
    }
    //Last name variable change handler...
    changePassWordHandler = (event)=>{
        this.setState({passWord:event.target.value});
    }
    //We envoke a componentDidMount method because it is called when the component is mounted...
    //We're envoking our API call inside of here...
    render() {
        const user = {
            firstName: this.state.firstName,
            lastName:this.state.lastName,
            email : this.state.email,
            passWord : this.state.passWord
        };
        return (
            <div>
                <div className="vh-100 d-flex justify-content-center align-items-center">
                    <div className="container">
                        <div className="row d-flex justify-content-center">
                            <div className="col-12 col-md-8 col-lg-6">
                                <div className="card bg-white">
                                    <div className="card-body p-5">
                                        <form className="mb-3 mt-md-4">
                                            <h2 className="fw-bold mb-2 text-uppercase ">Create an Account!</h2>
                                            <p className=" mb-5">Almost there...</p>
                                            <div className="mb-3">
                                                <label className="form-label ">First Name</label>
                                                <input type="firstName" className="form-control" id="firstName" placeholder="John"
                                                name='firstName' value={this.state.firstName} onChange={this.changeFirstNameHandler} />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label ">Last Name</label>
                                                <input type="lastName" className="form-control" id="lastName" placeholder="Smith"
                                                name='lastName' value={this.state.lastName} onChange={this.changeLastNameHandler} />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label ">Email address</label>
                                                <input type="email" className="form-control" id="email" placeholder="name@example.com"
                                                name='userName' value={this.state.userName} onChange={this.changeUserNameHandler} />
                                            </div>
                                            <div className="mb-3">
                                                <label className="form-label ">Password</label>
                                                <input type="password" className="form-control" id="password" placeholder="*******" 
                                                name='passWord' value={this.state.passWord} onChange={this.changePassWordHandler}/>
                                            </div>
                                            <div className="d-grid">
                                                <Register user={user}></Register>
                                            </div>
                                        </form>
                                        <div>
                                            <p className="mb-0  text-center">Already have an account? <a href="/login" className="text-primary fw-bold">Login</a></p>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default RegisterPageComponent;