import React, { use } from 'react'
import { useState , useEffect } from 'react'
import { useNavigate , useParams } from 'react-router-dom'

import { createDepartment } from '../Services/DepartmentService' 
import { getDepartment, updateDepartment } from '../Services/DepartmentService'

const DepartmentComponent = () => {

    const [departmentName, setDepartmentName] = useState([''])
    const [departmentDescription, setDepartmentDescription] = useState([''])
    const navigate = useNavigate()

    

    
    const { id } = useParams()

    function saveDepartment(e) {
        e.preventDefault()
        const department = { departmentName, departmentDescription }
        console.log(department)

        if(id) {
            updateDepartment(id, department).then((response) => {
                console.log(response.data)
                navigate('/departments')
            }).catch((error) => {
                console.log(error);
            });
        }

        else {createDepartment(department).then((response) => {
            console.log(response.data)
            navigate('/departments')
        }).catch((error) => {
            console.log(error)
        })}
    }

    function pageTitle() {
        if (id) {
            return <h2 className='text-center'>Update Department</h2>
        } else {
            return <h2 className='text-center'>Add Department</h2>
        }
    }
    
    
    useEffect(() => {
        if (id) {

            getDepartment(id).then((response) => {
                setDepartmentName(response.data.departmentName);
                setDepartmentDescription(response.data.departmentDescription);
            }).catch((error) => {
                console.log(error);
            });
        }
    }, [id]);

    

    return (

<div className='container'><br></br>
<br /><b />
    <div className='row'>
        <div className='card col-md-6 offset-md-3'>
        {pageTitle()}
            <div className='card-body'>

                <form>
                    <div className='form-group mb-2'>
                        <label className='form-label'>Department Name</label>
                        <input type='text' placeholder='Enter Department Name' name='departmentName' className='form-control'
                        value={departmentName} onChange={(e) => setDepartmentName(e.target.value)}></input>
                    </div>

                    <div className='form-group mb-2'>
                        <label className='form-label'>Department Description</label>
                        <input type='text' placeholder='Enter Department Description' name='departmentDescription' className='form-control'
                        value={departmentDescription} onChange={(e) => setDepartmentDescription(e.target.value)}></input>
                    </div>
                    <br />
                    <button onClick={(e) => saveDepartment(e)} className='btn btn-success'>Submit</button>
                </form>
            </div>
        </div>
    </div>
</div>
)}

export default DepartmentComponent