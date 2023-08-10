"use client";
import { useState } from "react";
import Image from "next/image";

const ImgLoader = ({
  img,
  title,
  styles,
  priority,
  loadStyle,
}: {
  img: string;
  title: string;
  styles: string;
  priority: boolean;
  loadStyle: string;
}) => {
  const myLoader = ({ src }: { src: string }) => src;
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <>
      {isLoading  && img !== "null" && <div className={`${loadStyle} absolute z-0 -mt-[17px]`}></div>} 
      {
        img === 'null' ? <div className={` bg-slate-700 w-12 h-12 rounded-[50%] z-0 `}></div> :
      <Image
        alt={title}
        loader={myLoader}
        src={img}
        width={500}
        height={500}
        className={`${styles} z-10`}
        priority={priority}
        onLoadingComplete={handleLoadingComplete}
        onLoad={handleLoadingComplete}
      />
    }

    </>
  );
};

export default ImgLoader;
