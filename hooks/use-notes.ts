"use client";

import { useEffect, useMemo, useState } from "react";
import { useAppPreferences } from "@/contexts/app-preferences";
import { sortNotes, stripHtml } from "@/lib/format";
import { readStorage, writeStorage } from "@/lib/storage";
import { Note, NoteFilter } from "@/lib/types";

const NOTES_KEY = "noteflow-notes";
const ACTIVE_ID_KEY = "noteflow-active-id";

export function useNotes() {
  const { t } = useAppPreferences();
  const [notes, setNotes] = useState<Note[]>(() => readStorage(NOTES_KEY, []));
  const [activeId, setActiveId] = useState<string>(() => readStorage(ACTIVE_ID_KEY, ""));
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<NoteFilter>("all");
  const [notebook, setNotebook] = useState<string>("all");

  useEffect(() => {
    writeStorage(NOTES_KEY, notes);
  }, [notes]);

  useEffect(() => {
    writeStorage(ACTIVE_ID_KEY, activeId);
  }, [activeId]);

  const activeNote = useMemo(() => {
    const note = notes.find((n) => n.id === activeId);
    return note ?? notes[0] ?? null;
  }, [notes, activeId]);

  useEffect(() => {
    if (notes.length === 0) {
      if (activeId) setActiveId("");
      return;
    }
    if (!activeId || !notes.some((note) => note.id === activeId)) {
      setActiveId(notes[0].id);
    }
  }, [activeId, notes]);

  const notebooks = useMemo(() => {
    const names = new Set(notes.map((note) => note.notebook));
    return Array.from(names)
      .filter(Boolean)
      .sort()
      .map((name) => ({
        name,
        count: notes.filter((note) => note.notebook === name && !note.archived).length,
      }));
  }, [notes]);

  const tags = useMemo(() => {
    const names = new Set(notes.flatMap((note) => note.tags));
    return Array.from(names).sort();
  }, [notes]);

  const filteredNotes = useMemo(() => {
    const filtered = notes.filter((note) => {
      const search = query.trim().toLowerCase();
      const matchesQuery =
        !search ||
        note.title.toLowerCase().includes(search) ||
        stripHtml(note.content).toLowerCase().includes(search) ||
        note.tags.some((tag) => tag.toLowerCase().includes(search)) ||
        note.notebook.toLowerCase().includes(search);

      const matchesFilter =
        filter === "all"
          ? !note.archived
          : filter === "favorites"
          ? note.favorite && !note.archived
          : note.archived;

      const matchesNotebook = notebook === "all" ? true : note.notebook === notebook;

      return matchesQuery && matchesFilter && matchesNotebook;
    });
    return sortNotes(filtered);
  }, [notes, query, filter, notebook]);

  const createNote = () => {
    const nextNote: Note = {
      id: crypto.randomUUID(),
      title: "",
      content: "",
      tags: [],
      notebook: notebook === "all" ? "" : notebook,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      favorite: false,
      pinned: false,
      archived: false,
    };

    setNotes((prev) => [nextNote, ...prev]);
    setActiveId(nextNote.id);
  };

  const updateActiveNote = (patch: Partial<Note>) => {
    if (!activeNote) return;
    setNotes((prev) =>
      prev.map((note) =>
        note.id === activeNote.id
          ? { ...note, ...patch, updatedAt: new Date().toISOString() }
          : note,
      ),
    );
  };

  const toggleFavorite = (id: string) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id
          ? { ...note, favorite: !note.favorite, updatedAt: new Date().toISOString() }
          : note,
      ),
    );
  };

  const toggleArchive = (id: string) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id
          ? { ...note, archived: !note.archived, updatedAt: new Date().toISOString() }
          : note,
      ),
    );
  };

  const togglePin = (id: string) => {
    setNotes((prev) =>
      prev.map((note) =>
        note.id === id
          ? { ...note, pinned: !note.pinned, updatedAt: new Date().toISOString() }
          : note,
      ),
    );
  };

  const shareNote = async (id: string) => {
    const note = notes.find((item) => item.id === id);
    if (!note || typeof navigator === "undefined") return false;

    const text = `${note.title || t("notes.untitled")}\n\n${stripHtml(note.content)}`;
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch {
      return false;
    }
  };

  const deleteNote = (id: string) => {
    setNotes((prev) => prev.filter((note) => note.id !== id));
    if (activeId === id) {
      setActiveId("");
    }
  };

  return {
    notes: filteredNotes,
    allNotes: notes,
    notebooks,
    notebook,
    setNotebook,
    tags,
    activeNote,
    activeId,
    setActiveId,
    query,
    setQuery,
    filter,
    setFilter,
    createNote,
    updateActiveNote,
    toggleFavorite,
    toggleArchive,
    togglePin,
    shareNote,
    deleteNote,
  };
}
