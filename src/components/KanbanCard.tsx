import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

import { motion } from "framer-motion";

import { useState, useEffect } from "react";
import { DropIndicator } from "./DropIndicator";
import { Button } from "./ui/button";

export function KanbanCard({
  id,
  title,
  items,
  column,
  setCards,
  handleDragStart,
}: {
  id: string;
  title: string;
  items: string[];
  column: string;
  setCards: any;
  handleDragStart: (
    e: any,
    card: {
      id: string;
      title: string;
      items: string[];
      column: string;
    }
  ) => void;
}) {
  const [isMounted, setIsMounted] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [editValue, setEditValue] = useState({ title, items });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    isMounted && (
      <>
        <DropIndicator beforeId={id} column={column} />
        <motion.div
          layout
          layoutId={id}
          draggable="true"
          onDragStart={(e) =>
            handleDragStart(e, { id, title, items: items, column })
          }
          className="cursor-grab rounded border border-zinc-700 bg-zinc-800 p-0.5 active:cursor-grabbing"
        >
          <ContextMenu>
            <ContextMenuTrigger>
              {isEdit ? (
                <Card>
                  <CardHeader></CardHeader>
                  <CardContent>
                    <CardDescription>
                      <textarea
                        className="w-full h-[20vh] rounded border border-zinc-400 bg-zinc-400/20 p-3 text-sm text-zinc-50 placeholder-zinc-300 focus:outline-0"
                        defaultValue={title + "\n" + items.join("\n")}
                        onChange={(e) => {
                          setEditValue({
                            title: e.target.value.split("\n")[0],
                            items: e.target.value.split("\n").slice(1),
                          });
                        }}
                      />
                      <Button
                        onClick={() => {
                          setCards((prev: any) => {
                            return prev.map((card: any) => {
                              if (card.id === id) {
                                return { ...editValue, id, column };
                              }
                              return card;
                            });
                          });
                          setIsEdit(false);
                        }}
                        className="mt-2 w-full"
                        variant={"outline"}
                      >
                        Save Changes
                      </Button>
                    </CardDescription>
                  </CardContent>
                </Card>
              ) : (
                <Card>
                  <CardHeader>
                    <CardTitle>{title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <CardDescription>
                      {items &&
                        items.map((item, index) => <p key={index}>{item}</p>)}
                    </CardDescription>
                  </CardContent>
                </Card>
              )}
            </ContextMenuTrigger>
            <ContextMenuContent>
              <ContextMenuItem
                onClick={() => {
                  setIsEdit(true);
                }}
              >
                Edit
              </ContextMenuItem>
              <ContextMenuItem
                onClick={() => {
                  setCards((prev: any) =>
                    prev.filter((card: any) => card.id !== id)
                  );
                }}
              >
                Delete
              </ContextMenuItem>
            </ContextMenuContent>
          </ContextMenu>
        </motion.div>
      </>
    )
  );
}
