"use client";

import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import Link from "next/link";
import apiClient from "@/utils/apiClient";
import toast from "react-hot-toast";


interface FormData {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function Register() {

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<FormData>();


  const onSubmit = async (data: FormData) => {
    if (data.password !== data.confirmPassword) {
      toast.error("Passwords do not match!", { duration: 3000 });
      return;
    }

    try {
      const response = await apiClient.post("/api/auth/register", data);

      if (response.data.status === "success") {
        toast.success("Account created successfully!", { duration: 3000 });
        router.push("/login");
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Registration failed", {
        duration: 3000,
      });
    }
  };

  return (
    <div className="bg-[#0b0c30] relative h-screen flex items-center justify-center">
      <div className="p-8 flex flex-col md:flex-row items-center justify-center h-[650px] w-[1400px]">
        {/* Left Side */}
        <div className="hidden md:flex items-center justify-center w-full md:w-1/2">
          <p className="md:text-2xl lg:text-3xl font-semibold text-white font-libre-caslon">
            Welcome To Task Manager Application
          </p>
        </div>

        <span className="md:border-r-2 md:h-[100%] "></span>

        {/* Right Side */}
        <div className="md:w-1/2 w-full flex flex-col items-center">
          <form className="w-3/4" onSubmit={handleSubmit(onSubmit)}>
            <p className="text-2xl text-white font-semibold tracking-[0.1em] font-arsenal mb-6 text-center">
              Create An Account
            </p>

            {/* Username Field */}
            <div className="mb-1">
              <label htmlFor="username" className="block text-white text-sm font-semibold mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                {...register("username", { required: "Username is required" })}
                className="w-full px-3 py-2 border text-black rounded-sm focus:border-black focus:outline-none focus:ring-0"
                placeholder="Enter your username"
              />
              {errors.username && <span className="text-sm font-normal text-red-600">{errors.username.message}</span>}
            </div>

            {/* Email Field */}
            <div className="mb-1">
              <label htmlFor="email" className="block text-white text-sm font-semibold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                {...register("email", { required: "Email is required" })}
                className="w-full px-3 py-2 border text-black rounded-sm focus:border-black focus:outline-none focus:ring-0"
                placeholder="Enter your email"
              />
              {errors.email && <span className="text-sm font-normal text-red-600">{errors.email.message}</span>}
            </div>

            {/* Password Field */}
            <div className="mb-1">
              <label htmlFor="password" className="block text-white text-sm font-semibold mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Minimum 6 characters" },
                })}
                className="w-full px-3 py-2 border text-black rounded-sm focus:border-black focus:outline-none focus:ring-0"
                placeholder="Enter your password"
              />
              {errors.password && <span className="text-sm font-normal text-red-600">{errors.password.message}</span>}
            </div>

            {/* Confirm Password Field */}
            <div className="mb-5">
              <label htmlFor="confirmPassword" className="block text-white text-sm font-semibold mb-2">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                {...register("confirmPassword", {
                  required: "Confirm Password is required",
                  validate: (value) => value === watch("password") || "Passwords do not match",
                })}
                className="w-full px-3 py-2 border text-black rounded-sm focus:border-black focus:outline-none focus:ring-0"
                placeholder="Confirm your password"
              />
              {errors.confirmPassword && <span className="text-sm font-normal text-red-600">{errors.confirmPassword.message}</span>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-red-900 hover:bg-opacity-75 text-white font-base py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign Up
            </button>

            {/* Already have an account? */}
            <div className="flex justify-end my-2">
              <p className="text-sm text-white">
                Already have an account?{" "}
                <Link href="/login" className="font-semibold">
                  Login
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
