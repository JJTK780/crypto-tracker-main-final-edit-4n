// Components
import Skeleton from './Skeleton'

interface LoadingSkeletonProps {
  quantity: number
}

export default function LoadingSkeleton({ quantity }: LoadingSkeletonProps) {
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      {[...Array(quantity).keys()].map((_, index) => (
        <Skeleton key={index} className="w-full h-[90px]" />
      ))}
    </div>
  )
}
