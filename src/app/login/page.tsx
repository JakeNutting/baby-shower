'use client';

import { Quicksand } from "next/font/google";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "../schemas/login-schema";
import { z } from "zod";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import MobileNavbar from "../_components/mobile-navbar";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";
import { useRouter } from "next/navigation";

const quicksand = Quicksand({ subsets: ['latin'], weight: ['400', '700'] });
export default function Login() {

    const formSchema = loginSchema;
    const checkLogin = useMutation(api.rsvp.checkLogin);

    const [showInvalidState, setShowInvalidState] = useState<boolean>();

    const router = useRouter();
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        mode: "onChange",
        defaultValues: {
          email: "",
          password: "",
        }
      });

    async function onSubmit(values: z.infer<typeof formSchema>) {
        if (!values.email || !values.password) return;

        try {
            const result = await checkLogin({
                ...values
            });

            debugger;

            if (!result.success) {
                setShowInvalidState(true);
            } else {
                toast({
                    title: "Logged In",
                    variant: "success",
                    description: "You have logged in successfully",
                });
                form.reset();
                router.push("/rsvps");
            }
        } catch (err) {
              toast({
                    title: "ERROR",
                    variant: "destructive",
                    description: "There has been an error"
                });
        }
  }

    return <>
        <div className={`${quicksand.className} relative min-h-[100dvh] w-full overflow-y-auto overflow-x-hidden bg-gradient-to-b from-[#0b1e3a] to-[#1a3a5a] pb-[env(safe-area-inset-bottom)]`}>
            <div className="px-4 py-10 md:px-64 z-50">
                <MobileNavbar></MobileNavbar>
            </div>
            {/* Custom Static Stars */}
            <div className="absolute inset-0 pointer-events-none">
            <div className="star twinkle" style={{ top: "10%", left: "15%", animationDelay: "0s" }} />
            <div className="star twinkle" style={{ top: "6%", left: "25%", animationDelay: "0s" }} />
            <div className="star twinkle" style={{ top: "30%", left: "60%", animationDelay: "1s" }} />
            <div className="star twinkle" style={{ top: "32%", left: "30%", animationDelay: "2s" }} />
            <div className="star twinkle" style={{ top: "85%", left: "50%", animationDelay: "0.8s" }} />
            <div className="star twinkle" style={{ bottom: "35%", left: "15%", animationDelay: "0.8s" }} />
            <div className="star twinkle" style={{ bottom: "10%", left: "86%", animationDelay: "0.8s" }} />
            <div className="star twinkle" style={{ bottom: "5%", left: "3%", animationDelay: "0.8s" }} />
            </div>
    
            {/* Clouds */}
            <div className="absolute inset-0 pointer-events-none">
            <div className="cloud cloud1"></div>
            <div className="cloud cloud2"></div>
            <div className="cloud cloud3"></div>
            <div className="cloud cloud4"></div>
            </div>
    
            {/* Glowing Moon */}
            <div className="absolute top-12 right-16">
            <div className="moon">
                <span></span>
                <span></span>
                <span></span>
            </div>
            </div>
    
            {/* Hero Content */}
           <div className="relative z-10 flex flex-col items-center justify-center mt-24">
                <h1 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg mb-1">
                    LOGIN
                </h1>
                <p className="text-sm text-yellow-100 mb-8">
                    Login to view reservations
                </p>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="w-full max-w-sm bg-white/20 backdrop-blur-md rounded-lg p-6 flex flex-col gap-4 shadow-lg"
                    >
                    <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-white">Email</FormLabel>
                                    <FormControl>
                                        <Input 
                                            type="email"
                                            className={`
                                                border mt-2 border-white/20 
                                                placeholder:text-gray/30
                                                text-[16px]
                                            `}
                                            {...field} 
                                            placeholder="you@example.com" 
                                        />
                                    </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}>
                    </FormField>
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="text-white">Password</FormLabel>
                                    <FormControl>
                                        <Input 
                                            type="password"
                                            placeholder="********"
                                            className={`
                                                border mt-2 border-white/20 
                                                placeholder:text-gray/30
                                                text-[16px]
                                            `}
                                            {...field} 
                                        />
                                    </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}>
                    </FormField>
                    {
                        showInvalidState && (
                            <>
                                <div className="flex justify-center mt-2">
                                    <p className="text-red-600 text-sm font-semibold">Invalid email or password</p>
                                </div>
                            </>
                        )
                    }
                    <div className="mt-2">
                        <button
                            type="submit"
                            disabled={form.formState.isSubmitting || !form.formState.isValid} 
                            className={`
                                w-full border 
                                mt-2 border-white/30 
                                py-3 
                                rounded-xl 
                                font-semibold transition-colors
                                bg-yellow-200/90 text-gray-800
                                flex justify-center gap-2 items-center
                                `
                            }
                            >
                            Submit
                            {form.formState.isSubmitting && (
                            <Loader2 className="size-5 animate-spin text-gray-800"></Loader2>
                            )}
                        </button>
                    </div>
                </form>
              </Form>
            </div>
        </div>
    </>
}