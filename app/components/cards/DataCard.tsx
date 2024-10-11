

import { Card } from "~/components/ui-custom/MyCard";

interface DataCardProps {
  title?: string;
}

const DataCard: React.FC<DataCardProps> = ({ title = "Címsor" }) => {
  return (
    <Card className='flex h-full items-center justify-center gap-4 border p-6 text-center font-bold shadow-none'>
      {title}
    </Card>
  );
};

export default DataCard;
