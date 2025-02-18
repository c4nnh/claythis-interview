import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { menuState } from "@/stores/slices/menu";
import { useRouter } from "next/navigation";
import { useSelector } from "react-redux";

export function RootMenuSelector() {
  const router = useRouter();
  const { rootMenus, selectedMenu } = useSelector(menuState);

  function goToDetails(id: string) {
    if (!id) {
      return;
    }

    router.push(`/systems/menus/${id}`);
  }

  return (
    <Select
      onValueChange={goToDetails}
      value={selectedMenu?.root?.id || selectedMenu?.id}
    >
      <SelectTrigger className="h-13 max-w-80 flex-1">
        <SelectValue placeholder="Select a menu" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {rootMenus.map((menu) => (
            <SelectItem key={menu.id} value={menu.id}>
              {menu.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
