class AppController {
  constructor() {
    self = this;
    this.model = new AppModel();
  }

  attachEventHandlers() {
    var self = this;

    $("#view_cart")
      .off()
      .click(function() {
        window.open("cart.html");
      });
  }

  render() {
    console.log("render funtion");
    var self = this;
    var row = $("#row").html("");

    for (var i in this.model.productCollection) {
      var productItem = this.model.productCollection[i];
      var indexnew = this.model.productCollection[i]["index"];
      //console.log(indexnew);
      var product_name = productItem.product_name;

      var superid = $("<div id='superid' class='col-lg-3 col-md-6'></div>");
      var single_product = $(
        "<div id='single-product' class='single-product'></div>"
      );
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
            self.model.addCart(indexnew, i, product_name);
            //self.render();
          }.bind(null, indexnew, i, product_name)
        );

      cartBttn.val("Add to cart");

      product_btm.append(li);
      product_btm.append(cartBttn);
      single_product.append(product_img);
      single_product.append(product_btm);
      superid.append(single_product);
      row.append(superid);
    }
    this.attachEventHandlers();
  }
}
