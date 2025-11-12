"use client"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Menu,
  PartyPopper,
  ShoppingBag,
} from "lucide-react";

export default function Home() {
  return (
    <>
    <div className="relative min-h-screen h-dvh w-full bg-gradient-to-b from-[#0b1e3a] to-[#1a3a5a]  px-4 overflow-hidden">
      <div className="px-4 py-10 md:px-64 z-50">
          <MobileNavbar></MobileNavbar>
      </div>
      {/* Custom Static Stars */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="star twinkle" style={{ top: "10%", left: "15%", animationDelay: "0s" }} />
        <div className="star twinkle" style={{ top: "6%", left: "25%", animationDelay: "0s" }} />
        <div className="star twinkle" style={{ top: "25%", left: "60%", animationDelay: "1s" }} />
        <div className="star twinkle" style={{ top: "40%", left: "30%", animationDelay: "2s" }} />
        <div className="star twinkle" style={{ top: "60%", left: "80%", animationDelay: "0.5s" }} />
        <div className="star twinkle" style={{ top: "75%", left: "20%", animationDelay: "1.5s" }} />
        <div className="star twinkle" style={{ top: "85%", left: "50%", animationDelay: "0.8s" }} />
      </div>

      {/* Clouds */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="cloud cloud1"></div>
        <div className="cloud cloud2"></div>
        <div className="cloud cloud3"></div>
      </div>

      {/* Glowing Moon */}
      <div className="absolute top-16 right-16 w-16 h-16">
        <div className="moon-full w-full h-full rounded-full bg-yellow-200 shadow-[0_0_80px_20px_rgba(255,255,200,0.5)]"></div>
        <div className="moon-cut w-full h-full rounded-full bg-[#0b1e3a] absolute top-0 right-0 translate-x-1/4"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex flex-col items-center justify-center mt-20">
        <h1 className="text-2xl md:text-3xl font-bold text-white mb-2 drop-shadow-lg">
          LINCOLN ROBERT NUTTING
        </h1>
        <p className="text-lg md:text-2xl text-gray-200 max-w-2xl mb-8">
          Baby Shower
        </p>
        <a
          href="#rsvp"
          className="bg-yellow-200 hover:bg-yellow-300 text-gray-900 font-semibold py-3 px-6 rounded-full shadow-lg transition-all"
        >
          RSVP Now
        </a>
      </div>

      <div className="mt-20">
        <h4 className="text-sm font-semibold text-white mb-2">Event Details</h4>
        <p className="text-white">I go to sleep</p>
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

        @keyframes drift {
          0% { transform: translateX(0); }
          100% { transform: translateX(150vw); }
        }
        .moon-full {
          position: absolute;
          top: 0;
          left: 0;
        }
        .moon-cut {
          position: absolute;
          top: 0;
          right: 0;
          width: 100%;
          height: 100%;
          border-radius: 50%;
          background-color: #0b1e3a;
        }
      `}</style>
    </div>
      {/* <div className="bg-gradient-to-t from-[#faf7f2] via-[#e5e7eb] to-[#cfe4fa] min-h-screen">
        <div className="px-4 py-10 md:px-64">
          <MobileNavbar></MobileNavbar>
        </div>
        <div className="absolute inset-0">
        <div className="star" style={{ top: "10%", left: "15%" }} />
        <div className="star" style={{ top: "25%", left: "60%" }} />
        <div className="star" style={{ top: "40%", left: "30%" }} />
        <div className="star" style={{ top: "60%", left: "80%" }} />
        <div className="star" style={{ top: "75%", left: "20%" }} />
        <div className="star" style={{ top: "85%", left: "50%" }} />
      </div>
              <div className="absolute top-16 right-16 w-40 h-40 bg-yellow-200 rounded-full shadow-[0_0_80px_20px_rgba(255,255,200,0.5)] animate-pulse"></div>

        <div className="relative z-10 flex flex-col items-center justify-center mt-24">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 drop-shadow-lg">
            LINCOLN ROBERT NUTTING 🌙
          </h1>
          <p className="text-lg md:text-2xl text-gray-300 max-w-2xl mb-8">
            Join us under the stars to celebrate this magical day ✨
          </p>
          <a
            href="#rsvp"
            className="bg-yellow-200 hover:bg-yellow-300 text-gray-900 font-semibold py-3 px-6 rounded-full shadow-lg transition-all"
          >
            RSVP Now
          </a>
        </div>

      </div> */}
    </>
  );
}

function MobileNavbar() {
  return (
    <>
      <Sheet>
        <SheetTrigger asChild className="cursor-pointer hover:text-blue-700">
          <Menu size={36} color="white" />
        </SheetTrigger>
        <SheetContent side={"left"} className="bg-[#0d1f3c] text-white shadow-xl">
          <SheetHeader>
          <div className="flex items-center my-4 mb-3 gap-3">
            <span className="font-semibold">Hi, stranger!</span>           
          </div>
          
            <hr></hr>
          </SheetHeader>
          <SheetDescription>
            <div className="mt-8">
              <ul className="mt-4 font-medium space-y-5 dark:border-gray-700 dark:bg-gray-800 md:mt-0 md:space-x-8 md:border-0 text-white md:p-0 md:dark:bg-gray-900">
                <li>
                  <a
                    href="#"
                    className="block rounded px-3 py-2  dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0"
                  >
                    <span className="flex items-center gap-4 font-semibold text-lg">
                      <PartyPopper></PartyPopper> RSVP
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block rounded px-3 py-2  dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 "
                  >
                    <span className="flex items-center gap-4 font-semibold text-lg">
                      <ShoppingBag></ShoppingBag> Registry
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
