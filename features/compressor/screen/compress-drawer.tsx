import { FC } from "react";
import Link from "next/link";
import { FaGithub, FaXTwitter } from "react-icons/fa6";

import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { CompressorDrawerProps } from "@/props";
import ThemeToggle from "@/components/shared/theme-toggle";

export const CompressorDrawer: FC<CompressorDrawerProps> = ({
  children,
  open,
  onOpenChange,
  title,
  description,
}) => {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="rounded-t-2xl bg-background ">
        <DrawerHeader>
          <DrawerTitle>{title}</DrawerTitle>
          <DrawerDescription>{description}</DrawerDescription>
        </DrawerHeader>
        {children}
        <div className="flex items-center justify-between px-4 lg:px-24 pb-4 pt-2">
          <div className="text-xs text-muted-foreground">
            Built with ❤️ by @asadkomi
          </div>
          <div className="text-xs text-muted-foreground flex items-center gap-2">
            <Link href="https://github.com/asadkomi">
              <FaGithub className="w-4 h-4" />
            </Link>
            <Link href="https://x.com/asadkomi">
              <FaXTwitter className="w-4 h-4" />
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  );
};
