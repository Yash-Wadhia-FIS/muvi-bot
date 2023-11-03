import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Stack,
  Text,
  VStack,
  Image,
  ModalOverlay,
  Modal,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  AspectRatio,
  Center
} from "@chakra-ui/react";
import {
  Carousel as ChakraCarousel,
  CarouselItem,
  useCarouselItem,
  CarouselItems,
  useCarousel,
} from "chakra-framer-carousel";
import { ChevronLeft, ChevronRight } from "react-feather";
import Link from 'next/link';

const TestimonialHeading: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <Heading as={"h4"} fontSize={"sm"}>

      {children}
    </Heading>
  );
}

function Movie({
  bg,
  title,
  img,
  id,
  videoSrc,
}: {
  id?: string | null;
  bg?: string;
  title?: string;
  img: string;
  videoSrc: string;
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  console.log('video src', videoSrc);

  return (
    <Flex
      w="220px"
      h="100px"
      pos="relative"
      boxShadow="lg"
      align="center"
      as="button"
      onClick={openModal}
      bg={bg}
      rounded="xl"
      justify="center"
    >
      <VStack spacing={2}>
        <Box mt="1.5" mb="1.5">
          <Image
            src={img}
            alt="image"
            boxSize="100px"
            objectFit="cover"
            onClick={openModal}
          />
        </Box>

        {isModalOpen && (
          <Modal isOpen={isModalOpen} onClose={closeModal}>
            <ModalOverlay />
            <ModalContent>
              <ModalCloseButton />
              <ModalBody>
                <AspectRatio maxW="500px" m={"2"} ratio={1}>
                  <iframe
                    src={videoSrc}
                    allowFullScreen
                  />
                </AspectRatio>
              </ModalBody>
            </ModalContent>
          </Modal>
        )}
      </VStack>
    </Flex>
  );
}

function Arrow({ isLeft }: { isLeft: boolean }) {
  const { onNext, onPrevious } = useCarousel();
  const onClickHandler = () => {
    if (isLeft) {
      onPrevious();
    } else {
      onNext();
    }
  };
  const pos = isLeft ? { left: "10px" } : { right: "10px" };

  return (
    <Flex pos="absolute" {...pos} top="35%">
      <Button size="sm" variant="solid" onClick={onClickHandler}>
        {isLeft ? <ChevronLeft /> : <ChevronRight />}
      </Button>
    </Flex>
  );
}

const extractVideoId = (link: string) => {
  const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
  const match = link.match(regex);
  return match && match[1];
};

function MovieDemo({links} : {links: Array<string>}) {

  return (
    <Flex flexDir="column">
      <ChakraCarousel>
        <Flex w="fit-content" pos="relative">
          <CarouselItems mx={2}>
            {links.map((link, index) => {
              const videoId = extractVideoId(link);
              let thumbnailUrl: string = '';
              if (videoId) {
                thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
              }
              return (
                <CarouselItem index={index} key={videoId}>
                  <Box>
                    <Movie img={thumbnailUrl} id={videoId} videoSrc={link} />
                  </Box>
                </CarouselItem>
              );
            })}
          </CarouselItems>
          <Arrow isLeft />
          <Arrow isLeft={false} />
        </Flex>
      </ChakraCarousel>
    </Flex>
  );
}

function Carousel({links} : {links: Array<string>}) {
  return (
    <Box h="120" w="200" bg="gray.50" borderRadius={8} overflow={"hidden"}>
      <Container>
        <MovieDemo links={links} />
      </Container>
    </Box>
  );
}

export default Carousel;
