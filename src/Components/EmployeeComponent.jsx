import React , { useState, useEffect } from 'react'
import { createEmployee, updateEmployee, getEmployee } from '../Services/EmployeeService'
import { useNavigate , useParams } from 'react-router-dom';
import { getAllDepartments } from '../Services/DepartmentService'; // make sure this exists

const EmployeeComponent = () => {

    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [departmentId, setDepartmentId] = useState('')
    const [departments, setDepartments] = useState([]);

    useEffect(() => {
        getAllDepartments().then((response) => {
            setDepartments(response.data); 
        }).catch(error => {
            console.log(error);
        });
    }, []);
    

    const{id} = useParams();

    const [errors , setErrors] = useState({

        firstName: '',
        lastName: '',
        email: '',
        departmentId: ''

    })

    const navigate = useNavigate();

    useEffect(() => {
        if (id) {

            getEmployee(id).then((response) => {
                setFirstName(response.data.firstName)
                setLastName(response.data.lastName)
                setEmail(response.data.email)
            }).catch(error => {
                console.log(error)
            })
        }
    }, [id])





    function saveOrUpdateEmolyee(e) {
        e.preventDefault()
        if (validateForm()) {

            const employee = { firstName, lastName, email, departmentId }
            console.log(employee)

            if(id){
                updateEmployee(id, employee).then((response) => {
                    console.log(response.data)
                    navigate('/employees')
                }).catch((error) => {
                    console.log(error)
                })
            } else {
                createEmployee(employee).then((response) => {
                    console.log(response.data)
                    navigate('/employees')
                }).catch((error) => {
                    console.log(error)
                })
            }
    }}



    function validateForm() {
        let valid = true;

        const errorsCopy = { ... errors };
        ['firstName', 'lastName', 'email'].forEach(field => {
            errorsCopy.departmentId = departmentId ? '' : 'Department is required';
            valid = departmentId ? valid : false;

        });

        setErrors(errorsCopy);
        return valid;
    }


    function pageTitle(){
        if(id){
            return <h2 className='text-center'>Update Employee</h2>
        }else{
            return <h2 className='text-center'>Add Employee</h2>
        }
    }

    

return (
    <div style={{ 
        width: '400px', 
        height: '400px', 
        border: '2px solid #ccc', 
        padding: '10px', 
        boxSizing: 'border-box', 
        margin: '0 auto', 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center', 
        marginTop: '50px',
        borderRadius: '10px',
    }}>
        {pageTitle()}
        <br />
        <form>
            <div className='form-group'>
                <label>First Name</label>
                <input type='text' className={`form-control ${errors.firstName ? 'is-invalid' : ''}`} placeholder='Enter First Name' value={firstName} onChange={(e) => setFirstName(e.target.value)} />
                {errors.firstName && <div className='invalid-feedback'>{errors.firstName}</div>}
            </div>
            <div className='form-group'>
                <label>Last Name</label>
                <input type='text' className={`form-control ${errors.lastName ? 'is-invalid' : ''}`} placeholder='Enter Last Name' value={lastName} onChange={(e) => setLastName(e.target.value)} />
                {errors.lastName && <div className='invalid-feedback'>{errors.lastName}</div>}
            </div>
            <div className='form-group'>
                <label>Email</label>
                <input type='email' className={`form-control ${errors.email ? 'is-invalid' : ''}`} placeholder='Enter Email' value={email} onChange={(e) => setEmail(e.target.value)} />
                {errors.email && <div className='invalid-feedback'>{errors.email}</div>}
            </div>
            <div className='form-group ,mb-2'>
                <label>Department</label>
                <select 
                    className={`form-control ${errors.departmentId ? 'is-invalid' : ''}`} 
                    value={departmentId} 
                    onChange={(e) => setDepartmentId(e.target.value)}
                >
                    <option value=''>Select Department</option>
                    {departments.map(department => (
                        <option key={department.id} value={department.id}>
                            {department.departmentName}
                        </option>
                    ))}
                </select>
                {errors.departmentId && <div className='invalid-feedback'>{errors.departmentId}</div>}

            </div>

            <br />
            <button type='submit' className='btn btn-primary' onClick={saveOrUpdateEmolyee} >Submit</button>
        </form>
    </div>
)
}

export default EmployeeComponent