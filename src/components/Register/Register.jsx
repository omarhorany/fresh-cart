import axios from "axios";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import * as yup from "yup";
import { Loader2 } from "lucide-react"; // Loading icon

const validationSchema = yup.object().shape({
  name: yup.string().required("Name is required").min(3, "Min 3 characters").max(20, "Max 20 characters"),
  email: yup.string().required("Email is required").email("Enter a valid email"),
  password: yup.string().required("Password is required").matches(/^[A-z0-9_]{6,30}$/, "Min 6 to 30 characters"),
  rePassword: yup.string().required("Re-enter password").oneOf([yup.ref("password")], "Passwords do not match"),
  phone: yup.string().required("Phone is required").matches(/^01[1250][0-9]{8}$/, "Enter a valid Egyptian phone number"),
});

export default function Register() {
  const [msg, setMsg] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  async function register(values) {
    setMsg(null);
    setSuccessMsg(null);
    setLoading(true);
    try {
      const res = await axios.post("https://ecommerce.routemisr.com/api/v1/auth/signup", values);
      setSuccessMsg(res.data.message);
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setMsg(err.response?.data?.message || "An error occurred");
    } finally {
      setLoading(false);
    }
  }

  const formik = useFormik({
    initialValues: { name: "", email: "", password: "", rePassword: "", phone: "" },
    onSubmit: register,
    validationSchema,
  });

  return (
    <div className="flex justify-center items-center min-h-screen px-4">
      <div className="shadow-xl rounded-lg p-10 w-full max-w-xl">
        <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-5">Sign Up</h2>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          {["name", "email", "password", "rePassword", "phone"].map((field) => (
            <div key={field}>
              <label htmlFor={field} className="block text-lg font-semibold text-gray-700 capitalize">
                {field.replace("rePassword", "Re-enter Password")}
              </label>
              <input
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values[field]}
                type={field.includes("password") ? "password" : "text"}
                name={field}
                id={field}
                className={`mt-2 block w-full px-5 py-3 text-lg border rounded-lg shadow-sm transition focus:outline-none focus:ring-4 ${formik.errors[field] && formik.touched[field]
                  ? "border-red-500 focus:ring-red-300"
                  : "border-gray-300 focus:ring-blue-500"
                  }`}
                placeholder={`Enter ${field.replace("rePassword", "re-enter password")}`}
              />
              {formik.errors[field] && formik.touched[field] && (
                <p className="text-red-500 text-sm mt-2">{formik.errors[field]}</p>
              )}
            </div>
          ))}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-4 text-xl font-bold rounded-lg hover:bg-blue-700 transition-all duration-300 flex justify-center items-center shadow-lg"
            disabled={loading}
          >
            {loading ? <Loader2 className="animate-spin w-6 h-6" /> : "Register"}
          </button>

          {/* Alerts */}
          {msg && <p className="mt-4 text-center text-red-500 text-lg">{msg}</p>}
          {successMsg && <p className="mt-4 text-center text-green-500 text-lg">{successMsg}</p>}
        </form>
      </div>
    </div>
  );
}