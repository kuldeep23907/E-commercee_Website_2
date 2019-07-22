class AppController {
  constructor() {
    self = this;
    this.model = new AppModel();
    self.render();
  }

  attachEventHandlers() {
    var self = this;

    $("#buy")
      .off()
      .click(function(e) {
        self.model.buy_cart();
      });
  }

  render() {
    var self = this;
    var row = $("#row").html("");

    for (var i in this.model.cartCollection) {
      var productItem = this.model.cartCollection[i];
      var indexnew = this.model.cartCollection[i]["index"];
      var product_name = productItem.product_name;
      var single_product = $(
        "<div id='single-product' class='single-product'></div>"
      );

      var superid = $("<div id='superid' class='col-lg-3 col-md-6'></div>");

      var product_img = $("<div id='product-img' class='product-img'></div>");
      var product_btm = $("<div id='product-btm' class='product-btm'></div>");

      var li = $("<h4></h4>");
      li.text(productItem.product_name);
      var img = $('<img id="dynamic">'); //Equivalent: $(document.createElement('img'))
      img.attr("src", "img/item" + indexnew + ".jpeg");
      img.appendTo(product_img);
      img.attr("width", "199px");
      img.attr("height", "254px");

      var cartBttn = $("<input type='button'>")
        .off()
        .click(
          function(indexnew, i, product_name) {
            console.log(indexnew);
            self.model.removeCart(indexnew, i, product_name);
            //self.render();
          }.bind(null, indexnew, i, product_name)
        );

      cartBttn.val("Remove from cart");
      var price = $("<input type='text' >")
        .off()
        .click();

      price.val("Price : Rs. 400");

      product_btm.append(li);
      product_btm.append(cartBttn);
      product_btm.append(price);
      single_product.append(product_img);
      single_product.append(product_btm);
      superid.append(single_product);
      row.append(superid);
    }
    this.attachEventHandlers();
  }
}
