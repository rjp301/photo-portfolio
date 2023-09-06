import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Image } from "astro:assets";

export type Props = {
  images: [];
  name: string;
};

export default function Gallery(props: Props) {
  const { images, name } = props;

  const windowKey = (e: KeyboardEvent) => {
    switch (e.key) {
      case "Escape":
        closeModal();
        break;

      case "ArrowRight":
        moveRight();
        break;

      case "ArrowLeft":
        moveLeft();
        break;

      default:
        console.log(e.key);
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", windowKey);
    return () => window.removeEventListener("keydown", windowKey);
  }, []);

  const [modalOpen, setModalOpen] = useState(false);
  const [modalIndex, setModalIndex] = useState(0);

  function stopPrevent(event: any) {
    event.preventDefault();
    event.stopPropagation();
  }

  function openImage(index: number) {
    setModalOpen(true);
    setModalIndex(index);
  }

  function closeModal() {
    setModalOpen(false);
  }

  function moveRight() {
    setModalIndex((prev) => (prev = prev === images.length - 1 ? 0 : prev + 1));
  }

  function moveLeft() {
    setModalIndex((prev) => (prev = prev === 0 ? images.length - 1 : prev - 1));
  }

  return (
    <>
      <div id="gallery" className="flex flex-col gap-4">
        {images.map((image, i) => (
          <button key={i} onClick={() => openImage(i)}>
            <img src={image} alt={name} />
          </button>
        ))}
      </div>

      {modalOpen && (
        <div
          className="fixed top-0 right-0 left-0 bottom-0 z-50 bg-gray-600/90 flex items-center justify-center"
          onClick={(e) => {
            closeModal();
          }}
        >
          <img
            className="object-contain h-full w-auto"
            src={images[modalIndex]}
            alt={name}
            onClick={stopPrevent}
            onKeyDown={stopPrevent}
          />

          <Button
            variant="ghost"
            className="fixed right-0 text-muted hover:bg-muted/30 hover:text-background h-full sm:h-1/3 sm:w-16 w-32 rounded-r-none"
            onClick={(e) => {
              moveRight();
              stopPrevent(e);
            }}
          >
            <i className="fa-solid fa-chevron-right text-lg hidden sm:block" />
          </Button>

          <Button
            variant="ghost"
            className="fixed left-0 text-muted hover:bg-muted/30 hover:text-background h-full sm:h-1/3 sm:w-16 w-32 rounded-l-none"
            onClick={(e) => {
              e.stopPropagation();
              moveLeft();
            }}
          >
            <i className="fa-solid fa-chevron-left text-lg hidden sm:block" />
          </Button>

          <Button
            onClick={(e) => {
              stopPrevent(e);
              closeModal();
            }}
            variant="ghost"
            size="icon"
            className="text-muted hover:bg-muted/30 hover:text-background fixed top-0 right-0 mt-4 mr-4"
          >
            <i className="fa-solid fa-x text-lg" />
          </Button>
        </div>
      )}
    </>
  );
}
