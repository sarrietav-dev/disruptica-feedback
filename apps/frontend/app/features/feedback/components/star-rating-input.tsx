import { useState } from "react"
import { Star } from "lucide-react"

interface StarRatingInputProps {
  value: number
  onChange: (value: number) => void
  max?: number
}

export default function StarRatingInput({ value, onChange, max = 5 }: StarRatingInputProps) {
  const [hoverValue, setHoverValue] = useState(0)

  return (
    <div className="flex">
      {Array.from({ length: max }).map((_, index) => {
        const starValue = index + 1
        const isFilled = (hoverValue || value) >= starValue

        return (
          <button
            key={`star-${index}`}
            type="button"
            className="p-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            onClick={() => onChange(starValue)}
            onMouseEnter={() => setHoverValue(starValue)}
            onMouseLeave={() => setHoverValue(0)}
          >
            <Star
              className={`h-6 w-6 transition-all ${isFilled ? "fill-primary text-primary" : "text-muted-foreground"}`}
            />
            <span className="sr-only">{starValue} stars</span>
          </button>
        )
      })}
    </div>
  )
}
