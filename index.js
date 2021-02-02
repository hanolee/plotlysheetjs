let excelData = [];


async function readExcel() {
  let input = await event.target
  let reader = await new FileReader()
  reader.onload = function () {
    let data = reader.result
    let workBook = XLSX.read(data, { type: 'binary' })
    workBook.SheetNames.forEach(function (sheetName) {
      console.log('SheetName: ' + sheetName)
      let rows = XLSX.utils.sheet_to_json(workBook.Sheets[sheetName])
      console.log(JSON.stringify(rows));
     excelData = rows;

    })
  }
  reader.readAsBinaryString(input.files[0])
}
//get Data
readExcel()

async function getNames() {
  let newarray = [];
  for(i=0;i<excelData.length;i++){
    await newarray.push(excelData[i].입주사);
  }
  console.log(newarray, ": get companies!")
  return newarray;
}
getNames();

async function getCooperationScore(){
  let newarray = [];
  for(i=0;i<excelData.length;i++){
    newarray.push(excelData[i].협업가능성);
  }
  console.log(newarray, ": get cooperation scores!");
  return newarray;
}
async function getSkills() {
  let newarray = [];
  for(i=0;i<excelData.length;i++){
    newarray.push(excelData[i].기술력);
  }
  console.log(newarray, ": get scores of skills!")
  return newarray;
}
async function getSize(){
  let newArray = [];
  for(i=0;i<excelData.length;i++){
    await newarray.push(excelData[i].기술력 + excelData[i].협업가능성);
  }
  return newArray
}
let cooperationScore = getCooperationScore()
let skills = getSkills()
let sizes = getSize()

async function drawChart(){
  var trace1 = {
    x:  cooperationScore,
    y:  skills,
    mode: 'markers',
    marker: {
      size:  sizes
    },
  };
  var data = [trace1];
  console.log(data, "차트 데이타");
  var layout = {
    title: 'Marker Size',
    showlegend: false,
    height: 360,
    width: 650,
  }
  
  Plotly.plot("dreamChart", data)
}


