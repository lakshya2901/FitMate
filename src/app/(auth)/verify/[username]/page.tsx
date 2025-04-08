'use client';

import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { verifySchema } from "@/schemas/verifySchema";
import { zodResolver } from "@hookform/resolvers/zod";
import axios, { AxiosError } from "axios";
import { ApiError } from "next/dist/server/api-utils";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import * as z from "zod";
import { Loader2, CheckCircle2 } from 'lucide-react';
import { useState } from "react";

const VerifyAccount = () => {
  const router = useRouter();
  const params = useParams<{ username: string }>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema)
  });

  const onSubmit = async (data: z.infer<typeof verifySchema>) => {
    setIsSubmitting(true);
    try {
      const response = await axios.post("/api/verify-code", {
        username: params.username,
        code: data.code
      });
      toast.success(response.data.message);
      router.push("/sign-in");
    } catch (error) {
      console.error("Error in verifying account", error);
      const axiosError = error as AxiosError<ApiError>;
      toast.error(axiosError.response?.data?.message || "Error verifying account");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-orange-400 via-amber-300 to-yellow-300">
      <div className="w-full max-w-md p-8 space-y-6 bg-white/95 backdrop-blur-sm rounded-2xl shadow-xl border border-amber-100">
        <div className="text-center">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-orange-100 rounded-full">
              <CheckCircle2 className="w-8 h-8 text-amber-500" />
            </div>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight mb-2 bg-gradient-to-r from-amber-600 to-purple-800 bg-clip-text text-transparent">
            Verify Your Account
          </h1>
          <div className="h-1 w-16 bg-gradient-to-r from-amber-400 to-purple-600 mx-auto mb-6 rounded-full"></div>
          <p className="mb-6 text-gray-700">
            We have sent a verification code to your email address. Please enter it below to activate your account.
          </p>
        </div>

        <div className="bg-amber-50 rounded-lg p-4 border border-amber-200 mb-6">
          <p className="text-sm text-amber-800">
            <span className="font-medium">Hello {params.username}!</span> Please check your inbox for the verification code.
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700 font-medium">Verification Code</FormLabel>
                  <div className="relative">
                    <FormControl>
                      <Input 
                        placeholder="Enter 6-digit code" 
                        {...field} 
                        className="text-center text-lg tracking-widest font-medium bg-gray-50 border border-gray-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-200 rounded-lg transition-all duration-200" 
                      />
                    </FormControl>
                  </div>
                  <FormMessage className="text-xs text-center" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full py-3 mt-6 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-medium rounded-lg shadow-md hover:shadow-lg transition-all duration-200"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <div className="flex items-center justify-center">
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  <span>Verifying...</span>
                </div>
              ) : (
                "Verify Account"
              )}
            </Button>
          </form>
        </Form>

        <div className="text-center pt-4 border-t border-gray-100">
          <p className="text-sm text-gray-600">
            Did not receive a code?{' '}
            <button 
              className="font-medium text-amber-600 hover:text-purple-700 hover:underline transition duration-200"
              onClick={() => toast.info("A new verification code has been sent to your email.")}
            >
              Resend Code
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyAccount;