import { useForm } from 'react-hook-form';

const Register = () => {
    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const onSubmit = data => {
        fetch('http://localhost:5000/addUser', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(data),
        })
            .then(res => res.json())
            .then(result => {
                console.log(result)
                if (data) {
                    alert('User Registered successfully');
                    reset();
                }
            });
        console.log(data);
    }
    return (
        <>
            <div className="register-section">
                <div className="row">

                    {/* Form Start here */}
                    <div className="col-lg-12 col-sm-12">
                        <h1 className="mt-5 text-center text-info">Please Register with Name, Email, Password</h1>
                        <div className="login-box w-50 m-auto mt-5">
                            <div className="package-box border border d-flex justify-content-center align-items-center">
                                <div className="login-form">
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        <input
                                            {...register("name", { required: true })}
                                            placeholder="Name"
                                            className="p-2 m-2 w-100"
                                        />
                                        <br />
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

export default Register;