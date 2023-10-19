import React, { useState } from 'react';
import "./addproduct.css"; // Importing the CSS file for styling.

// Function component for adding a product.
const AddProduct = () => {
    // Initial form state.
    const initialState = {
        name: '',
        description: '',
        category: '',
        quantity: '',
        price: ''
    };

    // State hooks for form data and validation errors.
    const [formData, setFormData] = useState(initialState);
    const [errors, setErrors] = useState({});

    // Handler for form input changes.
    const handleChange = (e) => {
        const { name, value } = e.target;
        // Update the respective form field with the new value.
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    };

    // Handler for form submission.
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission behavior.
        const newErrors = validateInput(); // Validate the form inputs.
        if (Object.keys(newErrors).length > 0) {
            // If there are validation errors, update the state with these errors.
            setErrors(newErrors);
        } else {
            // If validation passes, show an alert and log the form data, then reset the form.
            alert(JSON.stringify(formData, null, 2));
            console.log(formData);
            resetForm();
        }
    };

    // Function to reset the form to its initial state and clear errors.
    const resetForm = () => {
        setFormData(initialState);
        setErrors({});
    };

    // Function to validate form inputs.
    const validateInput = () => {
        let newErrors = {};
        // Check if fields are empty.
        Object.keys(formData).forEach(key => {
            if (!formData[key].trim()) newErrors[key] = `${key.charAt(0).toUpperCase() + key.slice(1)} is required`;
        });
        // Check if numerical fields are positive.
        if (formData.quantity < 0) newErrors.quantity = "Quantity must be a positive number";
        if (formData.price < 0) newErrors.price = "Price must be a positive number";

        return newErrors; // Return the errors object.
    };

    // Render the form UI.
    return (
        <div className="hook">
            <span className="hook_text">Add Product</span>
            <form onSubmit={handleSubmit}>
                {/* For each input, if there's an associated error, we'll display it */}
                <input type="text" name="name" placeholder="Name" value={formData.name} onChange={handleChange} className={`hook_input ${errors.name ? 'inputError' : ''}`} />
                {/* Display error if present */}
                {errors.name && <div className="error">{errors.name}</div>}
                {/* Repeats for each field */}
                <input type="text" name="description" placeholder="Description" value={formData.description} onChange={handleChange} className={`hook_input ${errors.description ? 'inputError' : ''}`} />
                {errors.description && <div className="error">{errors.description}</div>}

                <input type="text" name="category" placeholder="Category" value={formData.category} onChange={handleChange} className={`hook_input ${errors.category ? 'inputError' : ''}`} />
                {errors.category && <div className="error">{errors.category}</div>}

                <input type="number" name="quantity" placeholder="Quantity" value={formData.quantity} onChange={handleChange} className={`hook_input ${errors.quantity ? 'inputError' : ''}`} />
                {errors.quantity && <div className="error">{errors.quantity}</div>}

                <input type="number" name="price" placeholder="Price" value={formData.price} onChange={handleChange} className={`hook_input ${errors.price ? 'inputError' : ''}`} />
                {errors.price && <div className="error">{errors.price}</div>}
                <div className='btn-ctn'>
                    {/* Submission and reset buttons. */}
                    <button type="submit" className="hook_button">SUBMIT</button>
                    <button type="button" className="hook_button" onClick={resetForm}>CANCEL</button>
                </div>
            </form>
        </div>
    );
};

export default AddProduct;
