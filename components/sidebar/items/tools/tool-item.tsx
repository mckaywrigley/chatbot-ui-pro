import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { TOOL_NAME_MAX } from "@/db/limits"
import { Tables } from "@/supabase/types"
import { IconBolt } from "@tabler/icons-react"
import { FC, useState } from "react"
import { SidebarItem } from "../all/sidebar-display-item"

interface ToolItemProps {
  tool: Tables<"tools">
}

export const ToolItem: FC<ToolItemProps> = ({ tool }) => {
  const [name, setName] = useState(tool.name)
  const [description, setDescription] = useState(tool.description)

  return (
    <SidebarItem
      item={tool}
      contentType="tools"
      icon={<IconBolt size={30} />}
      updateState={{ name, description }}
      renderInputs={() => (
        <>
          <div className="space-y-1">
            <Label>Name</Label>

            <Input
              placeholder="Tool name..."
              value={name}
              onChange={e => setName(e.target.value)}
              maxLength={TOOL_NAME_MAX}
            />
          </div>

          {/* <div className="space-y-1">
            <Label>Description (optional)</Label>

            <Input
              placeholder="Tool description..."
              value={description}
              onChange={e => setDescription(e.target.value)}
              maxLength={TOOL_DESCRIPTION_MAX}
            />
          </div> */}
        </>
      )}
    />
  )
}
