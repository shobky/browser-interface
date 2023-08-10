import Image from "next/image";
import { TfiSearch } from "react-icons/tfi";
import ImgLoader from "./ui/ImgLoader";

export default function SearchBox() {
  return (
    <div className=" flex flex-col items-center gap-6">
      <ImgLoader
        styles="  w-60 pointer-events-none select-none"
        title="google"
        img="/google.png"
        priority={false}
        loadStyle=""
      />
      <form
        action="https://google.com/search"
        className="w-full flex justify-center"
      >
        <div className="relative h-14  max-w-[100vw] w-[34rem] flex items-center justify-center">
          <span className="absolute left-8 md:left-6 text-xl opacity-60">
            <TfiSearch />
          </span>
          <input
            className=" rounded-[25px]  h-full w-[90%] md:w-full bg-[--search-box-bg] focus:outline-none pl-14 pr-6 py-4"
            type="text"
            name="q"
          />
        </div>
      </form>
    </div>
  );
}
