import { Formik, Field, Form,} from 'formik';
import { Redirect } from 'react-router';
import { useRecoilState } from 'recoil';
import { userAtom } from '../store/store';

function LoginPage() {
    const [user, setUser] = useRecoilState(userAtom);


    async function logInUser(values){
      fetch('http://127.0.0.1:5000/log_in', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values)
            }).then((res)=> res.json())
            .then(data => setUser(data))
    }
    
    return (
        <div className="section">
        <Formik
          initialValues={{
            user_name: '',
            password: '',
          }}

          onSubmit={async (values) => {
             logInUser(values)
          }}

        >
          <Form className="box container">
            <div className="field">
            <label>Username</label>
            <div className="control">
            <Field id="user_name" name="user_name"/>
            </div>
            </div>
            <div className="field">
            <label>Password</label>
            <div className="control">
            <Field id="password" name="password"type="password"/>
            </div>
            </div>
            <button className='button is-primary' type="submit">log in</button>
          </Form>
        </Formik>
         { user.name !== undefined &&
         <Redirect to="/"></Redirect>
         }
        </div>
        );
}

export default LoginPage;