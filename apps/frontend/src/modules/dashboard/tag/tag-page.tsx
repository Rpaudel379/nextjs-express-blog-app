import { fetchTags } from "@services/requests/tag";
import Tags from "@/common/components/dashboard/tags/tag";

const TagPage = async () => {
  const tags = await fetchTags();

  return (
    <div className="space-y-5 text-center">
      <h1 className="text-4xl text-center">Tags</h1>

      {tags.data?.length === 0 && (
        <div>
          <h1 className="text-3xl">No Tags</h1>
        </div>
      )}

      {/* <DataTable data={categories.data!} columns={columns} /> */}

      <Tags tags={tags.data!} />
    </div>
  );
};

export default TagPage;
