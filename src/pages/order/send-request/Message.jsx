import { useState } from "react";
import { Attach, DefaultAvatar, Send } from "@/assets/icons";
import { PhotoProvider, PhotoView } from "react-photo-view";
import "react-photo-view/dist/react-photo-view.css";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from "lucide-react";
import { useParams } from "react-router-dom";
import { t } from "i18next";

const sampleMessages = [
  {
    userId: 1,
    text: "Hey, how's everything going?",
    images: [
      "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
      "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
    ],
    userPhotoURL:
      "https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp",
    displayName: "John Doe",
  },
  {
    userId: 1,
    text: "Hey, how's everything going?",
    images: [
      "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
    ],
    userPhotoURL:
      "https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp",
    displayName: "John Doe",
  },
  {
    userId: 1,
    text: "Hey, kemon acho?",
    userPhotoURL:
      "https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp",
    displayName: "John Doe",
  },
  {
    userId: 1,
    text: "Hey, kemon acho? Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero doloribus est iusto ea nihil, odit quod ullam ut culpa odio?",
    userPhotoURL:
      "https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp",
    displayName: "John Doe",
  },
  {
    userId: 2,
    text: "I'm doing good, how about you?  Lorem ipsum dolor sit amet consectetur adipisicing elit. Vero doloribus est iusto ea nihil, odit quod ullam ut culpa odio?",
    images: [],
    userPhotoURL:
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
    userPhotoURL:
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
    userPhotoURL:
      "https://img.freepik.com/free-photo/white-offroader-jeep-parking_114579-4007.jpg?uid=R63160567&ga=GA1.1.1996921210.1706246101&semt=ais_hybrid",
    displayName: "John Doe",
  },
  {
    userId: 2,
    text: "Great! Check out these pics!",
    images: [
      "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8aW1hZ2V8ZW58MHx8MHx8fDA%3D",
    ],
    userPhotoURL:
      "https://img.freepik.com/free-photo/white-offroader-jeep-parking_114579-4007.jpg?uid=R63160567&ga=GA1.1.1996921210.1706246101&semt=ais_hybrid",
    displayName: "John Doe",
  },
  {
    userId: 2,
    text: "Wow, these are awesome!",
    images: [],
    userPhotoURL:
      "https://img.freepik.com/free-photo/white-offroader-jeep-parking_114579-4007.jpg?uid=R63160567&ga=GA1.1.1996921210.1706246101&semt=ais_hybrid",
    displayName: "Jane Smith",
  },
  {
    userId: 2,
    text: "Wow, these are awesome!",
    images: [],
    userPhotoURL:
      "https://img.freepik.com/free-photo/white-offroader-jeep-parking_114579-4007.jpg?uid=R63160567&ga=GA1.1.1996921210.1706246101&semt=ais_hybrid",
    displayName: "Jane Smith",
  },
];

