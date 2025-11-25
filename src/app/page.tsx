"use client"
import { Input } from "@/components/ui/input";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Calendar,
  CircleCheck,
  Gift,
  Loader2,
  MapPin,
  Menu,
  PartyPopper,
  Sparkles,
  User,
} from "lucide-react";
import { Dancing_Script, Quicksand } from "next/font/google";
import { useEffect, useState } from "react";
import { rsvpSchema } from "./schemas/rsvp-schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { api } from "../../convex/_generated/api";
import { useMutation } from "convex/react";
import { FormField, Form, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import confetti from "canvas-confetti";
import Image from "next/image";

const dancingScript = Dancing_Script({ subsets: ['latin'], weight: ['400', '700'] });
const quicksand = Quicksand({ subsets: ['latin'], weight: ['400', '700'] });

export default function Home() {
  const [isAttending, setIsAttending] = useState<boolean | undefined>();
  const [formSubmitted, setFormSubmitted] = useState<boolean>();

  const submitRsvp = useMutation(api.rsvp.submitRsvp);

  const formSchema = rsvpSchema;

  // Load from localStorage on first render
  useEffect(() => {
    const stored = localStorage.getItem("formSubmitted");
    const storedIsAttending = localStorage.getItem("isAttending");
    if (stored !== null) {
      setFormSubmitted(stored === "true");
      setIsAttending(storedIsAttending === "true");
    }
  }, []);

  // Update localStorage whenever formSubmitted changes
  useEffect(() => {
    if (formSubmitted === undefined) return;

    localStorage.setItem("formSubmitted", String(formSubmitted));
  }, [formSubmitted]);

  useEffect(() => {
    if (isAttending === undefined) return;

    localStorage.setItem("isAttending", String(isAttending));
  }, [isAttending]);

   const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      fullName: "",
      isAttending: undefined,
    }
  });

  const handleClick = () => {

    if (!isAttending) return;

    const end = Date.now() + 0.7 * 1000 // 3 seconds
    const colors = ["#fef08a"]
    const frame = () => {
      if (Date.now() > end) return
      confetti({
        particleCount: 1.5,
        angle: 60,
        spread: 55,
        startVelocity: 60,
        origin: { x: 0, y: 0.8 },
        shapes: ["star"],
        colors: colors,
      })
      confetti({
        particleCount: 1.5,
        angle: 120,
        spread: 55,
        startVelocity: 60,
        origin: { x: 1, y: 0.8 },
        shapes: ["star"],
        colors: colors,
      })
      requestAnimationFrame(frame)
    }
    frame()
  }

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (!values.fullName || values.isAttending === undefined) return;

    try {
      await submitRsvp({
        ...values
      });
      form.reset();
      setFormSubmitted(true);
      handleClick();
    } catch (err) {
      
    }
  }

  return (
    <>
    <div className={`${quicksand.className} relative min-h-[100dvh] w-full overflow-y-auto overflow-x-hidden bg-gradient-to-b from-[#0b1e3a] to-[#1a3a5a] pb-[env(safe-area-inset-bottom)]`}>
      <div className="px-4 py-10 md:px-64 z-50">
          <MobileNavbar></MobileNavbar>
      </div>
      {/* Custom Static Stars */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="star twinkle" style={{ top: "10%", left: "15%", animationDelay: "0s" }} />
        <div className="star twinkle" style={{ top: "6%", left: "25%", animationDelay: "0s" }} />
        <div className="star twinkle" style={{ top: "10%", right: "10%", animationDelay: "0s" }} />
        <div className="star twinkle" style={{ top: "30%", left: "60%", animationDelay: "1s" }} />
        <div className="star twinkle" style={{ top: "32%", left: "30%", animationDelay: "2s" }} />
        <div className="star twinkle" style={{ top: "45%", left: "90%", animationDelay: "2s" }} />
        <div className="star twinkle" style={{ top: "60%", left: "80%", animationDelay: "0.5s" }} />
        <div className="star twinkle" style={{ top: "72%", left: "20%", animationDelay: "1.5s" }} />
        <div className="star twinkle" style={{ top: "85%", left: "50%", animationDelay: "0.8s" }} />
        <div className="star twinkle" style={{ bottom: "35%", left: "15%", animationDelay: "0.8s" }} />
        <div className="star twinkle" style={{ bottom: "20%", left: "46%", animationDelay: "0.8s" }} />
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
      <div className="relative z-10 flex flex-col items-center justify-center mt-16">
        <p className="text-sm text-yellow-100 mb-2">
          Kindly join Charity's baby shower honoring
        </p>
        <h1 className="text-2xl md:text-3xl font-bold text-white drop-shadow-lg mb-4">
          LINCOLN ROBERT NUTTING
        </h1>
      </div>

      <div className="bg-white/5 py-6 my-14">
        <div className="mx-6">
          <h4 className="text-xs font-semibold text-white mb-4">Event Details</h4>
          <p className="text-white flex gap-3 items-center"><Calendar size={18} color="#fef08a"></Calendar>January 18, 2026 - 12:00 PM</p>
          <p className="text-white flex gap-3 items-center mt-5"><MapPin size={18} color="#fef08a"></MapPin>Apple Creek Church</p>
          <p className="text-white flex gap-3 text-xs items-center mt-1.5 ml-[29px]">269 West Main St. Apple Creek, OH 44606</p>
        </div>
      </div>
      <div className="
        w-[42%] mt-16
        rounded-tr-2xl rounded-br-sm 
        bg-white/20
        backdrop-blur-md
        shadow-lg
        flex gap-2 items-center
        p-2 px-6
      ">
        <PartyPopper className="text-yellow-200" />
        <h4 className="text-white text-xl font-semibold">RSVP</h4>
      </div>
      {!formSubmitted && (
        <>
          <div className="mt-4 mx-4 py-4">
              <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-8"
                  >
                  <FormField
                    control={form.control}
                      name="fullName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-white">Please enter your full name</FormLabel>
                          <FormControl>
                            <Input 
                              className={`
                                bg-white/15 backdrop-blur-sm 
                                border mt-2 border-white/20 
                                text-white placeholder:text-white/30
                                text-[16px]
                              `}
                              {...field} 
                              placeholder="Type your name here" 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}>
                  </FormField>
                  <div className="my-8">
                    <FormLabel className="text-white">Are you able to attend?</FormLabel>
                    <div className="grid grid-cols-2 gap-6 my-8 mt-2">
                      <button
                        type="button"
                        onClick={() => {
                          setIsAttending(true);
                          form.setValue('isAttending', true, {shouldValidate: true})
                        }}
                        className={`
                          backdrop-blur-md 
                          flex justify-center gap-1.5
                          border border-white/30
                          text-white font-medium
                          rounded-xl py-2.5
                          transition
                          ${isAttending ? 'bg-white/20 text-yellow-200' : 'bg-white/10 hover:bg-white/30'}
                        `}
                      >
                        Yes
                        { isAttending === true && (
                            <CircleCheck className="text-yellow-200"></CircleCheck>
                          )
                        }
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setIsAttending(false);
                          form.setValue('isAttending', false, {shouldValidate: true})
                        }}
                        className={`
                          backdrop-blur-md 
                          flex justify-center gap-1.5
                          border border-white/30
                          text-white font-medium
                          rounded-xl py-2.5
                          transition
                          ${isAttending === false ? 'bg-white/20 text-yellow-200' : 'bg-white/10 hover:bg-white/30'}
                        `}
                      >
                        No
                        { isAttending === false && (
                            <CircleCheck className="text-yellow-200"></CircleCheck>
                          )
                        }
                      </button>
                    </div>
                    <div className="mt-10">
                      <button
                        type="submit"
                        disabled={form.formState.isSubmitting || !form.formState.isValid} 
                        className={`
                          w-full border 
                          mt-2 border-white/30 
                          py-3 
                           rounded-xl 
                          font-semibold transition-colors
                          flex justify-center gap-2 items-center
                          ${!form.formState.isValid ? 'opacity-60 cursor-not-allowed text-white bg-yellow-200/60' : 'bg-yellow-200/90 text-gray-800'}
                        `}
                        >
                        Submit
                        {form.formState.isSubmitting && (
                          <Loader2 className="size-5 animate-spin text-gray-800"></Loader2>
                        )}
                      </button>
                    </div>
                  </div>
                </form>
              </Form>
          </div>
        </>
      )}

     {formSubmitted && (
        <div className="relative w-full max-w-md mx-auto mt-10 p-[31.2px]  bg-white/5 backdrop-blur-md shadow-lg flex flex-col items-center text-center">
          <div className="w-16 h-16 mb-4 rounded-full bg-white/80 flex items-center justify-center">
            <Sparkles className="text-[#0b1e3a] w-8 h-8" />
          </div>
                
          {!isAttending ? (
            <>
              <h4 className="text-white text-xl font-semibold mb-2">We'll miss you!</h4>
              <p className="text-white/75 text-sm">
                Thanks for submitting your RSVP. We hope you can celebrate with us in spirit
              </p>
            </>
          ) : (
            <>
              <h4 className="text-white text-xl font-semibold mb-2">Can't wait to see you!</h4>
              <p className="text-white/75 text-sm">
                Thanks for submitting your RSVP. We are so excited to celebrate together
              </p>
            </>
          )}
        
          <div className="mt-6">
            <button
              onClick={() => {
                setFormSubmitted(false);
                setIsAttending(undefined);
              }}
              className="px-6 py-2 text-sm rounded-xl text-yellow-200 underline font-semibold"
            >
              RSVP for another person
            </button>
          </div>
        </div>
      )}

      <div className="
          mt-12 w-[42%]
          rounded-tr-2xl rounded-br-sm 
          bg-white/20
          backdrop-blur-md
          shadow-lg
          flex gap-2 items-center
          p-2 px-6
        ">
        <Gift className="text-yellow-200" />
        <h4 className="text-white text-xl font-semibold">Registries</h4>
      </div>
      <div className="p-4 mt-6 mb-24 flex flex-col md:flex-row gap-6 justify-center">
        {/* Target Registry */}
        <div className="shadow-lg bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 pt-4 flex flex-col items-center gap-4">
          <Image
            width={60}
            height={60}
            alt="Target Logo"
            src="/Target_logo.svg"
          />
          <a
            href="https://target.com/gift-registry/gift/baby-lincoln-nutting"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full text-center py-2 rounded-xl bg-yellow-200/90 text-[#0b1e3a] font-semibold"
          >
            View
          </a>
        </div>

        {/* Amazon Registry */}
        <div className="shadow-lg mt-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 flex flex-col items-center gap-4">
          <Image
            className="my-1"
            width={140}
            height={140}
            alt="Amazon Logo"
            src="/Amazon_logo.svg.webp"
          />
          <a
            href="https://www.amazon.com/baby-reg/charity-nutting-march-2026-wooster/26JCHED86U913"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full mt-1 text-center py-2 rounded-xl bg-yellow-200/90 text-[#0b1e3a] font-semibold"
          >
            View
          </a>
        </div>
      </div>
      <footer className="w-full py-4 text-center text-gray-500 text-sm">
        © {new Date().getFullYear()} Nutting Baby Shower. All rights reserved.
      </footer>
    </div>
      {/* Custom CSS */}
      <style jsx>{`
        .star {
          position: absolute;
          width: 3px;
          opacity: 1;
          height: 3px;
          background-color: white;
          border-radius: 50%;
          box-shadow: 0 0 6px 2px rgba(255, 255, 255, 0.6);
        }

        /* Twinkle animation */
        .twinkle {
          animation: twinkle 3s infinite ease-in-out;
        }
        @keyframes twinkle {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }

        /* Clouds */
        .cloud {
          position: absolute;
          background: rgba(255, 255, 255, 0.15);
          border-radius: 50%;
          filter: blur(40px);
          animation: drift 60s linear infinite;
        }
        .cloud1 {
          top: 20%;
          left: -20%;
          width: 300px;
          height: 100px;
        }
        .cloud2 {
          top: 50%;
          left: -30%;
          width: 400px;
          height: 120px;
          animation-duration: 90s;
        }
        .cloud3 {
          top: 70%;
          left: -25%;
          width: 250px;
          height: 80px;
          animation-duration: 75s;
        }
        .cloud4 {
          top: 90%;
          left: -25%;
          width: 250px;
          height: 80px;
          animation-duration: 100s;
        }

        @keyframes drift {
          0% { transform: translateX(-50vw); }
          100% { transform: translateX(200vw); }
        }

         .moon {
            width: 70px;   /* smaller size */
            height: 70px;
            border-radius: 50%;
            background: radial-gradient(circle at 30% 30%, #fdfdfd, #e0e0e0 40%, #b0b0b0 70%, #8a8a8a 100%);
              box-shadow: 0 0 20px 8px rgba(255, 255, 255, 0.15),
                0 0 40px 15px rgba(255, 255, 255, 0.1);
            position: relative;
            overflow: hidden;
          }

          /* Moon craters */
          .moon::before,
          .moon::after {
            content: "";
            position: absolute;
            border-radius: 50%;
            background: radial-gradient(circle, #b0b0b0, #8a8a8a);
          }

          .moon::before {
            width: 14px;
            height: 14px;
            top: 18px;
            left: 45px;
          }

          .moon::after {
            width: 8px;
            height: 8px;
            top: 45px;
            left: 20px;
          }

          /* Extra small craters */
          .moon span {
            position: absolute;
            border-radius: 50%;
            background: radial-gradient(circle, #b0b0b0, #8a8a8a);
          }

          .moon span:nth-child(1) {
            width: 5px;
            height: 5px;
            top: 10px;
            left: 15px;
          }

          .moon span:nth-child(2) {
            width: 4px;
            height: 4px;
            top: 30px;
            left: 30px;
          }

          .moon span:nth-child(3) {
            width: 6px;
            height: 6px;
            top: 55px;
            left: 50px;
          }
      `}</style>
    </>
  );
}


function MobileNavbar() {
  return (
    <>
      <Sheet>
        <SheetTrigger asChild className="cursor-pointer hover:text-blue-700">
          <Menu size={36} color="#fef08a"/>
        </SheetTrigger>
        <SheetContent side={"left"} className="bg-[#0d1f3c] text-white shadow-xl">
          <SheetHeader>
          <div className="flex items-center my-4 mb-3 gap-3">
            <span className="font-semibold">Hi there</span>           
          </div>
          
            <hr></hr>
          </SheetHeader>
          <SheetDescription>
            <div className="mt-8">
              <ul className="mt-4 font-medium space-y-5 dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:space-x-8 md:border-0 text-white md:p-0 md:dark:bg-gray-900">
                <li>
                  <a
                    href="#"
                    className="block rounded px-3 py-2  dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 "
                  >
                    <span className="flex items-center gap-4 font-semibold text-lg">
                      <User></User> Login
                    </span>
                  </a>
                </li>
              
              </ul>
            </div>
          </SheetDescription>
        </SheetContent>
      </Sheet>
    </>
  );
}
