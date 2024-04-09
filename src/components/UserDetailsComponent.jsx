import React, { useState, useEffect } from 'react';

import { deleteUser, listUsers  } from '../services/UserService';
import { useNavigate } from 'react-router-dom'



const UserDetailsComponent= () => {
    const [users, setUsers] = useState([]);
    const navigator = useNavigate();

    useEffect(() => {
            const fetchUsers = async () => {
                try {
                    const response = await listUsers();
                    setUsers(response.data);
                } catch (error) {
                    console.error('Error fetching users:', error);
                }
            };
            fetchUsers();
        }, []);
    
    function addUser() {
        navigator('/add-user');
        }
    
    function editUser(id) {
            navigator(`/edit-user/${id}`);
        }

    function removeUser(id){
        console.log(id);

        deleteUser(id).then((response) =>{
            listUsers();
        }).catch(error => {
            console.error(error);
        })
    };

  return (
    <div className="Container ">
        <div className='user-details'>
        <div class="d-grid gap-2 d-md-flex  justify-content-md-end"> 
        <button className='btn btn-primary' onClick={addUser}>Add User</button>
         </div> 
         <h2 className='text-left '>User Details</h2>   
        <table className='table table-striped table-bordered'>
                <thead>
                    <tr>
                        <th>Username</th>
                        <th>Email</th>
                        <th>Contact Number</th>
                        <th>Gender</th>
                        <th>Address</th>
                        <th>Postal Code</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map(user => (
                        <tr key={user.id}>
                            <td >{user.username}</td>
                            <td>{user.email}</td>
                            <td>{user.contactNumber}</td>
                            <td>{user.Gender}</td>
                            <td>{user.Address}</td>
                            <td>{user.PostalCode}</td>

                            <td>
                            <button className='btn btn-info' onClick={() => editUser(user.id)}>Edit</button>
                            <button className='btn btn-danger' onClick={() => removeUser(user.id)} style={{ marginLeft: '10px' }}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            </div>
            </div>
           
    );
};

export default UserDetailsComponent;
