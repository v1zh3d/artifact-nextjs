"use client";

import { MoonIcon, PlusIcon, SunIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { useState } from "react";
import { getAuthToken, setAuthToken } from "@/lib/helper";

const Navbar = () => {
  const initialTokenValue = getAuthToken();

  const [token, setToken] = useState<string>(initialTokenValue);
  const { setTheme } = useTheme();

  const storeToken = (tokenValue: string) => {
    setToken(tokenValue);
  };

  return (
    <nav className="flex items-center justify-between">
      <h1 className="font-oswald font-bold text-3xl">ARTIFACT</h1>
      <div className="flex items-center gap-x-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button type="button" variant="outline" className="gap-x-2">
              <PlusIcon /> Add Auth Token
            </Button>
          </DialogTrigger>
          <DialogContent className="font-roboto sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add Auth Token</DialogTitle>
              <DialogDescription>
                Add Authorization token to view specific user details.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Input
                type="text"
                id="token"
                value={token}
                className="col-span-3"
                onChange={(e) => storeToken(e.currentTarget.value)}
              />
              <small className="text-xs text-slate-400">
                *NOTE: If you have already filled the form, please clear your
                local storage and add authorization token to view API user data.
              </small>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button type="submit" onClick={() => setAuthToken(token)}>
                  Save
                </Button>
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon">
              <SunIcon className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <MoonIcon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => setTheme("light")}>
              Light
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("dark")}>
              Dark
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setTheme("system")}>
              System
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </nav>
  );
};

export default Navbar;
