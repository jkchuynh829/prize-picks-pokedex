import React from "react";
import tw from "twin.macro";

const Container = tw.section`flex-1 bg-red-400 overflow-hidden p-8 rounded-xl`;
const Name = tw.h2`uppercase text-4xl text-white mb-6`;
const ImageContainer = tw.div`flex-1 h-full bg-gray-700 rounded-xl`;
const Image = tw.img`w-full h-full object-contain`;

interface PreviewProps {
  name: string;
  images: {
    url: string;
    fallbackUrl: string;
  };
}

const Preview: React.FC<PreviewProps> = ({ name, images }) => {
  return (
    <Container>
      <Name>{name ?? "POKEDEX"}</Name>
      <ImageContainer>
        {(images.url || images.fallbackUrl) && (
          <Image src={images.url ?? images.fallbackUrl} />
        )}
      </ImageContainer>
    </Container>
  );
};

export default Preview;
