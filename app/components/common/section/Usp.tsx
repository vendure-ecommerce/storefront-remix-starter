import UspCard from '~/components/cards/UspCard';
import SectionContent from '~/components/common/section/SectionContent';
import Section from './Section';
import SectionHeader from './SectionHeader';
import SectionTitle from './SectionTitle';

const Usp: React.FC = () => {
  const uspCardOptions = [
    {
      id: '1',
      title: 'Hazai és import termékek széles választéka',
      description: 'Hazai és import termékek széles választéka bővebben.',
      imageSrc:
        'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZjVmNDIiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1zaG9wcGluZy1iYXNrZXQiPjxwYXRoIGQ9Im0xNSAxMS0xIDkiLz48cGF0aCBkPSJtMTkgMTEtNC03Ii8+PHBhdGggZD0iTTIgMTFoMjAiLz48cGF0aCBkPSJtMy41IDExIDEuNiA3LjRhMiAyIDAgMCAwIDIgMS42aDkuOGEyIDIgMCAwIDAgMi0xLjZsMS43LTcuNCIvPjxwYXRoIGQ9Ik00LjUgMTUuNWgxNSIvPjxwYXRoIGQ9Im01IDExIDQtNyIvPjxwYXRoIGQ9Im05IDExIDEgOSIvPjwvc3ZnPg==',
    },
    {
      id: '2',
      title: 'Megbízhatóság',
      description: 'Megbízhatóság bővebben.',
      imageSrc:
        'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZjVmNDIiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS1oYW5kc2hha2UiPjxwYXRoIGQ9Im0xMSAxNyAyIDJhMSAxIDAgMSAwIDMtMyIvPjxwYXRoIGQ9Im0xNCAxNCAyLjUgMi41YTEgMSAwIDEgMCAzLTNsLTMuODgtMy44OGEzIDMgMCAwIDAtNC4yNCAwbC0uODguODhhMSAxIDAgMSAxLTMtM2wyLjgxLTIuODFhNS43OSA1Ljc5IDAgMCAxIDcuMDYtLjg3bC40Ny4yOGEyIDIgMCAwIDAgMS40Mi4yNUwyMSA0Ii8+PHBhdGggZD0ibTIxIDMgMSAxMWgtMiIvPjxwYXRoIGQ9Ik0zIDMgMiAxNGw2LjUgNi41YTEgMSAwIDEgMCAzLTMiLz48cGF0aCBkPSJNMyA0aDgiLz48L3N2Zz4=',
    },
    {
      id: '3',
      title: 'Minőség és ár / érték arány',
      description: 'Minőség és ár / érték arány bővebben.',
      imageSrc:
        'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZjVmNDIiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS10aHVtYnMtdXAiPjxwYXRoIGQ9Ik03IDEwdjEyIi8+PHBhdGggZD0iTTE1IDUuODggMTQgMTBoNS44M2EyIDIgMCAwIDEgMS45MiAyLjU2bC0yLjMzIDhBMiAyIDAgMCAxIDE3LjUgMjJINGEyIDIgMCAwIDEtMi0ydi04YTIgMiAwIDAgMSAyLTJoMi43NmEyIDIgMCAwIDAgMS43OS0xLjExTDEyIDJoMGEzLjEzIDMuMTMgMCAwIDEgMyAzLjg4WiIvPjwvc3ZnPg==',
    },
    {
      id: '4',
      title: 'Rugalmas szállítás',
      description: 'Rugalmas szállítás bővebben.',
      imageSrc:
        'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9IiNmZjVmNDIiIHN0cm9rZS13aWR0aD0iMiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBjbGFzcz0ibHVjaWRlIGx1Y2lkZS10cnVjayI+PHBhdGggZD0iTTE0IDE4VjZhMiAyIDAgMCAwLTItMkg0YTIgMiAwIDAgMC0yIDJ2MTFhMSAxIDAgMCAwIDEgMWgyIi8+PHBhdGggZD0iTTE1IDE4SDkiLz48cGF0aCBkPSJNMTkgMThoMmExIDEgMCAwIDAgMS0xdi0zLjY1YTEgMSAwIDAgMC0uMjItLjYyNGwtMy40OC00LjM1QTEgMSAwIDAgMCAxNy41MiA4SDE0Ii8+PGNpcmNsZSBjeD0iMTciIGN5PSIxOCIgcj0iMiIvPjxjaXJjbGUgY3g9IjciIGN5PSIxOCIgcj0iMiIvPjwvc3ZnPg==',
    },
  ];

  return (
    <Section>
      <SectionHeader className="hidden">
        <SectionTitle level="h2" title="Miért vásároljon nálunk?" srOnly />
      </SectionHeader>
      <SectionContent
        className="grid grid-cols-1 gap-item sm:grid-cols-2 lg:grid-cols-4"
        layoutType="grid"
      >
        {uspCardOptions.map((option, index) => (
          <UspCard
            key={index}
            id={option.id}
            imageSrc={option.imageSrc}
            title={option.title}
            description={option.description}
          />
        ))}
      </SectionContent>
    </Section>
  );
};

export default Usp;
