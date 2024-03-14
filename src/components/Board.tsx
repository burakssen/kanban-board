"use client";

import { useEffect, useState } from "react";

import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Column } from "./Column";

const DEFAULT_CARDS: {
  id: string;
  title: string;
  items: string[];
  column: string;
}[] = [
  {
    id: "1",
    title: "Card 1",
    items: ["Item 1 for Card1", "Item 2 for Card1", "Item 3 for Card1"],
    column: "backlog",
  },
  {
    id: "2",
    title: "Card 2",
    items: ["Item 1 for Card2", "Item 2 for Card2", "Item 3 for Card2"],
    column: "backlog",
  },
  {
    id: "3",
    title: "Card 3",
    items: ["Item 1 for Card3", "Item 2 for Card3", "Item 3 for Card3"],
    column: "backlog",
  },
  {
    id: "4",
    title: "Card 4",
    items: ["Item 1 for Card4", "Item 2 for Card4", "Item 3 for Card4"],
    column: "backlog",
  },
  {
    id: "5",
    title: "Card 5",
    items: ["Item 1 for Card5", "Item 2 for Card5", "Item 3 for Card5"],
    column: "todo",
  },
  {
    id: "6",
    title: "Card 6",
    items: ["Item 1 for Card6", "Item 2 for Card6", "Item 3 for Card6"],
    column: "todo",
  },
  {
    id: "7",
    title: "Card 7",
    items: ["Item 1 for Card7", "Item 2 for Card7", "Item 3 for Card7"],
    column: "todo",
  },
  {
    id: "8",
    title: "Card 8",
    items: ["Item 1 for Card8", "Item 2 for Card8", "Item 3 for Card8"],
    column: "in-progress",
  },
  {
    id: "9",
    title: "Card 9",
    items: ["Item 1 for Card9", "Item 2 for Card9", "Item 3 for Card9"],
    column: "in-progress",
  },
  {
    id: "10",
    title: "Card 10",
    items: ["Item 1 for Card10", "Item 2 for Card10", "Item 3 for Card10"],
    column: "done",
  },
];

export function Board() {
  const [cards, setCards] = useState([]);
  const [hasChecked, setHasChecked] = useState(false);

  useEffect(() => {
    if (hasChecked) {
      localStorage.setItem("cards", JSON.stringify(cards));
    }
  }, [cards]);

  useEffect(() => {
    const cardData = localStorage.getItem("cards");
    setCards(cardData ? JSON.parse(cardData) : [DEFAULT_CARDS]);
    setHasChecked(true);
  }, []);

  return (
    <ScrollArea>
      <div className="flex w-max gap-3 py-3">
        <Column
          title="Backlog"
          headingColor="text-red-500"
          column="backlog"
          cards={cards}
          setCards={setCards}
        />
        <Column
          title="To Do"
          headingColor="text-yellow-500"
          column="todo"
          cards={cards}
          setCards={setCards}
        />
        <Column
          title="In Progress"
          headingColor="text-blue-500"
          column="in-progress"
          cards={cards}
          setCards={setCards}
        />
        <Column
          title="Done"
          headingColor="text-green-500"
          column="done"
          cards={cards}
          setCards={setCards}
        />
      </div>

      <ScrollBar orientation="horizontal" className="my-3" />
    </ScrollArea>
  );
}
