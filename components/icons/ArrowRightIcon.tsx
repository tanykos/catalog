import { memo } from "react";

interface IArrowRightIconProps {
  className?: string;
  width?: number;
  height?: number;
}

const ArrowRightIcon = memo(function ArrowRightIcon({
  className,
  width = 16,
  height = 16,
}: IArrowRightIconProps) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
});

export default ArrowRightIcon;
