import * as dom from "./dom.js";

const bills = [1, 5, 10, 20, 50, 100, 200, 500, 1000];
const billImgs = [
  //"https://upload.wikimedia.org/wikipedia/commons/thumb/6/66/Philpeso2010obv.jpg/100px-Philpeso2010obv.jpg",
  "img/1peso.png",
  //"https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/2005phil05pisoobv.jpg/100px-2005phil05pisoobv.jpg",
  "img/5peso.png",
  //"https://upload.wikimedia.org/wikipedia/commons/thumb/f/f7/2011phil10pisoobv.jpg/100px-2011phil10pisoobv.jpg",
  "img/10peso.png",
  "https://upload.wikimedia.org/wikipedia/en/thumb/5/5b/PHP_20_obv.jpg/120px-PHP_20_obv.jpg",
  "https://upload.wikimedia.org/wikipedia/en/thumb/e/e6/PHP_50_obv.jpg/120px-PHP_50_obv.jpg",
  "https://upload.wikimedia.org/wikipedia/en/thumb/9/9b/PHP_100_obv_%282010%29.jpg/120px-PHP_100_obv_%282010%29.jpg",
  "https://upload.wikimedia.org/wikipedia/en/thumb/1/16/PHP_200_obv_%28old%29.jpg/120px-PHP_200_obv_%28old%29.jpg",
  "https://upload.wikimedia.org/wikipedia/en/thumb/b/b2/PHP_500_obv.jpg/120px-PHP_500_obv.jpg",
  "https://upload.wikimedia.org/wikipedia/en/thumb/3/3a/PHP_1000_obv_%28old%29.jpg/120px-PHP_1000_obv_%28old%29.jpg"
]

const table1 = dom.SELECT("#table123")
const nov3 = [76, 26, 12, 22, 28, 25, 1, 3, 0];
//appendRows(table1, nov3)

const data = {
  "Oct 29":{
    sales: [
      [76,26,12,22,28,25,1,3,0]  
    ]
  }
  "Oct 30": {
    sales: [
      [87, 67, 19, 32, 13, 6, 0, 1, 1],
      [42, 37, 13, 41, 38, 7, 0, 0, 0]
    ]
  },
  "Oct 31 to Nov 1": {
    sales: [
      [28,5,5,17,21,4,1,0,0],
      [79,47,9,10,19,8,0,2,0]
    ]
  }
}

const dates = Object.keys(data)
const main = dom.SELECT("main")
dates.forEach(date => {
  //create block
  const block = dom.CREATE("div")
  block.setAttribute("class", "block")
  block.setAttribute("id", date)
  main.append(block)

  const titleDiv = dom.CREATE("div")
  titleDiv.setAttribute("class", "title")
  titleDiv.textContent = date
  block.append(titleDiv)


  const tablesDiv = dom.CREATE("div")
  tablesDiv.setAttribute("class", "tables")
  block.append(tablesDiv)
  console.log(data[date])
  data[date].sales.forEach((cartSales, cartIndex) => {
    //create table
    let tableId = date + "table" + cartIndex
    tableId = tableId.replace(/ /g, '')

    const table = dom.CREATE("table")
    table.setAttribute("border", "1")
    table.setAttribute("id", tableId) //id="oct30table0"
    tablesDiv.append(table)

    //cartTitle
    const [cartTr, cartTd, carth3] = [dom.CREATE("tr"), dom.CREATE("td"), dom.CREATE("h3")]
    carth3.textContent = "Cart " + (cartIndex + 1)
    cartTd.setAttribute("colspan", "3")
    cartTd.append(carth3)
    cartTr.append(cartTd)
    table.append(cartTr)

    appendRows(dom.SELECT("#" + tableId), cartSales)

  })

})

function appendRows(table, pcs) {
  const headingrow = dom.CREATE("tr")
  const headTitles = ["Bills", "Pcs.", "Pesos"]
  headTitles.forEach(each => {
    const head = dom.CREATE("th")
    head.textContent = each
    headingrow.append(head)
  })
  table.append(headingrow)

  let total = 0
  bills.forEach((bill, billIndex) => {
    if (pcs[billIndex] == 0) { return };

    const [tr, td1, td2, td3] = [dom.CREATE("tr"), dom.CREATE("td"), dom.CREATE("td"), dom.CREATE("td")];

    const pesos = bill * pcs[billIndex];
    total += pesos

    //td1.textContent = `₱${bill}`;
    const billImg = dom.CREATE("img")
    billImg.setAttribute("src", `${billImgs[billIndex]}`)
    td1.append(billImg)
    td2.textContent = `${pcs[billIndex]}`;
    td3.textContent = `₱${pesos}`;

    tr.append(td1, td2, td3);
    table.append(tr);
  });
  const [trTotal, thLabel, tdTotal] = [dom.CREATE("tr"), dom.CREATE("th"), dom.CREATE("td")]

  thLabel.textContent = "Total"
  tdTotal.textContent = `₱${total}`;
  tdTotal.setAttribute("class", "total")

  thLabel.setAttribute('colspan', '2')

  trTotal.append(thLabel, tdTotal);
  table.append(trTotal);
}
