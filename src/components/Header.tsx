interface HeaderProps {
  title: string;
}

export const Header = ({ title }: HeaderProps) => (
  <h1 className="my-4">{title}</h1>
);