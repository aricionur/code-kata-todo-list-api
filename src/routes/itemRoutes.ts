import { Router, Request, Response } from "express";

const router = Router();

interface Item {
  id: number;
  name: string;
}

let items: Item[] = [
  { id: 1, name: "Item One" },
  { id: 2, name: "Item Two" },
  { id: 3, name: "Item Three" },
];

// Get all items
router.get("/items", (req: Request, res: Response) => {
  res.json(items);
});

// Get single item by ID
router.get("/items/:id", (req: Request, res: Response) => {
  const item = items.find((i) => i.id === parseInt(req.params.id));
  item ? res.json(item) : res.status(404).send("Item not found");
});

// Create a new item
router.post("/items", (req: Request, res: Response) => {
  const newItem: Item = { id: Date.now(), name: req.body.name };
  items.push(newItem);
  res.status(201).json(newItem);
});

// Update an item
router.put("/items/:id", (req: Request, res: Response) => {
  const itemIndex = items.findIndex((i) => i.id === parseInt(req.params.id));
  if (itemIndex !== -1) {
    items[itemIndex].name = req.body.name;
    res.json(items[itemIndex]);
  } else {
    res.status(404).send("Item not found");
  }
});

// Delete an item
router.delete("/items/:id", (req: Request, res: Response) => {
  const itemIndex = items.findIndex((i) => i.id === parseInt(req.params.id));
  if (itemIndex !== -1) {
    const deletedItem = items.splice(itemIndex, 1);
    res.json(deletedItem);
  } else {
    res.status(404).send("Item not found");
  }
});

export default router;
