import { useCallback, useEffect, useState } from "react";
import { fetchPokemon, fetchSpecies } from "../reducers/pokemon";
import { useDispatch, useSelector } from "../store";
import { useDebouncedCallback } from "use-debounce";
import useLocalStorage from "./useLocalstorage";

interface UseSearchValues {
  searchInputValue: string;
  handleSearchChange: (value: string) => void;
  currentPokemon: Pokemon;
  currentEvolution: any;
  recentSearches: string[];
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

  const [recentSearches, updateRecentSearches] = useLocalStorage<string[]>(
    "recentSearches",
    []
  );

  useEffect(() => {
    if (currentPokemon?.name == null || !currentPokemon?.name) return;
    if (recentSearches[0] === currentPokemon.name) return;
    updateRecentSearches([currentPokemon.name, ...recentSearches.slice(0, 9)]);
  }, [currentPokemon, recentSearches, updateRecentSearches]);

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
    recentSearches,
  };
};

export default useSearch;
