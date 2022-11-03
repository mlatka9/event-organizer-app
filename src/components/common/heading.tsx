import clsx from "clsx";

interface TextHeaderProps extends React.HTMLAttributes<HTMLHeadElement> {
  children: React.ReactNode;
}

const TextHeader = ({ children, className, ...props }: TextHeaderProps) => (
  <h2 className={clsx(["text-5xl font-semibold "], className)} {...props}>
    {children}
  </h2>
);

export default TextHeader;
