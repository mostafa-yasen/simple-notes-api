var sequential = require("sequential-ids");
 
var generator = new sequential.Generator({
  digits: 3, letters: 3,
  store: function(key, ids) {
    // db.store(key, ids[ids.length - 1]);
  },
  restore: "000"
});

generator.start()

module.exports = generator