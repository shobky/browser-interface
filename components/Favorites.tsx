"use client";
import React from "react";
import { useFavorites } from "@/context/FavoritesContext";
import Link from "next/link";
import { RiAddCircleFill } from "react-icons/ri";
import ImgLoader from "./ui/ImgLoader";
import RemoveBtn from "./ui/RemoveBtn";

export default function Favorites() {
  const { metadata, handleEditing } = useFavorites();

  return (
    <div className="flex flex-wrap w-full md:w-[60%]  p-6 gap-2 justify-center  items-center -mb-8">
      {metadata?.map((site, i) => (
        <div
          key={i}
          className=" group relative hover:-mt-2 hover:pb-2 ease-out duration-100"
        >
          <RemoveBtn title={site.title} />
          <Link
            href={site?.url ?? ""}
            className=" flex flex-col justify-center items-center w-24 "
          >
            {site.icon && (
              <ImgLoader
                styles="w-12 rounded-[50%] hover:opacity-90 shadow-lg "
                img={site.icon}
                title={site.title}
                priority={true}
                loadStyle="w-12 h-12 bg-black rounded-[50%]"
              />
            )}
            <p className=" text-sm">{site.title?.slice(0, 12)}</p>
          </Link>
        </div>
      ))}
      <div className=" flex flex-col justify-center items-center  ml-2 cursor-pointer hover:-mt-2 hover:pb-2 ease-out duration-100">
        <button className="text-[3.6rem]" onClick={handleEditing}>
          <RiAddCircleFill />
        </button>
        <p className="text-sm relative -top-[5px] ">Add</p>
      </div>
    </div>
  );
}
