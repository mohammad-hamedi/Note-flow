"use client";

import { useEffect, useState } from "react";
import { NoteEditor } from "./note-editor";
import { NotesList } from "./notes-list";
import { Sidebar } from "./sidebar";
import { Topbar } from "./topbar";
import { SidebarSkeleton, NotesListSkeleton, NoteEditorSkeleton } from "./skeleton";
import { useNotes } from "@/hooks/use-notes";

export function AppShell() {
  const notesApi = useNotes();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [mobileView, setMobileView] = useState<"list" | "editor">("list");
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Mark as initialized after first render
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    function handleKey(event: KeyboardEvent) {
      if (event.key === "Escape") setSidebarOpen(false);
    }

    if (sidebarOpen) {
      window.addEventListener("keydown", handleKey);
    }

    return () => window.removeEventListener("keydown", handleKey);
  }, [sidebarOpen]);

  function openSidebar() {
    setSidebarOpen(true);
  }

  function closeSidebar() {
    setSidebarOpen(false);
  }

  const handleSelectNote = (id: string) => {
    notesApi.setActiveId(id);
    setMobileView("editor");
  };

  if (!isInitialized) {
    return (
      <div className="flex h-screen overflow-hidden bg-canvas dark:bg-[#0b0f14]">
        <SidebarSkeleton />
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="shrink-0 border-b border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-950 h-12 lg:h-14" />
          <div className="flex min-h-0 flex-1">
            <div className="min-h-0 w-full shrink-0 lg:w-[min(380px,34vw)] lg:max-w-[420px] hidden lg:flex lg:flex-col">
              <NotesListSkeleton />
            </div>
            <div className="min-h-0 min-w-0 flex-1 flex lg:flex-col">
              <NoteEditorSkeleton />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-screen overflow-hidden bg-canvas animate-fade-in-up motion-reduce:animate-none dark:bg-[#0b0f14]">
      <Sidebar
        filter={notesApi.filter}
        setFilter={notesApi.setFilter}
        notes={notesApi.allNotes}
        notebooks={notesApi.notebooks}
        activeNotebook={notesApi.notebook}
        setActiveNotebook={notesApi.setNotebook}
        mobileOpen={sidebarOpen}
        onDismiss={closeSidebar}
        onNewNote={() => {
          notesApi.createNote();
          setMobileView("editor");
          closeSidebar();
        }}
      />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar
          searchQuery={notesApi.query}
          setSearchQuery={notesApi.setQuery}
          onOpenSidebar={openSidebar}
        />

        <div className="flex min-h-0 flex-1">
          <div
            className={`min-h-0 w-full shrink-0 lg:w-[min(380px,34vw)] lg:max-w-[420px] ${
              mobileView === "editor" ? "hidden lg:flex lg:flex-col" : "flex flex-col"
            }`}
          >
            <NotesList
              notes={notesApi.notes}
              activeId={notesApi.activeId}
              setActiveId={handleSelectNote}
              query={notesApi.query}
              setQuery={notesApi.setQuery}
              filter={notesApi.filter}
              setFilter={notesApi.setFilter}
              tags={notesApi.tags}
              onNewNote={() => {
                notesApi.createNote();
                setMobileView("editor");
              }}
              onToggleFavorite={notesApi.toggleFavorite}
              onToggleArchive={notesApi.toggleArchive}
              onTogglePin={notesApi.togglePin}
            />
          </div>

          <div
            className={`min-h-0 min-w-0 flex-1 ${
              mobileView === "list" ? "hidden lg:flex lg:flex-col" : "flex flex-col"
            }`}
          >
            <NoteEditor
              note={notesApi.activeNote}
              onChange={notesApi.updateActiveNote}
              onToggleFavorite={notesApi.toggleFavorite}
              onToggleArchive={notesApi.toggleArchive}
              onTogglePin={notesApi.togglePin}
              onShare={notesApi.shareNote}
              onDelete={notesApi.deleteNote}
              onBack={() => setMobileView("list")}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
