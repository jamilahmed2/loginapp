import React from 'react'
import styles from '../styles/Username.module.css'
import { Toaster } from 'react-hot-toast'

export const Recovery = () => {
 


  return (
    <>
      <div className="container mx-auto">

        <Toaster position="top-center" reverseOrder={false}></Toaster>

        <div className='flex  justify-center items-center h-screen'>
          <div className={styles.glass}>

            <div className="title flex flex-col items-center">
              <h4 className='text-4xl font-bold'>Recovery</h4>
              <span className=' text-center text-gray-500'>
                Enter 6 digits OTP to recover password.
              </span>
            </div>

            <form className="pt-20" >
              <div className="textbox flex flex-col items-center gap-6">
                <input type="text" className={styles.textbox} placeholder='OTP' />
                <button type='submit' className={styles.btn}>Recover</button>
              </div>

              <div className="text-center py-4">
                <span className='text-grey-500'>Can't Recive OTP? <button className='text-red-500'>Resend</button></span>
              </div>
            </form>
          </div>
        </div>
      </div >
    </>
  )
}
