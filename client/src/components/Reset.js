import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom'
import avatar from '../assests/profile.png'
import styles from '../styles/Username.module.css'
import { Toaster, toast } from 'react-hot-toast'
import { useFormik } from 'formik'
import { resetPasswordValidation } from '../helper/Validate'
import { resetPassword } from '../helper/helper'
import { useAuthStore } from '../store/store'
import { useNavigate } from 'react-router-dom'
import useFetch from '../hooks/fetch.hook'

export const Reset = () => {

  const { username } = useAuthStore(state => state.auth);
  const navigate = useNavigate();
  const [{ isLoading, apiData, status, serverError }] = useFetch('createResetSession')
  const [passType, setPassType] = useState("password");
  const [showPassword, setShowPassword] = useState("");

  const handleShowPassword = () => {
    if (passType === "password") {
      setPassType("text")
      return;
    }
    setPassType("password")
  };


  const formik = useFormik({
    initialValues : {
      password : '',
      confirm_pwd: ''
    },
    validate : resetPasswordValidation,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit : async values => {
      
      let resetPromise = resetPassword({ username, password: values.password })

      toast.promise(resetPromise, {
        loading: 'Updating...',
        success: <b>Reset Successfully...!</b>,
        error : <b>Could not Reset!</b>
      });

      resetPromise.then(function(){ navigate('password') })

    }
  })


  if(isLoading) return <h1 className='text-2xl font-bold'>isLoading</h1>;
  if(serverError) return <h1 className='text-xl text-red-500'>{serverError.message}</h1>
  if(status && status !== 201) return <Navigate to={'/password'} replace={true}></Navigate>

  return (
    <>
      <div className="container mx-auto">

        <Toaster position="top-center" reverseOrder={false}></Toaster>

        <div className='flex  justify-center items-center h-screen'>
          <div className={styles.glass}>

            <div className="title flex flex-col items-center">
              <h4 className='text-4xl font-bold'>Reset</h4>
              <span className=' text-center text-gray-500'>
                Enter New Password.
              </span>
            </div>

            <form className="pt-20" onSubmit={formik.handleSubmit}>
              <span className='p-icon'><i class="fa-regular fa-eye" style={{ cursor: "pointer" }} onClick={handleShowPassword}></i></span>
              <span className='p-icon-2'><i class="fa-regular fa-eye" style={{ cursor: "pointer" }} onClick={handleShowPassword}></i></span>
              <div className="textbox flex flex-col items-center gap-6">
                <input type={passType} value={showPassword} {...formik.getFieldProps('password')} className={styles.textbox} placeholder='New Password' />
                <input type={passType} value={showPassword} {...formik.getFieldProps('confirm_pwd')} className={styles.textbox} placeholder='Confirm Password' />
                <button type='submit' className={styles.btn}>Reset</button>
              </div>
            </form>
          </div>
        </div>
      </div >
    </>
  )
}
