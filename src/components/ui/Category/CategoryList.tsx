export default function CategoryList({
  categories,
}: {
  categories: {
    id: number;
    category_name: string;
  }[];
}) {
  return (
    <div className="flex flex-col">
      <div className="w-[100%-16px] overflow-hidden rounded-md bg-white mb-4 ml-4">
        {categories.map((category, index) => (
          <button
            className={`text-start font-semibold text-lg p-2 px-4 pl-6 w-full ${index + (1 % 2) == 0 ? 'bg-white' : 'bg-gray-100'}`}
            key={index}
          >
            {category.category_name}
          </button>
        ))}
      </div>
    </div>
  );
}
