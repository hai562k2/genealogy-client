import type { PropsWithChildren } from "react";
import React from "react";
import styles from "./Text.module.scss";
import { twMerge } from "tailwind-merge";

interface TextProps extends PropsWithChildren {
  variant:
    | "title"
    | "length"
    | "text-status"
    | "text-link"
    | "breadcrumbs"
    | "title-children"
    | "text-tableBody"
    | "title-page"
    | "title-header-navbar";
  gradient?: boolean;
  className?: string;
  hasBreaks?: boolean;
}

function DefaultText(props: TextProps) {
  const { variant, className, children, gradient, hasBreaks = true } = props;

  const classNameMerge = hasBreaks
    ? twMerge("break-words break-all", className, styles.baseText)
    : twMerge(className, styles.baseText);
  return (
    <p
      className={classNameMerge}
      data-variant={variant}
      data-gradient={gradient}
    >
      {children}
    </p>
  );
}

export default DefaultText;
