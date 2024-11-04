"use client";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarTrigger,
} from "@components/ui/menubar";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@components/ui/dialog";

const BlogMenu = ({ children }: { children: React.ReactNode[] }) => {
  return (
    <Menubar className="my-5 bg-slate-800 p-4 rounded-md w-fit mx-auto text-slate-50">
      <MenubarMenu>
        <MenubarTrigger>Category</MenubarTrigger>
        <MenubarContent>
          <Dialog>
            <DialogTrigger asChild>
              <MenubarItem onSelect={(e) => e.preventDefault()}>
                Show all categories
              </MenubarItem>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>List of all Categories</DialogTitle>
                {children[0]}
              </DialogHeader>
            </DialogContent>
          </Dialog>

          <MenubarItem>Add Category</MenubarItem>
        </MenubarContent>
      </MenubarMenu>

      <MenubarSeparator />

      <MenubarMenu>
        <MenubarTrigger>Tags</MenubarTrigger>
        <MenubarContent>
          <Dialog>
            <DialogTrigger asChild>
              <MenubarItem onSelect={(e) => e.preventDefault()}>
                Show all tags
              </MenubarItem>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>List of all tags</DialogTitle>
                {children[1]}
              </DialogHeader>
            </DialogContent>
          </Dialog>

          <MenubarItem>Add Tag</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  );
};

export default BlogMenu;
