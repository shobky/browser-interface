"use client";
import { SiteMetadata } from "@/types";
import { getMetadata } from "@/utils/getMetadata";
import { useFavorites } from "@/context/FavoritesContext";
import { MdRemoveCircle } from "react-icons/md";
import { ImSpinner8 } from "react-icons/im";
import { useState, useEffect } from "react";
import { metadata } from "@/app/layout";

export default function AddFavorites() {
  const { addMetaData, handleEditing, editing } = useFavorites();
  const [loading, setIsLoading] = useState(false);
  const [Error, SetError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    const data = new FormData(event.currentTarget);
    const newMetadata = await getMetadata(data);
    if (newMetadata.title === "") {
      setIsLoading(false);
      return SetError("no url");
    } else if (newMetadata.url === "x-bad-url") {
      setIsLoading(false);
      return SetError("bad url");
    }
    addMetaData(newMetadata);
    setIsLoading(false);
    const storedArray: SiteMetadata[] =
      JSON.parse(String(localStorage.getItem("myArray"))) || [];
    storedArray.push(newMetadata);
    localStorage.setItem("myArray", JSON.stringify(storedArray));
    handleEditing();
  };

  useEffect(() => {
    setIsLoading(false);
    SetError("");
  }, [editing]);

  return (
    <>
      {editing && (
        <form
          className="absolute right-0 top-0 m-6  flex flex-col  gap-2 bg-zinc-900 px-6 pt-6 pb-6 rounded-[40px] z-20"
          onSubmit={handleSubmit}
        >
          <label className="text-white relative  text-lg mb-6 flex items-center gap-12">
            Add new shortcut{" "}
            <button
              type="button"
              className="hover:text-red-500 cursor-pointer"
              onClick={handleEditing}
            >
              <MdRemoveCircle />
            </button>{" "}
          </label>
          <input
            className="focus:outline-none text-white bg-transparent h-10  border-b border-b-slate-500 "
            placeholder="https://example.com/"
            type="text"
            name="url"
          />
          <input
            className="focus:outline-none text-white bg-transparent h-10  border-b border-b-slate-500 "
            placeholder="Example name"
            type="text"
            name="inputTitle"
          />
          <button
            disabled={loading}
            type="submit"
            className={` ${
              loading
                ? " bg-zinc-200  cursor-loading text-black"
                : Error
                ? "bg-red-600 hover:bg-red-500 text-white cursor-pointer "
                : "hover:bg-orange-400 bg-white cursor-pointer  text-black"
            }font-medium mt-10 flex justify-center items-center  px-2 h-14 rounded-[40px] text-lg`}
          >
            {loading ? (
              <span className="animate-spin ">
                <ImSpinner8 />
              </span>
            ) : Error ? (
              <span>{Error}</span>
            ) : (
              <span>Add</span>
            )}
          </button>
        </form>
      )}
    </>
  );
}
