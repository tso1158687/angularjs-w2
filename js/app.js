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
       
        toBuy.state = ShoppingListCheckOffService.state;
        toBuy.state2 = ShoppingListCheckOffService.state2;
        toBuy.button = function(itemIndex) {
            
            ShoppingListCheckOffService.button(itemIndex);
            console.log("service:" + ShoppingListCheckOffService.state2)

            var buyState;
            buyState = function() {

                if (toBuy.items.length === 0) {
                    toBuy.state = true;
                    ShoppingListCheckOffService.state2 = false;
                } else {
                    toBuy.state = false;
                    ShoppingListCheckOffService.state2 = false;
                };
                console.log("state:" + toBuy.state);
                console.log("state2:" + toBuy.state2);
                console.log("service:" + ShoppingListCheckOffService.state2);

            };
            buyState();


        };

    };

    AlreadyBoughtController.$inject = ["ShoppingListCheckOffService"]

    function AlreadyBoughtController(ShoppingListCheckOffService) {
        var alreadyBought = this;
        alreadyBought.items = ShoppingListCheckOffService.getBoughtItems();
        alreadyBought.state = ShoppingListCheckOffService.state2;

        console.log("alreadyBought state:" + alreadyBought.state);


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

        service.state = false;
        service.state2 = true;

       
        service.buyState = function() {
            if (toBuyItems.length === 0) {
                console.log("true");
                service.state = true;
                service.state2 = false;

            } else {
                console.log(service.state);
                service.state = true;
                service.state2 = false;
                console.log("false");

            };


        };

    }

})();
