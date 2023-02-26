import app from "./api";

const port = process.env.PORT || 5557;

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
