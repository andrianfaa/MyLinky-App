import { Container } from "../../components";
import { useGetSettingQuery } from "../../services";

export default function Setting(): JSX.Element {
  const { data: settingData, isLoading } = useGetSettingQuery();

  return (
    <Container>
      <h1>Setting</h1>

      <pre className="whitespace-pre-wrap text-sm">
        {JSON.stringify(settingData ?? "", null, 2)}
      </pre>
    </Container>
  );
}
