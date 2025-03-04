"use client"

import * as React from "react"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ProductRateData } from "@/@types/product-rate-type"

const rateToNumber = (rate: ProductRateData): number => ({
  ONE: 1,
  TWO: 2,
  THREE: 3,
  FOUR: 4,
  FIVE: 5,
}[rate])

const numberToRate = (rate: number): ProductRateData => {
  const sheet: Record<number, ProductRateData> = {
    1: "ONE",
    2: "TWO",
    3: "THREE",
    4: "FOUR",
    5: "FIVE",
  }
  
  return sheet[rate]
}

interface RatingProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "onChange"> {
  value: ProductRateData
  size?: "sm" | "md" | "lg"
  variant?: "fixed" | "input"
  onChange?: (value: ProductRateData) => void
  name?: string
}

const Rating = React.forwardRef<HTMLDivElement, RatingProps>(
  ({ value, size = "md", variant = "fixed", onChange, className, name, ...props }, ref) => {
    const [selectedValue, setSelectedValue] = React.useState(rateToNumber(value))
    const [hoverValue, setHoverValue] = React.useState<number | null>(null)

    // Atualiza o estado se `value` mudar externamente
    React.useEffect(() => {
      setSelectedValue(rateToNumber(value))
    }, [value])

    const handleMouseEnter = (index: number) => {
      if (variant === "input") setHoverValue(index)
    }

    const handleMouseLeave = () => {
      if (variant === "input") setHoverValue(null)
    }

    const handleClick = (index: number) => {
      if (variant === "input") {
        setSelectedValue(index) // Atualiza estado interno
        if (onChange) onChange(numberToRate(index)) // Dispara evento externo
      }
    }

    return (
      <div
        ref={ref}
        className={cn("inline-flex", variant === "input" && "cursor-pointer", className)}
        onMouseLeave={handleMouseLeave}
        role={variant === "input" ? "radiogroup" : "presentation"}
        aria-label={variant === "input" ? "Rating" : undefined}
        {...props}
      >
        {Array.from({ length: 5 }).map((_, index) => {
          const starValue = index + 1
          const isActive = hoverValue !== null ? starValue <= hoverValue : starValue <= selectedValue

          return (
            <RatingItem
              key={index}
              id={`star-${starValue}`}
              name={name}
              isActive={isActive}
              size={size}
              value={starValue}
              onMouseEnter={() => handleMouseEnter(starValue)}
              onClick={() => handleClick(starValue)}
              tabIndex={variant === "input" ? 0 : -1}
              isInteractive={variant === "input"}
              aria-checked={variant === "input" ? starValue === selectedValue : undefined}
              role={variant === "input" ? "radio" : undefined}
              aria-label={variant === "input" ? `${starValue} star${starValue === 1 ? "" : "s"}` : undefined}
            />
          )
        })}
      </div>
    )
  }
)
Rating.displayName = "Rating"

interface RatingItemProps extends React.HTMLAttributes<HTMLDivElement> {
  isActive: boolean
  size: "sm" | "md" | "lg"
  value: number
  isInteractive?: boolean
  id?: string
  name?: string
}
const RatingItem = ({ isActive, size, value, isInteractive = false, id, ...props }: RatingItemProps) => {
  const sizeClasses: Record<string, string> = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  }

  return (
    <div
      id={id}
      className={cn(
        "inline-flex items-center justify-center p-1",
        isInteractive && "transition-transform hover:scale-110",
      )}
      {...props}
    >
      <Star
        className={cn(
          sizeClasses[size],
          isActive ? "fill-primary text-primary" : "fill-transparent text-muted-foreground",
          isInteractive && !isActive && "hover:text-primary/70",
        )}
      />
    </div>
  )
}

export { Rating }