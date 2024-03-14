import { useState } from "react";
import { PlusCircleIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function AddCard({
  column,
  setCards,
}: {
  column: string;
  setCards: any;
}) {
  const [text, setText] = useState("");
  const [adding, setAdding] = useState(false);

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!text.trim().length) return;

    const newCard: {
      column: string;
      title: string;
      items: string[];
      id: string;
    } = {
      column,
      title: text.trim(),
      items: [],
      id: Math.random().toString(),
    };

    const lines = text.split("\n");
    if (lines.length > 1) {
      newCard.title = lines[0];
      newCard.items = lines.slice(1);
    }

    setText("");
    setCards((prev: any) => [...prev, newCard]);
    setAdding(false);
  };

  return (
    <>
      {adding ? (
        <motion.form onSubmit={handleSubmit} layout>
          <textarea
            onChange={(e) => setText(e.target.value)}
            autoFocus
            placeholder="Add new task..."
            className="w-full h-[20vh] rounded border border-zinc-400 bg-zinc-400/20 p-3 text-sm text-zinc-50 placeholder-zinc-300 focus:outline-0"
          />
          <div className="mr-1.5 flex items-center justify-end gap-1.5">
            <Button
              onClick={() => setAdding(false)}
              className="px-3 py-1.5 text-xs text-zinc-400 transition-colors hover:text-zinc-50"
              variant={"outline"}
            >
              Close
            </Button>
            <Button
              type="submit"
              className="flex items-center gap-1.5 rounded bg-zinc-50 px-3 py-1.5 text-xs text-zinc-950 transition-colors hover:bg-neutral-300"
              variant={"secondary"}
            >
              <span>Add</span>
              <PlusCircleIcon />
            </Button>
          </div>
        </motion.form>
      ) : (
        <motion.button
          layout
          className="flex w-full items-center gap-1.5 px-3 py-1.5 text-xs text-zinc-400 transition-colors hover:text-zinc-50"
          onClick={() => setAdding(true)}
        >
          <span>Add Card</span>
          <PlusCircleIcon />
        </motion.button>
      )}
    </>
  );
}
