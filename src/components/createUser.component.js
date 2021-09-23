import { Formik, Field, Form} from "formik";
import { useState } from "react";

function CreateUser(){
    const [response, setResponse] = useState('')

    function addUser(values){
        fetch('http://127.0.0.1:5000/create_new_user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            }).then((res)=> res.json())
              .then(data => setResponse(data.status))
    }

    return(
        <div className="block box">
        <h3 className="title is-4 block">Create new user</h3>
        <Formik
          initialValues={{
            name: '',
            password: ''
          }}

          onSubmit={async (values, {resetForm}) => {
             addUser(values)
             resetForm({})
          }}

        >
          <Form className="container">
            <div className="field">
            <label>Name</label>
            <div className="control">
            <Field id="name" name="name"/>
            </div>
            </div>
            <div className="field">
            <label>Password</label>
            <div className="control">
            <Field id="password" name="password" type="password"/>
            </div>
            </div>
            <button className='button is-primary' type="submit">create user</button>
            <p>{response}</p>
          </Form>
        </Formik>
        </div>
    )
}

export default CreateUser