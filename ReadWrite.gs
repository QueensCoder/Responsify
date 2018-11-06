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


