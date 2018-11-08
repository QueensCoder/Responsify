function getEstDate(){
  
 
  
  var user;
  var campId = 10 //hard coded but will get content_id from start campaign
  var global = globals()
  var content = global.content.getDataRange().getValues();
  var contentHeader = headers.content_headers();
  
  
  var campaignContent = content.forEach(function(item){
    
    //info we need 
    var pDate;
    var contentName;
    var type;
    
    if(item[contentHeader.campaign_id] === campId){
      pDate = item[contentHeader.publish_date];
      contentName = item[contentHeader.content_name];
      type = item[contentHeader.type];
      
      var title = '(Estimated)\n' + type + ':' + contentName;
      cal.createEvent(title, pDate, pDate)
    }
  })  
}


//gets usersEmail by looking for the client who is associated with campaignId

function getUserEmail(){
  
  var global = globals()
  //access assignness sheet and users sheet 
  var assignees = global.assignees.getDataRange().getValues();
  var users = global.users.getDataRange().getValues();
  
  //get headers for assigneesheet and userSheet
  var assignHeader = headers.assignee_headers();
  var userHeader = headers.user_headers();
  
  //userId will be used to get users email, userEmail is returned to use for calendarbyId
  var userId;
  
  //client id must be 3 because client has a roleId of 3
  var campId = 10; //hardcoded
  var clientId = 3;
  
  
  
  //starts at 1 because first row is unrelated 
  for(var i = 1; i < assignees.length; i++) {
    var person = assignees[i];
     //look at assignee @ campaignId and roleId 
    if(person[assignHeader.campaign_id] === campId && person[assignHeader.role_id] === clientId) {
      userId = person[assignHeader.user_id];
      break;
    }   
  }
  
  //loop through users and look for userEmail by Id
  for(var i = 0; i < users.length;i++){
    var elem = users[i];
    if(elem[userHeader.user_id] === userId){
      return elem[userHeader.user_email]
    }
  }  
    
}
