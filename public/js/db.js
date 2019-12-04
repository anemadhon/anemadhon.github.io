var dbPromised = idb.open("slb", 3, function(upgradeDb) {
  var favObjectStore = upgradeDb.createObjectStore("myfav", {
    keyPath: "id"
  });
  favObjectStore.createIndex("name", "name", {
    unique: false
  });
});

function addFavClub(team) {
  dbPromised
    .then(function(db) {
      var tx = db.transaction("myfav", "readwrite");
      var store = tx.objectStore("myfav");
      var d = new Date();
      team.dateAdded = d.toString();
      store.add(team);
      return tx.complete;
    })
    .then(function() {
      alert("Berhasil Tambah Club Favorit..");
    }).catch(function() {
      alert('Gagal Ditambah karena error atau data telah ditambah sebelumnya')
    });
}

function deleteFavClub(id) {
  dbPromised
    .then(function(db) {
      var tx = db.transaction('myfav', 'readwrite');
      var store = tx.objectStore('myfav');
      store.delete(id);
      return tx.complete;
    })
    .then(function() {
      alert('Team Favorit Kamu Berkurang :( ');
    });
}

function getAll() {
  return new Promise(function(resolve, reject) {
    dbPromised
    .then(function(db) {
      var tx = db.transaction("myfav", "readonly");
      var store = tx.objectStore("myfav");
      return store.getAll();
    })
    .then(function(teams) {
      resolve(teams);
    });
  });
}

function getById(id) {
  return new Promise(function(resolve, reject) {
    dbPromised
      .then(function(db) {
        var tx = db.transaction("myfav", "readonly");
        var store = tx.objectStore("myfav");
        return store.get(id);
      })
      .then(function(teamById) {
        resolve(teamById);
      });
  });
}
