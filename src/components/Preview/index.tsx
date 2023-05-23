import React from "react";
import tw from "twin.macro";
import styled from "@emotion/styled";
import pokeball from "../../pokeball.png";

const Container = tw.section`flex-1 bg-red-400 overflow-hidden p-8 rounded-xl`;
const Name = tw.h2`uppercase text-4xl text-white mb-6`;
const ImageContainer = tw.div`flex-1 h-auto bg-gray-700 rounded-xl flex justify-center items-center`;
const Image = styled.img<{ isLoading?: boolean }>`
  ${tw`w-full h-full object-contain`}
  ${({ isLoading }) => (isLoading ? tw`animate-bounce h-56 w-56` : tw``)}
`;

interface PreviewProps {
  name: string;
  images: {
    url: string;
    fallbackUrl: string;
  };
  isLoading: boolean;
}

const Preview: React.FC<PreviewProps> = ({ name, images, isLoading }) => {
  return (
    <Container>
      <Name>{name ?? "POKEDEX"}</Name>
      <ImageContainer>
        {!isLoading && (images.url || images.fallbackUrl) && (
          <Image src={images.url ?? images.fallbackUrl} />
        )}
        {(isLoading || (!images.url && !images.fallbackUrl)) && (
          <Image src={pokeball} isLoading />
        )}
      </ImageContainer>
    </Container>
  );
};

export default Preview;
