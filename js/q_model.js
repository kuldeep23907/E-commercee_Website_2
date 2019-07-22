class ProductItem {
  constructor(product_name, index) {
    this.product_name = product_name;
    this.index = index;
  }
}

class AppModel {
  input = "";
  productCollection = [];
  cartCollection = [];

  constructor() {
    console.log(this.productCollection);
    this.get_database_data("all");
    this.number_cart_items();
    //this.addToCart();
  }

  get_database_data(filter) {
    var tt = "server/get.php";
    var self = this;
    this.productCollection = [];
    $.ajax({
      url: tt,
      k: 0,
      data: { filter: filter },
      success: function(result) {
        for (var k = 0; k < result.length; k++) {
          var newItem = new ProductItem(
            result[k][0].product_name,
            result[k][0].index
          );
          self.productCollection.push(newItem);
        }
      }
    });
    console.log(this.productCollection);
  }

  number_cart_items(temp) {
    var self = this;
    var card_list = $("#cart_items");
    $.post("server/count.php", {}, function(result) {
      console.log(result["data"][0].number);

      card_list.text("No. of cart items " + result["data"][0].number);
    });
  }

  addToCart() {
    var self = this;
    this.productCollection = [];

    $.post("server/cart_get.php", {}, function(result) {
      console.log(result);
      var data_json = JSON.parse(JSON.stringify(result));
      console.log("session", data_json["data"][0]["items"][0]);

      for (var k = 0; k < data_json["data"][0]["items"].length; k++) {
        var newItem = new ProductItem(
          data_json["data"][0]["items"][k].product_name,
          data_json["data"][0]["items"][k].id
        );
        self.productCollection.push(newItem);
      }
      console.log("cart", self.productCollection);
    });
  }

  addCart(index, i, product_name) {
    var self = this;
    console.log("index", index);
    $.post(
      "server/insert.php",
      { id: index, product_name: product_name },
      function(result) {
        console.log(result);
        if (result["success"] == true) self.productCollection.splice(i, 1);
        else if (result["error"] == true) console.log(result);
      }
    );
    this.number_cart_items();
    console.log(this.productCollection);
  }
}
