let productsPurchased,
    totalPrice,
    actualPrice,
    productCount = {};

let productInfo = {
    A: {
        orgPrice: 50,
        discAvailable: true,
        discPrice: 130,
        minPurchaseForDisc: 3
    },
    B: {
        orgPrice: 30,
        discAvailable: true,
        discPrice: 45,
        minPurchaseForDisc: 2
    },
    C: {
        orgPrice: 20,
        discAvailable: false
    },
    D: {
        orgPrice: 15,
        discAvailable: false
    }
}


//set all the values to the initial state
function initValues() {
    productsPurchased, totalPrice = 0, actualPrice = 0;
    productCount = {
        A: 0,
        B: 0,
        C: 0,
        D: 0
    }
}


//Function for validating the input entered into the text field
function ValidateInput(evt) {
    let charCode;
    try {
        if (window.event) {
            charCode = window.event.keyCode;
        }
        else if (evt) {
            charCode = evt.which;
        }
        else { return true; }


        if (charCode > 64 && charCode < 91) {
            return true;
        }
        else {
            alert('Only UpperCase letters (products) allowed')
            return false;
        }
    }
    catch (err) {
        alert(err.Description);
    }
}


//Calculate total product count
function getProductCount() {
    for (let i = 0; i < productsPurchased.length; i++) {
        let currProduct = productsPurchased.charAt(i);
        productCount[currProduct]++;
    }
}

function isProductValid() {
    for (let i = 0; i < productsPurchased.length; i++) {
        let currProduct = productsPurchased.charAt(i);
        if (productCount[currProduct] === undefined) {
            return false;
        }
    }
    return true;
}


//Logic for price calculation
function getPrice() {
    for (everyProduct in productCount) {
        if (productInfo[everyProduct].discAvailable) {
            totalPrice += (productCount[everyProduct] % productInfo[everyProduct].minPurchaseForDisc * productInfo[everyProduct].orgPrice) + (Math.floor(productCount[everyProduct] / productInfo[everyProduct].minPurchaseForDisc) * productInfo[everyProduct].discPrice)
            actualPrice += (productCount[everyProduct] * productInfo[everyProduct].orgPrice);
        } else {
            totalPrice += (productCount[everyProduct] * productInfo[everyProduct].orgPrice);
            actualPrice += (productCount[everyProduct] * productInfo[everyProduct].orgPrice);

        }
    }
}


function dicscountChart(amountPaid, discount) {
    // Build the chart
    Highcharts.chart('chart_container', {
        chart: {
            plotBackgroundColor: null,
            plotBorderWidth: null,
            plotShadow: false,
            type: 'pie'
        },
        title: {
            text: ''
        },
        tooltip: {
            pointFormat: '<b>${point.y}</b>' + ' ({point.percentage:.1f}%)'
        },
        plotOptions: {
            pie: {
                allowPointSelect: true,
                borderWidth: 4,
                animation: true,
                cursor: 'pointer',
                dataLabels: {
                    enabled: false
                },
                shadow: {
                    color: '#aaa',
                    offsetX: '1',
                    offsetY: '1',
                    opacity: '.3',
                    width: '8'
                },
                showInLegend: true
            }
        },
        "colors": ["#0088c3", "#1dd84f"],
        "credits": { "enabled": false },
        "legend": {
            "enabled": true,
            "layout": "horizontal",
            "floating": false,
            "borderWidth": 1,
            "borderRadius": 5,
            "squareSymbol": true,
            "shadow": false,
            "rtl": false,
            "reversed": false,
            "symbolPadding": 5,
            "symbolRadius": 2
        },
        series: [{
            name: 'Brands',
            colorByPoint: true,
            "borderWidth": "5",
            data: [{
                name: 'Amount paid',
                y: Math.round(amountPaid * 100) / 100

            }, {
                name: 'Discount',
                y: Math.round(discount * 100) / 100
            }]
        }]
    });

}



//Initilize calculation process
function calculate() {
    initValues()

    productsPurchased = document.getElementById('products').value;
    const ProductValid = isProductValid()

    if (ProductValid) {
        getProductCount()
        getPrice()

        //Display the summary holder
        document.getElementById('summary-holder').style.display = 'block';

        //output the values
        document.getElementById('actual-price').innerText = '$' + (actualPrice).toLocaleString();
        document.getElementById('discounted-price').innerText = '$' + (totalPrice).toLocaleString();
        document.getElementById('total-savings').innerText = '$' + (actualPrice - totalPrice).toLocaleString();
        dicscountChart(actualPrice, actualPrice - totalPrice);
    } else {
        alert('Invalid Product Entered')
        location.reload()
    }

}