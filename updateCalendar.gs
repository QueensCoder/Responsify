//gets usersEmail by looking for the client who is associated with campaignId
function getUserEmail(campId){
 
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


//createEvent takes in calendarId, publish date and title
//and 
function createEvent(calendarId, pDate, title, row) {
  var global = globals();
  var contentHeader = headers.content_headers();
  var loc = '495 flatbush Ave, Brooklyn ,NY, 11225'
  //event is made with info gathered from content
  var event = {
    summary: title,
    location: loc,
    description: 'This content\'s estimated completion date. \n(Completion date subject to change)',
    start: {
      dateTime: pDate.toISOString()
    },
    end: {
      dateTime: pDate.toISOString()
    },
    attendees: [
      {email: calendarId}
    ],
    
    colorId: 01
  };
  postedEvent = Calendar.Events.insert(event,calendarId);
 
  global.content.getRange(row + 1, contentHeader.est_publish_date_id + 1).setValue(postedEvent.id)  
}

//global.tasks.getRange(i + 1, taskHeader.is_active + 1).setValue('True');

//Populates clients calendar with est. publish dates for content
//needs to be connected to start campaign and use dynamicCampId

function getEstDate(dynamicCampId){
  var campId = 20 //hard coded but will get content_id from start campaign
  
  var global = globals()
  var content = global.content.getDataRange().getValues();
  var contentHeader = headers.content_headers();
  
  //use campaignId to get users Email and then target the clients calendar by calendarId
  var calendarId = getUserEmail(campId)
 
  content.forEach(function(item, row){
    var pDate;  //publishdate is used for start and end of event
    var contentName; //name of content
    var type; // type of content
 
    if(item[contentHeader.campaign_id] === campId){
      pDate = item[contentHeader.estimated_publish_date];
      contentName = item[contentHeader.content_name];
      type = item[contentHeader.type];
      var title = '(Estimated)\n' + type + ': ' + contentName;   //concat title with type and content name
      createEvent(calendarId, pDate, title, row); 
    }
  })  
}
//take existsting est publish date and change its date to new appointed date 
//access calendar of a client only
//take the calendar id and change the specified date
//the date is changed by manual input on word press
//first find old date(s) inside of calendar based off time and name
//once found update calendar event
