export interface FilterProps {
  selectedFilter: string | null;
  setSelectedFilter: (value: string | null) => void;
  filterOptions: string[];
}