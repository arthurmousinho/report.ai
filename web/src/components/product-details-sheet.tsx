import type { ProductData } from "@/@types/product-data.type"
import {
    Sheet,
    SheetContent,
    SheetDataContainer,
    SheetDataItem,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { formatDollarCurrency } from "@/helpers/format-curency";
import type { ReactNode } from "react";
import { CategoryBadge } from "./category-badge";
import { formatDate } from "@/helpers/format-date";
import { Rating } from "./ui/rating";

type ProductDetailsSheetProps = {
    data: ProductData;
    children: ReactNode;
}

export function ProductDetailsSheet(props: ProductDetailsSheetProps) {
    return (
        <Sheet>
            <SheetTrigger asChild className="cursor-pointer">
                {props.children}
            </SheetTrigger>
            <SheetContent className="sm:max-w-[425px] flex flex-col overflow-y-auto">
                <div className="flex-1">
                    <SheetHeader className="space-y-4">
                        <SheetTitle className="text-xl font-bold flex items-center gap-2">
                            Product Details
                        </SheetTitle>
                    </SheetHeader>
                    <SheetDataContainer>
                        <SheetDataItem label="Id" value={props.data.id} />
                        <SheetDataItem label="Name" value={props.data.name} />
                        <SheetDataItem label="Sales" value={props.data.sales} />
                        <SheetDataItem label="Price" value={formatDollarCurrency(props.data.price)} />
                        <SheetDataItem label="Description" value={props.data.description} />
                        <SheetDataItem label="Category" value={
                            <CategoryBadge category={props.data.category} />
                        } />
                        <SheetDataItem label="Rating" value={
                            <Rating value={props.data.rating} />
                        } />
                        <SheetDataItem label="Created At" value={formatDate(props.data.createdAt)} />
                    </SheetDataContainer>
                </div>
            </SheetContent>
        </Sheet>
    )
}