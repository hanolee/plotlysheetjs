let excelData = [];


function readExcel() {
  let input = event.target
  let reader = new FileReader()
  reader.onload = function () {
    let data = reader.result
    let workBook = XLSX.read(data, { type: 'binary' })
    workBook.SheetNames.forEach(function (sheetName) {
      console.log('SheetName: ' + sheetName)
      let rows = XLSX.utils.sheet_to_json(workBook.Sheets[sheetName])
      console.log(JSON.stringify(rows))
      excelData = rows;

    })
  }
  reader.readAsBinaryString(input.files[0])
}
//get Data
readExcel()
function getNames() {
  let newarray = [];
  for(i=0;i<excelData.length;i++){
    newarray.push(excelData[i].입주사);
  }
  console.log(newarray, ": get companies!")
  return newarray;
}
getNames();

function getCooperationScore(){
  let newarray = [];
  for(i=0;i<excelData.length;i++){
    newarray.push(excelData[i].협업가능성);
  }
  console.log(newarray, ": get cooperation scores!");
  return newarray;
}
function getSkills() {
  let newarray = [];
  for(i=0;i<excelData.length;i++){
    newarray.push(excelData[i].기술력);
  }
  console.log(newarray, ": get scores of skills!")
  return newarray;
}

async function resetTable (){

}



var trace1 = {
  x: [1, 2, 3, 4],
  y: [10, 11, 12, 13],
  mode: 'markers',
  marker: {
    size: [40, 60, 80, 100],
  },
}


var data = [trace1]

var layout = {
  title: 'Marker Size',
  showlegend: false,
  height: 360,``
  width: 650,
}

const chart = document.querySelector('.chart')

Plotly.plot(chart, data, layout)
