import React from "react";
import tw from "twin.macro";
import useSearch from "../../hooks/useSearch";

const Section = tw.section`flex-1 bg-red-400 overflow-hidden p-8 rounded-xl`;
const Interface = tw(Section)`flex flex-col relative p-6 gap-6`;
const Search = tw.input`flex-1 h-6 max-h-6 border outline-none border-none rounded-lg p-6 text-xl bg-gray-700 text-white font-bold uppercase`;
const Info = tw.div`flex-1 h-6 border rounded-lg p-6 text-lg bg-gray-700 text-white font-bold`;
const AttributeContainer = tw.div`flex items-center h-16 mb-3 flex-wrap`;
const Attribute = tw.span`flex justify-center items-center bg-gray-500 h-3 mx-3 p-3 rounded-xl mb-2`;
const Button = tw.button`flex justify-center items-center mb-2 bg-gray-500 h-3 mx-3 p-3 rounded-xl cursor-pointer text-white border-none hover:bg-blue-500`;

interface DetailsProps {
  searchInputValue: string;
  handleSearchChange: (value: string) => void;
  abilities?: string[];
  types?: string[];
  evolutionChain?: any[];
}

const Details: React.FC<DetailsProps> = ({
  searchInputValue,
  handleSearchChange,
  abilities,
  types,
  evolutionChain,
}) => {
  const { recentSearches } = useSearch();
  console.log("recentSearches", recentSearches);
  return (
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
          {abilities?.map((ability) => (
            <Attribute key={ability}>{ability}</Attribute>
          ))}
        </AttributeContainer>
        <AttributeContainer>
          Type:{" "}
          {types?.map((type) => (
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
        <AttributeContainer>
          Recent searches:{" "}
          {recentSearches?.map((pokemon) => (
            <Button key={pokemon} onClick={() => handleSearchChange(pokemon)}>
              {pokemon}
            </Button>
          ))}
        </AttributeContainer>
      </Info>
    </Interface>
  );
};

export default Details;
