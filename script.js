
"use-strict";

// main array
let arr = [];


//log array button 
document.querySelector('#logArr').addEventListener('click', function(){
  console.table(arr);
})


//info box logs
let infoArr =[]


//updates info box 
let updateInfo = function(){
  let infoToYes = function(elementID, text){
    document.querySelector(elementID).textContent = `${text} = Yes`
  }
  //turn text green function
  let textGreen = function(elementID){document.querySelector(elementID).style.color = 'green'}
  const updateInfoBoxElement = function(buttonID, text){
    if(infoArr.includes(text) ) {
      infoToYes(buttonID,text)
      textGreen(buttonID)}}
  const updateInfoBoxElement2 = function(text){
    if(infoArr.includes(text) ) {
      infoToYes('#resultsChosen','Results Chosen' )
      textGreen('#resultsChosen')}}

  //functions to update info box elements
  updateInfoBoxElement(`#fileChosen`, 'File Chosen')
  updateInfoBoxElement(`#fileSubmitted`, 'File Submitted')
  updateInfoBoxElement(`#dataCleaned`, 'Data Cleaned')
  //updates results chosen only
  updateInfoBoxElement2("Result amount 10 chosen.")
  updateInfoBoxElement2("Result amount 25 chosen.")
  updateInfoBoxElement2("Result amount 50 chosen.")
  //updates table created info
  updateInfoBoxElement(`#tableCreated`, 'Table Created')
  //put info array into string and then injects as text into info box
  const string = JSON.stringify(infoArr, null, 4);
  document.getElementById("infobox").innerHTML = string;
}
updateInfo()


//choose file to upload (replace with auto load later)
const myForm = document.getElementById("myForm");
//upload file
const csvFile = document.getElementById("csvFile");
document.querySelector('#csvFile').addEventListener('click',function(){
  infoArr.push('File Chosen')
  updateInfo()
})


myForm.addEventListener("submit", function (e) {
  e.preventDefault();
  const input = csvFile.files[0];
  const reader = new FileReader();
  reader.onload = function (e) {
    const text = e.target.result;
    //array to hold all trip information
    //sorts csv into array objects
    //splits into lines
    const lines = text.split("\n");
    //splits headers
    const headers = lines[0].split(",");
    for (let i = 1; i < lines.length; i++) {
      let rowData = lines[i].split(",");
      arr[i] = {};
      for (let j = 0; j < rowData.length; j++) {
        arr[i][headers[j]] = rowData[j];
      }
    }
    infoArr.push('File Submitted')
  updateInfo()
  };
  reader.readAsText(input); 
});

//table creation
let btnGet = document.querySelector("#getbutton");
let myTable = document.querySelector("#table");
//sets header titles
let headers2 = [
//   "Departure",
//   "Return",
//   "Departure station id",
//   "Departure station name",
//   "Return station id",
//   "Return station name",
//   "Covered distance (m)",
//   "Duration (sec.)",
];


//clears table
const clearTable = function () {
  document.getElementById("table").innerHTML = "";
};


// //sets table result ammount
// let tableResultAmount = function(resultSelector,resultAmount){
//   document.querySelector(resultSelector).addEventListener("click", function () {
//     results =resultAmount
//     document.querySelector('#resultA').textContent = `Result ammount = ${results}`
//     infoArr.push(`Result amount ${results} chosen.`)
//     updateInfo()
//   });
// }
// tableResultAmount('#r10',10)
// tableResultAmount('#r25',25)
// tableResultAmount('#r50',50)


//function to create table, using button Id and arr(ful main aray)
//results is chosen by user and sets the value, counter is set by the looping table append
let tableName = 'table'
let tableNum = 0
let results = 10
let counter = 0
let currentPage = 0
let pages = 0
let loop = 0

