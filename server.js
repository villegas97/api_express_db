const express = require("express");
const app = express();
app.use(express.json());
const port = process.env.PORT || 3000;
// Require para usar Prisma
const { PrismaClient } = require("@prisma/client");
const { json } = require("express");
const prisma = new PrismaClient();

app.get("/", (req, res) => {
  res.json({ message: "alive" });
});

app.get("/explorers", async (req, res) => {
  const allExplorers = await prisma.explorer.findMany();
  res.json(allExplorers);
});

app.get("/v1/explorers/:id", async (req, res) => {
  const id = req.params.id;
  const explorer = await prisma.explorer.findUnique({
    where: { id: parseInt(id) },
  });
  res.json(explorer);
});

app.post("/v1/explorers", async (req, res) => {
  const explorer = {
    name: req.body.name,
    username: req.body.username,
    mission: req.body.mission,
  };
  const message = "Explorer creado.";
  await prisma.explorer.create({ data: explorer });
  return res.json(message);
});

app.put("/v1/explorers/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  await prisma.explorer.update({
    where: {
      id: id,
    },
    data: {
      mission: req.body.mission,
    },
  });
  return res.json({ message: "Actualizado correctamente" });
});

app.delete("/v1/explorers/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  await prisma.explorer.delete({ where: { id: id } });
  return res.json({ message: "Eliminado correctamente" });
});

app.get("/commanders", async (req, res) => {
  const allCommanders = await prisma.commander.findMany();
  return res.json(allCommanders);
});

app.get("/v1/commanders/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  const commander = await prisma.commander.findUnique({
    where: { id: id },
  });
  return res.json(commander);
});

app.post("/v1/commanders", async (req, res) => {
  const commander = {
    name: req.body.name,
    lang: req.body.lang,
    missionCommander: req.body.missionCommander,
    enrollments: req.body.enrollments,
    hasCertification: req.body.hasCertification,
  };
  await prisma.commander.create({ data: commander });
  const message = "Commander creado";
  return res.json(message);
});

app.put("/v1/commanders/:id", async (req, res) => {
  const id = parseInt(req.params.id);
  await prisma.commander.update({
    where: { id: id },
    data: {
      enrollments: req.body.enrollments,
    },
  });
  const message = "Commander actualizado";
  return res.json(message);
});

app.delete("/v1/commanders/:id", async (req, res) => {
  const id = parseInt(req.params.id);

  await prisma.commander.delete({ where: { id: id } });
  const message = "Commander eliminado";
  return res.json(message);
});

app.listen(port, () => {
  console.log(`Listening to requests on port ${port}`);
});
