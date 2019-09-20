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
                    <Button type="submit">Login</Button>
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
    handleSubmit(values) {
        console.log(values)
        Axios.post('http://localhost:3300/api/auth/login', values)
            .then(res => {
                alert('logged in')
                console.log(res)
                localStorage.setItem('token', res.data.token)
            })
            .catch(err => alert(err))
    }
})(FormComp)

export default FormikForm