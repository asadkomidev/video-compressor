import { cn } from "@/lib/utils";
import Link from "next/link";
import { FC } from "react";
import { FaGithub, FaXTwitter } from "react-icons/fa6";

type FooterProps = {
  className?: string;
};

export const Footer: FC<FooterProps> = ({ className }) => {
  return (
    <div
      className={cn(
        "flex items-center justify-between px-4 lg:px-24 pb-4 pt-2",
        className
      )}>
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
      </div>
    </div>
  );
};
