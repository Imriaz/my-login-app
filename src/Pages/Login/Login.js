import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import './Login.css'

const Login = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();
    const [user, setUser] = useState([]);

    const onSubmit = data => {

        useEffect(() => {
            fetch(`https://warm-hollows-05894.herokuapp.com/myOrders/${user?.email}`)
                .then(res => res.json())
                .then(data => setUser(data));
        }, []);
    }
    return (
        <>
            <div className="review-section">
                <div className="row">

                    {/* Form Start here */}
                    <div className="col-lg-12 col-sm-12">
                        <h1 className="mt-5 text-center text-info">Please Login with Email, Password</h1>
                        <div className="login-box w-50 m-auto mt-5">
                            <div className="package-box border border d-flex justify-content-center align-items-center">
                                <div className="login-form">
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <input
                                            {...register("email", { required: true })}
                                            placeholder="Email"
                                            className="p-2 m-2 w-100"
                                        />
                                        <br />
                                        <input
                                            {...register("password", { required: true })}
                                            placeholder="Password"
                                            className="p-2 m-2 w-100"
                                        />
                                        <br />

                                        {errors.exampleRequired && <span>This field is required</span>}

                                        <input type="submit" value="Submit Login" className="btn btn-info w-75" />

                                        <p>New User?</p>
                                        <button onClick={'../Register/Register.js'}>Please Register</button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Login;