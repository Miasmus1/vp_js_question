// Please update this type as same as with the data shape.

type List = {
  id: string;
  name: string;
  files: {
    id: string;
    name: string;
  }[];
}[];

export default function move(list: List, source: string, destination: string): List {
  const destinationFolder = list.filter((folder) => folder.id === destination)[0];

  if (!destinationFolder) {
    throw new Error('You cannot specify a file as the destination');
  }

  const sourceFile = list.reduce((acc: { id: string; name: string } | null, folder) => {
    const fileIndex = folder.files.findIndex((file) => file.id === source);

    if (fileIndex !== -1) {
      return folder.files.splice(fileIndex, 1)[0];
    }
    return acc;
  }, null);

  if (!sourceFile) {
    throw new Error('You cannot move a folder');
  }

  destinationFolder.files.push(sourceFile);
  return list;
}
