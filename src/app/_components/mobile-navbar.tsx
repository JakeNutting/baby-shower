import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet";
import { HomeIcon, Menu, User } from "lucide-react";

export default function MobileNavbar() {
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
                    href="/"
                    className="block rounded px-3 py-2  dark:text-white dark:hover:bg-gray-700 dark:hover:text-white md:border-0 md:p-0 "
                  >
                    <span className="flex items-center gap-4 font-semibold text-lg">
                      <HomeIcon></HomeIcon> Home
                    </span>
                  </a>
                </li>
                <li>
                  <a
                    href="/login"
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
