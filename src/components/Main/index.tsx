import React, { useMemo } from "react";
import tw from "twin.macro";
import styled from "@emotion/styled";
import useSearch from "../../hooks/useSearch";
import Preview from "../Preview";
import Details from "../Details";

const Container = tw.div`flex items-center justify-center h-screen w-full bg-gray-50 overflow-hidden`;

const Pokedex = styled.main`
  ${tw`flex flex-row h-full w-full max-w-6xl bg-red-500 shadow-2xl p-10 gap-8 rounded-2xl `}
  max-height: 45.3125rem;
`;

const Main: React.FC = () => {
  const {
    searchInputValue,
    handleSearchChange,
    currentPokemon,
    currentEvolution,
    isLoading,
  } = useSearch();

  const evolutionChain = useMemo(() => {
    if (currentEvolution == null) return [];

    const chain = [];

    let currentSpecies = currentEvolution.chain;

    while (currentSpecies) {
      chain.push({
        name: currentSpecies.species.name,
        url: currentSpecies.species.url,
      });

      if (currentSpecies.evolves_to?.length > 1) {
        currentSpecies.evolves_to?.forEach((evolution: any) => {
          chain.push({
            name: evolution.species.name,
            url: evolution.species.url,
          });
        });
      }

      currentSpecies = currentSpecies.evolves_to[0];
    }

    return chain;
  }, [currentEvolution]);

  return (
    <Container>
      <Pokedex>
        <Preview
          isLoading={isLoading}
          name={currentPokemon?.name}
          images={{
            url: currentPokemon?.imageUrl,
            fallbackUrl: currentPokemon?.fallbackImageUrl,
          }}
        />
        <Details
          searchInputValue={searchInputValue}
          handleSearchChange={handleSearchChange}
          abilities={currentPokemon?.abilities}
          types={currentPokemon?.types}
          evolutionChain={evolutionChain}
        />
      </Pokedex>
    </Container>
  );
};

export default Main;
