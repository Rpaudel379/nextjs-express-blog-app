import React, { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@components/ui/dialog";

import { cn } from "@utils/lib/utils";

interface DialogType {
  open: boolean;
  dialogTitle?: string | ReactNode;
  dialogSubTitle?: string;
  dialogContent?: React.ReactNode;
  dialogFooter?: React.ReactNode;
  onOpenChange?: (open: boolean) => void;
  onCancel?: () => void;
  onAccept?: (refId?: number) => void;
  className?: string;
  containerClassName?: string;
  headerClassName?: string;
  refId?: number;
}

const Modal: React.FC<DialogType> = ({
  open,
  dialogTitle,
  dialogSubTitle,
  dialogContent,
  dialogFooter,
  onOpenChange,
  onCancel,
  className,
  containerClassName,
  headerClassName,
}) => {
  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onCancel?.();
    }
    onOpenChange && onOpenChange(open);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogContent className={`p-0 max-w-[60rem] ${containerClassName}`}>
        {dialogTitle && (
          <>
            <DialogHeader
              className={cn(`border-b border-[#CED4DA] p-3 `, headerClassName)}
            >
              <DialogTitle className="text-lg font-medium p-0">
                {dialogTitle}
              </DialogTitle>
              {dialogSubTitle && (
                <DialogDescription>{dialogSubTitle}</DialogDescription>
              )}
            </DialogHeader>
          </>
        )}
        <div
          className={cn(
            `px-4 py-3 max-h-[90dvh] overflow-auto custom-scrollbar`,
            className
          )}
        >
          {dialogContent}
          {dialogFooter && <DialogFooter>{dialogFooter}</DialogFooter>}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default Modal;
