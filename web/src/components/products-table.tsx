'use client';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Rating } from "./ui/rating"
import { CreateProductDialog } from "./create-product-dialog"
import { CategoryBadge } from "./category-badge"
import { PromptSheet } from "./prompt-sheet"
import { getProducts } from "@/http/get-products-http"
import { formatDollarCurrency } from "@/helpers/format-curency"
import { ProductDetailsSheet } from "./product-details-sheet"
import { RefreshCcw } from "lucide-react"
import { Button } from "./ui/button"
import { useQuery } from "@tanstack/react-query";

export function ProductsTable() {

    const { data, isLoading, isRefetching, refetch } = useQuery({
        queryKey: ['products'],
        queryFn: () => getProducts(),
    })


    return (
        <Card className="">
            <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-xl">
                    Products
                </CardTitle>
                <div className="space-x-2">
                    <PromptSheet />
                    <Button variant={'outline'} onClick={() => refetch()}>
                        <RefreshCcw
                            className={isLoading || isRefetching ? 'animate-spin' : ''}
                        />
                        <span className="sr-only">Reload</span>
                    </Button>
                    <CreateProductDialog />
                </div>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Id</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead className="text-left">Rating</TableHead>
                            <TableHead className="text-left">Category</TableHead>
                            <TableHead className="text-right">Sales</TableHead>
                            <TableHead className="text-right">Price</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {data?.products?.map((product, index) => (
                            <ProductDetailsSheet data={product} key={index}>
                                <TableRow>
                                    <TableCell className="font-medium">
                                        {product.id}
                                    </TableCell>
                                    <TableCell>
                                        {product.name}
                                    </TableCell>
                                    <TableCell className="text-left">
                                        <Rating value={product.rating} size="md" />
                                    </TableCell>
                                    <TableCell className="flex items-start justify-start">
                                        <CategoryBadge category={product.category} />
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {product.sales} units
                                    </TableCell>
                                    <TableCell className="text-right">
                                        {formatDollarCurrency(product.price)}
                                    </TableCell>
                                </TableRow>
                            </ProductDetailsSheet>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    )
}
