

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "~/components/ui-custom/MyTable";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "~/components/ui/collapsible";
import { ChevronDown } from "lucide-react";

const ProductAttributesTable = () => {
  return (
    <Collapsible className='group/collapse'>
      <CollapsibleTrigger className='flex h-14 w-full items-center justify-between gap-4 text-2xl font-bold'>
        Műszaki adatok
        <ChevronDown className='h-6 w-6'></ChevronDown>
      </CollapsibleTrigger>
      <CollapsibleContent>
        {[...Array(2)].map((_, index) => (
          <Table key={index}>
            <TableHeader>
              <TableRow className='border-none hover:bg-transparent'>
                <TableHead>Tulajdonság csoport</TableHead>
                <TableHead className='text-right'></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[...Array(10)].map((_, index) => (
                <TableRow key={index} className='border-none odd:bg-muted'>
                  <TableCell className='font-medium'>Tulajdonság</TableCell>
                  <TableCell className='text-right'>Érték</TableCell>
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
