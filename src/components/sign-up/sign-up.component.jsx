import React from 'react'; 
import './sign-up.styles.scss';
import FormInput from '../form-input/form-input.component';
import CustomButton from  '../custom-button/custom-button.component';
import   {signUpStart}  from '../../redux/user/user.actions';
import {connect} from 'react-redux';



 class SignUp extends React.Component {

constructor(){

    super();

    this.state = {
        displayName: '',
        email: '',
        password: '',
        confirmPassword: '' 


    }
}

    
handleSubmit = async event => {

    event.preventDefault();
    const {signUpStart} = this.props;
 
    const {displayName , email , password , confirmPassword} = this.state;


    if(password !== confirmPassword)
    {
        alert("password don't match");
        return;
    }
 
    signUpStart({displayName , email , password}); 
    
}
 

handleChange = async event => {

    const {value , name } = event.target;

    this.setState({[name]: value})
}


    render() {


        const {displayName , email , password , confirmPassword} = this.state;
        return(

            <div className='sign-up'>
            <h2 className='title'>I do not have a account </h2>
            <span>Sign up with your email and passord</span>
            <form className='sign-up-form' onSubmit={this.handleSubmit}>
                
                <FormInput 
                name="displayName"  label="Display Name" type="text" value={displayName} onChange={this.handleChange} required/>
                <FormInput 
                name="email"  label="Email" type="email" value={email} onChange={this.handleChange} required/>
                <FormInput 
                name="password"  label="Password" type="password" value={password} onChange={this.handleChange} required/>
                <FormInput 
                name="confirmPassword"  label="Confirm Password" type="password" value={confirmPassword} onChange={this.handleChange} required/>


                <CustomButton type='submit'> Sign up </CustomButton>
                
            </form>    
            </div>
        )
    }

}



const mapDispatchToProps =  dispatch => ({
    signUpStart: userCredentials => dispatch(signUpStart(userCredentials))
   });
  
  export default connect(null , mapDispatchToProps)(SignUp);
 
 