import fs from "node:fs/promises";
import path from "node:path";

const PATH = path.join("public", "albums");

function cleanFiles(files) {
  const badFiles = [".DS_Store"];
  return files.filter((i) => badFiles.indexOf(i) === -1);
}

const filterPhotos = (name) => name.includes(".jpg") || name.includes(".png");

async function getParams(folder) {
  const fname = path.join(PATH, folder, "params.json");
  const json = await fs.readFile(fname);
  return JSON.parse(json);
}

async function getPhotos(folder) {
  const fname = path.join(PATH, folder);
  let names;
  names = await fs.readdir(fname);
  names = names.filter(filterPhotos);
  names = names.map((name) =>
    encodeURI(path.join(fname, name)).replace("public", "")
  );
  return names;
}

export async function getAlbums() {
  const folders = cleanFiles(await fs.readdir(PATH));

  const albums = [];
  for (let folder of folders) {
    const params = await getParams(folder);
    const album = { ...params };

    album.id = folder;
    album.photos = await getPhotos(folder);
    album.cover = album.photos.find((i) => i.includes("~")) || album.photos[0];
  }
  return albums;
}
