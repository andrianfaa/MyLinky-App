import { useNavigate } from "react-router-dom";
import { Container } from "../../components";
import { Button } from "../../components/ui";

export default function Error404(): JSX.Element {
  const navigate = useNavigate();

  return (
    <Container className="p-6 flex flex-col items-center justify-center min-h-screen">
      <h1 className="font-bold text-8xl md:text-9xl text-dark-1 mb-4">
        404
      </h1>
      <p className="text-center max-w-[200px]">
        Sorry, the page you are looking for does not exist.
      </p>
      <Button.button
        title="Go to home page"
        className="mt-4 button-base button-primary"
        onClick={() => navigate("/")}
      >
        Go to home page
      </Button.button>
    </Container>
  );
}
