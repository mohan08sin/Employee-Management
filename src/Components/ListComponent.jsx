import React, { useState } from 'react'
import { getAllDepartments } from '../Services/DepartmentService'
import { Link ,useNavigate   } from 'react-router-dom'

import { deleteDepartment } from '../Services/DepartmentService'
const ListComponent = () => {

   const [department , setDeartment] = useState([]);
    const navigate = useNavigate()

    useState(() => {
        listOfDepartment()
})

    

   function updateDepartment(id){
        navigate(`/edit-department/${id}`)
    }

    function listOfDepartment(){
        getAllDepartments().then((response) => {
            console.log(response.data)
            setDeartment(response.data)
        }).catch((error) => {
            console.log(error)
        })
    }

    function removeDepartment(id){
        deleteDepartment(id).then((response) => {
            console.log(response.data)

            listOfDepartment()
        }
        ).catch((error) => {
            console.log(error)
        })
    }

  return (
    <div className='container'>
        <h2 className='text-center'>Department List</h2>
        <Link to='/add-department' className='btn btn-primary mb-2'>Add Department</Link>
        <table className='table table-striped table-bordered'>
            <thead>
                <tr>
                    <th>Department Id</th>
                    <th>Department Name</th>
                    <th>Department Description</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {department.map(department => 
                    <tr key={department.id}>
                        <td>{department.id}</td>
                        <td>{department.departmentName}</td>
                        <td>{department.departmentDescription}</td>
                        <td>
                            <button onClick={() => updateDepartment(department.id)} className='btn btn-info'>Update</button>
                            <button onClick={() => removeDepartment(department.id)} className='btn btn-danger' style={{marginLeft:'10px'}}>Delete</button>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>
  )
    
}

export default ListComponent