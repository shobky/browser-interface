"use server";
import { SiteMetadata } from "@/types";
import { parse } from "node-html-parser";

export const getMetadata = async (data: FormData): Promise<SiteMetadata> => {
  const url: string = String(data.get("url"));
  const inputTitle: string | undefined = String(data.get("inputTitle"));

  if (url.length < 1) {
    return {
      title: "",
      url: "",
      icon: "",
    };
  }
  try {
    let metadata: SiteMetadata;
    // Fetch the html and parse it
    const res = await fetch(url);
    const html = await res.text();
    const root = parse(html);

    // Get what we want from pasdes html (title, icon)

    const title = inputTitle ?? root.querySelector("title")?.text;
    const iconLink =
      root.querySelector("link[rel='shortcut icon']") ||
      root.querySelector("link[rel='icon']");
    let icon: string;
    const iconUrl =
      iconLink == null
        ? null
        : new URL(String(iconLink?.getAttribute("href")), url).href;
    if (iconUrl && !iconUrl.endsWith(".svg")) {
      const iconResponse = await fetch(iconUrl);
      const iconBuffer = await iconResponse.arrayBuffer();
      icon = `data:image/png;base64,${Buffer.from(iconBuffer).toString(
        "base64"
      )}`;
    } else {
      icon = String(iconUrl);
    }
    metadata = {
      icon: icon,
      title: String(title),
      url: url,
    };
    console.log(title, inputTitle, "empty?");
    return metadata;
  } catch (err) {
    return {
      title: String(err),
      url: "x-bad-url",
      icon: "",
    };
  }
};