const Message = ({ messages = sampleMessages, userId = 1 }) => {
  const [imagesToShowInModal, setImagesToShowInModal] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);
  const { id } = useParams();

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const imagesArray = files.map((file) => URL.createObjectURL(file));
    setSelectedImages((prevImages) => [...prevImages, ...imagesArray]);
  };
  const handleRemoveImage = (index) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };
  const renderImages = (images) => {
    if (images.length <= 4) {
      return images.map((image, index) => (
        <PhotoProvider key={index}>
          <PhotoView src={image}>
            <img
              key={index}
              src={image}
              alt={`attachment-${index}`}
              className={`${
                images?.length > 1 ? "w-20 lg:w-24 h-20 lg:h-24" : "col-span-2"
              }  object-cover rounded-md cursor-pointer`}
            />
          </PhotoView>
        </PhotoProvider>
      ));
    } else {
      return (
        <>
          {images.slice(0, 3).map((image, index) => (
            <PhotoProvider key={index}>
              <PhotoView src={image}>
                <img
                  key={index}
                  src={image}
                  alt={`attachment-${index}`}
                  className="w-20 lg:w-24 h-20 lg:h-24 object-cover rounded-md cursor-pointer"
                />
              </PhotoView>
            </PhotoProvider>
          ))}
          <div
            className="relative w-20 lg:w-24 h-20 lg:h-24 bg-gray-300 rounded-md cursor-pointer"
            onClick={() => setImagesToShowInModal(images)}
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
      return <div>No messages yet.</div>;
    }

    return messages.map((msg, index) => {
      const previousMessage = messages[index - 1];
      const isFirstMessageFromUser =
        !previousMessage || previousMessage.userId !== msg.userId;

      const images = msg.images ? msg.images : [];

      return (
        <div key={index}>
          {msg.userId === userId ? (
            <div
              className={`flex flex-row-reverse items-start justify-start gap-2 my-2 max-w-full md:max-w-[60%] ms-auto ${
                isFirstMessageFromUser && "mt-8"
              }`}
            >
              {isFirstMessageFromUser && msg.userPhotoURL ? (
                <img
                  src={msg.userPhotoURL}
                  className="w-10 h-10 rounded-full"
                  alt={msg.displayName}
                />
              ) : isFirstMessageFromUser ? (
                <DefaultAvatar className="w-10 h-10 rounded-full" />
              ) : null}
              <div
                className={`bg-[#6B93A7] text-white ${
                  msg.images ? "p-3 max-w-48 lg:max-w-56" : "px-3 py-1"
                } rounded-xl ${!isFirstMessageFromUser && "mr-12"}`}
              >
                {msg.images && (
                  <div className="grid grid-cols-2 gap-2">
                    {renderImages(images)}
                  </div>
                )}
                <p
                  className={`${
                    msg?.images?.length > 0 && "mt-4"
                  } text-xs lg:text-[16px] lg:leading-6`}
                >
                  {msg.text}
                </p>
              </div>
            </div>
          ) : (
            <div
              className={`flex items-start justify-start gap-2 my-2 max-w-full md:max-w-[60%] ${
                isFirstMessageFromUser && "mt-8"
              }`}
            >
              {isFirstMessageFromUser && msg.userPhotoURL ? (
                <img
                  src={msg.userPhotoURL}
                  className="w-10 h-10 rounded-full"
                  alt={msg.displayName}
                />
              ) : isFirstMessageFromUser ? (
                <DefaultAvatar className="w-10 h-10 rounded-full" />
              ) : null}
              <div
                className={`bg-secondary text-black ${
                  msg.images?.length ? "p-3 max-w-48 lg:max-w-56" : "px-3 py-1"
                } rounded-xl ${!isFirstMessageFromUser && "ml-12"}`}
              >
                {msg.images?.length ? (
                  <div className="grid grid-cols-2 gap-2">
                    {renderImages(images)}
                  </div>
                ) : null}
                <p
                  className={`${
                    msg?.images?.length > 0 && "mt-4"
                  } text-xs lg:text-[16px] lg:leading-6`}
                >
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
    <div className="relative">
      <h4>
        {t("order")}
        <span className="text-primary"> #{id.slice(-8)}</span>
      </h4>
      <div className="bg-white border border-gray-200 rounded-md mt-3 h-[calc(100vh-10.5rem)]">
        <div className="flex items-center justify-start gap-3 border-b border-gray-300 px-4 py-4">
          <DefaultAvatar className="w-10 h-10 rounded-full" />
          <div>
            <h6>{t("customer_support")}</h6>
            <div className="flex items-center justify-start gap-2 mt-1">
              <p className="bg-green-600 w-2 h-2 rounded-full"></p>
              <p className="text-sm">Online</p>
            </div>
          </div>
        </div>

        <div className="px-4 pt-4 h-[calc(100vh-20rem)] overflow-y-auto hide-scrollbar relative w-full pb-0">
          {renderMessages()}
          {selectedImages.length > 0 ? (
            <div className="flex flex-wrap gap-2 lg:gap-4 mt-4 px-10 sticky bottom-0 max-h-48 overflow-y-auto  pt-4  bg-white">
              {selectedImages.map((image, index) => (
                <div key={index} className="relative">
                  <img
                    src={image}
                    alt={`Selected ${index}`}
                    className="w-12 lg:w-24 h-12 lg:h-24 rounded-md object-cover"
                  />
                  <X
                    className="absolute -top-2 lg:-top-3 -right-2 lg:-right-3 p-1 size-5 lg:size-7 bg-white border rounded-full cursor-pointer"
                    onClick={() => handleRemoveImage(index)}
                  />
                </div>
              ))}
            </div>
          ) : null}
        </div>

        {imagesToShowInModal && (
          <Dialog
            open={!!imagesToShowInModal}
            onOpenChange={() => setImagesToShowInModal(null)}
          >
            <DialogTrigger asChild></DialogTrigger>
            <DialogContent className="max-h-[98vh] w-[90%] max-w-md overflow-y-auto">
              <DialogHeader>
                <DialogTitle>See all images</DialogTitle>
              </DialogHeader>

              <div className="grid grid-cols-2 gap-4">
                {imagesToShowInModal.map((image, index) => (
                  <PhotoProvider key={index}>
                    <PhotoView src={image}>
                      <img
                        src={image}
                        className="w-full h-auto object-cover cursor-pointer rounded-lg"
                        alt=""
                      />
                    </PhotoView>
                  </PhotoProvider>
                ))}
              </div>
            </DialogContent>
          </Dialog>
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
              multiple
              onChange={handleImageChange}
            />
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
