import React from 'react';
import { useForm } from "react-hook-form";
import "./signupuser.css"; // Ensure this path is correct

// SignUpUser component
function SignUpUser() {
    // useForm hook for form validation and submission
    const {
        register, // function to register input/select elements
        handleSubmit, // function to handle form submit event
        formState: { errors }, // object containing form state and errors
        getValues, // function to get the current fields values
    } = useForm();

    // Function to handle form submission
    const onSubmit = (data) => {
        // Log form data to the console
        console.log(data);

        // Check if passwords match
        if (data.password !== data.confirmPassword) {
            // Show alert if passwords don't match
            alert("Passwords don't match.");
        } else {
            // Show alert with form data if passwords match and validation passes
            alert(JSON.stringify(data));
        }
    };

    // Component's return function to render UI
    return (
        <form onSubmit={handleSubmit(onSubmit)} className="hook">
            <div>
                <span className="hook_text_signupuser">Sign Up User</span>
            </div>

            <label className="hook_text_signupuser">First Name</label>
            <input
                {...register("firstName", { required: "First name is required" })}
                className="hook_input"
            />
            {errors.firstName && <p className="hook__error">{errors.firstName.message}</p>}

            <label className="hook_text_signupuser">Last Name</label>
            <input
                {...register("lastName", { required: "Last name is required" })}
                className="hook_input"
            />
            {errors.lastName && <p className="hook__error">{errors.lastName.message}</p>}

            <label className="hook_text_signupuser">Username</label>
            <input
                {...register("userName", { required: "Username is required" })}
                className="hook_input"
            />
            {errors.userName && <p className="hook__error">{errors.userName.message}</p>}

            <label className="hook_text_signupuser">Email</label>
            <input
                type="email"
                className="hook_input"
                {...register("email", { required: "Email is required", pattern: { value: /^\S+@\S+$/i, message: "Invalid email format" } })}
            />
            {errors.email && <p className="hook__error">{errors.email.message}</p>}

            <label className="hook_text_signupuser">Password</label>
            <input
                type="password"
                className="hook_input"
                {...register("password", { required: "Password is required" })} // Registering password field
            />
            {errors.password && <p className="hook__error">{errors.password.message}</p>}
            {/* Show error message if there's an error */}


            <label className="hook_text_signupuser">Confirm Password</label>
            <input
                type="password"
                className="hook_input"
                {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: value =>
                        value === getValues("password") || "Passwords don't match", // Validate that passwords match
                })}
            />
            {errors.confirmPassword && <p className="hook__error">{errors.confirmPassword.message}</p>}
            {/* Show error message if there's an error */}

            <button className="hook_button_signupuser" type="submit">
                {/* Submit button */}
                Submit
            </button>
        </form>
    );
}

export default SignUpUser; // Exporting component for use in other parts of your application
