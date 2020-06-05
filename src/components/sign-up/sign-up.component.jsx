import React , {useState} from 'react'; 
import './sign-up.styles.scss';
import FormInput from '../form-input/form-input.component';
import CustomButton from  '../custom-button/custom-button.component';
import   {signUpStart}  from '../../redux/user/user.actions';
import {connect} from 'react-redux';



 const SignUp = ({signUpStart}) => { 


    const [userCredentials , setUserCredentials] = useState(
        {
            displayName: '',
            email: '',
            password: '',
            confirmPassword: '' 
    
    
        }

    )

    const {displayName , email , password , confirmPassword} = userCredentials;

const handleSubmit = async event => {

    event.preventDefault();
  


    if(password !== confirmPassword)
    {
        alert("password don't match");
        return;
    }
 
    signUpStart({displayName , email , password}); 
    
}
 

const handleChange = event => {

    const {value , name } = event.target;

    setUserCredentials({...userCredentials , [name]: value})
};


 
        return(

            <div className='sign-up'>
            <h2 className='title'>I do not have a account </h2>
            <span>Sign up with your email and passord</span>
            <form className='sign-up-form' onSubmit={handleSubmit}>
                
                <FormInput 
                name="displayName"  label="Display Name" type="text" value={displayName} onChange={handleChange} required/>
                <FormInput 
                name="email"  label="Email" type="email" value={email} onChange={ handleChange} required/>
                <FormInput 
                name="password"  label="Password" type="password" value={password} onChange={ handleChange} required/>
                <FormInput 
                name="confirmPassword"  label="Confirm Password" type="password" value={confirmPassword} onChange={handleChange} required/>


                <CustomButton type='submit'> Sign up </CustomButton>
                
            </form>    
            </div>
        )
    }

 



const mapDispatchToProps =  dispatch => ({
    signUpStart: userCredentials => dispatch(signUpStart(userCredentials))
   });
  
  export default connect(null , mapDispatchToProps)(SignUp);
 
 