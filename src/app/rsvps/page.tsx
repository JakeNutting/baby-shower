'use client'
import { Quicksand } from "next/font/google";
import MobileNavbar from "../_components/mobile-navbar";
import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { Loader2 } from "lucide-react";

const quicksand = Quicksand({ subsets: ['latin'], weight: ['400', '700'] });

export default function rsvps() {
    const rsvps = useQuery(api.rsvp.getRsvps);

    const [filter, setFilter] = useState<"all" | "accepted" | "declined">("all");

    const totalRSVPs = rsvps?.length;
    const acceptedRSVPs = rsvps?.filter((r) => r.isAttending).length;
    const declinedRSVPs = rsvps?.filter((r) => !r.isAttending).length;

    const yesPercentage = totalRSVPs === 0 ? 0 : ((acceptedRSVPs ?? 0) / (totalRSVPs ?? 0)) * 100;
    const noPercentage = 100 - yesPercentage;

    const filteredRSVPs = rsvps?.filter((rsvp) => {
        if (filter === "accepted") return rsvp.isAttending;
        if (filter === "declined") return !rsvp.isAttending;
        return true; // all
    });

    return <>
         <div className={`${quicksand.className} relative min-h-[100dvh] w-full overflow-y-auto overflow-x-hidden bg-gradient-to-b from-[#0b1e3a] to-[#1a3a5a] pb-[env(safe-area-inset-bottom)]`}>
            <div className="px-4 py-10 md:px-64 z-50">
                <MobileNavbar></MobileNavbar>
            </div>
            
             {/* Minimalistic Cards */}
            <div className="flex flex-col md:flex-row gap-4 mb-6 max-w-3xl mx-10">
                <div className="flex flex-col items-center bg-white/10 backdrop-blur-md rounded-lg p-4 text-center">
                    <p className="text-sm text-gray-300">Total RSVPs</p>
                    {
                        !rsvps && (
                          <Loader2 className="size-8 animate-spin text-white"></Loader2>
                        )
                    }
                    <p className="text-2xl font-bold text-white">{totalRSVPs}</p>
                </div>
            </div>
            <div className="w-full max-w-3xl px-10">
                <p className="text-white mb-2 text-center font-medium">RSVP Status</p>
                <div className="w-full h-2 bg-white/20 rounded-full overflow-hidden flex">
                    {/* Yes (green) */}
                    <div
                    className="h-2 bg-green-400 transition-all duration-500"
                    style={{ width: `${yesPercentage}%` }}
                    />
                    {/* No (red) */}
                    <div
                    className="h-2 bg-red-400 transition-all duration-500"
                    style={{ width: `${noPercentage}%` }}
                    />
                </div>
                <div className="flex justify-between text-white text-sm mt-1 px-1">
                    <span>Yes: {acceptedRSVPs}</span>
                    <span>No: {declinedRSVPs}</span>
                </div>
            </div>

            <div className="w-full mt-4 flex items-center justify-center p-4">
                <div className="w-full max-w-3xl">
                    <div className="flex justify-between items-center mb-6">
                        <h1 className="text-xl md:text-3xl font-bold text-white text-center">
                            RSVPs
                        </h1>
                        <div className="flex gap-2 text-xs">
                            <button
                                className={`px-4 py-2 rounded-md font-semibold ${
                                filter === "all"
                                    ? "bg-yellow-400 text-[#0b1e3a]"
                                    : "bg-white/20 text-white hover:bg-white/30"
                                } transition-colors`}
                                onClick={() => setFilter("all")}
                            >
                                All
                            </button>

                            <button
                                className={`px-4 py-2 rounded-md font-semibold ${
                                filter === "accepted"
                                    ? "bg-green-400 text-[#0b1e3a]"
                                    : "bg-white/20 text-white hover:bg-white/30"
                                } transition-colors`}
                                onClick={() => setFilter("accepted")}
                            >
                                Accepted
                            </button>

                            <button
                                className={`px-4 py-2 rounded-md font-semibold ${
                                filter === "declined"
                                    ? "bg-red-400 text-[#0b1e3a]"
                                    : "bg-white/20 text-white hover:bg-white/30"
                                } transition-colors`}
                                onClick={() => setFilter("declined")}
                            >
                                Declined
                            </button>
                        </div>

                    </div>
                     {/* Filter Buttons */}

                    <div className="w-full overflow-x-auto">
                        <table className="min-w-full bg-white/10 backdrop-blur-md rounded-lg overflow-hidden shadow-lg">
                            <thead>
                            <tr className="bg-white/20">
                                <th className="px-6 py-3 text-left text-white font-semibold uppercase tracking-wider">
                                    Full Name
                                </th>
                                <th className="px-6 py-3 text-left text-white font-semibold uppercase tracking-wider">
                                    Accepted
                                </th>
                            </tr>
                            </thead>
                            <tbody>
                            {filteredRSVPs?.map((rsvp) => (
                                <tr
                                    key={rsvp._id}
                                    className="border-b border-white/20 hover:bg-white/10 transition-colors"
                                >
                                <td className="px-6 py-4 text-white">{rsvp.fullName}</td>
                                    <td className="px-6 py-4">
                                        {rsvp.isAttending ? (
                                        <span className="text-green-400 font-semibold">Yes</span>
                                        ) : (
                                        <span className="text-red-400 font-semibold">No</span>
                                        )}
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                    
                </div>
            </div>

        </div>
    </>
}