const btnF = function (b, e) {
  b.addEventListener("click", () => {
    
    infoArr.push(`Table Created`)
  // console.log(infoArr);
  updateInfo()
    clearTable()
    counter=0
    // console.log(tableName);
    // console.log(tableNum);
    let table = document.createElement(tableName+tableNum);
    // console.log(table);
    let headerRow = document.createElement("tr");
    headers2.forEach((headerText) => {
      let header = document.createElement("th");
      let textNode = document.createTextNode(headerText);
      header.appendChild(textNode);
      headerRow.appendChild(header);
    });
    table.appendChild(headerRow);
    e.forEach((emp) => {
    ///////////////////////////////
    //builds html table
    let buildTable = function(){
      let row = document.createElement("tr");
      Object.values(emp).forEach((text) => {
        let cell = document.createElement("td");
        let textNode = document.createTextNode(text);
        cell.appendChild(textNode);
        row.appendChild(cell);
      }); 
      table.appendChild(row);
      counter++
    }

    ///////////////////////////////
    //if the table is smaller than selected results, table builds bigger
    //sets page results, replace with user selected variable
    if(loop < 50){
    if (counter <= results -1){
      buildTable()
      myTable.appendChild(table);
      //hides last created table
      if ( Math.trunc(tableNum) >= Math.trunc(arr.length/results)){
      let hideNew = function(){
      document.querySelector(`${tableName}${tableNum}`).style.display = 'none'
      }
      hideNew()
      }
    }else {
      if (tableNum >0){         
        let hideNew = function(){
        document.querySelector(`${tableName}${tableNum}`).style.display = 'none'
        }
        hideNew()
    }       
    tableNum++
    table = document.createElement(tableName+tableNum);
    let tableInfo = `table` + tableNum
    pages++
    counter =0
    loop++
    }}
    });
  });
};

//get button click populates table with arr info (will be replaced with auto load)
btnF(btnGet, arr);




//previous/next table buttons
const minPage = 1
let maxPage = 50
let curPage = 0

//previous button
document.querySelector('#prevButton').addEventListener('click', function(){
  if (curPage >= minPage){
  document.querySelector('table'+curPage).style.display = 'none' 
  curPage--
  document.querySelector('table'+curPage).style.display = 'block' 
  }
  if ( curPage ==0)
  {
    const hideTableRowsNull = function(childNumber){
      document.querySelector(`#table > table0 > tr:nth-child(${childNumber})`).style.display =  null
    }
    hideTableRowsNull(2)
    hideTableRowsNull(3)
    hideTableRowsNull(4)
    hideTableRowsNull(5)
    hideTableRowsNull(6)
    hideTableRowsNull(7)
    hideTableRowsNull(8)
    hideTableRowsNull(9)
    hideTableRowsNull(10)
    hideTableRowsNull(11)
  }
})

//next button
// changes table rows to display none
const hideTableRowsNone = function(childNumber){
  document.querySelector(`#table > table0 > tr:nth-child(${childNumber})`).style.display =  'none' 
}
document.querySelector('#nextButton').addEventListener('click', function(){
  if (curPage <=loop-1){
  document.querySelector('table'+curPage).style.display = 'none' 
  curPage++
  document.querySelector('table'+curPage).style.display = 'block' 
  document.querySelector("#table > table0").style.display = 'block' 
  document.querySelector("#table > table0 > tr:nth-child(1)").style.display = 'block' 
    hideTableRowsNone(2)
    hideTableRowsNone(3)
    hideTableRowsNone(4)
    hideTableRowsNone(5)
    hideTableRowsNone(6)
    hideTableRowsNone(7)
    hideTableRowsNone(8)
    hideTableRowsNone(9)
    hideTableRowsNone(10)
    hideTableRowsNone(11)
    document.querySelector("tr").style.width = 'none'

  } 

if ( curPage ==0)
{
    hideTableRowsNone(2)
    hideTableRowsNone(3)
    hideTableRowsNone(4)
    hideTableRowsNone(5)
    hideTableRowsNone(6)
    hideTableRowsNone(7)
    hideTableRowsNone(8)
    hideTableRowsNone(9)
    hideTableRowsNone(10)
    hideTableRowsNone(11)
}
})


//makes table  using array
const makeTable = function (array) {
  clearTable()
  counter=0
  let table = document.createElement("table");
  let headerRow = document.createElement("tr");

  headers2.forEach((headerText) => {
    let header = document.createElement("th");
    let textNode = document.createTextNode(headerText);
    header.appendChild(textNode);
    headerRow.appendChild(header);
  });

  table.appendChild(headerRow);
  array.forEach((emp) => {
    if (counter < results){
      let row = document.createElement("tr");
      Object.values(emp).forEach((text) => {
        let cell = document.createElement("td");
        let textNode = document.createTextNode(text);
        cell.appendChild(textNode);
        row.appendChild(cell);
        
      });
      table.appendChild(row);
      counter++
        // console.log(counter);
    }
  });
  myTable.appendChild(table);
};


////////////////////////////////////////////////////////
//reset button, refreshes page
document.querySelector('#resetBtn').addEventListener('click', function(){
    location.reload();
})