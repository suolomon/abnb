import { useState } from "react";
import Image from "next/image";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
// import headImg from "./images/header.png";
import {
  SearchIcon,
  GlobeAltIcon,
  MenuIcon,
  UserCircleIcon,
  UserIcon,
  SunIcon,
  MoonIcon,
} from "@heroicons/react/solid";
import { DateRangePicker } from "react-date-range";
import { useRouter } from "next/dist/client/router";
import { useTheme } from "next-themes";

function Header({ placeholder }) {
  const { theme, setTheme } = useTheme();
  const [searchInput, setSearchInput] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [numberOfGuests, setNumberOfGuests] = useState(1);
  const router = useRouter();

  const changeBg = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };
  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };

  const resetInput = () => {
    setSearchInput("");
  };
  const search = () => {
    router.push({
      pathname: "/search",
      query: {
        location: searchInput,
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString(),
        numberOfGuests,
      },
    });
  };

  return (
    <header className="sticky top-0 z-50 grid grid-cols-3 bg-gray-200 dark:bg-white shadow-md p-5 md:px-10">
      {/* left */}
      <div
        onClick={() => router.push("/")}
        className="relative flex h-10 cursor-pointer my-auto"
      >
        <Image
          src="https://links.papareact.com/qd3"
          layout="fill"
          objectFit="contain"
          objectPosition="left"
        />
      </div>

      {/* Middle */}
      <div className="flex items-center rounded-full py-2 md:border-2 md:shadow-sm">
        <input
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          className="flex-grow pl-5 bg-transparent outline-none text-sm text-gray-600 placeholder-gray-400"
          type="text"
          placeholder={placeholder || "Start your Search"}
        />
        <SearchIcon className="hidden md:inline-flex h-8 bg-red-400 text-white rounded-full p-2 cursor-pointer mx-auto md:mx-2" />
      </div>

      {/* Right */}
      <div className="flex items-center space-x-4 justify-end text-gray-500">
        {changeBg ? (
          <button onClick={changeBg}>
            <SunIcon className="h-5 border rounded-full" />
          </button>
        ) : (
          <button>
            <MoonIcon className="h-5 border rounded-full " />
          </button>
        )}

        <p className="hidden md:inline-flex cursor-pointer">Become a host</p>
        <GlobeAltIcon className="h-6 cursor-pointer" />

        <div className=" flex items-center border-2 rounded-full p-2 md:shadow-sm space-x-2">
          <MenuIcon className="h-6 cursor-pointer" />
          <UserCircleIcon className="h-5 rounded-full cursor-pointer" />
        </div>
      </div>

      {searchInput && (
        <div className="flex flex-col col-span-3 mx-auto dark:text-black">
          <DateRangePicker
            ranges={[selectionRange]}
            minDate={new Date()}
            rangeColors={["#fD5B61"]}
            onChange={handleSelect}
          />
          <div className="flex" items-center border-b mb-4>
            <h2 className="text-2xl flex-grow font-semibold dark:text-black">
              Number of Guests
            </h2>
            <UserIcon className="h-7" />
            <input
              value={numberOfGuests}
              onChange={(e) => setNumberOfGuests(e.target.value)}
              min={1}
              className="w-12 pl-2 text-lg outline-none text-red-400"
              type="number"
            />
          </div>
          <div className="flex pt-5">
            <button
              onClick={resetInput}
              className="flex-grow text-gray-500 p-2 rounded-full hover:bg-green-500 hover:text-white hover:shadow-xl active:scale-90 transition duration-300 ease-out"
            >
              Cancel
            </button>
            <button
              onClick={search}
              className="flex-grow text-red-500 p-2  rounded-full hover:bg-red-400 hover:text-white hover:shadow-xl active:scale-90 transition duration-300 ease-out"
            >
              Search
            </button>
          </div>
        </div>
      )}
    </header>
  );
}

export default Header;
