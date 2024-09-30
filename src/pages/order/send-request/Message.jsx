import { useState } from "react";
import { DefaultAvatar } from "@/assets/icons";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const sampleMessages = [
  {
    userId: 1,
    text: "Hey, how's everything going?",
    images: [
      "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
      "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
    ],
    photoURL:
      "https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp",
    displayName: "John Doe",
  },
  {
    userId: 1,
    text: "Hey, kemon acho?",
    photoURL:
      "https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp",
    displayName: "John Doe",
  },
  {
    userId: 2,
    text: "I'm doing good, how about you?",
    images: [],
    photoURL:
      "https://img.freepik.com/free-photo/white-offroader-jeep-parking_114579-4007.jpg?uid=R63160567&ga=GA1.1.1996921210.1706246101&semt=ais_hybrid",
    displayName: "Jane Smith",
  },
  {
    userId: 1,
    text: "Great! Check out these pics!",
    images: [
      "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
      "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
      "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
      "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
      "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
      "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
    ],
    photoURL:
      "https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp",
    displayName: "John Doe",
  },
  {
    userId: 2,
    text: "Great! Check out these pics!",
    images: [
      "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
      "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
      "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
      "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
      "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
    ],
    photoURL:
      "https://img.freepik.com/free-photo/white-offroader-jeep-parking_114579-4007.jpg?uid=R63160567&ga=GA1.1.1996921210.1706246101&semt=ais_hybrid",
    displayName: "John Doe",
  },
  {
    userId: 2,
    text: "Wow, these are awesome!",
    images: [],
    photoURL:
      "https://img.freepik.com/free-photo/white-offroader-jeep-parking_114579-4007.jpg?uid=R63160567&ga=GA1.1.1996921210.1706246101&semt=ais_hybrid",
    displayName: "Jane Smith",
  },
];

const Message = ({ messages = sampleMessages, userId = 1 }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const renderImages = (images) => {
    if (images.length <= 4) {
      return images.map((image, index) => (
        <img
          key={index}
          src={image}
          alt={`attachment-${index}`}
          className="w-24 h-24 object-cover rounded-md"
        />
      ));
    } else {
      return (
        <>
          {images.slice(0, 3).map((image, index) => (
            <img
              key={index}
              src={image}
              alt={`attachment-${index}`}
              className="w-24 h-24 object-cover rounded-md"
            />
          ))}
          <div
            className="relative w-24 h-24 bg-gray-300 rounded-md cursor-pointer"
            onClick={() => setSelectedImage(images)}
          >
            <span className="absolute inset-0 flex items-center justify-center text-white font-bold bg-black bg-opacity-50 rounded-md">
              +{images.length - 3}
            </span>
          </div>
        </>
      );
    }
  };

  const renderMessages = () => {
    if (!messages || !Array.isArray(messages)) {
      return <div>No messages to display.</div>;
    }

    return messages.map((msg, index) => {
      const previousMessage = messages[index - 1];
      const isFirstMessageFromUser =
        !previousMessage || previousMessage.userId !== msg.userId;

      const images = msg.images ? msg.images : [];

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
                {msg.images && (
                  <div className="flex gap-2">{renderImages(images)}</div>
                )}
                <p className={`${msg?.images?.length > 0 && "mt-4"}`}>
                  {msg.text}
                </p>
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
                {msg.images && (
                  <div className="flex gap-2">{renderImages(images)}</div>
                )}
                <p className={`${msg?.images?.length > 0 && "mt-4"}`}>
                  {msg.text}
                </p>
              </div>
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div>
      {renderMessages()}

      {selectedImage && (
        <Dialog
          open={!!selectedImage}
          onOpenChange={() => setSelectedImage(null)}
        >
          <DialogTrigger asChild></DialogTrigger>
          <DialogContent className="max-h-[98vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>See all images</DialogTitle>
            </DialogHeader>

            <div className="grid grid-cols-2 gap-4">
              {selectedImage.map((image, index) => (
                <PhotoProvider key={index}>
                  <PhotoView src={image}>
                    <img
                      src={image}
                      className="w-full h-auto object-cover cursor-pointer"
                      alt=""
                    />
                  </PhotoView>
                </PhotoProvider>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
};

export default Message;
