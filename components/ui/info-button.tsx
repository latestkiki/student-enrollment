"use client"
import { Info } from "lucide-react"
import { Button } from "./button"
import { Tooltip, TooltipContent, TooltipTrigger } from "./tooltip"
import { cn } from "@/lib/utils"

interface InfoButtonProps {
  content: string
  className?: string
  size?: "sm" | "default" | "lg"
  variant?: "ghost" | "outline" | "secondary"
}

export function InfoButton({ content, className, size = "sm", variant = "ghost" }: InfoButtonProps) {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant={variant}
          size="icon"
          className={cn(
            "h-5 w-5 text-muted-foreground hover:text-foreground",
            size === "sm" && "h-4 w-4",
            size === "lg" && "h-6 w-6",
            className,
          )}
        >
          <Info className="h-3 w-3" />
          <span className="sr-only">Information</span>
        </Button>
      </TooltipTrigger>
      <TooltipContent>
        <p className="max-w-xs text-sm">{content}</p>
      </TooltipContent>
    </Tooltip>
  )
}
