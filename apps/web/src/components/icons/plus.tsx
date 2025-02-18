import { SVGProps } from "react";

type Props = SVGProps<SVGSVGElement>;

export function IconPlus(props: Props) {
  return (
    <svg
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M5 0.916672V9.08334M0.916664 5H9.08333"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
