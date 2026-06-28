export type Note = {
  id: string;
  title: string;
  content: string;
  tags: string[];
  notebook: string;
  updatedAt: string;
  createdAt: string;
  favorite?: boolean;
  pinned?: boolean;
  archived?: boolean;
};

export type NoteFilter = "all" | "favorites" | "archived";
