import { FC, useState, useRef, useEffect } from 'react';
import { defaultMessages, defaultUserInfos, MessageModel, UserInfoModel, messageFromClient } from '../helpers';
import { Box, Text, Flex, Avatar } from "@chakra-ui/react";

type Props = {
  isDrawer?: boolean;
};

const bufferMessages = defaultMessages;

const ChatInner: FC<Props> = ({ isDrawer = false }) => {
    const messagesContainerRef = useRef<HTMLDivElement>(null);

  const [chatUpdateFlag, toggleChatUpdateFlat] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [messages, setMessages] = useState<MessageModel[]>(bufferMessages);
  const [userInfos] = useState<UserInfoModel[]>(defaultUserInfos);

  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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

  const renderMessageText = (text: string, bgColor: string) => {
    const linkRegex = /<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1>/gi;
    const isLink = linkRegex.test(text);

    if (isLink) {
      // If the message contains a link, set link color to blue and rest of the text to white
      return (
        <Box
          p={3}
          borderRadius="lg"
          bg={bgColor}
          fontWeight="bold"
          maxW="80%"
          dangerouslySetInnerHTML={{ __html: text }}
          color="blue.100"
        />
      );
    } else {
      // If it's plain text, set color to white
      return <Box p={3} maxW="80%" color="white" bg={bgColor} 
      borderRadius="lg">{text}</Box>;
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
        {messages.map((message, index) => {
          const userInfo = userInfos[message.user];
          const bgColor = message.type === "in" ? `#BF0F70` : `#07C4D9`;
          const contentClass = `${isDrawer ? "" : "d-flex"} justify-content-${
            message.type === "in" ? "start" : "end"
          } mb-10`;

          return (
            <Flex
              key={`message${index}`}
              direction={message.type === "in" ? "row" : "row-reverse"}
              mb={4}
              alignItems="flex-start"
            >
              {/* <Avatar
                src={toAbsoluteUrl(`/media/${userInfo.avatar}`)}
                size="sm"
                me={3}
              /> */}
              <Flex direction="column">
                <Text color="gray.700" fontSize="sm">
                  {userInfo.name} • {message.time}
                </Text>
                {renderMessageText(message.text, bgColor)}
              </Flex>
            </Flex>
          );
        })}
      </Box>
      </Flex>
  );
};

export { ChatInner };
