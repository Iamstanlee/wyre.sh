import Input from '@/components/ui/Input/Input';

function Search() {
  return (
    <Input
      name="search"
      optional={true}
      id="search"
      type="text"
      placeholder="Search transaction by ID, amount or date."
      className="border-none border-b border-border-color"
    />
  );
}

export default Search;
