// import { Clock } from '@phosphor-icons/react'
import { ElementType } from 'react'

interface CardProps {
  icon: ElementType
  quantity: number
  title: string
  className: string
}

export function Card({ icon: Icon, quantity, title, className }: CardProps) {
  return (
    <div className="bg-zinc-50 p-4 rounded shadow text-sm grid-cols-card flex flex-row items-center py-4 gap-4">
      <Icon className={className} />
      <div className="">
        <p className="text-2xl font-bold pl-1">{quantity}</p>
        <span>{title}</span>
      </div>
    </div>
  )
}
