
import React , {useEffect, useState} from 'react'
import { listEmployees } from '../Services/EmployeeService'
import { useNavigate } from 'react-router-dom'

const ListEmployeeComponent = () => {
    const [employee ,setEmployees] = useState([])

    const navigate = useNavigate()

    useEffect(() => {
        listEmployees().then((response) => setEmployees(response.data)
        ).catch((error) => console.log(error))      
    }, [])


    function addNewEmployee(){
        navigate('/add-employee')
    }


    function updateEmployee(id){
        navigate(`/update-employee/${id}`)
    }

    function deleteEmployee(id){
        if(window.confirm("Are you sure you want to delete this employee?")){
            setEmployees(employee.filter((emp) => emp.id !== id))
        }
    }

  return (
    <div className='container'>
        <h2 className='text-center'>Employee List</h2>
        <button className='btn btn-primary mb-2'onClick={addNewEmployee}>Add Employee</button>
        <table className='table table-striped table-bordered'>
            <thead>
                <tr>
                    <th>Employee Id</th>
                    <th>Employee First Name</th>
                    <th>Employee Last Name</th>
                    <th>Employee Email Id</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {employee.map((employee) => 
                    <tr key={employee.id}>
                        <td>{employee.id}</td>
                        <td>{employee.firstName}</td>
                        <td>{employee.lastName}</td>
                        <td>{employee.email}</td>
                        <td>
                            <button className='btn btn-info' onClick={() => updateEmployee(employee.id)}>Update</button>
                            <button className='btn btn-danger' onClick={() => deleteEmployee(employee.id)} style={{marginLeft:'10px'}}>Delete</button>
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    </div>
  )
}

export default ListEmployeeComponent