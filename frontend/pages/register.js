import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { SyncOutlined } from "@ant-design/icons";
import Link from "next/link";

const Register = () => {
  const [name, setName] = useState("usePrueba");
  const [email, setEmail] = useState("correoPrueba@gmail.com");
  const [password, setPassword] = useState("claveDePrueba");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {

    try {
      setLoading(true);
      e.preventDefault();

      const { data } = await axios.post(`${process.env.NEXT_PUBLIC_API}/register`, {
        name,
        email,
        password,
      });
      toast.success("Registro exitoso. Por favor inicia sesión.");
      setLoading(false);
    }
    catch (err) {
      toast.error(err.response.data);
      setLoading(false);

    }

  };

  return (
    <>
      <h1 className="jumbotron text-center bg-primary square">Registrar Cuenta</h1>

      <div className="container col-md-4 offset-md-4 pb-5">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="form-control mb-4 p-4"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter name"
            required
          />

          <input
            type="email"
            className="form-control mb-4 p-4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            required
          />

          <input
            type="password"
            className="form-control mb-4 p-4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            required
          />

          <div className="d-grid">
            <button type="submit" className="btn btn-primary"
              disabled={!name || !email || !password || loading}>
              {loading ? <SyncOutlined spin /> : "Submit"}
            </button>
          </div>
        </form>
        <p className="text-center p-3">
          Ya está registrado? {" "}
          <Link href="/login">
            <a>Iniciar sesión</a>
          </Link>
        </p>
      </div>
    </>
  );
};

export default Register;
