import app from '../src/app';  

const port = process.env.PORT || 8081;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
