import type { ProductCategoryData } from "@/@types/product-category.type"
import {
    AppleIcon,
    CarFrontIcon,
    CpuIcon,
    HomeIcon,
    ShirtIcon,
    VolleyballIcon
} from "lucide-react"

function getCategoryIcon(category: ProductCategoryData) {
    const icons = {
        TECNOLOGY: <CpuIcon size={20} />,
        CLOTHES: <ShirtIcon size={20} />,
        FOOD: <AppleIcon size={20} />,
        HOUSE: <HomeIcon size={20} />,
        CARS: <CarFrontIcon size={20} />,
        SPORTS: <VolleyballIcon size={20} />,
    }
    return icons[category]
}

type CategoryBadgeProps = {
    category: ProductCategoryData;
}

export function CategoryBadge(props: CategoryBadgeProps) {
    return (
        <span className="text-sm text-muted-foreground flex flex-row items-center gap-2">
            {getCategoryIcon(props.category)}
            {props.category[0] + props.category.toLowerCase().slice(1)} 
        </span>
    )
}