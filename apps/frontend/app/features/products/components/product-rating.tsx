import { Star } from "lucide-react";

interface ProductRatingProps {
  rating: number;
  max?: number;
  size?: "sm" | "md" | "lg";
}

export function ProductRating({
  rating,
  max = 5,
  size = "md",
}: ProductRatingProps) {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  const emptyStars = max - fullStars - (hasHalfStar ? 1 : 0);

  const sizeClass = {
    sm: "h-3 w-3",
    md: "h-4 w-4",
    lg: "h-5 w-5",
  }[size];

  return (
    <div className="flex">
      {/* Full stars */}
      {Array.from({ length: fullStars }).map((_, i) => (
        <Star
          key={`full-${i}`}
          className={`${sizeClass} fill-primary text-primary`}
        />
      ))}

      {/* Half star */}
      {hasHalfStar && (
        <div className="relative">
          <Star className={`${sizeClass} text-muted-foreground`} />
          <div className="absolute inset-0 overflow-hidden w-1/2">
            <Star className={`${sizeClass} fill-primary text-primary`} />
          </div>
        </div>
      )}

      {/* Empty stars */}
      {Array.from({ length: emptyStars }).map((_, i) => (
        <Star
          key={`empty-${i}`}
          className={`${sizeClass} text-muted-foreground`}
        />
      ))}
    </div>
  );
}
