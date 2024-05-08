import {
  collection,
  doc,
  getDocs,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import PhoneInput from "react-phone-number-input";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import { auth, db } from "../lib/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import "react-phone-number-input/style.css";
import apiRequest from "../axios";

export default function Register() {
  const [password, setPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [phone, setPhone] = useState();

  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  function handleChange(e) {
    setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }
  async function handleRegister(e) {
    e.preventDefault();
    setLoading(true);
    try {
      if (!phone) {
        toast.error("Please enter your phone number");
        return;
      }
      const usersRef = collection(db, "users");
      const q = query(usersRef, where("username", "==", inputs.name));
      const p = query(usersRef, where("phone", "==", phone));
      const querySnapshot = await getDocs(q);
      const queryPSnapshot = await getDocs(p);
      if (!querySnapshot.empty || !queryPSnapshot) {
        return toast.error("Select another username");
      }
      const res = await createUserWithEmailAndPassword(
        auth,
        inputs.email,
        inputs.password
      );
      await apiRequest.post("/sub-account/create", {
        id: res.user.uid,
        name: inputs.name,
        email: inputs.email,
        phoneNumber: phone,
      });
      await setDoc(doc(db, "users", res.user.uid), {
        username: inputs.name,
        email: inputs.email,
        id: res.user.uid,
        img: `https://avatar.iran.liara.run/username?username=${inputs.name}`,
        phone,
        balance: 3000,
        pin: null,
      });
      toast.success("Account created successfully");
      navigate("/login");
    } catch (error) {
      toast.error(error.code);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-screen h-screen flex items-center justify-center hero bg-[url('https://i.pinimg.com/originals/aa/79/89/aa7989193c55e35937d16bd446d4c7fb.jpg')] text-neutral-content">
      <div className="hero rounded-md w-full lg:w-[70vw] glass animate-bounceIn overflow-hidden">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <div className="text-center lg:text-left">
            <h1 className="text-5xl font-bold">Register</h1>
            <p className="py-6">
              Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda
              excepturi exercitationem quasi. In deleniti eaque aut repudiandae
              et a id nisi.
            </p>
          </div>
          <div className="card shrink-0 w-full max-w-sm shadow-2xl glass text-error-content">
            <form className="card-body p-3" onSubmit={handleRegister}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="email"
                  placeholder="email"
                  className="input input-bordered"
                  name="email"
                  onChange={handleChange}
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
                    onChange={handleChange}
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
              </div>
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text">Phone</span>
                </div>
                <PhoneInput
                  placeholder="select country code before inputting your number"
                  value={phone}
                  onChange={setPhone}
                />
              </label>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="Name"
                  placeholder="Full name"
                  className="input input-bordered"
                  required
                  name="name"
                  onChange={handleChange}
                  minLength={4}
                />
                <label className="label">
                  <Link
                    to="/login"
                    href="#"
                    className="label-text-alt link link-hover"
                  >
                    Have an account?
                  </Link>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary" disabled={loading}>
                  {loading ? (
                    <span className="loading loading-bars loading-xs"></span>
                  ) : (
                    "Register"
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
        <Toaster />
      </div>
    </div>
  );
}
