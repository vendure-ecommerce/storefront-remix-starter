import clsx from "clsx";

export function Logo(
  props: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
) {
  return (
    <div
      {...props}
      className={clsx(
        props.className,
        "tracking-widest uppercase font-extralight text-2xl"
      )}
    >
      Vendure Remix 💿
    </div>
  );
}
