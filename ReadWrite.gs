// function hashInfo(){
//   var content = globals.content.getDataRange().getValues();
//   Logger.log(content);
// }

function myFunc(){
  
  var global = globals(); //import globals in global gets tasks via get spreadsheet
  var task_headers = headers.task_headers(); //import task headers from headers
  var camp_id = 121; //dummy campus id
  
  
  var contentRange = global.tasks.getDataRange().getValues();
  //tasks spread sheet is contentRange
  //get data range and get values gets information off of specific spread sheet
  
 // var date = JSON.stringify(new Date()).slice(1,11)
  
  var date = new Date()
  //Logger.log(date);
  for (var x = 0; x < contentRange.length; x++){
    if (contentRange[x][task_headers.content_id] === camp_id){
      Logger.log(contentRange[x][task_headers.due_date] > date)
    }
  }
}


//

function myFunc(){
  
  var global = globals(); //import globals in global gets tasks via get spreadsheet
  var task_headers = headers.task_headers(); //import task headers from headers
  var camp_id = 121; //dummy campus id
  var nonCompleted = [];
  
  var taskRange = global.tasks.getDataRange().getValues();
  //tasks spread sheet is contentRange
  //get data range and get values gets information off of specific spread sheet
  
  var today = new Date()
  for (var x = 0; x < taskRange.length; x++){
    //loop through content which is global.tasks info
    var task = taskRange[x]
    
    //if task at its header >>> content id has the camp_id
    //how to see if a task at a cell has information
    // task at content_id bassically 
    if (task[task_headers.content_id] === camp_id){
      
      
      
      //how to access due date on a task and see if it is past due
      var taskDate = task[task_headers.due_date]
      //Logger.log(task[task_headers.due_date]);
      if(task[task_headers.is_active]){
        nonCompleted.push(task)
      }
    }
  }
  for(var i = 0; i < nonCompleted.length;i++){
    Logger.log(nonCompleted[i])
  }
  
}


//-----------------------------------------------------


var global = globals();
global.tasks.getRange(row, colum).setValue(newValue)

/*How to update <><><><>><><><><><><>

import globl then get row and colum >>> then setValue to new value

in order to get row and colum we need to perform a search where 


*/



//how to mass update inside of Google spread sheets
//do not delete testing higher order functions with spreadsheet searching
//for mass update/post

//first invoke global and store in variable
//then set up headers and store in varaible

//iterate over global.getDataRange().getValues()
//see which cells you want to access by using taskHeader and dot notation
//if conditions are met ...
//use global.example.getRange(i + 1, taskHeader.example + 1).setValue('Something')

//if change use getRange >>>> needs specific coordinates (i + 1, taskHeader.someName + 1)
//the task header is treated as a coordinate 

//if iterate us getDataRange

function changeActive(){
  var content_id = 121
  var global = globals()
  var tasks = global.tasks.getDataRange().getValues();
  var taskHeader = headers.task_headers(); 
  tasks.forEach(function(task, i){
    if(task[taskHeader.content_id] === content_id && !task[taskHeader.is_active]){
     global.tasks.getRange(i + 1, taskHeader.is_active + 1).setValue('True');
    }
  })
  
}
  
//task header is active + 1 allows us to access the index at which 
//should change is active >>> to false when run 
//for adjusting specific value you need to use getRange on the entire sheet which 
//is tasks in this example
