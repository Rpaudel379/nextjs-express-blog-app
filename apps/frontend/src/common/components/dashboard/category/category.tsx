"use client";

import { CategoryType } from "@/common/schema/category.schema";
import Modal from "@components/modal-component";
import DataTable from "@components/data-table";

import { getCategoryColumns } from "@modules/dashboard/category/columns";
import { deleteCategoryAction } from "@/common/services/actions/category";
import { toast } from "sonner";
import { useState } from "react";
import { Button } from "@components/ui/button";
import CategoryForm from "@components/dashboard/category/category-form";
import { ServerActionState } from "@/common/schema/common.schema";

type Props = {
  categories?: CategoryType[];
};

const Category = ({ categories }: Props) => {
  const [openModel, setOpenModel] = useState(false);
  const [category, setCategory] = useState<CategoryType | null>(null);

  const onDelete = async (id: string) => {
    toast("loading ...");
    const deleteCategory: ServerActionState<undefined> =
      await deleteCategoryAction(id);
    if (deleteCategory.success) {
      toast.success(deleteCategory.message);
    } else {
      toast.error(deleteCategory.message);
    }
  };

  const onEdit = async (category: CategoryType) => {
    setCategory(category);
    setOpenModel(true);
  };

  const columns = getCategoryColumns({ onEdit, onDelete });

  return (
    <div>
      <div className="space-y-5 flex-col">
        <Button type="button" onClick={() => setOpenModel(true)}>
          Add Category
        </Button>
        {categories && <DataTable data={categories} columns={columns} />}
      </div>

      <Modal
        open={openModel}
        onOpenChange={setOpenModel}
        dialogTitle={`${category ? "update category" : "create new category"}`}
        dialogContent={
          <CategoryForm
            category={category}
            onSuccess={() => {
              setOpenModel(false);
              setCategory(null);
            }}
          />
        }
        containerClassName="lg:w-1/2"
        onCancel={() => setCategory(null)}
      />
    </div>
  );
};

export default Category;
