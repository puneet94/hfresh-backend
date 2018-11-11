var Store = require("..//models/store").Store;
var User = require("..//models/user").User;

const createStore = async (req, res) => {
  var store = new Store();

  store.name = req.body.store.name;

  store.state = req.body.store.state;
  store.country = req.body.store.country;
  store.suburb = req.body.store.suburb;
  store.street = req.body.store.street;
  store.address = req.body.store.address;
  store.pincode = req.body.store.pincode;

  try {
    let storeSaved = await store.save();
    res.json(storeSaved);
  } catch (e) {
    console.log("error in save store and user");
    console.log(e);
  }
};
const updateStore = async (req, res) => {
  try {
    let store = await Store.findById(req.params.storeId);
    store.state = req.body.type;
    let updatedStore = await store.save();
    res.json(updatedStore);
  } catch (e) {
    console.log("update store error");
    console.log(e);
  }
};

function getStores(req, res) {
  var query = {};

  query.userId = req.params.storeId;

  var options = {};

  options.sort = "-time";

  Store.find(query, null, options).then(stores => {
    res.json(stores);
  });
}
function deleteStore(req, res) {
  Store.findById(req.params.storeId, function(err, store) {
    if (err) {
      console.log(err);
    }
    if (store) {
      store.remove(function(err, removed) {
        if (err) {
          console.log("line 71");
          console.log(err);
        }
        if (removed) {
          res.json({ message: "Store has been deleted" });
        }
      });
    }
  });
}
function getStore(req, res) {
  Store.findById(req.params.storeId, function(err, store) {
    if (err) {
      console.log(err);
    }
    if (store) {
      res.json({ store: store });
    }
  });
}
var storeController = {
  createStore: createStore,
  getStore: getStore,
  deleteStore: deleteStore,
  getStores,
  updateStore
};

module.exports = storeController;
