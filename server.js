const app = require('./index');

PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(`Server  started at port ${PORT}`);
});
