import { getCollection } from "astro:content";

export default async function getAlbums() {
  const albumData = await getCollection("albums");
  const allPhotos = Object.keys(
    import.meta.glob(`../content/albums/**/*.{jpg,jpeg,png}`)
  );

  const albums = albumData.map((album) => {
    const slug = album.id.split("/")[0];

    const photos = allPhotos
      .filter((photo) => {
        const directoryArray = photo.split("/");
        const directory = directoryArray[directoryArray.length - 2];
        return slug === directory;
      })
      .map((loc) => loc.replace("..", "src"));

    const cover =
      photos.find((photo) => {
        const directoryArray = photo.split("/");
        const filename = directoryArray[directoryArray.length - 1];
        return filename[0] === "~";
      }) || photos[0];

    return { ...album, slug, photos, cover };
  });

  return albums;
}
