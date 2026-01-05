import React from "react";
import { Star } from "lucide-react";

interface RatingStarsProps {
    rating: number;
    maxRating?: number;
    size?: number;
    showValue?: boolean;
    reviewCount?: number;
    showCount?: boolean;
}

export default function RatingStars({
    rating,
    maxRating = 5,
    size = 16,
    showValue = false,
    reviewCount,
    showCount = true,
}: RatingStarsProps) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;

    return (
        <div className="flex items-center gap-2">
            <div className="flex items-center gap-0.5">
                {[...Array(maxRating)].map((_, index) => {
                    const isFull = index < fullStars;
                    const isHalf = index === fullStars && hasHalfStar;

                    return (
                        <div key={index} className="relative">
                            {/* Background star (empty) */}
                            <Star
                                size={size}
                                className="text-[--color-border]"
                                fill="var(--color-border)"
                            />
                            {/* Foreground star (filled) */}
                            {isFull && (
                                <Star
                                    size={size}
                                    className="absolute top-0 left-0 text-[--color-accent-cyan]"
                                    fill="var(--color-accent-cyan)"
                                />
                            )}
                            {/* Half star */}
                            {isHalf && (
                                <div className="absolute top-0 left-0 overflow-hidden w-1/2">
                                    <Star
                                        size={size}
                                        className="text-[--color-accent-cyan]"
                                        fill="var(--color-accent-cyan)"
                                    />
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
            {showValue && (
                <span className="text-sm text-[--color-text-primary] font-medium">
                    {rating.toFixed(1)}
                </span>
            )}
            {reviewCount !== undefined && showCount && (
                <span className="text-sm text-[--color-text-secondary]">
                    ({reviewCount.toLocaleString()})
                </span>
            )}
        </div>
    );
}
