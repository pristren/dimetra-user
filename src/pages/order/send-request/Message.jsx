import { useState } from "react";
import { Attach, DefaultAvatar, Send } from "@/assets/icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const Message = () => {
  const userId = 1;
  const [messages, setMessages] = useState([
    {
      text: "nothing new",
      image:
        "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
      displayName: "rami",
      userId: 2,
      photoURL:
        "https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp",
    },
    {
      text: "another message",
      image:
        "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
      displayName: "rami",
      userId: 2,
      photoURL:
        "https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp",
    },
    {
      text: "nothing",
      image:
        "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
      displayName: "rafi",
      userId: 1,
      photoURL: "",
    },
    {
      text: "next message",
      image:
        "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
      displayName: "rafi",
      userId: 1,
      photoURL: "",
    },
    {
      text: "next message",
      image:
        "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
      displayName: "rafi",
      userId: 1,
      photoURL: "",
    },
    {
      text: "next message",
      image:
        "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
      displayName: "rafi",
      userId: 1,
      photoURL: "",
    },
    {
      text: "next message",
      image:
        "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
      displayName: "rafi",
      userId: 1,
      photoURL: "",
    },
    {
      text: "next message",
      image:
        "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
      file: "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
      displayName: "rafi",
      userId: 2,
      photoURL:
        "https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp",
    },
    {
      text: "next message",
      image:
        "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
      displayName: "rafi",
      userId: 2,
      photoURL:
        "https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp",
    },
    {
      text: "next message. Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum, voluptatibus?",
      image:
        "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
      file: "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
      displayName: "rafi",
      userId: 1,
      photoURL: "",
    },
    {
      image:
        "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
      file: "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
      displayName: "rafi",
      userId: 1,
      photoURL: "",
    },
    {
      text: "next message",
      image:
        "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
      displayName: "rafi",
      userId: 1,
      photoURL: "",
    },
    {
      text: "next message",
      image:
        "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
      displayName: "rafi",
      userId: 1,
      photoURL: "",
    },
    {
      text: "next message",
      image:
        "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
      displayName: "rafi",
      userId: 1,
      photoURL: "",
    },
    {
      text: "next message",
      image:
        "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
      displayName: "rafi",
      userId: 1,
      photoURL: "",
    },
  ]);
  const [selectedImage, setSelectedImage] = useState(null);

  const renderMessages = () => {
    return messages.map((msg, index) => {
      const previousMessage = messages[index - 1];
      const isFirstMessageFromUser =
        !previousMessage || previousMessage.userId !== msg.userId;

      return (
        <div key={index}>
          {msg.userId === userId ? (
            <div className="flex flex-row-reverse items-start justify-start gap-2 my-2">
              {isFirstMessageFromUser && msg.photoURL ? (
                <img
                  src={msg.photoURL}
                  className="w-10 h-10 rounded-full"
                  alt={msg.displayName}
                />
              ) : isFirstMessageFromUser ? (
                <DefaultAvatar className="w-10 h-10 rounded-full" />
              ) : null}
              <div
                className={`bg-[#6B93A7] text-white ${
                  msg.file ? "p-3 max-w-52" : "px-3 py-1"
                } rounded-xl ${!isFirstMessageFromUser && "mr-12"}`}
              >
                {msg.file && (
                  <img
                    src={msg.image}
                    alt="attachment"
                    className="w-full rounded-md max-w-44 h-full object-cover"
                  />
                )}
                <p className={`${msg.file && "mt-4"}`}>{msg.text}</p>
              </div>
            </div>
          ) : (
            <div className="flex items-start justify-start gap-2 my-2">
              {isFirstMessageFromUser && (
                <img
                  src={msg.photoURL}
                  className="w-10 h-10 rounded-full"
                  alt={msg.displayName}
                />
              )}
              <div
                className={`bg-secondary text-black ${
                  msg.file ? "p-3 max-w-52" : "px-3 py-1"
                } rounded-xl ${!isFirstMessageFromUser && "ml-12"}`}
              >
                {msg.file && (
                  <img
                    src={msg.image}
                    alt="attachment"
                    className="w-full rounded-md max-w-44 h-full object-cover"
                  />
                )}
                <p className={`${msg.file && "mt-4"}`}>{msg.text}</p>
              </div>
            </div>
          )}
        </div>
      );
    });
  };

  const handleSendMessage = (text) => {
    const newMessage = {
      text,
      userId: userId,
      image: selectedImage ? URL.createObjectURL(selectedImage) : null,
    };

    setMessages((prevMessages) => [...prevMessages, newMessage]);
    setSelectedImage(null);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  return (
    <div className="relative">
      <h4>Order #123456</h4>
      <div className="bg-white border border-gray-200 rounded-md mt-3 h-[calc(100vh-10rem)]">
        <div className="flex items-center justify-start gap-3 border-b border-gray-300 px-4 py-4">
          <DefaultAvatar className="w-10 h-10 rounded-full" />
          <div>
            <p className="font-medium">Customer Support</p>
            {/* <div className="flex items-center justify-start gap-2">
              <p className="bg-green-600 w-2 h-2 rounded-full"></p>
              <p className="text-sm">Online</p>
            </div> */}
          </div>
        </div>

        <div className="px-4 py-4 h-[calc(100vh-20rem)] overflow-y-auto hide-scrollbar">
          {renderMessages()}
        </div>
        {selectedImage && (
          <div className="mb-4 ml-5">
            <img
              src={URL.createObjectURL(selectedImage)}
              alt="preview"
              className="w-24 h-24 object-cover"
            />
          </div>
        )}
        <div className="flex items-center justify-center gap-3 w-full px-4 mt-auto bg-white  pt-3">
          <div>
            <Label htmlFor="image" className="cursor-pointer">
              <Attach />
            </Label>
            <Input
              type="file"
              id="image"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>

          <div className="relative w-full border border-gray-200 rounded-md">
            <Input
              className="w-[95%] border-none"
              placeholder="Type a message"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSendMessage(e.target.value);
                  e.target.value = "";
                }
              }}
            />
            <Send className="absolute right-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
