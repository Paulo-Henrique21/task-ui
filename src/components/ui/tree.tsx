"use client";

import * as React from "react";
import { ChevronDownIcon, ChevronRightIcon } from "lucide-react";

import { cn } from "@/lib/utils";

interface TreeItem {
  id: string;
  name: string;
  children?: TreeItem[];
  isFolder?: boolean;
  isExpanded?: boolean;
  isSelected?: boolean;
  level?: number;
}

interface TreeContextValue {
  indent: number;
  expandedItems: Set<string>;
  selectedItems: Set<string>;
  onToggleExpanded: (id: string) => void;
  onToggleSelected: (id: string) => void;
}

const TreeContext = React.createContext<TreeContextValue>({
  indent: 20,
  expandedItems: new Set(),
  selectedItems: new Set(),
  onToggleExpanded: () => {},
  onToggleSelected: () => {},
});

function useTreeContext() {
  return React.useContext(TreeContext);
}

interface TreeProps extends React.HTMLAttributes<HTMLDivElement> {
  indent?: number;
  data?: TreeItem[];
  onSelectionChange?: (selectedIds: string[]) => void;
  onExpansionChange?: (expandedIds: string[]) => void;
}

function Tree({
  indent = 20,
  data = [],
  className,
  onSelectionChange,
  onExpansionChange,
  ...props
}: TreeProps) {
  const [expandedItems, setExpandedItems] = React.useState<Set<string>>(
    new Set()
  );
  const [selectedItems, setSelectedItems] = React.useState<Set<string>>(
    new Set()
  );

  const onToggleExpanded = React.useCallback(
    (id: string) => {
      setExpandedItems((prev) => {
        const newSet = new Set(prev);
        if (newSet.has(id)) {
          newSet.delete(id);
        } else {
          newSet.add(id);
        }

        if (onExpansionChange) {
          onExpansionChange(Array.from(newSet));
        }

        return newSet;
      });
    },
    [onExpansionChange]
  );

  const onToggleSelected = React.useCallback(
    (id: string) => {
      setSelectedItems((prev) => {
        const newSet = new Set(prev);
        if (newSet.has(id)) {
          newSet.delete(id);
        } else {
          newSet.add(id);
        }

        if (onSelectionChange) {
          onSelectionChange(Array.from(newSet));
        }

        return newSet;
      });
    },
    [onSelectionChange]
  );

  const contextValue = React.useMemo(
    () => ({
      indent,
      expandedItems,
      selectedItems,
      onToggleExpanded,
      onToggleSelected,
    }),
    [indent, expandedItems, selectedItems, onToggleExpanded, onToggleSelected]
  );

  const renderTreeItems = React.useCallback(
    (items: TreeItem[], level = 0): React.ReactNode => {
      return items.map((item) => (
        <TreeItemComponent
          key={item.id}
          item={{ ...item, level }}
          data={data}
        />
      ));
    },
    [data]
  );

  return (
    <TreeContext.Provider value={contextValue}>
      <div
        data-slot="tree"
        style={{ "--tree-indent": `${indent}px` } as React.CSSProperties}
        className={cn("flex flex-col", className)}
        {...props}
      >
        {renderTreeItems(data)}
      </div>
    </TreeContext.Provider>
  );
}

interface TreeItemComponentProps {
  item: TreeItem & { level: number };
  data: TreeItem[];
}

function TreeItemComponent({ item, data }: TreeItemComponentProps) {
  const {
    indent,
    expandedItems,
    selectedItems,
    onToggleExpanded,
    onToggleSelected,
  } = useTreeContext();

  const isExpanded = expandedItems.has(item.id);
  const isSelected = selectedItems.has(item.id);
  const hasChildren = item.children && item.children.length > 0;
  const isFolder = item.isFolder || hasChildren;

  const handleClick = () => {
    onToggleSelected(item.id);
  };

  const handleToggleExpanded = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFolder) {
      onToggleExpanded(item.id);
    }
  };

  const renderChildren = () => {
    if (!hasChildren || !isExpanded) return null;

    return item.children!.map((child) => (
      <TreeItemComponent
        key={child.id}
        item={{ ...child, level: item.level + 1 }}
        data={data}
      />
    ));
  };

  return (
    <>
      <div
        style={
          {
            "--tree-padding": `${item.level * indent}px`,
          } as React.CSSProperties
        }
        className={cn(
          "ps-[var(--tree-padding)] outline-none select-none cursor-pointer",
          "hover:bg-accent/50 focus:bg-accent/50",
          isSelected && "bg-accent text-accent-foreground"
        )}
        onClick={handleClick}
        tabIndex={0}
        role="treeitem"
        aria-expanded={isFolder ? isExpanded : undefined}
        aria-selected={isSelected}
      >
        <TreeItemLabel
          item={item}
          isFolder={!!isFolder}
          isExpanded={isExpanded}
          onToggleExpanded={handleToggleExpanded}
        />
      </div>
      {renderChildren()}
    </>
  );
}

interface TreeItemLabelProps {
  item: TreeItem & { level: number };
  isFolder: boolean;
  isExpanded: boolean;
  onToggleExpanded: (e: React.MouseEvent) => void;
  className?: string;
}

function TreeItemLabel({
  item,
  isFolder,
  isExpanded,
  onToggleExpanded,
  className,
}: TreeItemLabelProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 px-2 py-1.5 text-sm rounded-sm transition-colors",
        className
      )}
    >
      {isFolder ? (
        <button
          onClick={onToggleExpanded}
          className="flex items-center justify-center w-4 h-4 hover:bg-accent rounded-sm"
          aria-label={isExpanded ? "Collapse" : "Expand"}
        >
          {isExpanded ? (
            <ChevronDownIcon className="w-4 h-4 text-muted-foreground" />
          ) : (
            <ChevronRightIcon className="w-4 h-4 text-muted-foreground" />
          )}
        </button>
      ) : (
        <div className="w-4 h-4" />
      )}
      <span className="truncate">{item.name}</span>
    </div>
  );
}

// Backwards compatibility exports
const TreeItem = TreeItemComponent;
const TreeDragLine = () => null; // Placeholder for drag functionality

export { Tree, TreeItem, TreeItemLabel, TreeDragLine };
