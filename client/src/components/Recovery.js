import React, { useEffect, useState } from 'react';
import styles from '../styles/Username.module.css';
import toast, { Toaster } from 'react-hot-toast';
import { useAuthStore } from '../store/store';
import { generateOTP, verifyOTP } from '../helper/helper';
import { useNavigate } from 'react-router-dom';

export const Recovery = () => {
  const { username } = useAuthStore((state) => state.auth);
  const [OTP, setOTP] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    let isMounted = true;
  
    generateOTP(username).then((generatedOTP) => {
      if (isMounted && generatedOTP) {
        // console.log(generatedOTP);
        toast.success('OTP has been sent to your email');
      }
    }).catch(() => {
      if (isMounted) {
        toast.error('Some error occurred');
      }
    });
  
    return () => {
      isMounted = false;
    };
  }, [username]);
  


  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const { status } = await verifyOTP({ username, code: OTP });
      if (status === 201) {
        toast.success('Verified Successfully!');
        return navigate('/reset');
      }
    } catch (error) {
      toast.error('Wrong OTP! Check your email again.');
    }
  };

  const resendOTP = async () => {
    try {
      const generatedOTP = await generateOTP(username);
      // console.log(generatedOTP);
      toast.success('OTP sent to your email');
    } catch (error) {
      toast.error('Some error occurred. Please try again.');
    }
  };

  return (
    <>
      <div className="container mx-auto">
        <Toaster position="top-center" reverseOrder={false} />

        <div className="flex justify-center items-center h-screen">
          <div className={styles.glass}>
            <div className="title flex flex-col items-center">
              <h4 className="text-4xl font-bold">Recovery</h4>
              <span className="text-center text-gray-500">
                Enter 6 digits OTP sent to your email
              </span>
            </div>

            <form className="pt-20" onSubmit={onSubmit}>
              <div className="textbox flex flex-col items-center gap-6">
                <input
                  onChange={(e) => setOTP(e.target.value)}
                  value={OTP}
                  type="text"
                  className={styles.textbox}
                  placeholder="OTP"
                />
                <button type="submit" className={styles.btn}>
                  Recover
                </button>
              </div>
            </form>

            <div className="text-center py-4">
              <span className="text-grey-500">
                Can't receive OTP?{' '}
                <button onClick={resendOTP} className="text-red-500">
                  Resend
                </button>
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
