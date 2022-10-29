import React from "react";

export default function Footer({ justifyCenter, textCenter }) {
  return (
    <div
      className={`grid gap-y-4 w-full my-8 text-xs text-gray-base opacity-70 ${textCenter}`}
    >
      <div className={`flex gap-x-1 ${justifyCenter}`}>
        <a href="https://github.com/shz-code/instagram-v2-clone">About</a>-
        <a href="mailto:web.shahidul.alam@gmail.com">Contact</a>-
        <a href="https://github.com/shz-code">Github</a>-
        <a href="https://www.facebook.com/fb.shahidul.alam">Facebook</a>-
        <a href="https://www.instagram.com/z_shanto_z/">Instagram.</a>
      </div>
      <div>
        <p className="grid gap-y-2">
          <span>
            @ 2022 Design Copied & Inspired From{" "}
            <a className="font-bold" href="https://www.instagram.com/">
              INSTAGRAM.
            </a>{" "}
          </span>
          <span>
            Developed by{" "}
            <a className="font-bold" href="https://github.com/shz-code">
              @shz-code
            </a>
            .
          </span>
        </p>
      </div>
    </div>
  );
}
