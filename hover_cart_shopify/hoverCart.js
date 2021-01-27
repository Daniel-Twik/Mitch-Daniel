// init variables:

// *THIS will be the selector for the script (web page's shopping cart logo)
// Remove this after testing
let allLinksInPage = document.getElementsByTagName("a");

let arrayOfAnchors = [];
for (let index = 0; index < allLinksInPage.length; index++) {
    let filteredSelectors = allLinksInPage[index].getAttribute("href");

    if (
        filteredSelectors === "/cart" ||
        filteredSelectors === "#cart" ||
        ((filteredSelectors === "/cart" || filteredSelectors === "#cart") &&
            allLinksInPage[index].firstChild.nodeType == "3")
    ) {
        arrayOfAnchors.push(allLinksInPage[index]);
    }
}

var cart = arrayOfAnchors[0];
console.log(cart);
// init functions:
let cartYPos = cart.getBoundingClientRect().y;
let cartXPos = cart.getBoundingClientRect().x;

window.addEventListener("scroll", () => {
    cartYPos = cart.getBoundingClientRect().y;
    cartXPos = cart.getBoundingClientRect().x;
});

function Get(yourUrl) {
    var Httpreq = new XMLHttpRequest();
    async: true;
    Httpreq.open("GET", yourUrl, false);
    Httpreq.send(null);
    return Httpreq.responseText;
}

function create_cart_html(items) {
    let tw_cart_table = `
        <table id="tw-cart-table" style="background-color: white; color: black; border: none; padding: 15px; display: block; position: absolute ;left:${
          cartXPos - 700 + "px"
        }; top:${
    cartYPos + "px"
  }; max-width: 700px; overflow: scroll; max-height: 350px; z-index: 10000; ">
            <tbody>
                <tr id="tw-cart-head" style="font-weight: bold; text-decoration: underline; font-size: 1.25em;">
                    <td style="padding-right: 20px; padding-left: 20px; padding-bottom: 20px;"></td>
                    <td style="padding-right: 20px; padding-left: 20px; padding-bottom: 20px;white-space: nowrap;">Item</td>
                    <td style="padding-right: 20px; padding-left: 20px; padding-bottom: 20px;white-space: nowrap;">Quantity</td>
                    <td style="padding-right: 20px; padding-left: 20px; padding-bottom: 20px;white-space: nowrap;">Price</td>
                </tr>
    `;
    // create and append row for each item in cart
    for (let item of items) {
        let tw_price = item.line_price / 100;
        tw_cart_table +=
            `
                <tr>
                    <td style="padding-right: 20px; padding-left: 20px; padding-bottom: 20px">
                        <img src="` +
            item.image +
            `" style="width: 9vw; min-width: 80px; max-width: 150px;" alt="PIC">
                    </td>
                    <td style="padding-right: 20px; padding-left: 20px; padding-bottom: 20px;white-space: normal;">` +
            item.title +
            `</td>
                    <td style="padding-right: 20px; padding-left: 20px; padding-bottom: 20px;white-space: normal;">` +
            item.quantity +
            `</td>
                    <td style="padding-right: 20px; padding-left: 20px; padding-bottom: 20px;white-space: normal;">` +
            tw_price +
            ` USD</td>
                </tr>
        `;
    }

    tw_cart_table += `
            </tbody>
        </table>
    `;
    return tw_cart_table;
}

// execute:

// collect cart data
var json_obj = JSON.parse(Get("/cart.json"));
console.log("[+] Capturing cart data...");
var cart_items = json_obj.items;

// create container div where visibility will be toggled on hover
let tw_cart_html = document.createElement("div");
tw_cart_html.setAttribute("ID", "tw-wrap");
tw_cart_html.style.display = "none";
tw_cart_html.style.zIndex = "20000";
console.log("[+] Building cart HTML...");

// create and populate table with cart data
tw_cart_html.innerHTML = create_cart_html(cart_items);

// append our (hidden) cart data table
document.getElementsByTagName("body")[0].appendChild(tw_cart_html);

// show on mouse over
cart.onmouseover = function() {
    if (cart_items.length != 0) {
        document.getElementById("tw-wrap").style.display = "block";
    }
    document.getElementById("tw-wrap").onmouseover = function() {
        document.getElementById("tw-wrap").style.display = "block";
    };
};
// hide on mouse out
document.getElementById("tw-cart-table").onmouseout = function() {
    if (cart_items.length != 0) {
        document.getElementById("tw-wrap").style.display = "none";
    }
};

console.log("[+] Hover cart ready");