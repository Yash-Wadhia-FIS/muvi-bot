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
import { movieData } from "../../utils/data/data";
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
  id?: string;
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
        {title && (
          <Text fontSize="sm" textAlign="center">
            <Link href={`movieCard/${id}`}>{title}</Link>
          </Text>
        )}

        {isModalOpen && (
          <Modal isOpen={isModalOpen} onClose={closeModal}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader> {title}</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <AspectRatio maxW="500px" m={"2"} ratio={1}>
                  <iframe
                    title={title}
                    src={"https://www.youtube.com/embed/QhBnZ6NPOY"}
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

function MovieDemo() {
  return (
    <Flex flexDir="column">
      <ChakraCarousel>
        <Flex w="fit-content" pos="relative">
          <CarouselItems mx={2}>
            {movieData.map(({ title, img, id, videoSrc }, index) => {
              return (
                <CarouselItem index={index} key={title}>
                  <Box>
                    <Movie title={title} img={img} id={id} videoSrc={videoSrc} />
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

function Carousel() {
  return (
    <Box h="120" w="200" bg="gray.50" borderRadius={8} overflow={"hidden"}>
      <Container>
        
        <MovieDemo />
      </Container>
    </Box>
  );
}

export default Carousel;
