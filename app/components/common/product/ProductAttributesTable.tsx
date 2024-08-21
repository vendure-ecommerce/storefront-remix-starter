import { ChevronDown } from 'lucide-react';
import { FC } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '~/components/ui-custom/MyTable';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '~/components/ui/collapsible';

const ProductAttributesTable: FC<{
  attributes: any[];
}> = ({ attributes }) => {
  return (
    <Collapsible className="group/collapse">
      <CollapsibleTrigger className="flex h-14 w-full items-center justify-between gap-4 text-2xl font-bold">
        Műszaki adatok
        <ChevronDown className="h-6 w-6"></ChevronDown>
      </CollapsibleTrigger>
      <CollapsibleContent>
        {[...Array(1)].map((_, index) => (
          <Table key={index}>
            <TableHeader>
              <TableRow className="border-none hover:bg-transparent">
                <TableHead>Tulajdonság csoport</TableHead>
                <TableHead className="text-right"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {attributes.map((a) => (
                <TableRow key={index} className="border-none odd:bg-muted">
                  <TableCell className="font-medium">{a.facet?.name}</TableCell>
                  <TableCell className="text-right">{a.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        ))}
      </CollapsibleContent>
    </Collapsible>
  );
};

export default ProductAttributesTable;
