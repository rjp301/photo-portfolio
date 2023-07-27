import fs from "node:fs/promises";
import path from "node:path";

const PATH = path.join("public", "albums");

type Params = {
  name: string;
  description: string;
};

type Album = Params & {
  id: string;
  photos: string[];
  cover: string;
};

function cleanFiles(files: string[]): string[] {
  const badFiles = [".DS_Store"];
  return files.filter((i) => badFiles.indexOf(i) === -1);
}

const filterPhotos = (name: string): boolean =>
  name.includes(".jpg") || name.includes(".png");

async function getParams(folder: string): Promise<Params> {
  const fname = path.join(PATH, folder, "params.json");
  const json = (await fs.readFile(fname)).toString();
  return JSON.parse(json) as Params;
}

async function getPhotos(folder: string): Promise<string[]> {
  const fname = path.join(PATH, folder);
  let names;
  names = await fs.readdir(fname);
  names = names.filter(filterPhotos);
  names = names.map((name) =>
    encodeURI(path.join(fname, name)).replace("public", "")
  );
  return names;
}

async function getAlbum(folder: string): Promise<Album> {
  const params = await getParams(folder);
  const photos = await getPhotos(folder);
  const album = {
    ...params,
    id: folder,
    photos: photos,
    cover: photos.find((i) => i.includes("~")) || photos[0],
  };
  return album;
}

export async function getAlbums() {
  const folders = cleanFiles(await fs.readdir(PATH));
  return Promise.all(folders.map(getAlbum));
}
