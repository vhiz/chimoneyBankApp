import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../lib/firebase";
import { doc, getDoc } from "firebase/firestore";
import useUserStore from "../store/useUserStore";

export default function Login() {
  const [password, setPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { setCurrentUser } = useUserStore();

  const navigate = useNavigate();
  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const { email, password } = Object.fromEntries(formData);
    try {
      setLoading(true);
      const res = await signInWithEmailAndPassword(auth, email, password);
      const docRef = doc(db, "users", res.user.uid);
      const docSnap = await getDoc(docRef);
      // eslint-disable-next-line no-unused-vars
      const { pin, id, balance, ...others } = docSnap.data();
      setCurrentUser(others);
      navigate("/");
      toast.success("Login Successful");
    } catch (error) {
      toast.error(error.code);
    } finally {
      setLoading(false);
    }
  }
  return (
    <div className="w-screen h-screen flex items-center justify-center hero bg-[url('https://i.pinimg.com/originals/aa/79/89/aa7989193c55e35937d16bd446d4c7fb.jpg')] text-neutral-content">
      <div className="hero rounded-md lg:w-[70vw] lg:h-[70vh] glass animate-bounceIn">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Login now!</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl glass text-error-content">
            <form className="card-body" onSubmit={handleSubmit}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  name="email"
                  required
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <label className="input input-bordered flex items-center gap-2 w-full">
                  <input
                    type={password ? "text" : "password"}
                    placeholder="Type here"
                    className="grow"
                    name="password"
                    minLength={6}
                    required
                  />
                  <div
                    className="btn btn-ghost btn-circle btn-sm opacity-70"
                    onClick={() => setPassword((prev) => !prev)}
                  >
                    {password ? <IoEyeOutline /> : <IoEyeOffOutline />}
                  </div>
                </label>
                <label className="label">
                  <Link
                    to="/register"
                    href="#"
                    className="label-text-alt link link-hover"
                  >
                    Create an account?
                  </Link>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary" disabled={loading}>
                  {loading ? (
                    <span className="loading loading-bars loading-xs"></span>
                  ) : (
                    "Login"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
