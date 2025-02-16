import axios from "axios";
import { useFormik } from "formik";
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { AuthContext } from "../Context/AuthContext";

const validationSchema = yup.object().shape({
  email: yup.string().required("Email is required").email("Enter a valid email"),
  password: yup
    .string()
    .required("Password is required")
    .matches(/^[A-z0-9_]{6,30}$/, "Must be 6 to 30 characters"),
});

export default function Login() {
  const [msg, setMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { setToken } = useContext(AuthContext);

  async function login(values) {
    setMsg(null);
    setSuccessMsg(null);
    setLoading(true);
    try {
      const res = await axios.post(
        "https://ecommerce.routemisr.com/api/v1/auth/signin",
        values
      );
      setSuccessMsg(res.data.message);
      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);
      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (err) {
      setMsg(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: login,
    validationSchema,
  });

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className="shadow-xl rounded-lg p-10 w-full max-w-lg">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-10">
          LOGIN
        </h2>

        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="text-gray-700 text-lg font-semibold">
              Email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-4 focus:ring-blue-500"
              placeholder="Enter your email"
            />
            {formik.errors.email && formik.touched.email && (
              <p className="text-red-500 text-sm mt-2">{formik.errors.email}</p>
            )}
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="text-gray-700 text-lg font-semibold">
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              className="w-full mt-2 px-4 py-3 border border-gray-300 rounded-md text-lg focus:outline-none focus:ring-4 focus:ring-blue-500"
              placeholder="Enter your password"
            />
            {formik.errors.password && formik.touched.password && (
              <p className="text-red-500 text-sm mt-2">{formik.errors.password}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-4 rounded-md text-xl font-bold hover:bg-blue-700 transition-all duration-300 shadow-lg"
          >
            {loading ? "Logging in..." : "LOGIN"}
          </button>
        </form>

        {/* Alerts */}
        {msg && <p className="mt-6 text-center text-red-500 text-lg">{msg}</p>}
        {successMsg && <p className="mt-6 text-center text-green-500 text-lg">{successMsg}</p>}
      </div>
    </div>
  );
}