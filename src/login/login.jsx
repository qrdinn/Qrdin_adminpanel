import React, { useEffect, useState } from 'react';
import chef from '../images/cook.png'
import { useNavigate } from 'react-router-dom';
import { TbLockPassword } from "react-icons/tb";
import { MdOutlineEmail } from "react-icons/md";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { clearlogin, login_api } from '../allslice/loginSlice';

const Login = () => {

  const navigate = useNavigate();

  const [showpassword, setShowPassword] = useState(false)
  const [errormsg, seterrormsg] = useState("")

  const loginselect = useSelector((state) => state.login);

  console.log("loginselectstatus", loginselect.data.status)
  const passwordshow = () => {
    setShowPassword(!showpassword)
  }

  const dispatch = useDispatch();

  const { register, handleSubmit, formState: { errors } } = useForm();

  const [submittedEmail, setSubmittedEmail] = useState("");
  const [loading, setloading] = useState(false);


  const onSubmit = (data) => {
    const payload = {
      mailid: data.mail,
      password: data.pwd

    }
    dispatch(login_api(payload))
    setSubmittedEmail(data.mail);
    setloading(true)
  }


  useEffect(() => {
    if (loginselect.data.status === 'success') {
      // const username = submittedEmail?.split('@')[0] || "";
      const username = submittedEmail?.split('@')[0];
      setloading(false)
            navigate("/food-items")
            localStorage.setItem('userid', loginselect?.data?.data?.user_id);
      localStorage.setItem('tokens', loginselect?.data?.data?.access_token);
      localStorage.setItem('usernames', username);
      dispatch(clearlogin())


    }
    else if (loginselect.data.status === 'error') {
      seterrormsg(loginselect.data.message)
      setloading(false)

    }
  }, [loginselect.data])





  return (
    <>
      <div className='d-flex align-items-center justify-content-center' style={{ height: "100vh" }}>
        <div className="card widthset" style={{ background: "#410445", boxShadow: "2px 2px 2px 2px rgb(43, 2, 46)" }}>
          <div className="card-body">
            <div className='d-flex align-items-center justify-content-center' >
              <img src={chef} style={{ width: "35%", height: "35%" }} />
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div>
                <MdOutlineEmail color='white' fontSize='25px' />&nbsp;
                <label className='text-white fw-bold mb-1'>Email</label>
                <input type="text" placeholder='Enter your Email' name="mail" disabled={loading}
                  {...register("mail", { required: "Email is required." })} className='mt-1 fw-bold' style={{ background: "#dcbbf8", width: "100%", height: "40px", borderRadius: "5px", }} />
                {errors.mail && <span style={{ color: "red" }}>{errors.mail.message}</span>}
              </div>
              <div className='mt-4' >
                <TbLockPassword color='white' fontSize='25px' />&nbsp;
                <label className='text-white fw-bold mb-1'>Password</label>
                <div style={{ position: "relative" }}>
                  <input type={showpassword ? 'text' : 'password'} name="pwd" disabled={loading}
                    {...register("pwd", { required: "Password is required." })} placeholder='Enter your Password' className='mt-1 fw-bold' style={{ width: "100%", height: "40px", borderRadius: "5px", background: "#dcbbf8" }} />
                  <div onClick={passwordshow} style={{ position: "absolute", top: "10px", right: "15px" }}>{showpassword ? <IoMdEye fontSize="25px" color='#410445' style={{ cursor: "pointer" }} /> : <IoMdEyeOff fontSize="25px" color='#410445' style={{ cursor: "pointer" }} />}</div>
                </div>
                {errors.pwd && <span style={{ color: "red" }}>{errors.pwd.message}</span>}

              </div>
              <div className='d-flex align-items-center justify-content-center mt-4'  >
                <button disabled={loading} type='submit' style={{ background: "#d11a79", border: "#ed479d", borderRadius: "6px", padding: "5px 10px", width: "100%" }} className='text-white fw-bold'>
                 {loading ?
                 <div className='d-flex align-items-center justify-content-center'  >
                 <div className='buttonloader'></div> </div>: <span>Login</span>} 
                  </button>
              </div>
              
              <div style={{ textAlign: "center" }}>
                {errormsg && <span style={{ color: "red", textAlign: "center" }}>{errormsg}</span>}
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  )

}

export default Login;