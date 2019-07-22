class ProductItem {
  constructor(product_name, index) {
    this.product_name = product_name;
    this.index = index;
  }
}

class AppModel {
  input = "";
  cartCollection = [];

  constructor() {
    console.log(this.cartCollection);
    //  this.get_database_data("all");
    this.number_cart_items();
    this.addToCart();
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
    this.cartCollection = [];

    $.post("server/cart_get.php", {}, function(result) {
      console.log(result);
      var data_json = JSON.parse(JSON.stringify(result));
      console.log("session", data_json["data"][0]["items"][0]);

      for (var k = 0; k < data_json["data"][0]["items"].length; k++) {
        var newItem = new ProductItem(
          data_json["data"][0]["items"][k].product_name,
          data_json["data"][0]["items"][k].id
        );
        self.cartCollection.push(newItem);
      }
      console.log("cart", self.cartCollection);
    });
  }

  buy_cart() {
    var self = this;
    if (this.cartCollection.length == 0) {
      alert("YOur cart is empty");
      return;
    }
    $.post("server/session_close.php", {}, function(result) {
      self.cartCollection = [];
      alert("Thanks for shopping");
      self.number_cart_items();

      console.log("cart", self.cartCollection);
    });
  }

  removeCart(index, i, product_name) {
    var self = this;
    console.log("index", index);
    $.post("server/remove.php", { id: i }, function(result) {
      console.log(result);
      if (result["success"] == true) self.cartCollection.splice(i, 1);
      else if (result["error"] == true) console.log(result);
    });
    console.log(this.cartCollection);
    this.number_cart_items();
  }
}
