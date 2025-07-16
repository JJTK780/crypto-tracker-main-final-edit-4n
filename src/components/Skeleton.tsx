interface SkeletonProps {
  className: string
}

export default function Skeleton({ className }: SkeletonProps) {
  return (
    <div className="animate-pulse">
      <div className={`rounded-md bg-slate-300 ${className}`} />
    </div>
  )
}
