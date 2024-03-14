import { useState } from "react";

import { cn } from "@/lib/utils";
import { KanbanCard } from "@/components/KanbanCard";
import { DropIndicator } from "./DropIndicator";
import { AddCard } from "./AddCard";

export function Column({
  title,
  headingColor,
  column,
  cards,
  setCards,
}: {
  title: string;
  headingColor: string;
  column: string;
  cards: { id: string; title: string; items: string[]; column: string }[];
  setCards: any;
}) {
  const [active, setActive] = useState(false);
  const filteredCards = cards.filter((card) => card.column === column);

  const handleDragStart = (
    e: any,
    card: { id: string; title: string; items: string[]; column: string }
  ) => {
    e.dataTransfer.setData("cardId", card.id);
  };

  const getIndicators = () => {
    return Array.from(document.querySelectorAll(`[data-column="${column}"]`));
  };

  const clearHighlights = (elements: any | null) => {
    const indicators = elements || getIndicators();
    indicators.forEach((indicator: any) => {
      indicator.style.opacity = 0;
    });
  };

  const getNearestIndicator = (e: any, indicators: any) => {
    const element = indicators.reduce(
      (closest: any, child: any) => {
        const box = child.getBoundingClientRect();
        const offset = e.clientY - (box.top + box.height / 2);

        if (offset < 0 && offset > closest.offset) {
          return { offset, element: child };
        } else {
          return closest;
        }
      },
      {
        offset: Number.NEGATIVE_INFINITY,
        element: indicators[indicators.length - 1],
      }
    );

    return element;
  };

  const highlightIndicator = (e: any) => {
    const indicators = getIndicators();
    clearHighlights(indicators);
    const element = getNearestIndicator(e, indicators);
    element.element.style.opacity = 1;
  };

  const handleDragOver = (e: any) => {
    e.preventDefault();
    highlightIndicator(e);
    setActive(true);
  };

  const handleDragLeave = () => {
    setActive(false);
    clearHighlights(null);
  };

  const handleDragEnd = (e: any) => {
    setActive(false);
    clearHighlights(null);

    const cardId = e.dataTransfer.getData("cardId");
    const indicators = getIndicators();
    const { element } = getNearestIndicator(e, indicators);
    const beforeId = element.dataset.before || "-1";

    if (beforeId === cardId) return;

    let copy = [...cards];
    let cardToTransfer = copy.find((card) => card.id === cardId);
    if (!cardToTransfer) return;

    cardToTransfer = { ...cardToTransfer, column };
    copy = copy.filter((card) => card.id !== cardId);
    const moveToBack = beforeId === "-1";

    if (moveToBack) {
      copy.push(cardToTransfer);
    } else {
      const index = copy.findIndex((card) => card.id === beforeId);
      if (index === undefined) return;
      copy.splice(index, 0, cardToTransfer);
    }

    setCards(copy);
  };

  return (
    <div className="w-[35vh] h-full rounded border p-3">
      <div className="mb-3 flex items-center justify-between">
        <h3 className={`font-medium mb-1 ${headingColor}`}>{title}</h3>
        <span className="rounded text-sm">{filteredCards.length}</span>
      </div>
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDragEnd}
        className={cn(
          "h-full w-full transition-colors",
          active ? "bg-zinc-800/50" : "bg-zinc-800/0"
        )}
      >
        {filteredCards.map(
          (card: {
            id: string;
            title: string;
            items: string[];
            column: string;
          }) => {
            return (
              <KanbanCard
                key={card.id}
                {...card}
                setCards={setCards}
                handleDragStart={handleDragStart}
              />
            );
          }
        )}
        <DropIndicator beforeId="-1" column={column} />
        <AddCard column={column} setCards={setCards} />
      </div>
    </div>
  );
}
