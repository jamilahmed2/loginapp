import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import avatar from '../assests/profile.png'
import styles from '../styles/Username.module.css'
import { Toaster } from 'react-hot-toast'
// <!-- ========== Using Formik To acces form data ========== -->
import { useFormik } from 'formik'
import {  signUpValidate } from '../helper/Validate'
import convertToBase64 from '../helper/Convert'
// <!-- ========== --- ========== -->

export const Register = () => {
  const [passType, setPassType] = useState("password");
  const [showPassword, setShowPassword] = useState("");

  const handleShowPassword = () => {
    if (passType === "password") {
      setPassType("text")
      return;
    }
    setPassType("password")
  };
  const [file, setFile] = useState()

  const formik = useFormik({
    initialValues: {
      email: '',
      username: '',
      password: '',
    },
    validate: signUpValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async values => {
      values = await Object.assign(values, { profile: file || '' })
      console.log(values)
    }
  })

  const onUpload = async e => {
    const base64 = await convertToBase64(e.target.files[0])
    setFile(base64)
  }

  return (
    <>
      <div className="container mx-auto">

        <Toaster position="top-center" reverseOrder={false}></Toaster>

        <div className='flex  justify-center items-center h-screen'>
          <div className={styles.glass}>

            <div className="title flex flex-col items-center">
              <h4 className='text-4xl font-bold'>Register</h4>
              <span className=' text-center text-gray-500'>
                Happy to join.
              </span>
            </div>

            <form className="py-1" onSubmit={formik.handleSubmit}>
              <div className='profile flex justify-center py-4'>
                <label htmlFor="profile">
                  <img src={file || avatar} className={styles.profile_img} alt="avatar" />
                </label>
                <input type="file" id='profile' name='profile' onChange={onUpload} />
              </div>
              <span className='p-icon-r'><i className="fa-regular fa-eye" style={{ cursor: "pointer" }} onClick={handleShowPassword}></i></span>
              <div className="textbox flex flex-col items-center gap-6">
                <input type='email'  {...formik.getFieldProps('email')} className={styles.textbox} placeholder='Email*' />
                <input type='username'  {...formik.getFieldProps('username')} className={styles.textbox} placeholder='Username*' />
                <input type={passType} value={showPassword} {...formik.getFieldProps('password')} className={styles.textbox} placeholder='Password*' />
                <button type='submit' className={styles.btn}>Sign Up</button>
              </div>

              <div className="text-center py-4">
                <span className='text-grey-500'>Already have account? <Link className='text-red-500' to='/'>Log in</Link></span>
              </div>
            </form>
          </div>
        </div>
      </div >
    </>
  )
}
