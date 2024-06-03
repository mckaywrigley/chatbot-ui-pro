import { cn } from "@/lib/utils"
import { LLMID } from "@/types"
import { IconSparkles, IconBolt } from "@tabler/icons-react"
import { Sparkles, Sparkle } from "lucide-react"
import { useTheme } from "next-themes"
import { FC, HTMLAttributes } from "react"
import { GPT4 } from "@/lib/models/llm/openai-llm-list"

interface ModelIconProps extends HTMLAttributes<HTMLDivElement> {
  modelId: LLMID | "custom"
  height: number
  width: number
}

export const iconMap = {
  [GPT4.modelId]: Sparkles,
  "mistral-medium": IconBolt,
  "mistral-large": Sparkle,
  default: IconSparkles
}

export const ModelIcon: FC<ModelIconProps> = ({
  modelId,
  height,
  width,
  ...props
}) => {
  const { theme } = useTheme()
  const IconComponent = iconMap[modelId] || iconMap["default"]
  const className = cn(
    "rounded-sm bg-[#fff] p-0.5 text-black",
    props.className,
    theme === "dark" ? "bg-white" : "border-[1px] border-black"
  )

  return <IconComponent className={className} size={width} />
}
