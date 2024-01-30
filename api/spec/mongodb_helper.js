var mongoose = require("mongoose");

beforeAll(function (done) {
  mongoose.connect(`mongodb+srv://hjtrhodes:${password}@acebook.68ebyeu.mongodb.net/test?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })

  var db = mongoose.connection;
  db.on("error", console.error.bind(console, "MongoDB connection error:"));
  db.on("open", function () {
    done();
  });
});

afterAll(function (done) {
  mongoose.connection.close(true, function () {
    done();
  });
});
