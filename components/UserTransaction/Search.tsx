import Input from '@/components/ui/Input/Input';

function Search() {
  return (
    <Input
      name="search"
      optional={true}
      id="search"
      type="text"
      placeholder="Search payments by number, items, client name or email..."
      className="border-none border-b border-border-color"
    />
  );
}

export default Search;
