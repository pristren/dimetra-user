import { Attach, DefaultAvatar, Send } from "@/assets/icons";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
// import { useParams } from "react-router-dom";

const Message = () => {
  //   const { id } = useParams();
  const userId = 1;
  const message = [
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
      displayName: "rafi",
      userId: 1,
      photoURL: "",
    },
  ];

  const renderMessages = () => {
    return message.map((msg, index) => {
      const previousMessage = message[index - 1];
      const isFirstMessageFromUser =
        !previousMessage || previousMessage.userId !== msg.userId;

      return (
        <div key={index}>
          {msg.userId === userId ? (
            <div className="flex flex-row-reverse items-center justify-start gap-2 my-2">
              {isFirstMessageFromUser && msg.photoURL ? (
                <img
                  src={msg.photoURL}
                  className="w-10 h-10 rounded-full"
                  alt={msg.displayName}
                />
              ) : isFirstMessageFromUser ? (
                <DefaultAvatar className="w-10 h-10 rounded-full" />
              ) : null}
              <p
                className={`bg-[#6B93A7] text-white px-3 py-1 rounded-xl ${
                  !isFirstMessageFromUser && "mr-12"
                }`}
              >
                {msg.text}
              </p>
            </div>
          ) : (
            <div className="flex items-center justify-start gap-2 my-2">
              {isFirstMessageFromUser && (
                <img
                  src={msg.photoURL}
                  className="w-10 h-10 rounded-full"
                  alt={msg.displayName}
                />
              )}
              <p
                className={`bg-[#F9FCFF] text-black px-3 py-1 rounded-xl ${
                  !isFirstMessageFromUser && "ml-12"
                }`}
              >
                {msg.text}
              </p>
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div className="relative">
      <h6>Order #123456</h6>
      <div className="bg-white border border-gray-200 rounded-md mt-3 min-h-[78vh]">
        <div className="flex items-center justify-start gap-3 border-b border-gray-300 px-4 py-4">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREoRGyXmHy_6aIgXYqWHdOT3KjfmnuSyxypw&s"
            className="w-10 h-10 rounded-full"
            alt="profile"
          />
          <div>
            <p className="highlight">Mohammad Rafi</p>
            <div className="flex items-center justify-start gap-2">
              <p className="bg-green-600 w-2 h-2 rounded-full"></p>
              <p>Online</p>
            </div>
          </div>
        </div>

        <div className="px-4 py-4 h-[57vh] overflow-y-auto hide-scrollbar">
          {renderMessages()}
        </div>

        <div className="flex items-center justify-center gap-3 w-full px-4 mt-auto bottom-3 absolute bg-white">
          <div>
            <Label htmlFor="image">
              <Attach />
            </Label>
            <Input type="file" id="image" className="hidden" />
          </div>
          <div className="relative w-full border border-gray-200 rounded-md">
            <Input
              className="w-[95%] border-none"
              placeholder="Type a message"
            />
            <Send className="absolute right-3 top-1/2 -translate-y-1/2" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
