interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
}

export function SearchInput({ value, onChange }: SearchInputProps) {
  return (
    <input
      type="search"
      value={value}
      onChange={(event) => onChange(event.target.value)}
      placeholder="Search by name..."
      className="w-full max-w-xs rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-blue-400 focus:outline-none"
    />
  );
}
