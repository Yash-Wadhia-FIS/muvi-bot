import { FC, useState, useRef, useEffect } from 'react';
import { defaultMessages, defaultUserInfos, MessageModel, UserInfoModel, messageFromClient } from '../helpers';
import { Box, Text, Flex, Avatar } from "@chakra-ui/react";
import Carousel from "../components/carousel/Carousel"


type Props = {
  isDrawer?: boolean;
  innerMessages: Array<any>;
};

const bufferMessages = defaultMessages;

const ChatInner: FC<Props> = ({ isDrawer = false, innerMessages = [] }) => {
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  const [chatUpdateFlag, toggleChatUpdateFlat] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<any>(innerMessages);
  const [userInfos] = useState<UserInfoModel[]>(defaultUserInfos);
  const [youtubeLinks, setYoutubeLinks] = useState<Array<any>>([]);


  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
    setMessages(innerMessages);
    // Extract YouTube links and set the state
    const links = innerMessages.reduce((acc, message) => {
      const extractedLinks = extractYouTubeLinks(message.result?.response || '');
      return [...acc, ...extractedLinks];
    }, [] as string[]);

    setYoutubeLinks(links);
  }, [messages, innerMessages]);

  const sendMessage = () => {
    const newMessage: MessageModel = {
      user: 2,
      type: 'out',
      text: message,
      time: 'Just now',
    };

    bufferMessages.push(newMessage);
    setMessages(bufferMessages);
    toggleChatUpdateFlat(!chatUpdateFlag);
    setMessage('');
    setTimeout(() => {
      bufferMessages.push(messageFromClient);
      setMessages(() => bufferMessages);
      toggleChatUpdateFlat((flag) => !flag);
    }, 1000);
  };

  const onEnterPress = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.keyCode === 13 && e.shiftKey === false) {
      e.preventDefault();
      sendMessage();
    }
  };

  const extractYouTubeLinks = (text: string) => {
    const youtubeRegex = /(https?:\/\/)?(www\.)?(youtube|youtu|youtube-nocookie)\.(com|be)\/\S+/g;
    return text.match(youtubeRegex) || [];
  };

  const renderMessageText = (text: string, bgColor: string) => {
    const youtubeRegex = /(https?:\/\/)?(www\.)?(youtube|youtu|youtube-nocookie)\.(com|be)\/.+/;
    const isLink = youtubeRegex.test(text);
    const links = extractYouTubeLinks(text);

    if (isLink) {
      // If the message contains a link, set link color to blue and rest of the text to white
      return (
        <>
          <Box p={3} maxW="80%" color="white" bg={bgColor}
            borderRadius="lg">{text}</Box>
          <Box mt={2}>
            <Carousel links={links} />
          </Box>
        </>
      );
    } else {
      // If it's plain text, set color to white
      return <Box p={3} maxW="100%" color="white" bg={bgColor}
        borderRadius="lg">
        <Text>{text}</Text>
      </Box>;
    }
  };

  return (
    <Flex
      direction="column"
      p={4}
      id={isDrawer ? 'kt_drawer_chat_messenger_body' : 'kt_chat_messenger_body'}
      h="100%"
    >
      <Box
        ref={messagesContainerRef}
        flex="1"
        overflowY="auto"
        mb={4}
        maxH="75vh"
        pr={!isDrawer ? "5" : "0"}
        sx={{
          "&::-webkit-scrollbar": {
            width: "6px",
          },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "gray.300",
            borderRadius: "3px",
          },
        }}
      >
        {messages?.map((message: any, index: number) => {
          const userInfo = userInfos[message.user];
          const bgColor = message.type === "in" ? `#BF0F70` : `#07C4D9`;
          const contentClass = `${isDrawer ? "" : "d-flex"} justify-content-${message.type === "in" ? "start" : "end"
            } mb-10`;

          return (

            <Flex
              key={`message${index}`}
              direction={message.type === "in" ? "row" : "row-reverse"}
              mb={4}
              alignItems="flex-start"
            >
              {message.type === "in" ? (
                // Code for receiver (message type is "in")
                <Flex direction="column">
                  <Text color="gray.700" fontSize="sm">
                    Bot
                  </Text>
                  {renderMessageText(message.result?.response, bgColor)}
                </Flex>
              ) : (
                // Code for sender (message type is not "in")
                <Flex direction="column">

                  <Text color="gray.700" fontSize="sm">
                    User
                  </Text>
                  {renderMessageText(message.result?.response, bgColor)}
                  {/* Add Carousel for sender messages */}
                </Flex>
              )}
            </Flex>

          );
        })}
      </Box>
    </Flex>
  );
};

export { ChatInner };