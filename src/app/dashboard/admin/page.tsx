"use client";

import apiClient from "@/utils/apiClient";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
export default function AdminDashboard() {

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleLogout = async () => {
      setLoading(true);
      try {
          const response = await apiClient.post("/api/auth/logout", {});

          if (response.status === 200) {
              Cookies.remove("jwt-token");
              toast.success("Logout successful!", { position: "top-right" });
              router.push("/login");
          } else {
              console.error("Logout failed with status:", response.status);
          }
      } catch (error: any) {
          console.error("Logout failed", error.message);
      } finally {
          setLoading(false);
      }
  };


    return (
        <div className="flex flex-col justify-center items-center h-screen">
            <p className="text-2xl font-bold mb-6">Welcome To The Admin Dashboard</p>
            <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50"
                disabled={loading}
            >
                {loading ? "Logging out..." : "Logout"}
            </button>
        </div>
    );
  }
  

