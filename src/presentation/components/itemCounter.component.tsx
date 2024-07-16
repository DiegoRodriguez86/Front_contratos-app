import { ChevronRightIcon } from "../icons/ChevronRight.icon";

interface ItemCounterProps {
    count: number;
}

export const ItemCounter = ({count}:ItemCounterProps) => {
    return (
        <div className="flex items-center justify-center w-7 h-7">
            <span className="text-xs text-gray-500">{count}</span>
            <ChevronRightIcon className="text-xs text-gray-500" />
        </div>
    );
};