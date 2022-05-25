/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable react/require-default-props */
import { BookIcon, PlayIcon } from "../../../assets/icons";
import Container from "../../Container";

export interface HeaderProps {
  title: string;
  description?: string;
}

export function Header({
  title,
  description,
}: HeaderProps): JSX.Element {
  return (
    <header className="border-b border-b-light-3 pb-4">
      <Container>
        <div className="flex items-center">
          <h1 className="text-dark-1 font-bold text-3xl mb-2">{title}</h1>
        </div>
        <p>{description}</p>

        <div className="flex items-center gap-2.5 sm:gap-4 mt-6">
          <a href="#" className="flex items-center gap-1 font-semibold text-primary">
            <PlayIcon className="w-5 h-5" />
            {" "}
            <span className="text-sm tracking-tight">Watch a Video</span>
          </a>

          <a href="#" className="flex items-center gap-1 font-semibold text-primary">
            <BookIcon className="w-5 h-5" />
            {" "}
            <span className="text-sm tracking-tight">How to Get Started</span>
          </a>
        </div>
      </Container>
    </header>
  );
}
