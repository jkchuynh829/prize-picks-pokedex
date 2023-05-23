import { useCallback, useEffect, useState } from "react";
import { fetchPokemon, fetchSpecies } from "../reducers/pokemon";
import { useDispatch, useSelector } from "../store";
import { useDebouncedCallback } from "use-debounce";

interface UseSearchValues {
  searchInputValue: string;
  handleSearchChange: (value: string) => void;
  currentPokemon: Pokemon;
  currentEvolution: any;
}

const useSearch = (): UseSearchValues => {
  const dispatch = useDispatch();

  const [searchInputValue, setSearchInputValue] = useState<string>("");
  const [currentSearch, setCurrentSearch] = useState<string | null>(null);

  const currentPokemon = useSelector(
    (store) => store.pokemon.data[currentSearch ?? ""]
  );

  const currentEvolution = useSelector((store) => {
    if (currentPokemon?.evolution_id == null) return null;
    return store.pokemon.evolutions[currentPokemon.evolution_id];
  });

  useEffect(() => {
    if (currentSearch == null || !currentSearch) return;
    dispatch(fetchPokemon(currentSearch));
    dispatch(fetchSpecies(currentSearch));
  }, [dispatch, currentSearch]);

  const debouncedSearch = useDebouncedCallback((value: string) => {
    setCurrentSearch(value);
  }, 300);

  const handleSearchChange = useCallback(
    (value: string) => {
      setSearchInputValue(value);
      debouncedSearch(value);
    },
    [debouncedSearch]
  );

  return {
    searchInputValue,
    handleSearchChange,
    currentPokemon,
    currentEvolution,
  };
};

export default useSearch;
