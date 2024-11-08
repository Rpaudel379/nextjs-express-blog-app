import { fetchTags } from "@services/requests/tag";
import Tags from "@/common/components/dashboard/tags/tag";
import { TagType } from "@/common/schema/tags.schema";

const TagPage = async () => {
  const { data: tags }: { data?: TagType[] } = await fetchTags();

  return (
    <div className="space-y-5 text-center">
      <h1 className="text-4xl text-center">Tags</h1>

      {tags?.length === 0 && (
        <div>
          <h1 className="text-3xl">No Tags</h1>
        </div>
      )}

      {/* <DataTable data={categories.data!} columns={columns} /> */}

      <Tags tags={tags} />
    </div>
  );
};

export default TagPage;
