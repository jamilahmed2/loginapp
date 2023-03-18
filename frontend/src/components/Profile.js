import React, { useState } from 'react'
import avatar from '../assests/profile.png'
import styles from '../styles/Username.module.css'
import extend from '../styles/Profile.module.css'
import { Toaster } from 'react-hot-toast'
// <!-- ========== Using Formik To acces form data ========== -->
import { useFormik } from 'formik'
import {  profileValidation } from '../helper/Validate'
import convertToBase64 from '../helper/Convert'
// <!-- ========== --- ========== -->

export const Profile = () => {
  const [file, setFile] = useState()

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      mobile: '',
      address: '',
    },
    validate: profileValidation,
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
          <div className={`${styles.glass} ${extend.glass}`}>

            <div className="title flex flex-col items-center">
              <h4 className='text-4xl font-bold'>Profile</h4>
              <span className=' text-center text-gray-500'>
                Update your details.
              </span>
            </div>

            <form className="py-1" onSubmit={formik.handleSubmit}>
              <div className='profile flex justify-center py-4'>
                <label htmlFor="profile">
                  <img src={file || avatar} className={`${styles.profile_img} ${extend.profile_img}`} alt="avatar" />
                </label>
                <input type="file" id='profile' name='profile' onChange={onUpload} />
              </div>
              <div className="textbox flex flex-col items-center gap-6">
                <div className="name flex w-3/4 gap-10">
                  <input type='text'  {...formik.getFieldProps('firstName')} className={styles.textbox} placeholder='First Name' />
                  <input type='text'  {...formik.getFieldProps('lastName')} className={styles.textbox} placeholder='Last Name' />
                </div>
                <div className="name flex w-3/4 gap-10">
                  <input type='text'  {...formik.getFieldProps('mobile')} className={styles.textbox} placeholder='Mobile No.' />
                  <input type='email'  {...formik.getFieldProps('email')} className={styles.textbox} placeholder='Email' />
                </div>
                <input type='text'  {...formik.getFieldProps('address')} className={styles.textbox} placeholder='Address' />
                <button type='submit' className={styles.btn}>Update</button>
              </div>

              <div className="text-center py-4">
                <span className='text-grey-500'>Come back later? <button className='text-red-500'>Log out</button></span>
              </div>
            </form>
          </div>
        </div>
      </div >
    </>
  )
}
