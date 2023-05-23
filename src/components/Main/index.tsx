import React, { useMemo } from "react";
import tw from "twin.macro";
import styled from "@emotion/styled";
import useSearch from "../../hooks/useSearch";

const Container = tw.div`flex items-center justify-center h-screen w-full bg-gray-50 overflow-hidden`;

const Section = tw.section`flex-1 bg-red-400 overflow-hidden p-8 rounded-xl`;

const Preview = tw(Section)`flex flex-col items-center justify-center p-6`;
const Name = tw.h2`uppercase text-4xl text-white mb-6`;
const ImageContainer = tw.div`flex-1 h-full bg-gray-700 rounded-xl`;
const Image = tw.img`w-full h-full object-contain`;

const Interface = tw(Section)`flex flex-col relative p-6 gap-6`;
const Search = tw.input`flex-1 h-6 max-h-6 border outline-none border-none rounded-lg p-6 text-xl bg-gray-700 text-white font-bold uppercase`;
const Info = tw.div`flex-1 h-6 border rounded-lg p-6 text-lg bg-gray-700 text-white font-bold`;
const AttributeContainer = tw.div`flex items-center h-16 mb-3 flex-wrap`;
const Attribute = tw.span`flex justify-center items-center bg-gray-500 h-3 mx-3 p-3 rounded-xl mb-2`;
const Button = tw.button`flex justify-center items-center mb-2 bg-gray-500 h-3 mx-3 p-3 rounded-xl cursor-pointer text-white border-none hover:bg-blue-500`;

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
        <Preview>
          <Name>{currentPokemon?.name ?? "POKEDEX"}</Name>
          <ImageContainer>
            {currentPokemon && (
              <Image
                src={currentPokemon.imageUrl ?? currentPokemon.fallbackImageUrl}
              />
            )}
          </ImageContainer>
        </Preview>
        <Interface>
          <Search
            value={searchInputValue}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              handleSearchChange(e.target.value)
            }
            placeholder="Enter pokemon name or ID"
          />
          <Info>
            <AttributeContainer>
              Abilities:{" "}
              {currentPokemon?.abilities?.map((ability) => (
                <Attribute key={ability}>{ability}</Attribute>
              ))}
            </AttributeContainer>
            <AttributeContainer>
              Type:{" "}
              {currentPokemon?.types?.map((type) => (
                <Attribute key={type}>{type}</Attribute>
              ))}
            </AttributeContainer>
            <AttributeContainer>
              Evolutions:{" "}
              {evolutionChain?.map((species) => (
                <Button
                  key={species.name}
                  onClick={() => handleSearchChange(species.name)}
                >
                  {species.name}
                </Button>
              ))}
            </AttributeContainer>
          </Info>
        </Interface>
      </Pokedex>
    </Container>
  );
};

export default Main;
