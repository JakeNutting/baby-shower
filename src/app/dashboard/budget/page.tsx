"use client";
import {
  Banknote,
  Car,
  CircleDollarSign,
  CirclePercent,
  CreditCard,
  HandPlatter,
  Handshake,
  Heater,
  Home,
  PiggyBank,
  ShoppingBag,
  ShoppingBasket,
  Smile,
} from "lucide-react";
import { cn } from "@/app/lib/utils";
import Image from "next/image";
import { useState } from "react";
import AccountTransaction from "./_components/account-transaction";
import { DataTable } from "./_components/transactions-table";
import { columns } from "./_components/transaction-columns";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Budget = () => {

  // const accounts = useQuery(
  //   api.accounts.getAccounts,
  //   orgId && user ? { organizationId: orgId } : "skip"
  // );

  // const transactions = useQuery(
  //   api.transactions.getTransactions,
  //   orgId && user ? { organizationId: orgId } : "skip"
  // );

  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="bg-blue-50 py-16 pb-10">
        <div className="mx-auto max-w-screen-xl px-2 xl:px-0">
          <div className="flex justify-between">
            <h1 className="text-dark text-3xl font-semibold flex gap-3 items-center">
              <CircleDollarSign className="text-blue-700"></CircleDollarSign>
              Budget
            </h1>
            {/* <OrganizationSwitcher></OrganizationSwitcher> */}
          </div>
          <p className="my-1 mb-4 flex text-lg font-normal">
            Welcome to budgeting made easy with Goalden. Manage your accounts
            below
          </p>
        </div>
      </div>
      <Tabs defaultValue="summary">
        <TabsList className="grid w-full grid-cols-2 lg:w-1/3 lg:mx-auto mt-4">
          <TabsTrigger value="summary"><CreditCard size={18} className="mr-1"></CreditCard>Summary</TabsTrigger>
          <TabsTrigger value="budget"><PiggyBank size={18} className="mr-1"></PiggyBank> Budget</TabsTrigger>
        </TabsList>
        <TabsContent value="budget">Nothing to see...</TabsContent>
      </Tabs>
    </>
  );
};

const getSpendingTypeIcon = (type: string) => {
  switch (type) {
    case "Groceries":
      return <ShoppingBasket size={15}></ShoppingBasket>;
    case "Transportation":
      return <Car size={15}></Car>;
    case "Salary":
      return <Banknote size={15}></Banknote>;
    case "Pleasure":
      return <Smile size={15}></Smile>;
    case "Utilities":
      return <Heater size={15}></Heater>;
    case "Tithes":
      return <CirclePercent size={15}></CirclePercent>;
    case "Dining":
      return <HandPlatter size={15}></HandPlatter>;
    case "Other":
      return <ShoppingBag size={15}></ShoppingBag>;
    case "Rent":
      return <Home size={15}></Home>;
    case "Loans":
      return <Handshake size={15}></Handshake>;
  }
};
export default Budget;
