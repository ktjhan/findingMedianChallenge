const csvFilePath='./puzzle.csv';
const csv=require('csvtojson');

let arrayo = [];
let ownJson = {};
let number = 0;
let outputArray = [];
let filteredObj = [];
let finalObjArray = [];

function CompareForSort(first, second)  
{  
  if (first == second)
    return 0; 
  if (first < second) 
    return 1; 
  else  
    return -1;
} 

csv()
.fromFile(csvFilePath)
.on('json',(jsonObj)=>{
  arrayo.push(jsonObj);
  number++;
})
.on('done',(error)=>{
  arrayo.forEach(obj => {
    if(!ownJson.hasOwnProperty(obj['State'])){
      ownJson[obj['State']] = {};
      if(!ownJson[obj['State']].hasOwnProperty(obj['City'])){
        ownJson[obj['State']][obj['City']] = [];
        ownJson[obj['State']][obj['City']].push(parseFloat(obj['$ Price']));
      } else {
        ownJson[obj['State']][obj['City']].push(parseFloat(obj['$ Price']));
      }
    } else {
      if(!ownJson[obj['State']].hasOwnProperty(obj['City'])){
        ownJson[obj['State']][obj['City']] = [];
        ownJson[obj['State']][obj['City']].push(parseFloat(obj['$ Price']));
      } else {
        ownJson[obj['State']][obj['City']].push(parseFloat(obj['$ Price']));
      }
    }
  })
  let counter = 0;
  for (let state in ownJson) {
    for (let city in ownJson[state]) {
      if (ownJson[state][city].length % 2 == 0){
        let index = ownJson[state][city].length / 2;
        let median = (ownJson[state][city][index] + ownJson[state][city][index - 1])/2;
        let holderobj = {};
        holderobj['State'] = state;
        holderobj['City'] = city;
        holderobj['median'] = median;
        holderobj['unit'] = ownJson[state][city].length;
        filteredObj.push(holderobj);
      } else {
        let index = Math.floor(ownJson[state][city].length / 2);
        let median = ownJson[state][city][index];
        let holderobj = {};
        holderobj['State'] = state;
        holderobj['City'] = city;
        holderobj['median'] = median;
        holderobj['unit'] = ownJson[state][city].length;
        filteredObj.push(holderobj);
      }
    }
  }
  let unitArray = []
  filteredObj.forEach(el => {
    unitArray.push(el['unit']);
  })
  unitArray.sort(CompareForSort);

  let stopper = unitArray[99];
  filteredObj.forEach(el => {
    if(el['unit'] >= stopper)
    {
      finalObjArray.push(el);
    }
  })
  // console.log(outputArray);
  console.log(finalObjArray);
  console.log('end');
});
