"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useForm } from "react-hook-form";
import apiClient from "@/utils/apiClient";
import toast from "react-hot-toast";
import Cookies from "js-cookie";

interface LoginForm {
  email: string;
  password: string;
}

export default function Login() {

  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();


  const onSubmit = async (data: LoginForm) => {
    try {
      const response = await apiClient.post("/auth/login", data);
  
      if (response.data.status === "success") {
        const { token, role } = response.data; // Assuming response includes `role`
        Cookies.set("jwt-token", token, { expires: 1 });
  
        toast.success("Login successful!", { duration: 3000 });
  
        // Redirect based on role
        if (role === "admin") {
          router.push("/dashboard/admin");
        } else {
          router.push("/dashboard/user");
        }
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Login failed", {
        duration: 3000,
      });
    }
  };
  


  return (
    <div className="bg-[#001F23] relative h-screen flex items-center justify-center">
      <div className="p-8 flex flex-col md:flex-row items-center justify-center h-[650px] w-[1400px]">
        {/* Left Side */}
        <div className="hidden md:flex items-center justify-center w-full md:w-1/2">
          <p className="md:text-2xl lg:text-3xl font-semibold text-white font-libre-caslon">
            Welcome Back to Task Manager Application
          </p>
        </div>

        <span className="md:border-r-2 md:h-[100%] "></span>

        {/* Right Side */}
        <div className="md:w-1/2 w-full flex flex-col items-center">
          <form className="w-3/4" onSubmit={handleSubmit(onSubmit)}>
            <p className="text-2xl text-white font-semibold tracking-[0.1em] font-arsenal mb-6 text-center">
              Sign In to Your Account
            </p>

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
            <div className="mb-5">
              <label htmlFor="password" className="block text-white text-sm font-semibold mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                {...register("password", {
                  required: "Password is required",
                })}
                className="w-full px-3 py-2 border text-black rounded-sm focus:border-black focus:outline-none focus:ring-0"
                placeholder="Enter your password"
              />
              {errors.password && <span className="text-sm font-normal text-red-600">{errors.password.message}</span>}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-red-900 hover:bg-opacity-75 text-white font-base py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Sign In
            </button>

            {/* Don't have an account? */}
            <div className="flex justify-end my-2">
              <p className="text-sm text-white">
                Don't have an account? {" "}
                <Link href="/register" className="font-semibold">
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
