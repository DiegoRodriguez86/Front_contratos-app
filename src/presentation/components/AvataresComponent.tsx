import { Avatar } from "@nextui-org/react"

export const AvataresComponent = () => {
  return (
    <div className="flex gap-3 items-center">
        <Avatar src="http://graph.facebook.com/{user-id}/picture?type=large"/>
        <Avatar name="Junior"/> 
    </div>
  )
}
