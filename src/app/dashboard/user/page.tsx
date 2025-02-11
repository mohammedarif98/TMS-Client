"use client";

import apiClient from "@/utils/apiClient";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Cookies from "js-cookie";
import toast from "react-hot-toast";
import { AxiosError } from "axios";


export default function UserDashBoard() {
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
        } catch (error: unknown) {
            if (error instanceof AxiosError) {
              toast.error(error.response?.data?.message || "Login failed", { duration: 3000 });
            } else {
              toast.error("An unexpected error occurred", { duration: 3000 });
            }
          }finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col justify-center items-center h-screen space-y-5">
            <p className="text-2xl font-bold">Welcome To The User Dashboard.</p>
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
