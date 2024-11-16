import { Formik, Form, Field, ErrorMessage } from 'formik';
import 'react-toastify/dist/ReactToastify.css';
import * as Yup from 'yup'
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom'
import { handleToastSuccess, handleToastError } from '../utils/toast';
import Cookies from 'js-cookie'


const loginSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string().required('Password is required')
})

const LoginPage = () => {

    const navigate = useNavigate()
    const onLogin = async (values: { email: string, password: string }) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_API_BASE_URL}/auth/login`, values)

            
            if (response.data.status !== 'SUCCESS') {
                handleToastError('Login Failed, Please try again!')
            } else {
                Cookies.set('token', response.data.data[0].token, {expires: 1})
                Cookies.set('username', response.data.data[0].name)
                handleToastSuccess('Login Successfull')
                
                navigate('/dashboard')
            }
        } catch (error) {
            console.error(error)
            handleToastError('Something Went Wrong')
        }
    }
    

    return (
        
        <div className="flex flex-col min-h-screen overflow-hidden">
            <div className="flex-1">
                <div className="flex flex-col justify-center items-center">
                    <div className="g1 sm:w-[500px] w-full rounded-lg px-10 py-10 shadow-lg border-2 border-slate-20">
                        <h1 className='text-2xl font-bold mb-5'>
                            Sign in to your account
                        </h1>
                        <div className='border-gray-500 border-spacing-1 border-2 my-5 mx-10' />
                        

                            <Formik
                    initialValues={{ email: "", password: "" }}
                    validationSchema={loginSchema}
                    onSubmit={(values) => onLogin(values)}
                >
                    <Form
                        className='flex flex-col items-start gap-5'
                    >
                                <div className='flex flex-col gap-2 w-full'>
                                    <label className='block text-md ml-1 font-bold text-left' >Your Email</label>
                            <Field 
                                type="text"
                                name="email"
                                placeholder="Email Address"
                                className="py-2 px-2 bg-gray-50 w-full border border-slate-500
                                placeholder-slate-500 rounded-lg focus:outline-none
                                text-gray-900 focus:ring-blue-400 focus:border-blue-600 focus:ring-4  
                                "
                            />
                            <ErrorMessage 
                                component="div"
                                name="Email"
                                className="text-red-500"
                            />
                        </div>

                                <div className='flex flex-col gap-2 w-full'>
                                <label className='block text-md ml-1 font-bold text-left' >Your Password</label>
                                    
                            <Field 
                                type="password"
                                name="password"
                                placeholder="Password"
                                className="py-2 px-2 bg-gray-50 w-full border border-slate-500
                                placeholder-slate-500 rounded-lg focus:outline-none
                                text-gray-900 focus:ring-blue-400 focus:border-blue-600 focus:ring-4  "
                            />
                            <ErrorMessage 
                                component="div"
                                name="password"
                                className="text-red-500"
                            />
                        </div>

                        <div className='flex justify-end w-full'>
                            <Link to="/reset-password">Forgot Password?</Link>
                        </div>

                        <div className='flex justify-end items-end w-full mt-5'>
                            <button
                                className='w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-lg px-3 py-2.5 text-center'
                                type='submit'
                            >
                                Sign In
                            </button>
                        </div>
                    </Form>
                </Formik>
                    </div>
                </div>
            </div>
    
        </div>
  )
}

export default LoginPage