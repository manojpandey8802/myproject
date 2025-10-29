type RatingProps = { value?: number };

export default function Rating({ value }: RatingProps) {
  if (value == null) return null;
  return <p className="text-yellow-500 text-sm mb-2">⭐ {value} / 5</p>;
}


