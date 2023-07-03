import React, { useEffect } from 'react'
import { Button, Card, CardContent, TextField, Typography } from '@mui/material'
import { Box } from '@mui/system'
import Center from './Center'
import useForm from '../hooks/useForm'
import { createAPIEndpoint, ENDPOINTS } from '../api'
import useStateContext from '../hooks/useStateContext'
import { useNavigate } from 'react-router'
const getFreshModel = () => ({
    name: '',
    email: ''
})

export default function Login() {
    const { context, setContext, resetContext } = useStateContext();
    const navigate = useNavigate()

    const {
        values,
        setValues,
        errors,
        setErrors,
        handleInputChange
    } = useForm(getFreshModel);

    useEffect(() => {
        resetContext()
    }, [])


    const login = e => {
        e.preventDefault();

        if (validate())
           {
            setContext( { email: values.email, fname: values.fname });
            navigate('/recommendation');
           }
     
    }
    

    const validate = () => {
        let temp = {}
        temp.email = (/\S+@\S+\.\S+/).test(values.email) ? "" : "Email is not valid."
        temp.fname = values.fname!== "" ? "" : "This field is required."
        temp.lname = values.lname!== "" ? "" : "This field is required."
        temp.address = values.address !== "" ? "" : "This field is required."
        temp.phone = (/^\d{10}$/).test(values.phone) ? "" : "Phone number is not valid."

        
        setErrors(temp)
        return Object.values(temp).every(x => x === "")
    }

    return (
        <Center>
            <Card sx={{ width: 400 }}>
                <CardContent sx={{ textAlign: 'center' }}>
                    <Typography variant="h3" sx={{ my: 3 }}>
                        Recommendation Engine
                    </Typography>
                    <Box sx={{
                        '& .MuiTextField-root': {
                            m: 1,
                            width: '90%'
                        }
                    }}>
                        <form noValidate autoComplete="off" onSubmit={login}>
                            <TextField
                                label="Email"
                                name="email"
                                value={values.email}
                                onChange={handleInputChange}
                                variant="outlined"
                                {...(errors.email && { error: true, helperText: errors.email })} />
                            <TextField
                                label="First Name"
                                name="fname"
                                value={values.fname}
                                onChange={handleInputChange}
                                variant="outlined"
                                {...(errors.fname && { error: true, helperText: errors.fname })} />
                            <TextField
                                label="Last Name"
                                name="lname"
                                value={values.lname}
                                onChange={handleInputChange}
                                variant="outlined"
                                {...(errors.lname && { error: true, helperText: errors.lname })} />
                            <TextField
                                label="Address"
                                name="address"
                                value={values.address}
                                onChange={handleInputChange}
                                variant="outlined"
                                {...(errors.address && { error: true, helperText: errors.address })} />
                            <TextField
                                label="Phone Number"
                                name="phone"
                                value={values.phone}
                                onChange={handleInputChange}
                            
                                variant="outlined"
                                {...(errors.phone && { error: true, helperText: errors.phone })} />                                
                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                sx={{ width: '90%' }}>Start</Button>
                        </form>
                    </Box>
                </CardContent>
            </Card>
        </Center>

    )
}
