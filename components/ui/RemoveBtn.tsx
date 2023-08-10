"use client";
import { MdRemoveCircle } from "react-icons/md";
import { ButtonHTMLAttributes, FC, useCallback, useEffect } from "react";
import { SiteMetadata } from "@/types";
import { useFavorites } from "@/context/FavoritesContext";

const RemoveBtn: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  title,
  ...props
}) => {
  const { setMetaData, metadata } = useFavorites();

  const removeSite = useCallback(() => {
    const updatedArray = metadata.filter(
      (item: SiteMetadata) => item.title !== title
    );
    setMetaData(updatedArray);
  }, [metadata, title]);

  useEffect(() => {
    return localStorage.setItem("myArray", JSON.stringify(metadata));
  }, [metadata]);

  return (
    <button
      {...props}
      onClick={removeSite}
      className="hidden group-hover:block text-black hover:text-red-500 rounded-full text-[1.2rem] bg-white absolute left-4 -top-2 z-20"
    >
      <MdRemoveCircle />
    </button>
  );
};

export default RemoveBtn;
