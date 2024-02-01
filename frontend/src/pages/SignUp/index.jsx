import { useEffect, useState } from "react";
import { signUp } from "./api";

export function SignUp() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [apiProgress, setApiProgress] = useState(false);
  const [succesMessage, setSuccesMessage] = useState();
  const [errors, setErrors] = useState({});

  useEffect(() => {
    setErrors({});
  }, [username, email, password, passwordRepeat]);

  const onSubmit = async (event) => {
    event.preventDefault();
    setSuccesMessage();
    setApiProgress(true);

    try {
      const response = await signUp({
        username,
        email,
        password,
      })
        .then((response) => {
          setSuccesMessage(response.data.message);
        })
        .finally(() => {
          setApiProgress(false);
        });

      // setSuccesMessage(response.data.message);
    } catch (axiosError) {
      if (
        axiosError.response.data?.validationErrors &&
        axiosError.response.data.status === 400
      ) {
        setErrors(axiosError.response.data.validationErrors);
      }
    } finally {
    }

    // .then((response) => {
    //   setSuccesMessage(response.data.message);
    // })
    // .finally(() => {
    //   setApiProgress(false);
    // });
  };

  return (
    <div className="container">
      <div className="col-lg-6 offset-lg-3 col-sm-8 offset-sm-2">
        <form className="card" onSubmit={onSubmit}>
          <div className="text-center card-header">
            <h1>Sign Up</h1>
          </div>
          <div className="card-body">
            <div className="mb-3">
              <label htmlFor="username" className="form-label">
                {" "}
                Username
              </label>
              <input
                id="username"
                className={
                  errors.username ? "form-control is-invalid" : "form-control"
                }
                onChange={(event) => setUsername(event.target.value)}
              />
              <div className="invalid-feedback">{errors.username}</div>
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                {" "}
                E-mail
              </label>
              <input
                id="email"
                className="form-control"
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                {" "}
                Password
              </label>
              <input
                id="password"
                className="form-control"
                type="password"
                onChange={(event) => setpassword(event.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="passwordRepeat" className="form-label">
                {" "}
                Password Repeat
              </label>
              <input
                id="passwordRepeat"
                className="form-control"
                type="password"
                onChange={(event) => setPasswordRepeat(event.target.value)}
              />
            </div>
            <div className="text-center">
              {succesMessage && (
                <div className="alert alert-success">{succesMessage}</div>
              )}
              <button
                className="btn btn-primary"
                disabled={
                  apiProgress || !password || password !== passwordRepeat
                }
              >
                {apiProgress && (
                  <span
                    className="spinner-border spinner-border-sm"
                    aria-hidden="true"
                  ></span>
                )}
                Sign Up
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
