import type { ComponentPropsWithoutRef, ElementType } from "react";

type ContainerProps<T extends ElementType> = {
  as?: T;
} & ComponentPropsWithoutRef<T>;

export function Container<T extends ElementType = "div">({ as, className = "", ...props }: ContainerProps<T>) {
  const Tag = as ?? "div";
  return <Tag className={`mx-auto w-full max-w-[1440px] px-4 sm:px-8 lg:px-12 ${className}`} {...props} />;
}
