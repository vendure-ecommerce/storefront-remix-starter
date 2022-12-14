export function Tab({
  Icon,
  text,
  href,
  isActive = false,
}: {
  Icon: React.FC<{ className: string }>;
  text: string;
  href: string;
  isActive?: boolean;
}) {
  return (
    <li>
      <a
        href={href}
        className={`group w-full gap-x-2 max-w-[12rem] inline-flex items-center justify-around p-4 rounded-t-lg border-b-2 ${
          isActive
            ? 'text-primary-500 border-primary-500'
            : 'border-transparent hover:text-gray-600 hover:border-gray-300'
        }`}
      >
        <Icon
          className={`w-5 h-5 ${
            isActive
              ? 'text-primary-500'
              : 'text-gray-400 group-hover:text-gray-500'
          }`}
        />
        <p className="flex-1">{text}</p>
      </a>
    </li>
  );
}
