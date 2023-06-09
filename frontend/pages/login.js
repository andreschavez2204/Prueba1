import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import Link from "next/link";

const Login = () => {

    const [email, setEmail] = useState("correoPrueba@gmail.com");
    const [password, setPassword] = useState("claveDePrueba");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {

        e.preventDefault();
        try {
            setLoading(true);

            const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API}/login`, {

                email,
                password,
            });
            console.log("Login exitoso", data);
            // setLoading(false);
        }
        catch (err) {
            toast.error(err.response.data);
            setLoading(false);

        }

    };

    return (
        <>
            <h1 className="jumbotron text-center bg-primary square">Login</h1>

            <div className="container col-md-4 offset-md-4 pb-5">
                <form onSubmit={handleSubmit}>

                    <input
                        type="email"
                        className="form-control mb-4 p-4"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Ingresa e-mail"
                        required
                    />

                    <input
                        type="password"
                        className="form-control mb-4 p-4"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Ingresa password"
                        required
                    />

                    <div className="d-grid">
                        <button type="submit" className="btn btn-primary"
                            disabled={!email || !password || loading}>
                            {loading ? <SyncOutlined spin /> : "Submit"}
                        </button>
                    </div>
                </form>
                <p className="text-center p-3">
                    Aún no estás registrado? {" "}
                    <Link href="/register">
                        <a>Registrarse</a>
                    </Link>
                </p>
            </div>
        </>
    );
};

export default Login;
