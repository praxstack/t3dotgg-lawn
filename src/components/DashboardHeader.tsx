import { Link } from "@tanstack/react-router";
import { UserButton } from "@clerk/tanstack-react-start";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/components/theme/ThemeToggle";
import React from "react";
import { useConvex } from "convex/react";
import type { Id } from "@convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useRoutePrewarmIntent } from "@/lib/useRoutePrewarmIntent";
import { useFolderDropTarget } from "@/lib/dnd/useFolderDropTarget";
import type { FolderNode } from "@/lib/folderTree";
import type { DragPayload } from "@/lib/dnd/payload";
import { prewarmDashboardIndex } from "../../app/routes/dashboard/-index.data";

function ThemeToggleButton() {
  const { theme, toggleTheme, mounted } = useTheme();

  if (!mounted) return <div className="w-8 h-8" />;

  return (
    <button
      onClick={toggleTheme}
      className="w-8 h-8 flex items-center justify-center text-[#888] hover:text-[#1a1a1a] hover:bg-[#e8e8e0] transition-colors"
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode (⌘⇧L)`}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </button>
  );
}

/** Makes a breadcrumb segment a drop target so items can be dragged "up" the
 * tree onto an ancestor (or the team root for top level), file-manager style. */
export type BreadcrumbDrop = {
  teamId: Id<"teams">;
  /** Destination folder; omit for "top level" (folders only). */
  targetProjectId?: Id<"projects">;
  /** Team folder list, for the folder-into-descendant guard. */
  folders?: readonly FolderNode[];
  disabled?: boolean;
  onDropMove: (payload: DragPayload) => void;
};

export type PathSegment = {
  label: React.ReactNode;
  href?: string;
  prewarmIntentHandlers?: ReturnType<typeof useRoutePrewarmIntent>;
  drop?: BreadcrumbDrop;
};

function BreadcrumbSegment({
  path,
  isIntermediate,
}: {
  path: PathSegment;
  isIntermediate: boolean;
}) {
  const { ref, isDraggedOver, canDropHere } = useFolderDropTarget<HTMLDivElement>({
    disabled: !path.drop || path.drop.disabled,
    targetProjectId: path.drop?.targetProjectId,
    teamId: path.drop?.teamId as Id<"teams">,
    folders: path.drop?.folders,
    onMove: (payload) => path.drop?.onDropMove(payload),
  });

  return (
    <div
      ref={ref}
      className={cn(
        `${isIntermediate ? "hidden sm:flex" : "flex"} items-center min-w-0 flex-shrink`,
        isDraggedOver && canDropHere && "bg-[#2d5a2d]/10 text-[#2d5a2d]",
        isDraggedOver && !canDropHere && "bg-[#dc2626]/10",
      )}
    >
      <span className="text-[#888] mr-2 flex-shrink-0">/</span>
      {path.href ? (
        <Link
          to={path.href}
          preload="intent"
          className={cn(
            "hover:text-[#2d5a2d] transition-colors truncate mr-2",
            isDraggedOver && canDropHere && "text-[#2d5a2d] underline",
          )}
          {...path.prewarmIntentHandlers}
        >
          {path.label}
        </Link>
      ) : (
        <div className="truncate flex items-center gap-3">{path.label}</div>
      )}
    </div>
  );
}

export function DashboardHeader({
  children,
  paths = [],
}: {
  children?: React.ReactNode;
  paths?: PathSegment[];
}) {
  const convex = useConvex();
  const prewarmHomeIntentHandlers = useRoutePrewarmIntent(() =>
    prewarmDashboardIndex(convex),
  );

  return (
    <header className="flex-shrink-0 border-b-2 border-[#1a1a1a] bg-[#f0f0e8] grid grid-cols-[1fr_auto] sm:grid-cols-[auto_1fr_auto] items-center px-4 sm:px-6">
      {/* Breadcrumb */}
      <div className="flex items-center text-xl font-black tracking-tighter text-[#1a1a1a] min-w-0 h-11 sm:h-14">
        <Link
          to="/dashboard"
          preload="intent"
          className="hover:text-[#2d5a2d] transition-colors mr-2 flex-shrink-0"
          {...prewarmHomeIntentHandlers}
        >
          lawn.
        </Link>
        {paths.map((path, index) => {
          const isIntermediate = paths.length >= 2 && index < paths.length - 1;
          return (
            <BreadcrumbSegment
              key={index}
              path={path}
              isIntermediate={isIntermediate}
            />
          );
        })}
      </div>

      {/* User controls — pinned top-right */}
      <div className="row-start-1 col-start-2 sm:col-start-3 flex items-center gap-4 pl-4 border-l-2 border-[#1a1a1a]/10 h-8">
        <ThemeToggleButton />
        <UserButton
          appearance={{
            variables: {
              colorText: "#1a1a1a",
              colorTextSecondary: "#888",
              colorBackground: "#f0f0e8",
            },
            elements: {
              avatarBox: "w-8 h-8 rounded-none border-2 border-[#1a1a1a]",
              userButtonPopoverCard: "bg-[#f0f0e8] border-2 border-[#1a1a1a] rounded-none shadow-[8px_8px_0px_0px_var(--shadow-color)]",
              userButtonPopoverActionButton: "!text-[#1a1a1a] hover:!bg-[#e8e8e0] rounded-none",
              userButtonPopoverActionButtonText: "!text-[#1a1a1a] hover:!text-[#1a1a1a] font-mono font-bold",
              userButtonPopoverActionButtonIcon: "!text-[#1a1a1a] hover:!text-[#1a1a1a]",
              userButtonPopoverFooter: "hidden",
            },
          }}
        />
      </div>

      {/* Children — second row on mobile, middle column on desktop */}
      {children && (
        <div className="col-span-full pb-2 sm:pb-0 sm:col-span-1 sm:col-start-2 sm:row-start-1 flex items-center gap-2 sm:gap-3 sm:justify-end sm:h-14 sm:pl-4 min-w-0">
          {children}
        </div>
      )}
    </header>
  );
}
