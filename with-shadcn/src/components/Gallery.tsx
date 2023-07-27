import { MouseEvent, useState } from "react";

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
    setModalIndex((prev) => (prev = images.length - 1 ? 0 : prev + 1));
  }

  function moveLeft() {
    setModalIndex((prev) => (prev = 0 ? images.length - 1 : prev - 1));
  }

  return (
    <>
      <div id="gallery" className="flex flex-col gap-4">
        {images.map((image, i) => (
          <button onClick={() => openImage(i)}>
            <img className="" src={image} alt={name} />
          </button>
        ))}
      </div>

      {modalOpen && (
        <button
          id="lightbox"
          className="fixed top-0 right-0 left-0 bottom-0 z-50 bg-gray-600/90 flex items-center justify-center"
          onClick={stopPrevent}
        >
          <img
            className="object-contain h-full w-auto"
            src={images[modalIndex]}
            alt={name}
            onClick={stopPrevent}
            onKeyDown={stopPrevent}
          />

          <button
            id="move-right"
            className="fixed right-0 sm:bg-slate-50/30 text-slate-50 h-full sm:h-1/3 sm:w-16 w-32"
            onClick={(e) => {
              e.stopPropagation();
              moveRight();
            }}
          >
            <i className="fa-solid fa-chevron-right text-lg hidden sm:block" />
          </button>

          <button
            id="move-left"
            className="fixed left-0 sm:bg-slate-50/30 text-slate-50 h-full sm:h-1/3 sm:w-16 w-32"
            onClick={(e) => {
              e.stopPropagation();
              moveLeft();
            }}
          >
            <i className="fa-solid fa-chevron-left text-lg hidden sm:block" />
          </button>

          <button
            id="close-modal"
            onClick={(e) => {
              e.stopPropagation();
              closeModal();
            }}
            className="fixed top-0 right-0 "
          >
            <i className="fa-solid fa-x m-4 text-slate-50 text-lg" />
          </button>
        </button>
      )}
    </>
  );
}
