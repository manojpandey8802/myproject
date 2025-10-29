"use client";
type BadgeProps = {
  label: string;
  variant: "sale" | "stock";
};

export default function Badge({ label, variant }: BadgeProps) {
  const styles =
    variant === "sale"
      ? "bg-red-500 text-white"
      : "bg-gray-400 text-gray-900 dark:bg-gray-700 dark:text-gray-100";

  return (
    <span
      className={`px-2 py-1 text-xs rounded-md font-semibold ${styles}`}
      aria-label={label}
    >
      {label}
    </span>
  );
}
