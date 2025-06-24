import React, { Component } from 'react';
import { Login } from '../functions/browseRouter';

class LoginPageComponent extends Component {

    constructor(props) {
        super(props)

        this.state = {
            userName:'',
            passWord:''
        }

        //handlers need to be binded to the constructor...
        this.changeUserNameHandler = this.changeUserNameHandler.bind(this);
        this.changePassWordHandler = this.changePassWordHandler.bind(this);

    }
    changeUserNameHandler = (event)=>{
        this.setState({userName:event.target.value});
    }
    //Last name variable change handler...
    changePassWordHandler = (event)=>{
        this.setState({passWord:event.target.value});
    }
    //We envoke a componentDidMount method because it is called when the component is mounted...
    //We're envoking our API call inside of here...
    render() {
        const user = {
            userName : this.state.userName,
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
                                            <h2 className="fw-bold mb-2 text-uppercase ">Starkware Computers</h2>
                                            <p className=" mb-5">Login in for the best experience!</p>
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
                                            <p className="small"><a className="text-primary" href="forget-password.html">Forgot password?</a></p>
                                            <div className="d-grid">
                                                <Login user={user}></Login>
                                            </div>
                                        </form>
                                        <div>
                                            <p className="mb-0  text-center">Don't have an account? <a href="/register" className="text-primary fw-bold">Sign
                                                Up</a></p>
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

export default LoginPageComponent;