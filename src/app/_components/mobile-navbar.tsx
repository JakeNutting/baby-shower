import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { HomeIcon, Menu, PartyPopper, User } from "lucide-react";
import { useEffect, useState } from "react";

export default function MobileNavbar() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    useEffect(() => {
            const userId = localStorage.getItem("userId");
            const expiresAt = Number(localStorage.getItem("expiresAt") || 0);
    
            if (!userId || Date.now() > expiresAt) {
                setIsLoggedIn(false);
                return;
            }

            setIsLoggedIn(true);
        }, []);
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
              <ul className="mt-4 font-medium space-y-5 dark:border-gray-700 dark:bg-gray-800 md:mt-0  md:border-0 text-white  md:dark:bg-gray-900">
                <li>
                  <a
                    href="/"
                    className="block rounded px-3 py-2  dark:text-white dark:hover:bg-gray-700 dark:hover:text-white "
                  >
                    <span className="flex items-center gap-4 font-semibold text-lg">
                      <HomeIcon></HomeIcon> Home
                    </span>
                  </a>

                {/* Don't show logged in button if logged in */}
                </li>
                {
                    !isLoggedIn && (
                        <>
                            <li>
                            <a
                                href="/login"
                                className="block rounded px-3 py-2  dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:border-0"
                            >
                                <span className="flex items-center gap-4 font-semibold text-lg">
                                <User></User> Login
                                </span>
                            </a>
                            </li>
                        </>
                    )
                }

                {/* Show rsvp list button if logged in */}
                {
                    isLoggedIn && (
                         <>
                            <li>
                                <a
                                    href="/rsvps"
                                    className="block rounded px-3 py-2  dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:border-0"
                                >
                                    <span className="flex items-center gap-4 font-semibold text-lg">
                                    <PartyPopper></PartyPopper> Rsvps
                                    </span>
                                </a>
                            </li>
                        </>
                    )
                }
              </ul>
            </div>
          </SheetDescription>
        </SheetContent>
      </Sheet>
    </>
  );
}
