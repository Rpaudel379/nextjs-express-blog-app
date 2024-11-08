"use client";

import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@components/ui/command";
import { Button } from "@components/ui/button";
import { Badge } from "@components/ui/badge";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@utils/lib/utils";

type Item = {
  id: string;
  name: string;
};

interface ComboBoxProps {
  items: Item[];
  placeholder: string;
  label: string;
  emptyMessage: string;
  multiSelect?: boolean;
  onChange: (value: string | string[]) => void;
  value: string | string[] | undefined;
}

export const Combobox = ({
  items,
  placeholder,
  label,
  emptyMessage,
  multiSelect,
  onChange,
  value,
}: ComboBoxProps) => {
  const [open, setOpen] = useState(false);
  // const [selectedItems, setSelectedItems] = useState<Item[]>([]);

  const handleSelect = (item: Item) => {
    if (multiSelect) {
      const newValue = Array.isArray(value) ? value : [];
      onChange(
        newValue.includes(item.id)
          ? newValue.filter((id) => id !== item.id)
          : [...newValue, item.id]
      );
    } else {
      onChange(value === item.id ? "" : item.id);
      setOpen(false);
    }
  };

  const handleRemove = (itemId: string) => {
    if (multiSelect && Array.isArray(value)) {
      onChange(value.filter((id) => id !== itemId));
    }
  };

  const selectedItems = items.filter((item) =>
    Array.isArray(value) ? value.includes(item.id) : item.id === value
  );

  return (
    <div className="w-full">
      {/* <Label
        htmlFor={`${label}-select`}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </Label> */}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
            type="button"
          >
            {selectedItems.length > 0 ? (
              <div className="flex flex-wrap gap-1">
                {selectedItems.map((item) => (
                  <Badge
                    role="button"
                    key={item.id}
                    variant="secondary"
                    className="mr-1"
                  >
                    {item.name}
                    {multiSelect && (
                      <button
                        type="button"
                        className="ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        onMouseDown={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                        }}
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          handleRemove(item.id);
                        }}
                      >
                        <X className="h-3 w-3 text-muted-foreground hover:text-foreground" />
                      </button>
                    )}
                  </Badge>
                ))}
              </div>
            ) : (
              placeholder
            )}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full md:w-[400px] p-0">
          <Command>
            <CommandInput
              placeholder={`Search ${label.toLowerCase()}...`}
              className="h-9"
            />
            <CommandList>
              <CommandEmpty>{emptyMessage}</CommandEmpty>
              <CommandGroup>
                {items.map((item) => (
                  <CommandItem
                    key={item.id}
                    value={item.name}
                    onSelect={() => handleSelect(item)}
                  >
                    {item.name}
                    <Check
                      className={cn(
                        "ml-auto h-4 w-4",
                        selectedItems.some((i) => i.id === item.id)
                          ? "opacity-100"
                          : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};
