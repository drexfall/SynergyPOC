import { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import Image from 'next/image'
import Logo from '../../Assets/Images/Logo.png';
import style from './Login.module.css';

const LoginForm = () => {
    const [showPassword, setShowPassword] = useState(false);
  
    const formik = useFormik({
      initialValues: {
        email: '',
        password: '',
        // captcha: '',
        // portal: '',
      },
      validationSchema: Yup.object({
        email: Yup.string()
          .email('Please enter a valid email address')
          .required('Email is required'),
        password: Yup.string()
          .min(8, 'Password must be at least 8 characters')
          .max(20, 'Password cannot exceed 20 characters')
          .matches(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
            'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character'
          )
          .required('Password is required'),
        // captcha: Yup.string()
        //   .length(6, 'Captcha must be exactly 6 characters')
        //   .matches(/^[A-Za-z0-9]+$/, 'Captcha can only contain letters and numbers')
        //   .required('Captcha is required'),
        // portal: Yup.string()
        //   .oneOf(['admin', 'user', 'guest'], 'Please select a valid portal')
        //   .required('Please select a portal'),
      }),
      onSubmit: async (values) => {
        console.log(values)
        try {
          const response = await axios.post('/dotnet/api/Authenticate/AuthenticateUser?email=' + values.email + '&password=' + values.password);
          console.log(response.data);
          await axios.post('/api/insertUser', response.data);
          // Handle success (e.g., redirect, show a success message)
        } catch (error) {
          console.error(error);
          // Handle error (e.g., show an error message)
        }
      }
    });
  
  
    return (
      <div className="min-h-screen bg-gray-100 text-gray-900 flex justify-center">
        <div className="max-w-screen-xl m-2 sm:m-6 bg-white shadow sm:rounded-lg flex justify-center flex-1">
          <div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
            <div className="flex items-center justify-center logo-container">
              <Image
                src={Logo}
                alt="Logo"
                 width={150}
                 height={80}
                className="max-w-full h-auto"
              />
            </div>
            <div className="mt-6 flex flex-col items-center">
              <h1 className="text-2xl xl:text-3xl font-extrabold">Login</h1>
              <div className="w-full flex-1 mt-8">
                <div className="mx-auto max-w-xs">
                  <form onSubmit={formik.handleSubmit}>
                    <input
                      className={`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white ${formik.touched.email && formik.errors.email
                        ? 'border-red-500 focus:ring-red-300'
                        : 'focus:ring-purple-500'
                        }`}
                      type="email"
                      placeholder="Email"
                      {...formik.getFieldProps('email')}
                    />
                    <div className=''>
  
                    </div>
                    {formik.touched.email && formik.errors.email ? (
                      <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
                    ) : (<div className={style.errorContainer}></div>)}
  
                    <div className="relative mt-5">
                      <input
                        className={`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white pr-10 ${formik.touched.password && formik.errors.password
                          ? 'border-red-500 focus:ring-red-300'
                          : 'focus:ring-purple-500'
                          }`}
                        type={showPassword ? 'text' : 'password'}
                        placeholder="Password"
                        {...formik.getFieldProps('password')}
                      />
                      <div
                        className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <EyeSlashIcon className="h-5 w-5 text-gray-600" />
                        ) : (
                          <EyeIcon className="h-5 w-5 text-gray-600" />
                        )}
                      </div>
  
                    </div>
                    {formik.touched.password && formik.errors.password ? (
                      <div className="text-red-500 text-sm mt-1">{formik.errors.password}</div>
                    ) : (<div className={style.errorContainer}></div>)}
  
                    {/* <input
                      className={`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 ${formik.touched.captcha && formik.errors.captcha
                        ? 'border-red-500 focus:ring-red-300'
                        : 'focus:ring-purple-500'
                        }`}
                      type="text"
                      placeholder="Captcha"
                      {...formik.getFieldProps('captcha')}
                    />
                    {formik.touched.captcha && formik.errors.captcha ? (
                      <div className="text-red-500 text-sm mt-1">{formik.errors.captcha}</div>
                    ) : null}
  
                    <select
                      className={`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 ${formik.touched.portal && formik.errors.portal
                        ? 'border-red-500 focus:ring-red-300'
                        : 'focus:ring-purple-500'
                        }`}
                      {...formik.getFieldProps('portal')}
                    >
                      <option value="">Select a portal</option>
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                      <option value="guest">Guest</option>
                    </select>
                    {formik.touched.portal && formik.errors.portal ? (
                      <div className="text-red-500 text-sm mt-1">{formik.errors.portal}</div>
                    ) : null} */}
  
                    <button
                      type="submit"
                      className="mt-5 tracking-wide font-semibold bg-indigo-500 text-gray-100 w-full py-4 rounded-lg hover:bg-indigo-700 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none"
                    >
                      <svg
                        className="w-6 h-6 -ml-2"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M16 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                        <circle cx="8.5" cy="7" r="4" />
                        <path d="M20 8v6M23 11h-6" />
                      </svg>
                      <span className="ml-3">Login</span>
                    </button>
                  </form>
  
                  <p className="mt-6 text-xs text-gray-600 text-center">
                    I agree to Synergy's&nbsp;
                    <a href="#" className="border-b border-gray-500 border-dotted">
                      Terms of Service
                    </a>
                    &nbsp;and its&nbsp;
                    <a href="#" className="border-b border-gray-500 border-dotted">
                      Privacy Policy
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex-1 bg-indigo-100 text-center hidden lg:flex">
            <div
              className="m-12 xl:m-16 w-full bg-contain bg-center bg-no-repeat"
              style={{
                backgroundImage:
                  "url('https://storage.googleapis.com/devitary-image-host.appspot.com/15848031292911696601-undraw_designer_life_w96d.svg')",
              }}
            ></div>
          </div>
        </div>
      </div>
    );
  };
  
  export default LoginForm;