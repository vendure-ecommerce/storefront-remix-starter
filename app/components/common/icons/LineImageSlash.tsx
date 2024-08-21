import type { SVGProps } from 'react';
interface SVGRProps {
  title?: string;
  titleId?: string;
}
const LineImageSlash = ({
  title,
  titleId,
  ...props
}: SVGProps<SVGSVGElement> & SVGRProps) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="currentColor"
    viewBox="0 0 24 24"
    width="1em"
    height="1em"
    aria-labelledby={titleId}
    {...props}
  >
    {title ? <title id={titleId}>{title}</title> : null}
    <path
      fillRule="evenodd"
      d="M11.933 1.25h.105c1.837 0 3.267 0 4.41.104 1.16.105 2.098.322 2.927.8a6.75 6.75 0 0 1 2.47 2.471c.48.83.696 1.767.802 2.927.103 1.143.103 2.573.103 4.41v.105c0 2.178 0 3.79-.18 5.04a.75.75 0 0 1-1.484-.214c.162-1.13.164-2.633.164-4.893 0-1.883 0-3.245-.097-4.312-.096-1.057-.281-1.75-.606-2.313a5.25 5.25 0 0 0-1.922-1.922c-.563-.325-1.256-.51-2.313-.606-1.067-.096-2.429-.097-4.312-.097-2.26 0-3.763.002-4.893.164a.75.75 0 1 1-.214-1.484c1.25-.18 2.862-.18 5.04-.18zM1.47 1.47a.75.75 0 0 1 1.06 0l1.758 1.757 16.485 16.485 1.757 1.758a.75.75 0 1 1-1.06 1.06l-1.257-1.256a6.75 6.75 0 0 1-.838.572c-.83.479-1.767.695-2.927.8-1.143.104-2.573.104-4.41.104h-.076c-1.837 0-3.267 0-4.41-.104-1.16-.105-2.098-.322-2.927-.8a6.75 6.75 0 0 1-2.47-2.471c-.48-.83-.696-1.767-.801-2.927-.104-1.143-.104-2.573-.104-4.41v-.076c0-1.837 0-3.267.104-4.41.105-1.16.322-2.098.8-2.927a6.75 6.75 0 0 1 .572-.838L1.47 2.53a.75.75 0 0 1 0-1.06zm2.325 3.386a5.252 5.252 0 0 0-.342.519c-.325.563-.51 1.256-.606 2.313C2.751 8.755 2.75 10.117 2.75 12c0 1.883 0 3.245.097 4.312.023.252.051.482.085.696l2.275-2.276.021-.021c.378-.378.693-.693.972-.93.29-.246.59-.451.95-.568a2.75 2.75 0 0 1 1.7 0c.36.117.66.322.95.568.279.237.594.552.972.93l.021.021 6.237 6.238c.027.026.05.054.072.083.636-.108 1.114-.27 1.523-.506.18-.104.353-.219.519-.342L3.795 4.856zm-.342 13.769-.01-.02a.754.754 0 0 0 .087-.075l2.738-2.737c.404-.405.676-.676.903-.868.22-.187.346-.254.443-.285a1.25 1.25 0 0 1 .772 0c.097.031.224.098.443.285.227.192.499.463.903.868l5.427 5.427c-.863.03-1.893.03-3.159.03-1.883 0-3.245 0-4.312-.097-1.057-.096-1.75-.281-2.313-.606a5.25 5.25 0 0 1-1.922-1.922zM14.75 8a1.25 1.25 0 1 1 2.5 0 1.25 1.25 0 0 1-2.5 0zM16 5.25a2.75 2.75 0 1 0 0 5.5 2.75 2.75 0 0 0 0-5.5z"
    />
  </svg>
);
export { LineImageSlash };