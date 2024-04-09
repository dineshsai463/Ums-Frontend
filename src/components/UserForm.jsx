import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { getUser, editUser } from '../services/UserService';

const UserForm = () => {
  const { id } = useParams();
  const isEditMode = !!id; // Check if id is present to determine edit mode
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    contactNumber: '',
    gender: '',
    address: '',
    postalCode: ''
  });
  const navigator = useNavigate();
  const pageTitle = isEditMode ? 'Edit User' : 'User Registration';
  const [errors, setErrors] = useState({});
 

  useEffect(() => {
    if (isEditMode) {
      // Fetch user data if in edit mode
      getUser(id)
        .then(response => {
          setUserData(response.data);
        })
        .catch(error => {
          console.error('Error fetching user:', error);
        });
    }
  }, [id, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (isEditMode) {
        editUser(id, userData)
          .then(response => {
            console.log('User updated successfully:', response.data);
            navigator('/');
          })
          .catch(error => {
            console.error('Error updating user:', error);
          });
      } else {
        addUser(userData)
          .then(response => {
            console.log('User added successfully:', response.data);
            navigator('/');
          })
          .catch(error => {
            console.error('Error adding user:', error);
          });
      }
    }
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    // Validate Username
    if (!userData.username.trim()) {
      errors.username = 'Username is required';
      isValid = false;
    } else if (!/^[a-zA-Z0-9\s]*$/.test(userData.username)) {
      errors.username = 'Username must contain only alphanumeric characters and spaces';
      isValid = false;
    }

    // Validate Email
    if (!userData.email.trim()) {
      errors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
      errors.email = 'Invalid email format';
      isValid = false;
    }

    // Validate Contact Number
    if (!userData.contactNumber.trim()) {
      errors.contactNumber = 'Contact Number is required';
      isValid = false;
    } else if (!/^\d{10}$/.test(userData.contactNumber)) {
      errors.contactNumber = 'Contact Number must be 10 digits';
      isValid = false;
    }

    // Validate Postal Code
    if (!userData.postalCode.trim()) {
      errors.postalCode = 'Postal Code is required';
      isValid = false;
    } else if (!/^\d{6}$/.test(userData.postalCode)) {
      errors.postalCode = 'Postal Code must be 6 digits';
      isValid = false;
    }

    setErrors(errors);
    return isValid;
  };



  return (
    <div className='container'>
      <div className='user-form'>
      <br /><br />
   <div className='row'>
   <div className='card col-md-32 '>
   <h3 className="text-left">{pageTitle}</h3>
       <div className='card-body'>
          <form onSubmit={handleSubmit}>
            <div className='row'>
              <div className='col-md-6'>
                <div className='form-group mb-2'>
                 <input type='text' className={`form-control ${errors.username ? 'is-invalid' : ''}`}  name="username" placeholder=" Username" value={userData.username} onChange={handleChange} />
                  {errors.username && <div className='invalid-feedback'>{errors.username}</div>}
                </div>
                <div className='form-group mb-2'>
                  
                  <input type='email' className={`form-control ${errors.email ? 'is-invalid' : ''}`}  name="email" placeholder="Email" value={userData.email} onChange={handleChange} />
                  {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
                </div>
                <div className='form-group mb-2'>
                  
                  <input type='text' className={`form-control ${errors.contactNumber ? 'is-invalid' : ''}`}  name="contactNumber" placeholder="CONTACT NUMBER" value={userData.contactNumber} onChange={handleChange} />
                  {errors.contactNumber && <div className='invalid-feedback'>{errors.contactNumber}</div>}
                </div>
              </div>
              <div className='col-md-6'>
                <div className='form-group mb-2'>
                  
                  <input type='text' className={`form-control ${errors.gender ? 'is-invalid' : ''}`}  name="gender" placeholder='Gender Dropdown' value={userData.gender} onChange={handleChange} />
                  {errors.gender && <div className='invalid-feedback'>{errors.gender}</div>}
                </div>
                <div className='form-group mb-2'>
                  
                  <input type='text' className={`form-control ${errors.address ? 'is-invalid' : ''}`} name="address" placeholder="Address" value={userData.address} onChange={handleChange} />
                  {errors.address && <div className='invalid-feedback'>{errors.address}</div>}
                </div>
                <div className='form-group mb-2'>
                <input type='text' className={`form-control ${errors.pinCode ? 'is-invalid' : ''}`} name="pincode" placeholder="Pincode" value={userData.pincode} onChange={handleChange} />
                  {errors.postalCode && <div className='invalid-feedback'>{errors.postalCode}</div>}
                </div>
              </div>
            </div>
            <div class="text-center">
            <button type='submit' className='btn btn-primary'>Submit</button>
          </div>
        </form>
      </div>
      </div>
    </div>
  </div>
  
</div>
);
};
export default UserForm;
