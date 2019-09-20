import React, { useState } from 'react'
import { Form as Formik, Field, withFormik } from 'formik'
import { Segment, Form, Button } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import Axios from 'axios';

const FormComp = props => {
    const [users, setUsers] = useState([])
    return (
        <Segment raised compact>
            <Form>
                <Formik>
                    <Form.Field>
                        <Field type='text' name='username' placeholder='username' />
                    </Form.Field>
                    <Form.Field>
                        <Field type='password' name='password' placeholder='password' />
                    </Form.Field>
                    <Button type="submit">Register</Button>
                </Formik>
            </Form>
            <div></div>
        </Segment>
    )
}

const FormikForm = withFormik({
    mapPropsToValues(values) {
        return {
            username: values.username || '',
            password: values.password || ''
        }
    },
    handleSubmit(values, props) {
        console.log(values)
        Axios.post('http://localhost:3300/api/auth/register', values)
            .then(res => {
                alert('account created successfully')
                props.history.push('/login')
            })
            .catch(err => alert(err))
    },
    handleLogin(values) {
        console.log(values)
        Axios.post('http://localhost:3300/api/auth/register', values)
            .then(res => {
                alert('account logged in')
                console.log(res)
            })
    }
})(FormComp)

export default FormikForm