import { Listbox, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { useContext } from "react";
import { CoinContext } from "../context/CoinProvider";
import { Currencies } from "../types/CoinTypes";
import { UserButton, SignInButton, useAuth } from "@clerk/clerk-react";

interface ToolbarProps {
  darkMode: boolean;
  toggleDarkMode: () => void;
}

export default function Toolbar({ darkMode, toggleDarkMode }: ToolbarProps) {
  const { currency, updateCurrency } = useContext(CoinContext);
  const { isSignedIn } = useAuth();
  const currencies: Currencies[] = ["EUR", "USD", "INR"];

  return (
    <nav className="flex justify-end items-center w-full max-w-4xl gap-4 p-2 mx-auto">
      <div className="flex items-center gap-4">
        <Listbox value={currency} onChange={updateCurrency}>
          <div className="relative">
            <Listbox.Button className="px-2 bg-white border rounded-md shadow-sm py-0.5 border-slate-200 text-emerald-500">
              {currency}
            </Listbox.Button>

            <Transition
              as={Fragment}
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute px-2 mt-1 overflow-auto bg-white border rounded-md shadow-sm cursor-pointer select-none py-0.5 border-slate-200">
                {currencies.map((currency, index) => (
                  <Listbox.Option key={index} value={currency} as={Fragment}>
                    {({ selected }) => (
                      <li className={selected ? "hidden" : ""}>{currency}</li>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </Listbox>

        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-md bg-gray-700 hover:bg-gray-800 dark:bg-gray-300 dark:hover:bg-gray-400"
          aria-label="Toggle Dark Mode"
        >
          {darkMode ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-yellow-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v1m0 16v1m8.66-9h-1M4.34 12h-1m15.07 6.07l-.7-.7M6.34 6.34l-.7-.7m12.02 12.02l-.7-.7M6.34 17.66l-.7-.7M12 7a5 5 0 100 10 5 5 0 000-10z"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-800"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 12.79A9 9 0 1111.21 3a7 7 0 009.79 9.79z"
              />
            </svg>
          )}
        </button>

        {isSignedIn ? (
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                avatarBox: "w-10 h-10",
                userButtonTrigger: "focus:outline-none",
              },
            }}
          />
        ) : (
          <SignInButton mode="modal">
            <button className="px-4 py-2 font-medium text-white transition-colors bg-emerald-500 rounded-md hover:bg-emerald-600">
              Login
            </button>
          </SignInButton>
        )}
      </div>
    </nav>
  );
}
