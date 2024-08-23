import LoginForm from "../../components/Login/LoginForm"
import Layout from "../../components/layout/homeLayout";

const Login = () => {
    return (
        <Layout sidebar={false}>
            <LoginForm />
        </Layout>

    )
}

export default Login;