export type DBType = {
  videos: any[];
};

export const db: DBType = {
  videos: [],
};

export const setDB = (dataset: any): void => {
  if (!db.videos) {
    db.videos = [...db.videos, dataset];
    return;
  }

  db.videos.push(dataset);
};

export const clearDB = (): void => {
  db.videos = []
}
