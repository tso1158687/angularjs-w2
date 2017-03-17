(function() {
    "use strict";

    angular.module("ShoppingListCheckOff", [])
        .controller("ToBuyController", ToBuyController)
        .controller("AlreadyBoughtController", AlreadyBoughtController)
        .service("ShoppingListCheckOffService", ShoppingListCheckOffService)

    ToBuyController.$inject = ["ShoppingListCheckOffService"];

    function ToBuyController(ShoppingListCheckOffService) {
        var toBuy = this;
        toBuy.items = ShoppingListCheckOffService.getToBuyItems();

        toBuy.state = ShoppingListCheckOffService.buyListState();

        toBuy.button = function(itemIndex) {

            ShoppingListCheckOffService.button(itemIndex);





        };

    };

    AlreadyBoughtController.$inject = ["ShoppingListCheckOffService"]

    function AlreadyBoughtController(ShoppingListCheckOffService) {
        var alreadyBought = this;
        alreadyBought.items = ShoppingListCheckOffService.getBoughtItems();
        alreadyBought.state = ShoppingListCheckOffService.boughtListState();


    };

    function ShoppingListCheckOffService() {
        var service = this;

        // buy items
        var toBuyItems = [{
            name: "Milk",
            quantity: "2"
        }, {
            name: "Donuts",
            quantity: "200"
        }, {
            name: "Cookies",
            quantity: "300"
        }, {
            name: "Chocolate",
            quantity: "5"
        }, {
            name: "sticty tofu",
            quantity: "15"
        }];

        service.getToBuyItems = function() {
            return toBuyItems;
        }

        // Already Bought
        var boughtItems = [];

        service.getBoughtItems = function() {
                return boughtItems;
            }
            // button
        var pushItem = {
            name: toBuyItems.name,
            quantity: toBuyItems.quantity
        }
        service.button = function(itemIndex) {

            // 先推資料在刪除資料
            boughtItems.push(toBuyItems[itemIndex]);
            toBuyItems.splice(itemIndex, 1);

        };
        service.buyListState = function() {
            return toBuyItems;
        };

        service.boughtListState = function() {
            return boughtItems;
        };

    }

})();
