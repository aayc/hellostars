import React from "react";
import NavLink from "./small/NavLink";

export default function NavBar() {
  return (
    <div className="flex justify-between mt-8">
      <div>
        <NavLink href="/">Casual Deep Learning</NavLink>
      </div>
      <div>
        <NavLink href="/signin">sign in</NavLink>
      </div>
    </div>
  );
}
