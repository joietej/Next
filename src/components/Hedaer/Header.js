import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <div>
      <Link href="/">
        <a className="mr-1">Home</a>
      </Link>
      <Link href="/posts">
        <a>Posts</a>
      </Link>
      <Link href="/about">
        <a>About</a>
      </Link>
    </div>
  );
};

export default Header;
