import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import avatar from '../assests/profile.png'
import styles from '../styles/Username.module.css'
import { Toaster } from 'react-hot-toast'
// <!-- ========== Using Formik To acces form data ========== -->
import { useFormik } from 'formik'
import { passwordValidate } from '../helper/Validate'
// <!-- ========== --- ========== -->

export const Password = () => {
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
    initialValues: {
      password: '',
    },
    validate: passwordValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
      console.log(values)
    }
  })

  return (
    <>
      <div className="container mx-auto">

        <Toaster position="top-center" reverseOrder={false}></Toaster>

        <div className='flex  justify-center items-center h-screen'>
          <div className={styles.glass}>

            <div className="title flex flex-col items-center">
              <h4 className='text-4xl font-bold'>Password</h4>
              <span className=' text-center text-gray-500'>
                Enter Your Password.
              </span>
            </div>

            <form className="py-1" onSubmit={formik.handleSubmit}>
              <div className='profile flex justify-center py-4'>
                <img src={avatar} className={styles.profile_img} alt="avatar" />
              </div>
              <span className='p-icon'><i class="fa-regular fa-eye" style={{ cursor: "pointer" }} onClick={handleShowPassword}></i></span>
              <div className="textbox flex flex-col items-center gap-6">
                <input type={passType} value={showPassword} {...formik.getFieldProps('password')} className={styles.textbox} placeholder='Password' />
                <button type='submit' className={styles.btn}>Log In</button>
              </div>

              <div className="text-center py-4">
                <span className='text-grey-500'>Forget Password?<Link className='text-red-500' to='/recovery'>Recover Now!</Link></span>
              </div>
            </form>
          </div>
        </div>
      </div >
    </>
  )
}