import { FilterIcon } from '@heroicons/react/solid';

export function VatInfo({ percentage }: { percentage: number }) {
    return percentage > 0 ? (
        <span className="text-gray-500">Incl. {percentage}% VAT</span>
    ) : (
        <span className="text-gray-500">Excl. VAT</span>
    );
}
