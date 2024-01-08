import {Component} from 'react';
import {signUp} from '../../utilities/users-service';

export default class SignUpForm extends Component{
    state = {
            firstname:'',
            lastname:'',
            username:'',
            email:'',
            password:'',
            confirm:'',
            error:''
        };

        // The object passed to setState is merged with the current state object
    handleChange = (evt) => {
        this.setState({
        [evt.target.name]: evt.target.value,
        error: ''
        });
    };

    handleSubmit = async(evt)=> {
        evt.preventDefault();
        try{
            const formData={...this.state};

            const user = await signUp(formData);
            this.props.setUser(user);

        } catch{
            this.setState({error:'Sign Up Failed - Try Again'})
        }

    };
    
    render() {
        const disable = this.state.password !== this.state.confirm;
        return (
            <div>
            <div className="form-container">
                <form autoComplete="off" onSubmit={this.handleSubmit}>
                <label>First Name</label>
                <input type="text" name="firstname" value={this.state.firstname} onChange={this.handleChange} required />
                <label>Last Name</label>
                <input type="text" name="lastname" value={this.state.lastname} onChange={this.handleChange} required />
                <label>Username</label>
                <input type="text" name="username" value={this.state.username} onChange={this.handleChange} required />
                <label>Email</label>
                <input type="email" name="email" value={this.state.email} onChange={this.handleChange} required />
                <label>Password</label>
                <input type="password" name="password" value={this.state.password} onChange={this.handleChange} required />
                <label>Confirm</label>
                <input type="password" name="confirm" value={this.state.confirm} onChange={this.handleChange} required />
                <button type="submit" disabled={disable}>SIGN UP</button>
                </form>
            </div>
            <p className="error-message">&nbsp;{this.state.error}</p>
            </div>
        );
        }

}