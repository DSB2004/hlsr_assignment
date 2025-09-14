"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Loader } from "lucide-react";
import { verification } from "@/actions/auth/verify.action";

export default function VerifyPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("auth_token");

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!token) {
      router.replace("/auth/login/?error=token_missing");
      return;
    }

    const verifyToken = async () => {
      try {
        const res = await verification({ token });

        router.replace("/");
      } catch (err) {
        console.error("Verification failed", err);

        router.replace("/auth/login/?error=verification_failed");
      } finally {
        setLoading(false);
      }
    };

    verifyToken();
  }, [token, router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      {loading && <Loader className="animate-spin w-12 h-12" />}
    </div>
  );
}
