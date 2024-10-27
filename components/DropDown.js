import React, { forwardRef } from 'react';
import Link from "next/link";

const DropDown = forwardRef(({ href, children, ...rest }, ref) => {
  return (
    <Link href={href} legacyBehavior>
      <a ref={ref} {...rest}>{children}</a>
    </Link>
  );
});

DropDown.displayName = 'DropDown';

export default DropDown;
